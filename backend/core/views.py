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
import math, random
import pyotp

# From rest_framework 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, ParseError, APIException

# Models
from core.models import (User, FollowCommentator, Comments, Subscription, Notification, CommentReaction,
                          FavEditors, TicketSupport, ResponseTicket, Highlight, Advertisement, CommentatorLevelRule,
                          MembershipSetting, SubscriptionSetting, HighlightSetting)

# Serializers
from core.serializers import (UserSerializer, FollowCommentatorSerializer, CommentsSerializer,
                             SubscriptionSerializer, NotificationSerializer, CommentReactionSerializer, FavEditorsSerializer, 
                             TicketSupportSerializer, ResponseTicketSerializer, HighlightSerializer, AdvertisementSerializer,
                             CommentatorLevelRuleSerializer, MembershipSettingSerializer, SubscriptionSettingSerializer,
                             HighlightSettingSerializer)


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
        unique_comment_ids = set()
        
        # retrieve commentator list:
        try:
            user_detail = []
            all_commentator = User.objects.filter(user_role='commentator').order_by('-created')
            for obj in all_commentator:
                detail = {}
                count = Subscription.objects.filter(commentator_user=obj).count()
                detail['user'] = UserSerializer(obj).data
                detail['subscriber_count'] = count
                user_detail.append(detail)

            # if user already follows a commentator, that commentator is not shown again to the user.
            # all_commentator = [commentator for commentator in all_commentator if not FollowCommentator.objects.filter(commentator_user=commentator, standard_user=request.user).exists()]

            # serializer = UserSerializer(all_commentator, many=True)
            data_list['Commentator'] = user_detail
        except ObjectDoesNotExist:
            return Response(data={'error': 'No commentator found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            all_comments = Comments.objects.filter(status='approve', public_content=True).order_by('-created')
            data_list['Public_Comments'] = []

            for comment in all_comments:
                comment_data = CommentsSerializer(comment).data
                date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")
        
                # Format the datetime object as desired (DD.MM.YYYY)
                formatted_date = date_obj.strftime("%d.%m.%Y")

                comment_data['date'] = formatted_date 

                # Fetch comment reactions and calculate the total count of reactions
                comment_reactions = CommentReaction.objects.filter(comment=comment)
                total_reactions = comment_reactions.aggregate(
                    total_likes=Sum('like'),
                    total_favorite=Sum('favorite'),
                    total_clap=Sum('clap')
                )
                
                comment_data['total_reactions'] = {
                    'total_likes': total_reactions['total_likes'] or 0,
                    'total_favorite': total_reactions['total_favorite'] or 0,
                    'total_clap': total_reactions['total_clap'] or 0
                }
                if comment.id not in unique_comment_ids:
                    unique_comment_ids.add(comment.id)
                    data_list['Public_Comments'].append(comment_data)

        except ObjectDoesNotExist:
            data_list['Public_Comments'] = []

        try:
            # if request.data:
                # for retrieving subscription comments:
                data_list['Subscription_Comments'] = []
                s = User.objects.get(id=6)
                subscription_obj = Subscription.objects.filter(standard_user=s, end_date__gte=datetime.now(), status='approve')
                # subscription_obj = Subscription.objects.filter(standard_user=request.user, end_date__gte=datetime.now(), status='approve').order_by('-created')

                for obj in subscription_obj:
                    if Comments.objects.filter(commentator_user=obj.commentator_user, status='approve').exists():
                        subscription_comment = Comments.objects.filter(commentator_user=obj.commentator_user, status='approve').order_by('-created')

                        for comment in subscription_comment:
                            comment_data = CommentsSerializer(comment).data
                            date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")
        
                            # Format the datetime object as desired (DD.MM.YYYY)
                            formatted_date = date_obj.strftime("%d.%m.%Y")

                            comment_data['date'] = formatted_date 

                            comment_reactions = CommentReaction.objects.filter(comment=comment)
                            total_reactions = comment_reactions.aggregate(
                                total_likes=Sum('like'),
                                total_favorite=Sum('favorite'),
                                total_clap=Sum('clap')
                            )
                            
                            comment_data['total_reactions'] = {
                                'total_likes': total_reactions['total_likes'] or 0,
                                'total_favorite': total_reactions['total_favorite'] or 0,
                                'total_clap': total_reactions['total_clap'] or 0
                            }
                            # subscribe_comment.append(obj)
                            # serializer2 = CommentsSerializer(subscription_comment)
                            # print("data: ", serializer2.data)
                            # subscribe_comment.append(serializer2.data)
                            if comment.id not in unique_comment_ids:
                                unique_comment_ids.add(comment.id)
                                data_list['Subscription_Comments'].append(comment_data)

                # serializer2 = CommentsSerializer(subscribe_comment, many=True)
                # data_list['Subscription_Comments'] = serializer2.data
        except ObjectDoesNotExist:
            data_list['Subscription_Comments'] = []

        try:
            # for retrieving Highlights:
            all_highlights = Highlight.objects.filter(status='active').order_by('-created')
            data_list['highlights'] = []
            for obj in all_highlights:
                highlighted_data = HighlightSerializer(obj).data
                user_data = highlighted_data['user']
        
                count = Subscription.objects.filter(commentator_user=user_data['id']).count()

                highlighted_data['subscriber_count'] = count

                data_list['highlights'].append(highlighted_data)

        except ObjectDoesNotExist:
            data_list['highlights'] = []

        try:
            ads = Advertisement.objects.all()
            serializer = AdvertisementSerializer(ads, many=True)
            data = serializer.data
            data_list['ads'] = data
        except ObjectDoesNotExist:
            data_list['ads'] = []

        return Response(data=data_list, status=status.HTTP_200_OK)


class FollowCommentatorView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, format=None, *args, **kwargs):
        user = User.objects.get(id=6)
        # user = request.user
        try:
            commentator_id = request.query_params.get('id')
            if commentator_id:
                commentator_obj = User.objects.get(id=commentator_id)
                follow_commentator_obj = FollowCommentator.objects.create(
                    commentator_user=commentator_obj, standard_user=request.user
                )
                # send follow notification:
                notification_obj = Notification.objects.create(user=commentator_obj, status=False, context=f'{request.user.username} started following you.')

                if not FollowCommentator.objects.filter(commentator_user=commentator_obj, standard_user=user).exists():

                    follow_commentator_obj = FollowCommentator.objects.create(commentator_user=commentator_obj, standard_user=user)

                    # send follow notification:
                    notification_obj = Notification.objects.create(sender=user, receiver=commentator_obj,subject='Follow Commentator', date=datetime.today().date(), status=False, context=f'{request.user.username} stated following you.')

                    serializer = FollowCommentatorSerializer(follow_commentator_obj)
                    data = serializer.data
                    return Response(data=data, status=status.HTTP_200_OK)
                else:
                    return Response(
                        create_response(
                            status.HTTP_400_BAD_REQUEST,
                            "You already follow that commentator."
                        ),
                        status=status.HTTP_400_BAD_REQUEST
                    )
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
            # user = request.user
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

                lavel_rule = CommentatorLevelRule.objects.get(commentator_level=user.commentator_level)
                if user.commentator_level == 'apprentice':
                    if comments_today_count >= lavel_rule.daily_match_limit:
                        return Response({"error": "Daily limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                    if comments_this_month_count >= lavel_rule.monthly_min_limit:
                        return Response({"error": "Monthly limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                    
                if user.commentator_level == 'journeyman':
                    if comments_today_count >= lavel_rule.daily_match_limit:
                        return Response({"error": "Daily limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                    if comments_this_month_count >= lavel_rule.monthly_min_limit:
                        return Response({"error": "Monthly limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                
                if user.commentator_level == 'master':
                    if comments_today_count >= lavel_rule.daily_match_limit:
                        return Response({"error": "Daily limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                    if comments_this_month_count >= lavel_rule.monthly_min_limit:
                        return Response({"error": "Monthly limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                    
                if user.commentator_level == 'grandmaster':
                    if comments_today_count >= lavel_rule.daily_match_limit:
                        return Response({"error": "Daily limit reached for post new comment."}, status=status.HTTP_404_NOT_FOUND)
                    if comments_this_month_count >= lavel_rule.monthly_min_limit:
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
                    commentator_user=user,
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
                subscription_obj = Subscription.objects.filter(commentator_user=user)
                for obj in subscription_obj:
                    # user = obj.standard_user
                    notification_obj = Notification.objects.create(
                            sender = user,
                            receiver=obj.standard_user,
                            subject='New Comment',
                            date=datetime.today().date(),  
                            status=False,
                            context=f'{request.user.username} uploaded a new Comment.'
                            )

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
        user = request.user
        if user.user_role == 'standard':
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
            notification_obj = Notification.objects.create(sender=user,receiver=commentator, subject='Subscription Purchase', date=datetime.today().date(), status=False, context=f'{request.user.username} Subscribe you.')

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
        user = request.user
        try:
            if request.data:
                notification_obj = Notification.objects.get(receiver=user, id=request.data.get("id"))
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

        user = request.user
        # user = User.objects.get(id=2)
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
                print("******* ", request.data.get("id"))
                comment = User.objects.get(id=request.data.get("id"))
                user = User.objects.get(id=13)
                # user = request.user

                if not FavEditors.objects.filter(commentator_user=comment, standard_user=user).exists():
                    editor_obj = FavEditors.objects.create(commentator_user=comment, standard_user=user)
                    serializer = FavEditorsSerializer(editor_obj)
                    data = serializer.data
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(
                        create_response(
                            status.HTTP_400_BAD_REQUEST,
                            "In your favorite editor, this editor is already present."
                        ),
                        status=status.HTTP_400_BAD_REQUEST
                    )
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
        # user = User.objects.get(id=8)
        user = request.user
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
        data_list = {}
        try:
            filters = {}
            if request.data:
                if 'lavel' in request.data and request.data.get('lavel') != None:
                    filters['commentator_level'] = request.data.get('lavel').lower()

                if 'category' in request.data and request.data.get('category') != None:
                    filters['category__contains'] = request.data.get('category')

                if 'sucess_rate' in request.data and request.data.get('sucess_rate') != None:
                    filters['sucess_rate'] = request.data.get('sucess_rate')

                if 'score_point' in request.data and request.data.get('score_point') != None:
                    filters['score_point'] = request.data.get('score_point')

                if 'city' in request.data and request.data.get('city') != None:
                    filters['city'] = request.data.get('city')

                if 'age' in request.data and request.data.get('age') != None:
                    filters['age'] = request.data.get('age')

                if 'gender' in request.data and request.data.get('gender') != None:
                    filters['gender'] = request.data.get('gender')

                filters['user_role'] = 'commentator'

                query_filters = Q(**filters)
                filtered_comments = User.objects.filter(query_filters)
                data = []
                for obj in filtered_comments:
                    details = {}
                    count = Subscription.objects.filter(commentator_user=obj).count()
                    print("-------", count, "---------", obj.name)
                    serializer = UserSerializer(obj)
                    details['user'] = serializer.data
                    details['subscriber_count'] = count
                    data.append(details)

                # data_list['']

                # serializer = UserSerializer(filtered_comments, many=True)
                # data = serializer.data
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
                    details = {}
                    subscription_obj = Subscription.objects.filter(query_filters)
                    serializer = SubscriptionSerializer(subscription_obj, many=True)
                    details['subscription'] = serializer.data

                    highlight_obj = Highlight.objects.filter(query_filters)
                    serializer1 = HighlightSerializer(highlight_obj, many=True)
                    details['highlight'] = serializer1.data

                    data_list.append(details)

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

            support_history = TicketSupport.objects.all()
            serializer11 = TicketSupportSerializer(support_history, many=True)
            all_data['support_history'] = serializer11.data

            sub_users = User.objects.filter(user_role='sub_user')
            serializer12 = UserSerializer(sub_users, many=True)
            all_data['sub_users'] = serializer12.data

            return Response(data=all_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, format=None, *args, **kwargs):
        try:
            ticket_id = request.data.get('ticket_id')
            message = request.data.get('message')

            if not ticket_id:
                return Response({'error': 'Ticket-id not found.'}, status=status.HTTP_400_BAD_REQUEST)

            if not message:
                return Response({'error': 'Message not found.'}, status=status.HTTP_400_BAD_REQUEST)

            ticket_support = None
            try:
                ticket_support = TicketSupport.objects.get(pk=ticket_id)
            except TicketSupport.DoesNotExist:
                return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)

            res_obj = ResponseTicket.objects.create(ticket=ticket_support, response=message)
            serializer = ResponseTicketSerializer(res_obj)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class NotificationManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        try:
            data = {}

            # Count the number of notifications with status=False
            viewed = Notification.objects.filter(status=False).count()
            data['viewed'] = viewed

            # Count the number of notifications with status=True
            pending = Notification.objects.filter(status=True).count()
            data['pending'] = pending

            # Retrieve all notification objects
            notification_obj = Notification.objects.all()

            # Serialize the notification objects
            serializer = NotificationSerializer(notification_obj, many=True)

            # Add data to the response
            data['notification_count'] = notification_obj.count()
            data['notification'] = serializer.data

            # Return the response
            return Response(data=data, status=status.HTTP_200_OK)

        except Exception as e:
            # Handle any exceptions that might occur
            error_data = {'error': str(e)}
            return Response(data=error_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, format=None, *args, **kwargs):
        try:
            subject = request.data.get('subject')
            user_type = request.data.get('user_type')
            to = request.data.get('to')  # need receiver user id
            sending_type = request.data.get('sending_type')
            date = request.data.get('date')
            message = request.data.get('message')

            if not subject:
                return Response({'error': 'Subject not found.'}, status=status.HTTP_400_BAD_REQUEST)
            if not to:
                return Response({'error': 'Receiver User not found.'}, status=status.HTTP_400_BAD_REQUEST)
            if not date:
                return Response({'error': 'Date not found.'}, status=status.HTTP_400_BAD_REQUEST)
            if not message:
                return Response({'error': 'Message not found.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                user = User.objects.get(id=to)
            except User.DoesNotExist:
                return Response({'error': 'Receiver User does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

            """sender and receiver baki.."""
            notification_obj = Notification.objects.create(user=user, subject=subject, status=False, date=date, context=message)
            serializer = NotificationSerializer(notification_obj)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SubUserManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}

        try:
            subuser_count = User.objects.filter(user_role='sub_user')
            data_list['subuser_count'] = subuser_count.count()
            serializer = UserSerializer(subuser_count, many=True)
            data_list['subuser_list'] = serializer.data
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            """
            Transactions count logic here.
            """
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            notification_count = Notification.objects.all().count()
            data_list['notification_count'] = notification_count
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            all_notification = Notification.objects.all().order_by('-created')
            serializer1 = NotificationSerializer(all_notification, many=True)
            data_list['user_timeline'] = serializer1.data
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=data_list, status=status.HTTP_200_OK)

    def post(self, request, format=None, *args, **kwargs):
        try:
            if request.data:
                role = 'sub_user'
                
                required_fields = ['file', 'name', 'phone', 'password', 'authorization_type', 'department', 'permission']
                for field in required_fields:
                    if field not in request.data:
                        return Response({'error': f'{field.replace("_", " ").title()} not found'}, status=status.HTTP_400_BAD_REQUEST)
                
                password = request.data.get('password')

                permission_type = request.data.get('permission')
                if permission_type == 'transaction':
                    transaction = True
                    all_permission = request.data.get('all_permission')
                    
                    if all_permission and all_permission.lower() == 'true':
                        process_withdrawal = True
                        rule_update = True
                        price_update = True
                        withdrawal_export = True
                        sales_export = True
                    else:
                        process_withdrawal = request.data.get('process_withdrawal')
                        rule_update = request.data.get('rule_update')
                        price_update = request.data.get('price_update')
                        withdrawal_export = request.data.get('withdrawal_export')
                        sales_export = request.data.get('sales_export')
                        all_permission = False

                    sub_user_obj = User.objects.create(profile_pic=request.data.get('file'),user_role=role, name=request.data.get('name'), phone=request.data.get('phone'),
                                                       password=password, authorization_type=request.data.get('authorization_type'),
                                                       department=request.data.get('department'), is_transaction=transaction, is_process_withdrawal_request=process_withdrawal,
                                                       is_rule_update=rule_update, is_price_update=price_update, is_withdrawal_export=withdrawal_export,
                                                       is_sales_export=sales_export, is_all_permission=all_permission)

                elif permission_type == 'only_view':
                    view_only = True
                    process_withdrawal = False
                    rule_update = False
                    price_update = False
                    withdrawal_export = False
                    sales_export = False
                    all_permission = False
                    sub_user_obj = User.objects.create(profile_pic=request.data.get('file'),user_role=role, name=request.data.get('name'), phone=request.data.get('phone'),
                                                       password=password, authorization_type=request.data.get('authorization_type'),
                                                       department=request.data.get('department'), is_view_only=view_only, is_process_withdrawal_request=process_withdrawal,
                                                       is_rule_update=rule_update, is_price_update=price_update, is_withdrawal_export=withdrawal_export,
                                                       is_sales_export=sales_export, is_all_permission=all_permission)

                sub_user_obj.set_password(password)
                sub_user_obj.save()
                serializer = UserSerializer(sub_user_obj)
                return Response(data=serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def patch(self, request, pk, format=None, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        data = request.data.copy()
        if data.get('is_view_only'):
            data['is_process_withdrawal_request'] = False
            data['is_rule_update'] = False
            data['is_price_update'] = False
            data['is_withdrawal_export'] = False
            data['is_sales_export'] = False
            data['is_all_permission'] = False

        if data.get('is_all_permission'):
            data['is_process_withdrawal_request'] = True
            data['is_rule_update'] = True
            data['is_price_update'] = True
            data['is_withdrawal_export'] = True
            data['is_sales_export'] = True
            data['is_all_permission'] = True

        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class AdvertisementManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}

        try:
            ads_count = Advertisement.objects.all()
            data_list['ads_count'] = ads_count.count()
            serializer = AdvertisementSerializer(ads_count, many=True)
            data_list['ads'] = serializer.data
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            active = Advertisement.objects.filter(status='active').count()
            data_list['active'] = active
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            pending = Advertisement.objects.filter(status='pending').count()
            data_list['pending'] = pending
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            end = Advertisement.objects.filter(status='end').count()
            data_list['end'] = end
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            banners = Advertisement.objects.filter(ads_space='Banners').count()
            data_list['Banners'] = banners
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            popups = Advertisement.objects.filter(ads_space='Pop ups').count()
            data_list['pop_ups'] = popups
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=data_list, status=status.HTTP_200_OK)
    
    def post(self, request, format=None, *args, **kwargs):
        try:
            if request.data:
                required_fields = ['file', 'ads_space', 'start_date', 'end_date', 'company_name', 'link', 'ads_budget']
                for field in required_fields:
                    if field not in request.data:
                        return Response({'error': f'{field.replace("_", " ").title()} not found'}, status=status.HTTP_400_BAD_REQUEST)
                # if request.data.get('start_date') == str(datetime.today().date()):
                #     status_string='active'
                #     ads_obj = Advertisement.objects.create(picture=request.data.get('file'), ads_space=request.data.get('ads_space'),
                #                                     start_date=request.data.get('start_date'), end_date=request.data.get('end_date'),
                #                                     company_name=request.data.get('company_name'), link=request.data.get('link'),
                #                                     ads_budget = request.data.get('ads_budget'), status=status_string)
                # else:
                ads_obj = Advertisement.objects.create(picture=request.data.get('file'), ads_space=request.data.get('ads_space'),
                                                start_date=request.data.get('start_date'), end_date=request.data.get('end_date'),
                                                company_name=request.data.get('company_name'), link=request.data.get('link'),
                                                ads_budget = request.data.get('ads_budget'))
                
                serializer = AdvertisementSerializer(ads_obj)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, pk, format=None, *args, **kwargs):
        try:
            user = Advertisement.objects.get(pk=pk)
        except Advertisement.DoesNotExist:
            return Response({"error": "Advertisement not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = AdvertisementSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class LevelRule(APIView):
    def get(self, request, format=None, *args, **kwargs):
        try:
            level = request.query_params.get('commentator_level')
            
            if not level:
                return Response(data={'error': 'commentator_level parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)
            
            level_obj = CommentatorLevelRule.objects.filter(commentator_level=level)
            
            if not level_obj.exists():
                return Response(data={'error': 'No rule found for the given level'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = CommentatorLevelRuleSerializer(level_obj, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, format=None, *args, **kwargs):
        commentator_level = request.data.get('commentator_level')
        existing_record = CommentatorLevelRule.objects.filter(commentator_level=commentator_level).first()

        if existing_record:
            serializer = CommentatorLevelRuleSerializer(existing_record, data=request.data,  partial=True)
        else:
            serializer = CommentatorLevelRuleSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MembershipSettingView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        try:
            level = request.query_params.get('commentator_level')
            
            if not level:
                return Response(data={'error': 'commentator_level parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)
            
            level_obj = MembershipSetting.objects.filter(commentator_level=level)
            
            if not level_obj.exists():
                return Response(data={'error': 'No rule found for the given level'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = MembershipSettingSerializer(level_obj, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, format=None, *args, **kwargs):
        commentator_level = request.data.get('commentator_level')
        existing_record = MembershipSetting.objects.filter(commentator_level=commentator_level).first()

        if existing_record:
            serializer = MembershipSettingSerializer(existing_record, data=request.data, partial=True)
        else:
            serializer = MembershipSettingSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class SubscriptionSettingView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        try:
            level = request.query_params.get('commentator_level')
            
            if not level:
                return Response(data={'error': 'commentator_level parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)
            
            level_obj = SubscriptionSetting.objects.filter(commentator_level=level)
            
            if not level_obj.exists():
                return Response(data={'error': 'No rule found for the given level'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = SubscriptionSettingSerializer(level_obj, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, format=None, *args, **kwargs):
        commentator_level = request.data.get('commentator_level')
        existing_record = SubscriptionSetting.objects.filter(commentator_level=commentator_level).first()

        if existing_record:
            serializer = SubscriptionSettingSerializer(existing_record, data=request.data, partial=True)
        else:
            serializer = SubscriptionSettingSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class HighlightSettingView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        try:
            level = request.query_params.get('commentator_level')
            
            if not level:
                return Response(data={'error': 'commentator_level parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)
            
            level_obj = HighlightSetting.objects.filter(commentator_level=level)
            
            if not level_obj.exists():
                return Response(data={'error': 'No rule found for the given level'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = HighlightSettingSerializer(level_obj, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, format=None, *args, **kwargs):
        commentator_level = request.data.get('commentator_level')
        existing_record = HighlightSetting.objects.filter(commentator_level=commentator_level).first()

        if existing_record:
            serializer = HighlightSettingSerializer(existing_record, data=request.data, partial=True)
        else:
            serializer = HighlightSettingSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CommentSetting(APIView):
    def post(self, request, format=None, *args, **kwargs):
        data = request.data.copy() 
        data['status'] = 'approve'  # Set the status to 'approve'

        comment_serializer = CommentsSerializer(data=data)
        if comment_serializer.is_valid():
            comment = comment_serializer.save()

            # Extract favorite and clap counts from request data
            favorite_count = data.get('favorite', 0)
            clap_count = data.get('clap', 0)
            like_count = data.get('like', 0)

            # Create CommentReaction instance with associated comment
            comment_reaction_data = {
                'comment': comment.id,
                'favorite': favorite_count,
                'clap': clap_count,
                'like':like_count,
            }
            
            comment_reaction_serializer = CommentReactionSerializer(data=comment_reaction_data)
            if comment_reaction_serializer.is_valid():
                comment_reaction_serializer.save()

                response_data = {
                    'comment': comment_serializer.data,
                    'comment_reaction': comment_reaction_serializer.data,
                }

            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
totp = pyotp.TOTP('base32secret3232', interval=45)
class OtpSend(APIView):
    def post(self, request, format=None, *args, **kwargs):
        try:
            user = request.user
            password = request.data.get('password')

            if user.check_password(password):
                otp = totp.now()
                res = sms_send(user.phone, otp)
                if res == 'Success':
                    return Response(data={'success': 'Otp successfully sent.'}, status=status.HTTP_200_OK)
                else:
                    return Response(data={'error': 'Otp not sent. Try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response(data={'error': 'Wrong password. Try again.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OtpVerify(APIView):
    def post(self, request, format=None, *args, **kwargs):
        try:
            otp = request.data.get('otp')
            verification_result = totp.verify(otp)

            if verification_result:
                return Response(data={'success': 'Otp successfully verified.'}, status=status.HTTP_200_OK)
            else:
                return Response(data={'error': 'The OTP verification failed.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)