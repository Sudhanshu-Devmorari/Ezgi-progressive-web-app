from django.shortcuts import render
from core.utils import create_response, sms_send
from datetime import datetime, timedelta
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.db.models import Count
from django.db.models import Q
from django.db.models import Sum
from django.db.models import Case, When, IntegerField
from core.models import COMMENTATOR_ROLE_CHOISE
import math

# From rest_framework 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, ParseError, APIException

# Models
from core.models import (User, FollowCommentator, Comments, Subscription, Notification, CommentReaction,
                          FavEditors, TicketSupport, ResponseTicket, Highlight)

# Serializers
from core.serializers import (UserSerializer, FollowCommentatorSerializer, CommentsSerializer,
                             SubscriptionSerializer, NotificationSerializer, CommentReactionSerializer, FavEditorsSerializer, 
                             TicketSupportSerializer, ResponseTicketSerializer, HighlightSerializer)
import pyotp
from django.contrib.auth import authenticate

totp = pyotp.TOTP('base32secret3232', interval=45)
class SignupView(APIView):
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response({
                'message': 'Error',
                'data' : serializer.errors,
               'status' : status.HTTP_400_BAD_REQUEST
                })
        else:
            serializer.save()
            return Response(data={'success': 'Registration done', 'status' : status.HTTP_200_OK})
            # otp = totp.now()
            # print()
            # print('otp: ', otp)
            # print()
            # res = sms_send(request.data['phone'],f"Your OTP verification code is {otp}")
            # print('res: ', res)
            # if res == 'Success':
            #     return Response(data={'success': 'Otp successfully sent.', 'status' : status.HTTP_200_OK})
            # else:
            #     return Response(data={'error': 'Otp not sent. Try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OtpVerify(APIView):
    def post(self, request, format=None, *args, **kwargs):
        try:
            otp = request.data.get('otp')
            print('otp: ', otp)
            verification_result = totp.verify(otp)
            print('verification_result: ', verification_result)

            if verification_result:
                return Response(data={'success': 'Otp successfully verified.', 'status': status.HTTP_200_OK} )
            else:
                return Response({'error': "The OTP verification failed.",'status': status.HTTP_400_BAD_REQUEST})
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OtpReSend(APIView):
    def post(self, request, format=None, *args, **kwargs):
        phone = request.data['phone']
        try:
            user = User.objects.get(phone=phone)
            otp = totp.now()
            print('otp: ', otp)
            # res = sms_send(phone, otp)  
            res = "Success"
            if res == 'Success':
                return Response(data={'success': 'Otp successfully sent.','status' : status.HTTP_200_OK})
            else:
                return Response(data={'error': 'Otp not sent. Try again.', 'status' : status.HTTP_500_INTERNAL_SERVER_ERROR})
        except User.DoesNotExist:
            return Response({
                'data':"User Doesn't exists.",
                'status' : status.HTTP_404_NOT_FOUND
            })

class LoginView(APIView):
    def post(self, request, format=None):
        phone = request.data['phone']
        password = request.data['password']
        try:
            user_phone = User.objects.get(phone=phone)
            if user_phone.password == password:
                return Response({'data' : "Login successfull!", 'userRole' : user_phone.user_role, 'userId' : user_phone.id, 'status' : status.HTTP_200_OK})
            else:
                return Response({'data' : 'Please enter your correct password.', 'status' : status.HTTP_400_BAD_REQUEST})
        except User.DoesNotExist:
            return Response({
                'data':"User Doesn't exists!",
                'status' : status.HTTP_404_NOT_FOUND
            })

class PasswordResetView(APIView):
    def post(self, request, format=None):   
        phone = request.data['phone']
        new_ps = request.data['new_ps']
        user = User.objects.get(phone=phone)
        user.password = new_ps
        user.save()
        return Response({"data" : "Password reset successfully!", "status" : status.HTTP_200_OK})

class RetrieveCommentatorView(APIView): # for Home page:
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}
        
        try:
            all_commentator = User.objects.filter(user_role='commentator')

            # if user already follows a commentator, that commentator is not shown again to the user.
            # all_commentator = [commentator for commentator in all_commentator if not FollowCommentator.objects.filter(commentator_user=commentator, standard_user=request.user).exists()]

            serializer = UserSerializer(all_commentator, many=True)
            data_list['Commentator'] = serializer.data
        except ObjectDoesNotExist:
            return Response(data={'error': 'No commentator found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            # for retrieving public comments:
            all_comments = Comments.objects.filter(status='approve', public_content=True)
            serializer1 = CommentsSerializer(all_comments, many=True)
            data_list['Public_Comments'] = serializer1.data
        except ObjectDoesNotExist:
            data_list['Public_Comments'] = []

        try:
            # for retrieving subscription comments:
            subscribe_comment = []
            # s = User.objects.get(id=6)
            # subscription_obj = Subscription.objects.filter(standard_user=s, end_date__gte=datetime.now(), status='approve')
            subscription_obj = Subscription.objects.filter(standard_user=request.user, end_date__gte=datetime.now(), status='approve')

            for obj in subscription_obj:
                if Comments.objects.filter(commentator_user=obj.commentator_user, status='approve').exists():
                    subscription_comment = Comments.objects.filter(commentator_user=obj.commentator_user, status='approve')
                    for obj in subscription_comment:
                        subscribe_comment.append(obj)
                        # serializer2 = CommentsSerializer(subscription_comment)
                        # print("data: ", serializer2.data)
                        # subscribe_comment.append(serializer2.data)

            serializer2 = CommentsSerializer(subscribe_comment, many=True)
            data_list['Subscription_Comments'] = serializer2.data
        except ObjectDoesNotExist:
            data_list['Subscription_Comments'] = []

        return Response(data=data_list, status=status.HTTP_200_OK)


class FollowCommentatorView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, format=None, *args, **kwargs):
        try:
            commentator_id = request.query_params.get('id')
            if commentator_id:
                commentator_obj = User.objects.get(id=commentator_id)
                follow_commentator_obj = FollowCommentator.objects.create(
                    commentator_user=commentator_obj, standard_user=request.user
                )
                # send follow notification:
                notification_obj = Notification.objects.create(user=commentator_obj, status=False, context=f'{request.user.username} started following you.')

                serializer = FollowCommentatorSerializer(follow_commentator_obj)
                data = serializer.data
                return Response(data=data, status=status.HTTP_200_OK)
            else:
                return Response(
                    create_response(
                        status.HTTP_400_BAD_REQUEST,
                        "The 'id' query parameter is missing or empty."
                    ),
                    status=status.HTTP_400_BAD_REQUEST
                )
        except User.DoesNotExist:
            return Response(
                create_response(status.HTTP_404_NOT_FOUND, "The commentator with the given ID was not found."),
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                create_response(status.HTTP_500_INTERNAL_SERVER_ERROR, str(e)),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )        

class CommentView(APIView):
    # permission_classes = [IsAuthenticated]

    # def post(self, request, format=None, *args, **kwargs):
    #     # print("***********", request.data)
    #     serializer = CommentsSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({'msg':'Data upload sucessfully...'})
    #     return Response(serializer.errors)


    def post(self, request, format=None, *args, **kwargs):
        try:
            user = request.user
            user = User.objects.get(id=1)
            if user.user_role == 'commentator':

                # Get the current date and time
                current_datetime = timezone.now()

                # Filter comments for the current day and month
                comments_today = Comments.objects.filter(commentator_user=user, created__date=current_datetime.date())
                comments_this_month = Comments.objects.filter(commentator_user=user, created__year=current_datetime.year, created__month=current_datetime.month)

                # Get the counts for comments made today and this month
                comments_today_count = comments_today.count()
                comments_this_month_count = comments_this_month.count()


                if user.commentator_level == 'apprentice':
                    if comments_today_count >= 5:
                        return Response({"error": "Daily limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                    if comments_this_month_count >= 30:
                        return Response({"error": "Monthly limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                    
                if user.commentator_level == 'journeyman':
                    if comments_today_count >= 10:
                        return Response({"error": "Daily limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                    if comments_this_month_count >= 50:
                        return Response({"error": "Monthly limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                
                if user.commentator_level == 'master':
                    if comments_today_count >= 15:
                        return Response({"error": "Daily limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                    if comments_this_month_count >= 50:
                        return Response({"error": "Monthly limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                    
                if user.commentator_level == 'grandmaster':
                    if comments_today_count >= 25:
                        return Response({"error": "Daily limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                    if comments_this_month_count >= 50:
                        return Response({"error": "Monthly limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)


                category = request.data.get('category')
                country = request.data.get('country')
                league = request.data.get('league')
                date = request.data.get('date')
                match_detail = request.data.get('match_detail')
                prediction_type = request.data.get('prediction_type')
                prediction = request.data.get('prediction')
                if user.commentator_level == 'apprentice':
                    public_content = True
                else:
                    public_content = request.data.get('public_content')
                comment = request.data.get('comment')

                if not category:
                    raise NotFound("Category not found.")
                if not country:
                    raise NotFound("Country not found.")
                if not league:
                    raise NotFound("League not found.")
                if not date:
                    raise NotFound("Date not found.")
                if not match_detail:
                    raise NotFound("Match detail not found.")
                if not prediction_type:
                    raise NotFound("Prediction Type not found.")
                if not prediction:
                    raise NotFound("Prediction not found.")
                if not public_content:
                    raise NotFound("Public Content not found.")
                if not comment:
                    raise NotFound("Comment not found.")

                comment_obj = Comments.objects.create(
                    commentator_user=request.user,
                    category=category,
                    country=country,
                    league=league,
                    date=date,
                    match_detail=match_detail,
                    prediction_type=prediction_type,
                    prediction=prediction,
                    public_content=public_content,
                    comment=comment
                )
                # send new Comment notification:
                subscription_obj = Subscription.objects.filter(commentator_user=request.user)
                for obj in subscription_obj:
                    # user = obj.standard_user
                    notification_obj = Notification.objects.create(user=obj.standard_user, status=False, context=f'{request.user.username} upload a new Comment.')

                serializer = CommentsSerializer(comment_obj)
                data = serializer.data
                return Response(data=data, status=status.HTTP_200_OK)
            else:
                return Response(data={'error': 'You are not Commentator.'}, status=status.HTTP_404_NOT_FOUND)

        except NotFound as e:
            return Response(create_response(status.HTTP_404_NOT_FOUND, str(e)), status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response(create_response(status.HTTP_500_INTERNAL_SERVER_ERROR, str(e)), status=status.HTTP_500_INTERNAL_SERVER_ERROR)                                


    def patch(self, request, pk, format=None, *args, **kwargs):
        user = request.user
        current_time = timezone.now()
        five_minutes_ago = current_time - timedelta(minutes=5)

        try:
            comment = Comments.objects.get(pk=pk)
        except Comments.DoesNotExist:
            return Response({"error": "Comment not found."}, status=status.HTTP_404_NOT_FOUND)

        if comment.commentator_user != user:
            return Response({"error": "You are not allowed to update this comment."}, status=status.HTTP_403_FORBIDDEN)
        
        if comment.created < five_minutes_ago:
            return Response({"error": "Cannot update comments older than 5 minutes."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CommentsSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubscriptionView(APIView):
    """
    Standard user purchase the NEW Subscription to view commentator post:
    """
    def post(self, request, format=None, *args, **kwargs):
        """
        Subscription purchase logic here, if purchase is successful, below code runs.
        """
        if request.user.user_role == 'standard':
            commentator = User.objects.get(id=request.data.get('commentator_id')) 
            duration = request.data.get('duration')
            start_date = datetime.now()
            if (duration != "" and duration != None):
                if duration == "1 Month":
                    end_date = start_date + timedelta(days=30)
                if duration == "3 Month":
                    end_date = start_date + timedelta(days=90)
                if duration == "9 Month":
                    end_date = start_date + timedelta(days=270)
                if duration == "1 Year":
                    end_date = start_date + timedelta(days=365)

                money = request.data.get('money')
            Subscription_obj = Subscription.objects.create(commentator_user=commentator, standard_user=request.user, duration=duration, 
                                                           start_date=start_date, end_date=end_date, status='active', money=money)
            # send Subscription notification:
            notification_obj = Notification.objects.create(user=commentator, status=False, context=f'{request.user.username} Subscribe you.')

            serializer = SubscriptionSerializer(Subscription_obj)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)


# class NotificationView(APIView):
#     def get(self, request, format=None, *args, **kwargs):
#         notification_obj = Notification.objects.filter(user=request.user)
#         serializer = NotificationSerializer(notification_obj, many=True)
#         data = serializer.data
#         return Response(data=data, status=status.HTTP_200_OK)
class NotificationView(APIView):
    def get(self, request, id=5, format=None, *args, **kwargs):
        try:
            ten_days_ago = timezone.now() - timedelta(days=10)
            notification_obj = Notification.objects.filter(user=id, status=False)
            # notification_obj = Notification.objects.filter(user=id, status=False, created__gte=ten_days_ago)
            serializer = NotificationSerializer(notification_obj, many=True)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist as e:
            return Response(data={'error': 'Notifications not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(
                create_response(status.HTTP_500_INTERNAL_SERVER_ERROR, str(e)),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
    def post(self, request, format=None, *args, **kwargs):
        try:
            if request.data:
                notification_obj = Notification.objects.get(user=request.user, id=request.data.get("id"))
                notification_obj.status = True
                notification_obj.save()
                serializer = NotificationSerializer(notification_obj)
                data = serializer.data
                return Response(data=data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Request data is missing"}, status=status.HTTP_400_BAD_REQUEST)
        except Notification.DoesNotExist:
            return Response({"error": "Notification not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CommentReactionView(APIView):
    def post(self, request, comment_id, format=None, *args, **kwargs):
        try:
            comment = Comments.objects.get(id=comment_id)
        except Comments.DoesNotExist:
            return Response({'error': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)

        # user = request.user
        user = User.objects.get(id=2)
        reaction_type = request.data.get('reaction_type')  # This will contain 'like', 'favorite', or 'clap'
        if reaction_type not in ('like', 'favorite', 'clap'):
            return Response({'error': 'Invalid reaction type'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            comment_reaction = CommentReaction.objects.get(comment=comment, user=user)
            if getattr(comment_reaction, reaction_type):
                # User clicked the same button again, remove the reaction
                setattr(comment_reaction, reaction_type, None)
                if comment_reaction.like is None and comment_reaction.favorite is None and comment_reaction.clap is None:
                    comment_reaction.delete()
                    return Response({'message': 'Reaction removed successfully'})
            else:
                # User clicked a different button, update the reaction
                setattr(comment_reaction, reaction_type, 1)
                comment_reaction.save()
                return Response({'message': f'Reaction "{reaction_type}" saved successfully'})

            comment_reaction.save()
        except CommentReaction.DoesNotExist:
            # If the user has not reacted before, create a new reaction
            reaction_data = {'comment': comment_id, 'user': user.id}
            reaction_data[reaction_type] = 1
            serializer = CommentReactionSerializer(data=reaction_data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': f'Reaction "{reaction_type}" saved successfully'})
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': f'Reaction "{reaction_type}" saved successfully'})
        
class ProfileView(APIView): 
    def get(self, request, id ,format=None, *args, **kwargs):
        try:
            user_obj = User.objects.get(id=id)
            serializer = UserSerializer(user_obj)
            data = serializer.data

            if user_obj.user_role == 'commentator':
                follow_obj = FollowCommentator.objects.filter(commentator_user=user_obj).count()
                data['Follower_Count'] = follow_obj

                subscriber_obj = Subscription.objects.filter(commentator_user=user_obj).count()
                data['Subscriber_Count'] = subscriber_obj

                comment_obj = Comments.objects.filter(commentator_user=user_obj).count()
                data['Comment_Count'] = comment_obj
            else:
                subscription_obj = Subscription.objects.filter(standard_user=user_obj).count()
                data['Subscription_Count'] = subscription_obj

                following_obj = FollowCommentator.objects.filter(standard_user=user_obj).count()
                data['Follow_Up_Count'] = following_obj

            return Response(data=data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            # Handle the case when the user does not exist
            return Response(data={'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Handle other unexpected exceptions
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def post(self, request, id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'User not found', 'status' : status.HTTP_404_NOT_FOUND})

        if 'file' not in request.data:
            return Response({'error': 'No file found', 'status' : status.HTTP_400_BAD_REQUEST})

        profile_pic = request.data['file']

        user.profile_pic = profile_pic
        user.save()

        serializer = UserSerializer(user)
        return Response({ 'data' : serializer.data, 'status' : status.HTTP_200_OK})
        

class FavEditorsCreateView(APIView):
    def post(self, request, format=None, *args, **kwargs):
        try:
            if request.data:
                if 'id' not in request.data:
                    return Response({'error': 'Commentator Id not found.'}, status=status.HTTP_400_BAD_REQUEST)
        
                comment = User.objects.get(id=request.data.get("id"))
                # user = User.objects.get(id=6)
                user = request.user

                editor_obj = FavEditors.objects.create(commentator_user=comment, standard_user=user)
                serializer = FavEditorsSerializer(editor_obj)
                data = serializer.data
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Request Data not found'}, status=status.HTTP_404_NOT_FOUND)
        except ObjectDoesNotExist as e:
            return Response({"error": "Requested object does not exist."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class RetrieveFavEditorsAndFavComment(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        data_list = {}
        fav_editor_list = []
        fav_comment_list = []

        # user = request.user
        user = User.objects.get(id=id)

        try:
            editor = []
            editor_obj = FavEditors.objects.filter(standard_user=user)
            for obj in editor_obj:
                details = {}
                print("********** ", obj.commentator_user.username)

                count = Subscription.objects.filter(commentator_user=obj.commentator_user).count()
                print("********** ", count)

                serializer = FavEditorsSerializer(obj)
                data = serializer.data
                details['data'] = data
                details['subscriber_count'] = count

                editor.append(details)


            # serializer = UserSerializer(fav_editor_list, many=True)
            data_list['favEditors'] = editor
        except Exception as e:
            return Response(data={'error': 'Error retrieving favorite editors'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        print("========== ", data_list)

        try:
            comment_obj = CommentReaction.objects.filter(user=user, favorite=1)
            for obj in comment_obj:
                fav_comment_list.append(obj.comment)
            serializer1 = CommentsSerializer(fav_comment_list, many=True)
            data_list['favComments'] = serializer1.data
        except Exception as e:
            return Response(data={'error': 'Error retrieving favorite comments'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=data_list, status=status.HTTP_200_OK)       

class SupportView(APIView):
    # for retrieve login user all tickets:
    def get(self, request, id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id)

            support_obj = TicketSupport.objects.filter(user=user)
            serializer = TicketSupportSerializer(support_obj, many=True)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # for create new ticket:
    def post(self, request, id, format=None, *args, **kwargs):
        try:
            print(request.data)
            if request.data:
                if 'department' not in request.data:
                        return Response({'error': 'Department not found.', 'status' : status.HTTP_400_BAD_REQUEST})
                if 'subject' not in request.data:
                        return Response({'error': 'Subject not found.', 'status' : status.HTTP_400_BAD_REQUEST})
                if 'message' not in request.data:
                        return Response({'error': 'Message not found.', 'status' : status.HTTP_400_BAD_REQUEST})
                # user = request.user
                user = User.objects.get(id=id)
                support_obj = TicketSupport.objects.create(user=user, department=request.data.get('department'), 
                                                        subject=request.data.get('subject'), message=request.data.get('message'))
                
                serializer = TicketSupportSerializer(support_obj)
                data = serializer.data
                return Response(data=data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Request Data not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={'error': 'Error retrieving favorite comments'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class UpdateTicketMessageView(APIView):
    def post(self, request, format=None, *args, **kwargs):
        try:
            if request.data:
                if 'ticket_id' not in request.data:
                    return Response({'error': 'Ticket-id not found.'}, status=status.HTTP_400_BAD_REQUEST)
                if 'message' not in request.data:
                    return Response({'error': 'Message not found.'}, status=status.HTTP_400_BAD_REQUEST)

                user = request.user
                # user = User.objects.get(id=1)

                ticket_id = request.data.get('ticket_id')
                ticket_obj = TicketSupport.objects.get(id=ticket_id)
                message = request.data.get('message')

                result_obj = ResponseTicket.objects.create(user=user, ticket=ticket_obj, response=message)
                serializer = ResponseTicketSerializer(result_obj)
                data = serializer.data

                return Response(data=data, status=status.HTTP_200_OK)

        except TicketSupport.DoesNotExist:
            return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ResolvedTicket(APIView):
    def post(self, request, format=None, *args, **kwargs):
        try:
            user = request.user
            # user = User.objects.get(id=1)

            if request.data:
                if 'ticket_id' not in request.data:
                    return Response({'error': 'Ticket-id not found.'}, status=status.HTTP_400_BAD_REQUEST)

                ticket_id = request.data.get('ticket_id')
                ticket_obj = TicketSupport.objects.get(id=ticket_id)

                # Ensure the ticket belongs to the current user (optional check)
                if ticket_obj.user != user:
                    return Response({'error': 'This ticket does not belong to the you.'}, status=status.HTTP_403_FORBIDDEN)

                ticket_obj.status = 'resolved'
                ticket_obj.save()

                serializer = TicketSupportSerializer(ticket_obj)
                data = serializer.data

                return Response(data=data, status=status.HTTP_200_OK)

            else:
                return Response({'error': 'No data provided.'}, status=status.HTTP_400_BAD_REQUEST)

        except TicketSupport.DoesNotExist:
            return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ActiveResolvedCommentRetrieveView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}
        user = request.user

        try:
            all_active_comment = Comments.objects.filter(commentator_user=user, date__gt=datetime.now().date())
            serializer = CommentsSerializer(all_active_comment, many=True)
            data_list['active_comments'] = serializer.data
        except Comments.DoesNotExist:
            data_list['active_comments'] = []

        try:
            all_resolved_comment = Comments.objects.filter(commentator_user=user, date__lt=datetime.now().date())
            serializer1 = CommentsSerializer(all_resolved_comment, many=True)
            data_list['resolved_comments'] = serializer1.data
        except Comments.DoesNotExist:
            data_list['resolved_comments'] = []

        return Response(data=data_list, status=status.HTTP_200_OK)


class RetrieveSubscriberListAndSubscriptionList(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        # user = request.user
        user = User.objects.get(id=id)
        data_list = {}
        subscribers = []
        subscription = []
        try:
            if user.user_role == 'commentator':
                if Subscription.objects.filter(commentator_user=user).exists():
                    my_subscribers = Subscription.objects.filter(commentator_user=user)
                    # for obj in my_subscribers:
                    #     subscribers.append(obj.standard_user)
                    serializer = SubscriptionSerializer(my_subscribers, many=True)
                    data_list['subscribers'] = serializer.data 

                if Subscription.objects.filter(standard_user=user).exists():
                    my_subscription = Subscription.objects.filter(standard_user=user)
                    # for obj in my_subscription:
                    #     subscription.append(obj.commentator_user)
                    serializer1 = SubscriptionSerializer(my_subscription, many=True)
                    data_list['subscription'] = serializer1.data
            else:
                if Subscription.objects.filter(standard_user=user).exists():
                    my_subscription = Subscription.objects.filter(standard_user=user)
                    # for obj in my_subscription:
                    #     subscription.append(obj.commentator_user)
                    serializer = SubscriptionSerializer(my_subscription, many=True)
                    data_list['subscription'] = serializer.data
                   
            return Response(data=data_list, status=status.HTTP_200_OK) 
             
        except ObjectDoesNotExist as e:
            error_message = {"error": "Object does not exist."}
            return Response(data=error_message, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            error_message = {"error": "An unexpected error occurred."}
            return Response(data=e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class DeactivateProfile(APIView):
    def get(self, request, format=None, *args, **kwargs):
        user = User.objects.get(id=8)
        # user = request.user
        if user.user_role == 'standard':
            user.delete()
            message = {"success": "User profile Deactivate sucessfully."}
            return Response(data=message, status=status.HTTP_200_OK)
        else:
            user.deactivate_commentator = 'pending'
            user.save()
            message = {"success": "Profile deactivation request successfully sent to admin."}
            return Response(data=message, status=status.HTTP_200_OK)


class HighlightPurchaseView(APIView):
    def post(self, request, format=None, *args, **kwargs):
        """
        if highlight purchase sucessfull then below code work
        """
        user = request.user
        if request.data:
            try:
                if 'id' not in request.data:
                    raise KeyError('Commentator Id not found.')
                if 'duration' not in request.data:
                    raise KeyError('Duration not found.')
                if 'amount' not in request.data:
                    raise KeyError('Amount not found.')

                start_date = timezone.now()
                duration = request.data.get('duration')
                money = request.data.get('amount')

                if duration not in ["1 Week", "2 Week", "1 Month"]:
                    raise ValueError('Invalid duration.')

                if duration == "1 Week":
                    end_date = start_date + timezone.timedelta(days=7)
                elif duration == "2 Week":
                    end_date = start_date + timezone.timedelta(days=14)
                else:  # duration == "1 Month"
                    end_date = start_date + timezone.timedelta(days=30)

                highlight_obj = Highlight.objects.create(user=user, duration=duration, start_date=start_date, end_date=end_date, money=money, highlight=True, status='active')
                serializer = HighlightSerializer(highlight_obj)
                data = serializer.data
                return Response(data=data, status=status.HTTP_200_OK)

            except KeyError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

            except ValueError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

            except Exception as e:
                return Response({'error': 'An error occurred. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            message = {"error": "Rquest data not found."}
            return Response(data=message, status=status.HTTP_200_OK)


class CommentFilterView(APIView):
    def post(self, request, format=None, *args, **kwargs):
        filters = {}
        try:
            if 'category' in request.data:
                filters['category__contains'] = request.data.get('category')

            if 'country' in request.data:
                filters['country'] = request.data.get('country')

            if 'league' in request.data:
                filters['league'] = request.data.get('league')

            if 'match_detail' in request.data:
                filters['match_detail'] = request.data.get('match_detail')

            if 'prediction_type' in request.data:
                filters['prediction_type'] = request.data.get('prediction_type')

            if 'prediction' in request.data:
                filters['prediction'] = request.data.get('prediction')

            if 'public_content' in request.data:
                filters['public_content'] = request.data.get('public_content')

            if 'status' in request.data:
                filters['status'] = request.data.get('status')

            if 'date' in request.data:
                filters['date'] = request.data.get('date')

            query_filters = Q(**filters)
            filtered_comments = Comments.objects.filter(query_filters)
            serializer = CommentsSerializer(filtered_comments, many=True)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)
    
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AdminMainPage(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}

        try:
            new_user = User.objects.all().count()
            data_list['new_user'] = new_user

            new_editor = User.objects.filter(user_role='commentator').count()
            data_list['new_editor'] = new_editor

            new_subscriber = Subscription.objects.all().count()
            data_list['new_subscriber'] = new_subscriber

            new_comment = Comments.objects.filter(status='approve').count()
            data_list['new_comment'] = new_comment

            all_user = User.objects.all().order_by('-created')
            serializer = UserSerializer(all_user, many=True)
            data = serializer.data
            data_list['users_list'] = data

            return Response(data=data_list, status=status.HTTP_200_OK)

        except Exception as e:
            # Handle the exception appropriately, you can log it or return an error response.
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class UserManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}

        try:
            new_user = User.objects.all().count()
            data_list['new_user'] = new_user

            new_editor = User.objects.filter(user_role='commentator').count()
            data_list['new_editor'] = new_editor

            new_subscriber = Subscription.objects.all().count()
            data_list['new_subscriber'] = new_subscriber

            all_user = User.objects.all().order_by('-created')
            serializer = UserSerializer(all_user, many=True)
            data = serializer.data
            data_list['users_list'] = data

            all_notification = Notification.objects.all().order_by('-created')
            serializer1 = NotificationSerializer(all_notification, many=True)
            data_list['user_timeline'] = serializer1.data

            return Response(data=data_list, status=status.HTTP_200_OK)

        except Exception as e:
            # Handle the exception appropriately, you can log it or return an error response.
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, format=None, *args, **kwargs):
        """
        Create new User.
        """
        try:
            profile = request.data.get('file')
            date = request.data.get('date')
            name = request.data['name']
            username = request.data['username']
            phone = request.data['phone']
            password = request.data['password']
            gender = request.data['gender']
            age = request.data['age']

            subscription = request.data.get('subscription')
            if subscription:
                duration = request.data.get('duration')
                role = 'commentator'
                level = request.data.get('level').lower()

            # Any additional validations or processing can be done here

            user_obj = User.objects.create(profile_pic=profile,
                name=name, username=username, phone=phone,
                password=password, gender=gender, age=age,
                user_role=role, commentator_level=level
            )
            user_obj.set_password(password)
            user_obj.save()
            serializer = UserSerializer(user_obj)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)

        except KeyError as e:
            error_field = str(e)
            error_message = f"{error_field} not found."
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

        except ParseError:
            return Response({'error': 'Invalid data format.'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

    def patch(self, request, pk, format=None, *args, **kwargs):
        """
        Update User details.
        """
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    def delete(self, request, pk, format=None, *args, **kwargs):
        """
        Deactivate or delete user.
        """
        try:
            user = User.objects.get(pk=pk)
            user.delete()
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        

class CommentsManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        management = {}
        commentator = []
        
        comments = Comments.objects.filter().order_by('-created')
        comments_count = comments.count()

        serializer1 = CommentsSerializer(comments, many=True)

        comments_with_likes = Comments.objects.filter(status='approve').annotate(like_count=Count('commentreaction__like'))

        # Next, get the comment with the most likes
        comment_with_most_likes = comments_with_likes.order_by('-like_count')

        # Finally, find the commentator who posted that comment
        for i in comment_with_most_likes:
            if i:
                commentator_of_most_liked_comment = i.commentator_user

                # Get the total likes for the comment object
                total_likes = CommentReaction.objects.filter(comment=i).aggregate(total_likes=Sum('like'))['total_likes']

                # Get the total favorites for the comment object
                total_favorites = CommentReaction.objects.filter(comment=i).aggregate(total_favorites=Sum('favorite'))['total_favorites']

                # Get the total claps for the comment object
                total_claps = CommentReaction.objects.filter(comment=i).aggregate(total_claps=Sum('clap'))['total_claps']

                # If the comment has no reactions, the total counts will be None, so you can set them to 0 if desired.
                total_likes = total_likes or 0
                total_favorites = total_favorites or 0
                total_claps = total_claps or 0

                # print("Posted by commentator:", commentator_of_most_liked_comment.username)
                user_obj = User.objects.get(username=commentator_of_most_liked_comment.username)
                serializer = UserSerializer(user_obj)
                data = serializer.data

                comment_serializer = CommentsSerializer(i)

                details = {
                    "user":data,
                    "comment_data":comment_serializer.data,
                    "total_likes":total_likes,
                    "total_favorites":total_favorites,
                    "total_clap":total_claps,
                }
                commentator.append(details)
            else:
                return Response({"error": "No comments with likes found."}, status=status.HTTP_404_NOT_FOUND)

        management['comments_count'] = comments_count
        management['all_comment'] = serializer1.data
        management['most_like'] = commentator
        return Response(data=management, status=status.HTTP_200_OK)
    
        
    # def post(self, request, format=None, *args, **kwargs):
    #     pass

    def patch(self, request, pk, format=None, *args, **kwargs):
        try:
            comment = Comments.objects.get(pk=pk)
        except Comments.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CommentsSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FilterComments(APIView):
    def post(self, request, format=None, *args, **kwargs):
        data_list = []
        filters = {}
        try:
            if 'category' in request.data:
                filters['category__contains'] = request.data.get('category')

            if 'country' in request.data:
                filters['country'] = request.data.get('country')

            if 'league' in request.data:
                filters['league'] = request.data.get('league')

            if 'match_detail' in request.data:
                filters['match_detail'] = request.data.get('match_detail')

            if 'prediction_type' in request.data:
                filters['prediction_type'] = request.data.get('prediction_type')

            if 'prediction' in request.data:
                filters['prediction'] = request.data.get('prediction')

            if 'status' in request.data:
                filters['status'] = request.data.get('status')

            if 'date' in request.data:
                filters['date'] = request.data.get('date')

            filter_type = request.data.get('filter_type')  # This will contain 'public_content', 'finished', 'winning'
            if filter_type in ('public_content', 'finished', 'winning'):

                # filters['public_content'] = request.data.get('public_content')
                if filter_type == "public_content":
                    all_comments = Comments.objects.filter(status='approve', public_content=True,**filters)
                    serializer11 = CommentsSerializer(all_comments, many=True)
                    data0 = serializer11.data
                    data_list.append(data0)
                    # return Response(data=data0, status=status.HTTP_200_OK)
                
                if filter_type == "finished":
                    all_resolved_comment = Comments.objects.filter(commentator_user=request.user, date__lt=datetime.now().date(),**filters)
                    serializer4 = CommentsSerializer(all_resolved_comment, many=True)
                    data0 = serializer4.data
                    data_list.append(data0)

                    # return Response(data=data0, status=status.HTTP_200_OK)

                if filter_type == "winning":
                    """
                    winning logic here.
                    """
                    # data_list.append(data0)
                    # return Response(data=data0, status=status.HTTP_200_OK)

            filter_type0 = request.data.get('filter_type0') # This will contain 'only_subscriber', 'not_stated', 'finished'
            if filter_type0 in ('only_subscriber', 'not_stated', 'finished'):

                if filter_type0 == "only_subscriber":
                    subscribe_comment = []
                    # s = User.objects.get(id=6)
                    # subscription_obj = Subscription.objects.filter(standard_user=s, end_date__gte=datetime.now(), status='approve')
                    subscription_obj = Subscription.objects.filter(standard_user=request.user, end_date__gte=datetime.now(), status='approve')

                    for obj in subscription_obj:
                        if Comments.objects.filter(commentator_user=obj.commentator_user, status='approve').exists():
                            subscription_comment = Comments.objects.filter(commentator_user=obj.commentator_user,**filters)
                            for obj in subscription_comment:
                                subscribe_comment.append(obj)

                    serializer2 = CommentsSerializer(subscribe_comment, many=True)
                    data1 = serializer2.data
                    data_list.append(data1)
                    # return Response(data=data1, status=status.HTTP_200_OK)

                if filter_type0 == "not_stated":
                    all_active_comment = Comments.objects.filter(commentator_user=request.user, date__gt=datetime.now().date(),**filters)
                    serializer3 = CommentsSerializer(all_active_comment, many=True)
                    data1 = serializer3.data
                    data_list.append(data1)
                    # return Response(data=data1, status=status.HTTP_200_OK)

                if filter_type == "lose":
                    """
                    lose logic here.
                    """
                    # data_list.append(data1)
                    # return Response(data=data1, status=status.HTTP_200_OK)
                
            if filter_type == None and filter_type0 == None:

                query_filters = Q(**filters)
                filtered_comments = Comments.objects.filter(query_filters)
                serializer = CommentsSerializer(filtered_comments, many=True)
                data = serializer.data
                data_list.append(data)
            return Response(data=data_list, status=status.HTTP_200_OK)
    
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class EditorManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}
        
        try:
            editor_list = []
            commentator = User.objects.filter(user_role='commentator')
            for obj in commentator:
                detail = {}
                follow_obj = FollowCommentator.objects.filter(commentator_user=obj).count()
                detail['Follower_Count'] = follow_obj

                follow_obj = FollowCommentator.objects.filter(standard_user=obj).count()
                detail['Following_Count'] = follow_obj

                subscriber_obj = Subscription.objects.filter(commentator_user=obj).count()
                detail['Subscriber_Count'] = subscriber_obj

                subscriber_obj = Subscription.objects.filter(standard_user=obj).count()
                detail['Subscription_Count'] = subscriber_obj

                serializer = UserSerializer(obj)
                detail['editor_data'] = serializer.data

                editor_list.append(detail)

            data_list['editor_list'] = editor_list



            editor_count = commentator.count()
            data_list['editor_count'] = editor_count

            apprentice = User.objects.filter(commentator_level='apprentice').count()
            data_list['apprentice_count'] = apprentice

            journeyman = User.objects.filter(commentator_level='journeyman').count()
            data_list['journeyman_count'] = journeyman

            master = User.objects.filter(commentator_level='master').count()
            data_list['master_count'] = master

            grandmaster = User.objects.filter(commentator_level='grandmaster').count()
            data_list['grandmaster_count'] = grandmaster


            COMMENTATOR_PRIORITIES = {
                'apprentice': 1,
                'journeyman': 2,
                'master': 3,
                'grandmaster': 4,
            }

            # Get the top ten users with user_role='commentator' based on their commentator_level's priority
            top_ten_commentators = User.objects.filter(user_role='commentator').annotate(
                priority=Case(
                    *[When(commentator_level=level, then=COMMENTATOR_PRIORITIES[level]) for level, _ in COMMENTATOR_ROLE_CHOISE],
                    default=0,
                    output_field=IntegerField(),
                ),
            ).order_by('-priority', '-created')[:10]

            serializer1 = UserSerializer(top_ten_commentators, many=True)
            data1 = serializer1.data
            data_list['top_ten'] = data1


            active_editor = User.objects.filter(user_role='commentator', commentator_status='active').count()
            data_list['active_editor'] = active_editor

            pending_editor = User.objects.filter(user_role='commentator', commentator_status='pending').count()
            data_list['pending_editor'] = pending_editor

            deactivate_editor = User.objects.filter(user_role='commentator', commentator_status='deactive').count()
            data_list['deactivate_editor'] = deactivate_editor


            deactivation_request = User.objects.filter(deactivate_commentator='pending').count()
            data_list['deactivation_request'] = deactivation_request

            return Response(data=data_list, status=status.HTTP_200_OK)
        
        except Exception as e:
            # Handle the exception here (e.g., log the error, return a specific error response, etc.)
            return Response(data={'error': 'An error occurred while processing the request.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



    def post(self, request, format=None, *args, **kwargs):
        """
        Create new commentator User.
        """
        try:
            profile = request.data.get('file')
            date = request.data.get('date')
            name = request.data['name']
            username = request.data['username']
            phone = request.data['phone']
            password = request.data['password']
            gender = request.data['gender']
            age = request.data['age']
            country = request.data['country']
            city = request.data['city']
            category = request.data['category']
            role = 'commentator'
            commentator_level = request.data['level']


            # Any additional validations or processing can be done here

            user_obj = User.objects.create(profile_pic=profile,
                name=name, username=username, phone=phone,
                password=password, gender=gender, age=age,
                user_role=role, commentator_level=commentator_level,
                country=country, city=city, category=category
            )
            user_obj.set_password(password)
            user_obj.save()
            serializer = UserSerializer(user_obj)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)

        except KeyError as e:
            error_field = str(e)
            error_message = f"{error_field} not found."
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

        except ParseError:
            return Response({'error': 'Invalid data format.'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def patch(self, request, pk, format=None, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, format=None, *args, **kwargs):
        """
        Deactivate or delete user.
        """
        try:
            user = User.objects.get(pk=pk)
            user.deactivate_commentator = 'pending'
            user.save()
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
class EditorSubscriptionDetails(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = []
        try:
            commentator_id = request.query_params.get("commentator_id")
            commentator = User.objects.get(id=commentator_id)
            subscribers = Subscription.objects.filter(commentator_user=commentator)
            for obj in subscribers:
                data = {}
                data['duration'] = obj.duration

                s_date = obj.start_date
                c_date = timezone.now()

                time_difference = c_date - s_date
                days_difference = time_difference.days/30
                rounded_days_difference = math.floor(days_difference)

                data['months'] = f'{rounded_days_difference}/{obj.duration.split(" ")[0]}'
                serializer = SubscriptionSerializer(obj)
                serializer = SubscriptionSerializer(obj)
                data['data'] = serializer.data

                data_list.append(data)

            return Response(data=data_list, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(data={"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class FilterEditors(APIView):
    def post(self, request, format=None, *args, **kwargs):
        try:
            filters = {}
            if request.data:
                if 'lavel' in request.data:
                    filters['commentator_level'] = request.data.get('lavel')

                if 'sucess_rate' in request.data:
                    filters['sucess_rate'] = request.data.get('sucess_rate')

                if 'score_point' in request.data:
                    filters['score_point'] = request.data.get('score_point')

                if 'city' in request.data:
                    filters['city'] = request.data.get('city')

                if 'age' in request.data:
                    filters['age'] = request.data.get('age')

                if 'gender' in request.data:
                    filters['gender'] = request.data.get('gender')

                filters['user_role'] = 'commentator'

                query_filters = Q(**filters)
                filtered_comments = User.objects.filter(query_filters)
                serializer = UserSerializer(filtered_comments, many=True)
                data = serializer.data
                return Response(data=data, status=status.HTTP_200_OK)
            else:
                return Response(data={'error': 'Request data not found'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class DeactivateCommentator(APIView):
    def get(self, request, format=None, *args, **kwargs):
        try:
            user = User.objects.filter(deactivate_commentator='pending')
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(user, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
        

    def patch(self, request, pk, format=None, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SalesManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}
        """
        Plan sale logic here.
        """
        try:
            # Subscription objects handling
            subscription_obj = Subscription.objects.filter(subscription=True)
            subscription_cal = 0
            for obj in subscription_obj:
                subscription_cal += obj.money

            serializer = SubscriptionSerializer(subscription_obj, many=True)
            data_list['subscription'] = serializer.data
            data_list['subscription_count'] = subscription_cal

        except Exception as e:
            return Response(data={'error': 'An error occurred while fetching subscription data.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            # Highlight objects handling
            highlights_obj = Highlight.objects.filter(highlight=True)
            highlights_cal = 0
            for obj in highlights_obj:
                highlights_cal += obj.money

            serializer1 = HighlightSerializer(highlights_obj, many=True)
            data_list['highlight_count'] = highlights_cal
            data_list['highlight'] = serializer1.data

        except Exception as e:
            return Response(data={'error': 'An error occurred while fetching highlight data.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=data_list, status=status.HTTP_200_OK)
    
    def post(self, request, format=None, *args, **kwargs):
        """
        filter for sales management.
        """
        data_list = []
        filters = {}
        try:
            if request.data:
                if 'type' not in request.data:
                    return Response({'error': 'Type not found.'}, status=status.HTTP_400_BAD_REQUEST)
                
                if 'date' in request.data:
                    filters['start_date__contains'] = request.data.get('date')
                if 'status' in request.data:
                    filters['status'] = request.data.get('status')
                if 'duration' in request.data:
                    filters['duration'] = request.data.get('duration')

                type = request.data.get('type')
                query_filters = Q(**filters)

                if type == 'subscription':
                    subscription_obj = Subscription.objects.filter(query_filters)
                    serializer = SubscriptionSerializer(subscription_obj, many=True)
                    data_list.append(serializer.data)

                elif type == 'highlight':
                    highlight_obj = Highlight.objects.filter(query_filters)
                    serializer1 = HighlightSerializer(highlight_obj, many=True)
                    data_list.append(serializer1.data)
                else:
                    return Response({'error': 'Invalid type'}, status=status.HTTP_400_BAD_REQUEST)

                return Response(data=data_list, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class SupportManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        all_data = {}
        try:
            current_datetime = timezone.now()

            twenty_four_hours_ago = current_datetime - timedelta(hours=24)

            last_24_hours_data = TicketSupport.objects.filter(created__gte=twenty_four_hours_ago).count()
            all_data['new_request'] = last_24_hours_data

            pending_ticket = TicketSupport.objects.filter(status='pending').count()
            all_data['pending_request'] = pending_ticket

            resolved_ticket = TicketSupport.objects.filter(status='resolved').count()
            all_data['resolved_request'] = resolved_ticket

            all_ticket = TicketSupport.objects.all()
            all_data['total'] = all_ticket.count()

            serializer = TicketSupportSerializer(all_ticket, many=True)
            all_data['tickets'] = serializer.data

            return Response(data=all_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


