from django.shortcuts import render
from core.utils import create_response, sms_send
from datetime import datetime, timedelta
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.db.models.functions import TruncDate
from django.db.models import Count
from django.db.models import Q
from django.db.models import Sum
from django.db.models import Case, When, IntegerField
from core.models import COMMENTATOR_ROLE_CHOISE
import math, random
import pyotp
import requests
from datetime import datetime
import json
from django.db import IntegrityError
from django.http import HttpResponseServerError

# From rest_framework 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, ParseError, APIException

from collections import Counter

# Models
from core.models import (User, FollowCommentator, Comments, Subscription, Notification, CommentReaction,
                          FavEditors, TicketSupport, ResponseTicket, Highlight, Advertisement, CommentatorLevelRule,
                          MembershipSetting, SubscriptionSetting, HighlightSetting, BecomeCommentator, BlueTick, DataCount,
                          TicketHistory, BecomeEditor, BecomeEditorEarnDetails)

# Serializers
from core.serializers import (UserSerializer, FollowCommentatorSerializer, CommentsSerializer,
                             SubscriptionSerializer, NotificationSerializer, CommentReactionSerializer, FavEditorsSerializer, 
                             TicketSupportSerializer, ResponseTicketSerializer, HighlightSerializer, AdvertisementSerializer,HighlightSettingSerializer,MembershipSettingSerializer,
                             SubscriptionSettingSerializer, CommentatorLevelRuleSerializer, BecomeCommentatorSerializer, BlueTickSerializer,
                             TicketHistorySerializer, BecomeEditorSerializer, BecomeEditorEarnDetailsSerializer, UpdateUserRoleSerializer)
import pyotp
from django.contrib.auth import authenticate

from translate import Translator

class SignupUserExistsView(APIView):
    def post(self, request, format=None):
        try:
            if User.objects.filter(Q(username__iexact=request.data['username']) | Q(phone=request.data['phone']), is_admin=False).exists():
                return Response({'data': 'User with the same username or phone number already exists', 'status': status.HTTP_400_BAD_REQUEST})
            else:
                return Response({'data': 'User can create', 'status': status.HTTP_200_OK})           
        except Exception as e:
            return Response(data=e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class SignupView(APIView):
#     def post(self, request, format=None):
#         # print('request.data: ', request.data)
#         serializer = UserSerializer(data=request.data)
#         if not serializer.is_valid():
#             # print(serializer.errors)
#             return Response({
#                 'message': 'Error',
#                 'data' : serializer.errors,
#                'status' : status.HTTP_400_BAD_REQUEST
#                 })
#         else:
#             if User.objects.filter(phone=request.data['phone'],is_admin=False).exists():
#                 return Response({'data' : 'User with the same phone number already exists', 'status' : status.HTTP_400_BAD_REQUEST})
#             elif User.objects.filter(username=request.data['username'], is_admin=False).exists():
#                 return Response({'data': 'User with the same username already exists', 'status': status.HTTP_400_BAD_REQUEST})
#             else:
#                 phone = request.data['phone']
#                 # data = serializer.save()
#                 otp = totp.now()
#                 print('otp: ', otp)
#                 res = sms_send(phone, otp)  
#                 # res = "Success"
#                 print('res: ', res)
#                 if res == 'Success':
#                     return Response(data={'success': 'Otp successfully sent.', 'otp' : otp ,'status' : status.HTTP_200_OK})
#                 else:
#                     return Response(data={'error': 'Otp not sent. Try again.', 'status' : status.HTTP_500_INTERNAL_SERVER_ERROR})
#                 # user_serializer = UserSerializer(data)
#                 # serialized_user = user_serializer.data
#                 # return Response({'data' : 'User Added', 'user' : serialized_user, 'userId' : '', 'status' : status.HTTP_200_OK})
#             # serializer.save()
#             # if DataCount.objects.filter(id=1).exists():
#             #     obj = DataCount.objects.get(id=1)
#             #     obj.user += 1
#             #     obj.save()
#             # else:
#             #     obj = DataCount.objects.create(user=1)
#             # if User.objects.filter(phone=request.data['phone']).exists():
#             #     return Response({'data' : 'User already Exists', 'status' : status.HTTP_400_BAD_REQUEST})
#             # else:
#             #     serializer.save()
#             # # serializer.save()
#             # if DataCount.objects.filter(id=1).exists():
#             #     obj = DataCount.objects.get(id=1)
#             #     obj.user += 1
#             #     obj.save()
#             # else:
#             #     obj = DataCount.objects.create(user=1)
#             # return Response(data={'success': 'Registration done', 'status' : status.HTTP_200_OK})

class SignupView(APIView):
    def post(self, request, format=None):
        phone = request.data['phone']
        otp = totp.now()
        print("--------", otp)
        res = sms_send(phone, otp)  
        if res == 'Success':
            return Response(data={'success': 'Otp successfully sent.', 'otp' : otp ,'status' : status.HTTP_200_OK})
        else:
            return Response(data={'error': 'Otp not sent. Try again.', 'status' : status.HTTP_500_INTERNAL_SERVER_ERROR})


class OtpVerify(APIView):
    def post(self, request, format=None, *args, **kwargs):
        try:
            otp = request.data.get('otp')
            if 'phone' and 'signup' in request.data:
                verification_result = totp.verify(otp)
                if verification_result:
                    serializer = UserSerializer(data=request.data)
                    if serializer.is_valid():
                        data = serializer.save()
                        return Response({'success': 'Otp successfully verified.', 'user' : serializer.data ,'status': status.HTTP_200_OK} )
                    else:
                        return Response({'error': 'Error', 'data' : serializer.errors ,'status': status.HTTP_200_OK} )           
                else:
                    return Response({'error': "The OTP verification failed.",'status': status.HTTP_400_BAD_REQUEST})
                    
            verification_result = totp.verify(otp)
            if verification_result:
                return Response({'success': 'Otp successfully verified.', 'status': status.HTTP_200_OK} )
            else:
                return Response({'error': "The OTP verification failed.",'status': status.HTTP_400_BAD_REQUEST})
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OtpReSend(APIView):
    def post(self, request, format=None, *args, **kwargs):
        phone = request.data['phone']
        try:
            if 'is_admin' in request.data:
                user = User.objects.get(phone=phone,is_admin=True)
            elif 'signup' in request.data:
                otp = totp.now()
                res = sms_send(phone, otp)  
                if res == 'Success':
                    return Response(data={'success': 'Otp successfully sent.', 'otp' : otp ,'status' : status.HTTP_200_OK})
                else:
                    return Response(data={'error': 'Otp not sent. Try again.', 'status' : status.HTTP_500_INTERNAL_SERVER_ERROR})
            else:
                user = User.objects.get(phone=phone,is_admin=False)
            otp = totp.now()
            print('otp: ', otp)
            res = sms_send(phone, otp)  
            if res == 'Success':
                return Response(data={'success': 'Otp successfully sent.', 'otp' : otp ,'status' : status.HTTP_200_OK})
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
            if 'is_admin' in request.data:
                user_phone = User.objects.get(phone=phone,is_admin=True)
            else:
                user_phone = User.objects.get(phone=phone)
                
            if user_phone.password == password:
                return Response({'data' : "Login successfull!", 'userRole' : user_phone.user_role, 'userId' : user_phone.id, 'username' : user_phone.username, 'status' : status.HTTP_200_OK})
            else:
                return Response({'data' : 'Please enter your correct password.', 'status' : status.HTTP_400_BAD_REQUEST})
        except User.DoesNotExist:
            return Response({
                'data':"User Doesn't exists!",
                'status' : status.HTTP_404_NOT_FOUND
            })

class GoogleLoginview(APIView):
    def post(self, request, format=None):
        email = request.data.get('email')
        print('email: ', email)
        try: 
            user = User.objects.get(Q(email=email) & Q(logged_in_using='google'))
            print("Email already exists")
        except User.DoesNotExist:
            user = User.objects.create(
                email=email,
                name=request.data.get('name'),
                username=request.data.get('username'),
                logged_in_using='google',
            )
        return Response({
            'data' : "Login successfull!", 
            'userRole' : user.user_role, 
            'userId' : user.id, 
            'status' : status.HTTP_200_OK
            }) 
        
class FacebookLoginview(APIView):
    def post(self, request, format=None):
        # print(request.data, "=============================================request.data")
        email = request.data.get('email')
        # print('email: ', email)
        try: 
            user = User.objects.get(Q(email=email) & Q(logged_in_using='facebook'))
            # print("Email already exists")
        except User.DoesNotExist:
            # print(request.data, "=============================================request.data")
            user = User.objects.create(
                email=email,
                name=request.data.get('name'),
                username=request.data.get('username'),
                logged_in_using='facebook',
            )
        return Response({
            'data' : "Login successfull!", 
            'userRole' : user.user_role, 
            'userId' : user.id, 
            'status' : status.HTTP_200_OK
            }) 


class PasswordResetView(APIView):
    def post(self, request, format=None):   
        phone = request.data['phone']
        new_ps = request.data['new_ps']
        user = User.objects.get(phone=phone, is_delete=False)
        user.password = new_ps
        user.save()
        return Response({"data" : "Password reset successfully!", "status" : status.HTTP_200_OK})


class RetrieveCommentatorView(APIView): 
    """
    for Home page:
    """
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}
        unique_comment_ids = set()
        
        # retrieve commentator list:
        try:
            user_detail = []
            all_commentator = User.objects.filter(user_role='commentator').order_by('-created').only('id')
            for obj in all_commentator:
                detail = {}
                count = Subscription.objects.filter(commentator_user_id=obj.id).count()
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
            all_comments = Comments.objects.filter(status='approve', public_content=True).order_by('-created').only('id')
            data_list['Public_Comments'] = []

            for comment in all_comments:
                comment_data = CommentsSerializer(comment).data
                date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")
        
                # Format the datetime object as desired (DD.MM.YYYY)
                formatted_date = date_obj.strftime("%d.%m.%Y")

                comment_data['date'] = formatted_date 

                # Fetch comment reactions and calculate the total count of reactions
                comment_reactions = CommentReaction.objects.filter(comment=comment).values('like', 'favorite', 'clap')
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
            if request.query_params.get('id') != 'null':
                user = User.objects.get(id=request.query_params.get('id'))

                # for retrieving subscription comments:
                data_list['Subscription_Comments'] = []
                # s = User.objects.get(id=6)
                # subscription_obj = Subscription.objects.filter(standard_user=s, end_date__gte=datetime.now(), status='approve')
                # if Subscription.objects.filter(standard_user=user, end_date__gte=datetime.now(), status='approve').exists():
                subscription_obj = Subscription.objects.filter(standard_user=user, end_date__gte=datetime.now(), status='active').order_by('-created').only('id','commentator_user')


                for obj in subscription_obj:
                    if Comments.objects.filter(commentator_user=obj.commentator_user, status='approve').exists():
                        subscription_comment = Comments.objects.filter(commentator_user=obj.commentator_user, status='approve').order_by('-created')

                        for comment in subscription_comment:
                            comment_data = CommentsSerializer(comment).data
                            date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")
        
                            # Format the datetime object as desired (DD.MM.YYYY)
                            formatted_date = date_obj.strftime("%d.%m.%Y")

                            comment_data['date'] = formatted_date 

                            comment_reactions = CommentReaction.objects.filter(comment=comment).values('like', 'favorite', 'clap')
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
            else:
                data_list['Subscription_Comments'] = []
        except ObjectDoesNotExist:
            data_list['Subscription_Comments'] = []

        try:
            # for retrieving Highlights:
            standard_user_id = request.query_params.get('id') if request.query_params.get('id') != 'null' else None
            all_highlights = Highlight.objects.filter(status='active').order_by('-created').only('id')
            data_list['highlights'] = []
            for obj in all_highlights:
                highlighted_data = HighlightSerializer(obj).data
                user_data = highlighted_data['user']       
                count = Subscription.objects.filter(commentator_user=user_data['id']).count()
                if standard_user_id:
                    highlighted_data['is_fav_editor'] = FavEditors.objects.filter(commentator_user_id=user_data['id'], standard_user_id=standard_user_id).exists()
                else:
                    highlighted_data['is_fav_editor'] = False

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

        try:
            if request.query_params.get('id') != 'null':
                following_user = []
                if FollowCommentator.objects.filter(standard_user__id=request.query_params.get('id')).exists():
                    following = FollowCommentator.objects.filter(standard_user__id=request.query_params.get('id')).only('id', 'commentator_user')
                    for obj in following:
                        serializer = UserSerializer(obj.commentator_user).data
                        following_user.append(serializer)
                    data_list['following_user'] = following_user
        except:
            data_list['following_user'] = []

        try:
            data_list['verify_ids'] = list(BlueTick.objects.values_list('user_id', flat=True))
        except:
            data_list['verify_ids'] = []

        try:
            if request.query_params.get('id') != 'null':
                cmt = []
                if CommentReaction.objects.filter(user__id = request.query_params.get('id')).exists():
                    cmt_reacts = CommentReaction.objects.filter(user__id = request.query_params.get('id')).only('comment', 'like', 'favorite', 'clap')
                    for obj in cmt_reacts:
                        details = {
                            "comment_id":obj.comment.id,
                            "like":obj.like,
                            "favorite":obj.favorite,
                            "clap":obj.clap,
                        }
                        cmt.append(details)
                    data_list['comment_reactions'] = cmt
        except:
            data_list['comment_reactions'] = []
        return Response(data=data_list, status=status.HTTP_200_OK)
    
class FollowCommentatorView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, id, format=None, *args, **kwargs):
        user = User.objects.get(id=id)
        # user = request.user
        try:
            commentator_id = request.query_params.get('id')
            if commentator_id:
                commentator_obj = User.objects.get(id=commentator_id)
                # follow_commentator_obj, created = FollowCommentator.objects.get_or_create(
                #     commentator_user=commentator_obj, standard_user=user
                # )
                # if created:
                #     # send follow notification:
                #     notification_obj = Notification.objects.create(sender=user, receiver=commentator_obj,date=datetime.today().date(), status=False, context=f'{user.username} started following you.')
                #     serializer = FollowCommentatorSerializer(follow_commentator_obj)
                #     data = serializer.data
                #     return Response(data=data, status=status.HTTP_200_OK)
                # else:
                #     follow_commentator_obj.delete()
                #     return Response(data={"message":f"You unfollowed the {commentator_obj}."}, status=status.HTTP_200_OK)
                if FollowCommentator.objects.filter(commentator_user=commentator_obj, standard_user=user).exists():
                    follow_commentator_obj = FollowCommentator.objects.filter(commentator_user=commentator_obj, standard_user=user)
                    for obj in follow_commentator_obj:
                        follow_commentator_obj.delete()
                    return Response(data={"message":f"You unfollowed the {commentator_obj}."}, status=status.HTTP_200_OK)
                else:
                    follow_commentator_obj = FollowCommentator.objects.create(commentator_user=commentator_obj, standard_user=user)
                    # send follow notification:
                    notification_obj = Notification.objects.create(sender=user, receiver=commentator_obj,date=datetime.today().date(), status=False, context=f'{user.username} started following you.')
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


    def post(self, request, id, format=None, *args, **kwargs):
        try:
            # user = request.user
            user = User.objects.get(id=id)
            # print('user: ', user)
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

                # print("-----------")
                category = request.data.get('category')
                # if category == 'Futbol':
                #     category = 'Football'
                # elif category == 'Basketbol':
                #     category = 'Basketball'
                # category = request.data['category']
                # print('category: ', category)
                country = request.data.get('country')
                league = request.data.get('league')
                date = request.data.get('date')
                match_detail = request.data.get('match_detail')
                prediction_type = request.data.get('prediction_type')
                prediction = request.data.get('prediction')
                # print('prediction: ', prediction)
                if user.commentator_level == 'apprentice':
                    public_content = True
                else:
                    public_content = request.data.get('public_content')
                    print('public_content: ', public_content)
                comment = request.data.get('comment')
                # print('comment: ', comment)

                if not category and category=='Select':
                    raise NotFound("Category not found.")
                if not country and country=='Select':
                    raise NotFound("Country not found.")
                if not league and league=='Select':
                    raise NotFound("League not found.")
                if not date and date=='Select':
                    raise NotFound("Date not found.")
                if not match_detail and match_detail=='Select':
                    raise NotFound("Match detail not found.")
                if not prediction_type and prediction_type=='Select':
                    raise NotFound("Prediction Type not found.")
                if not prediction and prediction=='Select':
                    raise NotFound("Prediction not found.")
                # if not public_content:
                #     raise NotFound("Public Content not found.")
                if not comment:
                    raise NotFound("Comment not found.")
                comment_obj = Comments.objects.create(
                    commentator_user=user,
                    category=[category],
                    country=country,
                    league=league,
                    date=date,
                    match_detail=match_detail,
                    prediction_type=prediction_type,
                    prediction=prediction,
                    public_content=public_content,
                    comment=comment
                )

                if comment_obj != None:
                    if DataCount.objects.filter(id=1).exists():
                        obj = DataCount.objects.get(id=1)
                        obj.comment += 1
                        obj.save()
                    else:
                        obj = DataCount.objects.create(comment=1)
                # send new Comment notification:
                subscription_obj = Subscription.objects.filter(commentator_user=user)
                for obj in subscription_obj:
                    # user = obj.standard_user
                    notification_obj = Notification.objects.create(sender=user,receiver=obj.standard_user,date=datetime.today().date(), status=False, context=f'{user.username} upload a new Comment.')

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
            if Subscription_obj != None:
                if DataCount.objects.filter(id=1).exists():
                    obj = DataCount.objects.get(id=1)
                    obj.subscription += 1
                    obj.save()
                else:
                    obj = DataCount.objects.create(subscription=1)

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
    def get(self, request, id, format=None, *args, **kwargs):
        # user = request.user
        user = User.objects.get(id=id)
        try:
            ten_days_ago = timezone.now() - timedelta(days=10)
            notification_obj = Notification.objects.filter(receiver=user, status=False)
            # notification_obj = Notification.objects.filter(receiver=id, status=False, created__gte=ten_days_ago)
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

    def post(self, request, comment_id, id, format=None, *args, **kwargs):
        
        # Comment object validation
        comment = Comments.objects.filter(id=comment_id).exists()
        if not comment:
            return Response({'error': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)

        # User object validation
        is_user_exist = User.objects.filter(id=id).exists()
        if not is_user_exist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Reaction type validation
        reaction_type = request.data.get('reaction_type')  # This will contain 'like', 'favorite', or 'clap'
        if reaction_type not in ('like', 'favorite', 'clap'):
            return Response({'error': 'Invalid reaction type'}, status=status.HTTP_400_BAD_REQUEST)

        comment_reaction = CommentReaction.objects.filter(comment_id=comment_id, user_id=id).first()
        
        # If the user has not reacted before, create a new reaction
        if not comment_reaction:
            reaction_data = {'comment': comment_id, 'user': id}
            reaction_data[reaction_type] = 1

            serializer = CommentReactionSerializer(data=reaction_data)
            if serializer.is_valid():
                serializer.save()
                comment_reactions = CommentReaction.objects.filter(comment_id=comment_id).values('like', 'favorite', 'clap')
                total_reactions = comment_reactions.aggregate(
                    total_likes=Sum('like'),
                    total_favorite=Sum('favorite'),
                    total_clap=Sum('clap')
                )

                data = {'comment_id': comment_id,
                        'total_likes': total_reactions['total_likes'] or 0,
                        'total_favorite': total_reactions['total_favorite'] or 0,
                        'total_clap': total_reactions['total_clap'] or 0,
                        'like': reaction_data.get('like', 0),
                        'favorite': reaction_data.get('favorite', 0),
                        'clap': reaction_data.get('clap', 0),
                        }
                return Response({'message': f'Reaction "{reaction_type}" saved successfully',
                                 'new_total_clap': total_reactions['total_clap'] or 0,
                                 'status': status.HTTP_200_OK, 'data': data})
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if getattr(comment_reaction, reaction_type):
            # User clicked the same button again, remove the reaction
            setattr(comment_reaction, reaction_type, None)
            comment_reaction.save(update_fields=[reaction_type,'updated'])

            if comment_reaction.like is None and comment_reaction.favorite is None and comment_reaction.clap is None:
                comment_reaction.delete()
                comment_reaction = None

            comment_reactions = CommentReaction.objects.filter(comment_id=comment_id).values('like', 'favorite', 'clap')
            total_reactions = comment_reactions.aggregate(
                total_likes=Sum('like'),
                total_favorite=Sum('favorite'),
                total_clap=Sum('clap')
            )

            data = {'comment_id': comment_id,
                    'total_likes': total_reactions['total_likes'] or 0,
                    'total_favorite': total_reactions['total_favorite'] or 0,
                    'total_clap': total_reactions['total_clap'] or 0,
                    'like': 1 if comment_reaction and comment_reaction.like else 0,
                    'favorite': 1 if comment_reaction and comment_reaction.favorite else 0,
                    'clap': 1 if comment_reaction and comment_reaction.clap else 0,
                    }
            return Response({'message': 'Reaction removed successfully',
                             'new_total_clap': total_reactions['total_clap'] or 0,
                             'status': status.HTTP_200_OK, 'data': data})
        else:
            # User clicked a different button, update the reaction
            setattr(comment_reaction, reaction_type, 1)
            comment_reaction.save(update_fields=[reaction_type,'updated'])

            comment_reactions = CommentReaction.objects.filter(comment_id=comment_id).values('like', 'favorite', 'clap')
            total_reactions = comment_reactions.aggregate(
                total_likes=Sum('like'),
                total_favorite=Sum('favorite'),
                total_clap=Sum('clap')
            )

            data = {'comment_id': comment_id,
                    'total_likes': total_reactions['total_likes'] or 0,
                    'total_favorite': total_reactions['total_favorite'] or 0,
                    'total_clap': total_reactions['total_clap'] or 0,
                    'like': 1 if comment_reaction.like else 0,
                    'favorite': 1 if comment_reaction.favorite else 0,
                    'clap': 1 if comment_reaction.clap else 0,
                    }
            return Response({'message': f'Reaction "{reaction_type}" saved successfully',
                             'new_total_clap': total_reactions['total_clap'] or 0,
                             'status': status.HTTP_200_OK, 'data': data})
   

class ProfileView(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
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

            standard_user_id = request.query_params.get('id') if request.query_params.get('id') != 'null' else None
            if standard_user_id:
               data['is_fav_editor'] = FavEditors.objects.filter(commentator_user_id=data['id'], standard_user_id=standard_user_id).exists()
            else:
                data['is_fav_editor'] = False
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
        elif 'file' in request.data:
            profile_pic = request.data['file']
            user.profile_pic = profile_pic

        if 'description' in request.data:
            description = request.data['description']
            user.description = description
        if 'description' not in request.data:
            return Response({'error': 'No description found', 'status' : status.HTTP_400_BAD_REQUEST})
        user.save()

        serializer = UserSerializer(user)
        return Response({ 'data' : serializer.data, 'status' : status.HTTP_200_OK})
        

class FavEditorsCreateView(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        data = []
        try:
            user = get_object_or_404(User, id=id)
            editor = request.query_params.get('commentator')
            print('editor: ', editor)

            commentator = get_object_or_404(User, id=editor)
            faveditor_obj = FavEditors.objects.filter(commentator_user=commentator, standard_user=user).exists()
            details = {
                "is_fav_editor": faveditor_obj
            }
            data.append(details)
            return Response(data=data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        

    def post(self, request, id, format=None, *args, **kwargs):
        try:
            if request.data:
                user = User.objects.get(id=id)
                if 'id' not in request.data:
                    return Response({'error': 'Commentator Id not found.'}, status=status.HTTP_400_BAD_REQUEST)

                commentator_id = request.data.get("id")
                comment = User.objects.get(id=commentator_id)

                response_data = {'user_id': commentator_id}
                if not FavEditors.objects.filter(commentator_user=comment, standard_user=user).exists():
                    editor_obj = FavEditors.objects.create(commentator_user=comment, standard_user=user)
                    # serializer = FavEditorsSerializer(editor_obj)
                    # data = serializer.data
                    response_data['is_fav_editor'] = True
                    response_data['message'] = 'Favorite editor add successfully'
                    return Response(response_data, status=status.HTTP_200_OK)
                else:
                    existing_fav_editor = FavEditors.objects.filter(commentator_user=comment, standard_user=user)
                    
                    if existing_fav_editor.exists():
                        existing_fav_editor.delete()
                        response_data['is_fav_editor'] = False
                        response_data['message'] = 'Favorite editor removed successfully'
                        return Response(response_data, status=status.HTTP_200_OK)
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

        is_user_exist = User.objects.filter(id=id).exists()
        if not is_user_exist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            editor = []
            editor_obj = FavEditors.objects.filter(standard_user_id=id)
            for obj in editor_obj:
                details = {}

                # FavEditor data
                serializer = FavEditorsSerializer(obj)
                data = serializer.data
                details['data'] = data
                
                # Subscribe count
                count = Subscription.objects.filter(commentator_user=obj.commentator_user).count()
                details['subscriber_count'] = count

                editor.append(details)

            data_list['favEditors'] = editor
        except Exception as e:
            return Response(data={'error': 'Error retrieving favorite editors'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            comment_obj = CommentReaction.objects.filter(user_id=id, favorite=1)
            details = []
            for obj in comment_obj:
                comment_data = CommentsSerializer(obj.comment).data
                date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")

                comment_reactions = CommentReaction.objects.filter(comment=obj.comment)
                total_reactions = comment_reactions.aggregate(
                    total_likes=Sum('like'),
                    total_favorite=Sum('favorite'),
                    total_clap=Sum('clap')
                )
                
                comment_data['date'] = date_obj.strftime("%d.%m.%Y") 
                comment_data['total_reactions'] = {
                    'total_likes': total_reactions['total_likes'] or 0,
                    'total_favorite': total_reactions['total_favorite'] or 0,
                    'total_clap': total_reactions['total_clap'] or 0
                }

                details.append(comment_data)

            data_list['favComments'] = details
        except Exception as e:
            return Response(data={'error': 'Error retrieving favorite comments'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=data_list, status=status.HTTP_200_OK)
        

class SupportView(APIView):
    # for retrieve login user all tickets:
    def get(self, request, id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id)

            support_obj = TicketSupport.objects.filter(user=user).order_by('-created')
            serializer = TicketSupportSerializer(support_obj, many=True)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # for create new ticket:
    def post(self, request, id, format=None, *args, **kwargs):
        try:
            # print(request.data)
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
                if support_obj != None:
                    ticket_obj = TicketHistory.objects.create(user=user, ticket_support=support_obj, status='create')
                if support_obj != None:
                    if DataCount.objects.filter(id=1).exists():
                        obj = DataCount.objects.get(id=1)
                        obj.ticket += 1
                        obj.save()
                    else:
                        obj = DataCount.objects.create(ticket=1)
                serializer = TicketSupportSerializer(support_obj)
                data = serializer.data
                return Response(data=data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Request Data not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={'error': 'Error retrieving favorite comments'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class ShowTicketData(APIView):
     def get(self, request, id, ticket_id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response(data={"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            support_obj = TicketSupport.objects.get(id=ticket_id)
        except TicketSupport.DoesNotExist:
            return Response(data={"error": "TicketSupport not found"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            ticket_history = TicketHistory.objects.filter(ticket_support=support_obj, status='comment_by_user').latest('created')
        except TicketHistory.DoesNotExist:
            ticket_history = None
        
        if TicketHistory.objects.filter(ticket_support=support_obj, status='request_for_update').exists():
            history_obj = TicketHistory.objects.filter(ticket_support=support_obj, status='request_for_update').latest('created')
            serializer = TicketSupportSerializer(support_obj).data
            serializer['message'] = history_obj.message
        else:
            serializer = TicketSupportSerializer(support_obj).data
        # serializer['admin_response'] = TicketHistorySerializer(ticket_history).data if ticket_history else None
        serializer['admin_response'] = ResponseTicketSerializer(ticket_history.response_ticket).data if ticket_history else None
        return Response(data=serializer, status=status.HTTP_200_OK)


class ReplyTicketView(APIView):
    def post(self, request, id, ticket_id, format=None, *args, **kwargs):
        try:
            user = get_object_or_404(User, id=id)
            ticket_obj = get_object_or_404(TicketSupport, id=ticket_id)
            
            if 'message' not in request.data:
                return Response({'error': 'Message not found.'}, status=status.HTTP_400_BAD_REQUEST)
            if 'admin_id' not in request.data:
                return Response({'error': 'Admin id not found.'}, status=status.HTTP_400_BAD_REQUEST)
            
            admin_id = request.data.get('admin_id')
            admin_obj = get_object_or_404(User, id=admin_id)
            
            ticket_history = TicketHistory.objects.create(
                user=user,
                ticket_support=ticket_obj,
                status='request_for_update',
                message=request.data.get('message'),
                request_to=admin_obj
            )
            if ticket_history != None:
                ticket_obj.status = 'pending'
                ticket_obj.save()

            serializer = TicketHistorySerializer(ticket_history)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        except TicketSupport.DoesNotExist:
            return Response({'error': 'Ticket support not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class UpdateTicketMessageView(APIView):
    def post(self, request, id, format=None, *args, **kwargs):
        """
        Admin or Sub_user answer the user ticket.
        """
        try:
            if request.data:
                if 'ticket_id' not in request.data:
                    return Response({'error': 'Ticket-id not found.'}, status=status.HTTP_400_BAD_REQUEST)
                if 'message' not in request.data:
                    return Response({'error': 'Message not found.'}, status=status.HTTP_400_BAD_REQUEST)

                # user = request.user
                user = User.objects.get(id=id)

                ticket_id = request.data.get('ticket_id')
                ticket_obj = TicketSupport.objects.get(id=ticket_id)
                message = request.data.get('message')

                result_obj = ResponseTicket.objects.create(user=user, ticket=ticket_obj, response=message)
                serializer = ResponseTicketSerializer(result_obj)
                data = serializer.data

                if result_obj != None:
                    ticket_obj = TicketHistory.objects.create(user=user, ticket_support=ticket_obj, status='comment_by_user',
                                                              response_ticket=result_obj)
                return Response(data=data, status=status.HTTP_200_OK)

        except TicketSupport.DoesNotExist:
            return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ResolvedTicket(APIView):
    def post(self, request, id, format=None, *args, **kwargs):
        try:
            # user = request.user
            user = User.objects.get(id=id)

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
    def get(self, request, id, format=None, *args, **kwargs):
        is_user_exist = User.objects.filter(id=id).exists()
        if not is_user_exist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        data_list = {}

        try:
            details =[]
            all_active_comment = Comments.objects.filter(commentator_user_id=id, is_resolve=False).only('id')
            for obj in all_active_comment:
                comment_data = CommentsSerializer(obj).data
                date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")
                comment_reactions = CommentReaction.objects.filter(comment=obj)
                total_reactions = comment_reactions.aggregate(
                    total_likes=Sum('like'),
                    total_favorite=Sum('favorite'),
                    total_clap=Sum('clap')
                )
                
                comment_data['date'] = date_obj.strftime("%d.%m.%Y") 
                comment_data['total_reactions'] = {
                    'total_likes': total_reactions['total_likes'] or 0,
                    'total_favorite': total_reactions['total_favorite'] or 0,
                    'total_clap': total_reactions['total_clap'] or 0
                }
                details.append(comment_data)
            data_list['active_comments'] = details
        except Comments.DoesNotExist:
            data_list['active_comments'] = []

        try:
            details =[]
            all_resolved_comment = Comments.objects.filter(commentator_user_id=id, is_resolve=True).only('id')
            for obj in all_resolved_comment:
                comment_data = CommentsSerializer(obj).data
                date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")

                comment_reactions = CommentReaction.objects.filter(comment=obj)
                total_reactions = comment_reactions.aggregate(
                    total_likes=Sum('like'),
                    total_favorite=Sum('favorite'),
                    total_clap=Sum('clap')
                )
                
                comment_data['date'] = date_obj.strftime("%d.%m.%Y") 
                comment_data['total_reactions'] = {
                    'total_likes': total_reactions['total_likes'] or 0,
                    'total_favorite': total_reactions['total_favorite'] or 0,
                    'total_clap': total_reactions['total_clap'] or 0
                }
                details.append(comment_data)
            data_list['resolved_comments'] = details
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
            # user.delete()
            user.is_delete = True
            user.save()
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
                if highlight_obj != None:
                    if DataCount.objects.filter(id=1).exists():
                        obj = DataCount.objects.get(id=1)
                        obj.highlight += 1
                        obj.save()
                    else:
                        obj = DataCount.objects.create(highlight=1)
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


class VerifyUserView(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        user = User.objects.get(id=id)
        try:
            subscribers = Subscription.objects.filter(commentator_user=user)

            commentator_membership = BecomeCommentator.objects.get(user=user, status='active')
            start_date = commentator_membership.start_date
            end_date = commentator_membership.end_date

            # Calculate the membership duration
            membership_duration = end_date - start_date
            if membership_duration >= timedelta(days=90):  # At least 3 months
                if subscribers.count() >= 250:
                    obj = BlueTick.objects.create(user=user)
                    serializer = BlueTickSerializer(obj).data
                    return Response(data=serializer, status=status.HTTP_200_OK)
                    # return Response({'message': 'This request has been processed and it has been forwarded to the manager for review.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'There are fewer than 250 subscribers for the user.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': 'User does not have active membership for at least 3 months.'}, status=status.HTTP_200_OK)

        except BecomeCommentator.DoesNotExist:
            return Response({'message': 'User does not have an active membership.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'message': 'An error occurred while processing the request.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AdminMainPage(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}
        previous_24_hours = timezone.now() - timedelta(hours=24)

        try:
            """user percentage"""
            deleted_users_count = User.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, is_delete=True).count()
            users_previous_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, is_delete=False).count()
            users_before_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
            count = (users_before_24_hours - deleted_users_count) + users_previous_24_hours
            user_percentage = ((count-users_before_24_hours)/users_before_24_hours) * 100
            data_list['new_user_percentage'] = user_percentage
            
            """editor percentage"""
            deleted_editor_count = User.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, is_delete=True, user_role='commentator').count()
            editor_previous_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, is_delete=False, user_role='commentator').count()
            editor_before_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours, user_role='commentator').count()
            count = (editor_before_24_hours - deleted_editor_count) + editor_previous_24_hours
            editor_percentage = ((count-editor_before_24_hours)/editor_before_24_hours) * 100
            data_list['new_editor_percentage'] = editor_percentage


            """Subscribers percentage"""
            status_changed_to_pending = Subscription.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, status='pending').count()
            new_subscriptions = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, status='active').count()
            subscriptions_before_24_hours = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
            count = (subscriptions_before_24_hours - status_changed_to_pending) + new_subscriptions
            subscriptions_percentage = ((count-subscriptions_before_24_hours)/subscriptions_before_24_hours) * 100
            data_list['new_subscriptions_percentage'] = subscriptions_percentage

            """Comments percentage"""
            status_changed_to_reject = Comments.objects.annotate(date_updated=TruncDate('updated')).filter(status='reject', date_updated__gte=previous_24_hours).count()
            new_pending_comments = Comments.objects.annotate(date_created=TruncDate('created')).filter(status='pending', date_created__gte=previous_24_hours).count()
            comments_before_24_hours = Comments.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
            count = (comments_before_24_hours - status_changed_to_reject) + new_pending_comments
            comments_percentage = ((count-comments_before_24_hours)/comments_before_24_hours) * 100
            data_list['comments_percentage'] = comments_percentage


            new_user = User.objects.all().count()
            data_list['new_user'] = new_user

            new_editor = User.objects.filter(user_role='commentator').count()
            data_list['new_editor'] = new_editor

            new_subscriber = Subscription.objects.all().count()
            data_list['new_subscriber'] = new_subscriber

            # new_comment = Comments.objects.filter(status='approve').count()
            new_comment = Comments.objects.all().count()
            data_list['new_comment'] = new_comment

            all_user = User.objects.filter(is_delete=False, is_admin=False).order_by('-created')
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
        now = timezone.now()
        previous_24_hours = now - timedelta(hours=24)
        # print("previous_24_hours********", previous_24_hours)


        try:
            """user percentage"""
            deleted_users_count = User.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, is_delete=True).count()
            users_previous_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, is_delete=False).count()
            users_before_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
            count = (users_before_24_hours - deleted_users_count) + users_previous_24_hours
            user_percentage = ((count-users_before_24_hours)/users_before_24_hours) * 100
            data_list['new_user_percentage'] = user_percentage

            
            """editor percentage"""
            deleted_editor_count = User.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, is_delete=True, user_role='commentator').count()
            editor_previous_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, is_delete=False, user_role='commentator').count()
            editor_before_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours, user_role='commentator').count()
            count = (editor_before_24_hours - deleted_editor_count) + editor_previous_24_hours
            editor_percentage = ((count-editor_before_24_hours)/editor_before_24_hours) * 100
            data_list['new_editor_percentage'] = editor_percentage


            """Subscribers percentage"""
            status_changed_to_pending = Subscription.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, status='pending').count()
            new_subscriptions = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, status='active').count()
            subscriptions_before_24_hours = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
            count = (subscriptions_before_24_hours - status_changed_to_pending) + new_subscriptions
            subscriptions_percentage = ((count-subscriptions_before_24_hours)/subscriptions_before_24_hours) * 100
            data_list['new_subscriptions_percentage'] = subscriptions_percentage


            new_user = User.objects.all().count()
            data_list['new_user'] = new_user

            new_editor = User.objects.filter(user_role='commentator').count()
            data_list['new_editor'] = new_editor

            new_subscriber = Subscription.objects.all().count()
            data_list['new_subscriber'] = new_subscriber

            all_user = User.objects.filter(is_delete=False).order_by('-created')
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
            phone = request.data['phone']
            if User.objects.filter(phone=phone).exists():
                return Response({'error': 'User already present with this number.'}, status=status.HTTP_400_BAD_REQUEST)
            profile = request.FILES.get('file')
            date = request.data.get('date')
            name = request.data['name']
            username = request.data['username']
            password = request.data['password']
            gender = request.data['gender']
            age = request.data['age']

            subscription = request.data.get('subscription')
            if subscription == 'True':
                duration = request.data.get('duration')
                role = 'commentator'
                if request.data.get('level').lower() == 'expert':
                    level = 'master'
                else:
                    level = request.data.get('level').lower()

                user_obj = User.objects.create(profile_pic=profile,
                    name=name, username=username, phone=phone,
                    password=password, gender=gender, age=age,
                    user_role=role, commentator_level=level
                    )
                user_obj.save()
            else:
                user_obj = User.objects.create(profile_pic=profile,
                    name=name, username=username, phone=phone,
                    password=password, gender=gender, age=age
                )
                # user_obj.set_password(password)
                user_obj.save()

            if user_obj != None:
                if DataCount.objects.filter(id=1).exists():
                    obj = DataCount.objects.get(id=1)
                    obj.user += 1
                    obj.save()
                else:
                    obj = DataCount.objects.create(user=1)
            serializer = UserSerializer(user_obj)
            data = serializer.data

            if subscription == 'True' and user_obj != None:
                start_date = datetime.now()
                if duration == "1 Month":
                    end_date = start_date + timedelta(days=30)
                if duration == "3 Month":
                    end_date = start_date + timedelta(days=90)
                if duration == "6 Month":
                    end_date = start_date + timedelta(days=180)
                
                editor_obj = BecomeCommentator.objects.create(user=user_obj, duration=duration, status='active', commentator=True, end_date=end_date)
                editor_obj.save()
                if DataCount.objects.filter(id=1).exists():
                    obj = DataCount.objects.get(id=1)
                    obj.editor += 1
                    obj.save()
                else:
                    obj = DataCount.objects.create(editor=1)
                serializer = BecomeCommentatorSerializer(editor_obj)
                data = serializer.data
                return Response(data=data, status=status.HTTP_200_OK)

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

        if User.objects.filter(id=request.data['user_id']).exists():
            user_obj = User.objects.get(id=request.data['user_id'])
            if user_obj.phone != request.data['phone']:
                if User.objects.filter(phone=request.data['phone']).exists():
                    return Response({'error': 'User already present with this number.'}, status=status.HTTP_400_BAD_REQUEST)
                
        if request.data.get('subscription') == 'undefined':
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                try:
                    serializer.save()
                except Exception as e:
                    return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            duration = request.data.get('duration')
            start_date = datetime.now()
            if duration == "1 Month":
                end_date = start_date + timedelta(days=30)
            if duration == "3 Month":
                end_date = start_date + timedelta(days=90)
            if duration == "6 Month":
                end_date = start_date + timedelta(days=180)
            
            editor_obj = BecomeCommentator.objects.create(user=user, duration=duration, status='active', commentator=True, end_date=end_date)
            editor_obj.save()
            if editor_obj != None:
                if DataCount.objects.filter(id=1).exists():
                    obj = DataCount.objects.get(id=1)
                    obj.editor += 1
                    obj.save()
                else:
                    obj = DataCount.objects.create(editor=1)
            serializer = BecomeCommentatorSerializer(editor_obj)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)

            
    def delete(self, request, pk, format=None, *args, **kwargs):
        """
        Deactivate or delete user.
        """
        try:
            user = User.objects.get(pk=pk)
            action = request.query_params.get('action')
            if action == 'delete':
                try:
                    user.delete()
                    return Response("User deleted Successfully", status= status.HTTP_200_OK)
                except Exception as e:
                    return Response({"error": f"Failed to delete user: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
            elif action == 'deactive':
                if user.user_role == "standard":
                    # user.delete()
                    user.is_delete = True
                    user.save()
                    message = {"success": "User profile Deactivate sucessfully."}
                    return Response(data=message, status=status.HTTP_200_OK)
                else:
                    # user.deactivate_commentator = 'pending'
                    user.is_delete = True
                    user.save()
                    message = {"success": "User profile Deactivate sucessfully."}
                    return Response(data=message, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class FilterUserManagement(APIView):
    def post(self, request, format=None, *args, **kwargs):
        data_list = {}
        try:
            filters = {}
            if request.data:
                if 'user_type' in request.data and request.data.get('user_type') != None and request.data.get('user_type') != "Select":
                    filters['user_role'] = request.data.get('user_type').lower()

                if 'city' in request.data and request.data.get('city') != None and request.data.get('city') != "Select":
                    filters['city'] = request.data.get('city')

                if 'gender' in request.data and request.data.get('gender') != None and request.data.get('gender') != "Select":
                    filters['gender'] = request.data.get('gender')

                if 'age' in request.data and request.data.get('age') != None and request.data.get('age') != "Select":
                    filters['age'] = request.data.get('age')

                # print("****", filters)
                query_filters = Q(**filters)
                filtered_user = User.objects.filter(query_filters)
                serializer = UserSerializer(filtered_user, many=True)
                data = serializer.data

                # data_list['']

                # serializer = UserSerializer(filtered_comments, many=True)
                # data = serializer.data
                return Response(data=data, status=status.HTTP_200_OK)
            else:
                return Response(data={'error': 'Request data not found'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CommentsManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        management = {}
        commentator = []
        now = timezone.now()
        previous_24_hours = now - timedelta(hours=24)
        
        """Comments percentage"""
        status_changed_to_reject = Comments.objects.annotate(date_updated=TruncDate('updated')).filter(status='reject', date_updated__gte=previous_24_hours).count()
        new_pending_comments = Comments.objects.annotate(date_created=TruncDate('created')).filter(status='pending', date_created__gte=previous_24_hours).count()
        comments_before_24_hours = Comments.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
        count = (comments_before_24_hours - status_changed_to_reject) + new_pending_comments
        comments_percentage = ((count-comments_before_24_hours)/comments_before_24_hours) * 100
        management['comments_percentage'] = comments_percentage
        
        comments = Comments.objects.filter().order_by('-created')
        comments_count = comments.count()

        serializer1 = CommentsSerializer(comments, many=True)

        comments_with_likes = Comments.objects.filter(status='approve').annotate(like_count=Count('commentreaction__like'))

        # Next, get the comment with the most likes
        comment_with_most_likes = comments_with_likes.order_by('-like_count')

        # Finally, find the commentator who posted that comment
        for i in comment_with_most_likes:
            if i:
                if i.commentator_user:
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
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FilterComments(APIView):
    def post(self, request,id, format=None, *args, **kwargs):
        data_list = []
        filters = {}
        user = User.objects.get(id=id)
        try:
            if 'level' in request.data  and request.data.get('level') != None and request.data.get('level') != "" and request.data.get('level') != "Select":
                if request.data.get('level').lower() == 'expert':
                    filters['commentator_user__commentator_level'] = 'master'
                else:
                    filters['commentator_user__commentator_level'] = request.data.get('level').lower()

            if 'category' in request.data and request.data.get('category') != None and request.data.get('category') != "" and request.data.get('category') != "Select" and request.data.get('category')[0] != '':
                if request.data.get('category') == "Futbol":
                     filters['category__icontains'] = "Football"
                if request.data.get('category') == "Basketbol":
                     filters['category__icontains'] = "Basketball"

            if 'country' in request.data  and request.data.get('country') != None and request.data.get('country') != "" and request.data.get('country') != "Select":
                filters['country'] = request.data.get('country')

            if 'league' in request.data  and request.data.get('league') != None and request.data.get('league') != "" and request.data.get('league') != "Select":
                filters['league'] = request.data.get('league')

            if 'match_detail' in request.data  and request.data.get('match_detail') != None and request.data.get('match_detail') != "Select" and request.data.get('match_detail') != "Select":
                filters['match_detail'] = request.data.get('match_detail')

            if 'prediction_type' in request.data  and request.data.get('prediction_type') != None and request.data.get('prediction_type') != "Select" and request.data.get('prediction_type') != "Select":
                filters['prediction_type'] = request.data.get('prediction_type')

            if 'prediction' in request.data  and request.data.get('prediction') != None and request.data.get('prediction') != "" and request.data.get('prediction') != "Select":
                filters['prediction'] = request.data.get('prediction')

            if 'status' in request.data  and request.data.get('status') != None and request.data.get('status') != "" and request.data.get('status') != "Select":
                filters['status'] = request.data.get('status')

            if 'date' in request.data  and request.data.get('date') != None and request.data.get('date') != "" and request.data.get('date') != "Select":
                filters['date'] = request.data.get('date')

            filter_type = request.data.get('filter_type')  # This will contain 'public_content', 'finished', 'winning'
            if filter_type in ('public_content', 'finished', 'winning', 'published'):
                
                # filters['public_content'] = request.data.get('public_content')
                if filter_type == "public_content":
                    all_comments = Comments.objects.filter(status='approve', public_content=True,**filters)
                    # data_list['Public_Comments'] = []

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
                        data_list.append(comment_data)
                    # serializer11 = CommentsSerializer(all_comments, many=True)
                    # data0 = serializer11.data
                    # data_list.append(data0)
                    # return Response(data=data0, status=status.HTTP_200_OK)
                
                if filter_type == "finished":
                    # all_resolved_comment = Comments.objects.filter(commentator_user=request.user, date__lt=datetime.now().date(),**filters)
                    all_resolved_comment = Comments.objects.filter(date__lt=datetime.now().date(),**filters)
                    for comment in all_resolved_comment:
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
                        data_list.append(comment_data)
                    # serializer4 = CommentsSerializer(all_resolved_comment, many=True)
                    # data0 = serializer4.data
                    # data_list.append(data0)

                    # return Response(data=data0, status=status.HTTP_200_OK)

                if filter_type == "published":
                    all_comments = Comments.objects.filter(status='approve',**filters)
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
                        data_list.append(comment_data)

                if filter_type == "winning":
                    """
                    winning logic here.
                    """
                    all_comments = Comments.objects.filter(is_prediction=True,**filters)
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
                        data_list.append(comment_data)

            filter_type0 = request.data.get('filter_type0') # This will contain 'only_subscriber', 'not_stated', 'finished'
            if filter_type0 in ('only_subscriber', 'not_stated', 'lose', 'pending'):

                if filter_type0 == "only_subscriber":
                    subscribe_comment = []
                    # s = User.objects.get(id=6)
                    # subscription_obj = Subscription.objects.filter(standard_user=s, end_date__gte=datetime.now(), status='approve')
                    subscription_obj = Subscription.objects.filter(standard_user=user, end_date__gte=datetime.now(), status='approve')

                    for obj in subscription_obj:
                        if Comments.objects.filter(commentator_user=obj.commentator_user, status='approve').exists():
                            subscription_comment = Comments.objects.filter(commentator_user=obj.commentator_user,**filters)
                            # for obj in subscription_comment:
                            #     subscribe_comment.append(obj)
                            for comment in subscription_comment:
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
                                data_list.append(comment_data)

                    # serializer2 = CommentsSerializer(subscribe_comment, many=True)
                    # data1 = serializer2.data
                    # data_list.append(data1)
                    # return Response(data=data1, status=status.HTTP_200_OK)

                if filter_type0 == "not_stated":
                    # all_active_comment = Comments.objects.filter(commentator_user=request.user, date__gt=datetime.now().date(),**filters)
                    all_active_comment = Comments.objects.filter(date__gt=datetime.now().date(),**filters)
                    for comment in all_active_comment:
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
                        data_list.append(comment_data)
                    # serializer3 = CommentsSerializer(all_active_comment, many=True)
                    # data1 = serializer3.data
                    # data_list.append(data1)
                    # return Response(data=data1, status=status.HTTP_200_OK)

                if filter_type0 == "pending":
                    all_comments = Comments.objects.filter(status='pending',**filters)
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
                        data_list.append(comment_data)

                if filter_type0 == "lose":
                    """
                    lose logic here.
                    """
                    all_comments = Comments.objects.filter(is_prediction=False,**filters)
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
                        data_list.append(comment_data)
                    # data_list.append(data1)
                    # return Response(data=data1, status=status.HTTP_200_OK)
            
            if filter_type == "" and filter_type0 == "":

                query_filters = Q(**filters)
                filtered_comments = Comments.objects.filter(query_filters)
                for comment in filtered_comments:
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
                    data_list.append(comment_data)
                # serializer = CommentsSerializer(filtered_comments, many=True)
                # data = serializer.data
                # data_list.append(data)
            
            return Response(data=data_list, status=status.HTTP_200_OK)
    
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class EditorManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}
        now = timezone.now()
        previous_24_hours = now - timedelta(hours=24)
        try:
            """editor percentage"""
            deleted_editor_count = User.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, is_delete=True, user_role='commentator').count()
            editor_previous_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, is_delete=False, user_role='commentator').count()
            editor_before_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours, user_role='commentator').count()
            count = (editor_before_24_hours - deleted_editor_count) + editor_previous_24_hours
            editor_percentage = ((count-editor_before_24_hours)/editor_before_24_hours) * 100
            data_list['new_editor_percentage'] = editor_percentage


            editor_list = []
            commentator = User.objects.filter(user_role='commentator').order_by('created')
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
            top_ten_commentators_list = []


            for obj in top_ten_commentators:
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

                top_ten_commentators_list.append(detail)

            # serializer1 = UserSerializer(top_ten_commentators, many=True)
            # data1 = serializer1.data
            data_list['top_ten'] = top_ten_commentators_list


            active_editor = User.objects.filter(user_role='commentator', commentator_status='active').count()
            data_list['active_editor'] = active_editor

            pending_editor = User.objects.filter(user_role='commentator', commentator_status='pending').count()
            data_list['pending_editor'] = pending_editor

            deactivate_editor = User.objects.filter(user_role='commentator', commentator_status='deactive').count()
            data_list['deactivate_editor'] = deactivate_editor


            deactivation_request = User.objects.filter(deactivate_commentator='pending')
            deactivation_request_user = []
            for obj in deactivation_request:
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

                deactivation_request_user.append(detail)
            data_list['deactivat_user'] = deactivation_request_user
            data_list['deactivation_request'] = deactivation_request.count()

            verify_obj = BlueTick.objects.filter(status='pending')
            verify_obj_user = []
            # for obj in verify_obj:
            #     detail = {}
            #     follow_obj = FollowCommentator.objects.filter(commentator_user=obj).count()
            #     detail['Follower_Count'] = follow_obj

            #     follow_obj = FollowCommentator.objects.filter(standard_user=obj).count()
            #     detail['Following_Count'] = follow_obj

            #     subscriber_obj = Subscription.objects.filter(commentator_user=obj).count()
            #     detail['Subscriber_Count'] = subscriber_obj

            #     subscriber_obj = Subscription.objects.filter(standard_user=obj).count()
            #     detail['Subscription_Count'] = subscriber_obj

            #     serializer = UserSerializer(obj)
            #     detail['editor_data'] = serializer.data

            #     verify_obj_user.append(detail)
            # data_list['verify_user'] = verify_obj_user
            data_list['verify_request_count'] = verify_obj.count()

            return Response(data=data_list, status=status.HTTP_200_OK)
        
        except Exception as e:
            print(e,"===================>>>>>e")
            # Handle the exception here (e.g., log the error, return a specific error response, etc.)
            return Response(data={'error': 'An error occurred while processing the request.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



    def post(self, request, format=None, *args, **kwargs):
        """
        Create new commentator User.
        """
        # print("+++++", request.data)
        try:
            phone = request.data['phone']
            if User.objects.filter(phone=phone).exists():
                return Response({'error': 'User already present with this number.'}, status=status.HTTP_400_BAD_REQUEST)
            profile = request.FILES.get('file')
            date = request.data.get('date')
            name = request.data['name']
            username = request.data['username']
            password = request.data['password']
            gender = request.data['gender']
            age = request.data['age']
            country = request.data['country']
            city = request.data['city']
            category = request.data['category']
            role = 'commentator'
            commentator_level = request.data['level'].lower()
            if commentator_level == "expert":
                commentator_level = 'master'


            # Any additional validations or processing can be done here

            user_obj = User.objects.create(profile_pic=profile,
                name=name, username=username, phone=phone,
                password=password, gender=gender, age=age,
                user_role=role, commentator_level=commentator_level,
                country=country, city=city, category=category
            )
            # user_obj.set_password(password)
            user_obj.save()
            if user_obj != None:
                if DataCount.objects.filter(id=1).exists():
                    obj = DataCount.objects.get(id=1)
                    obj.editor += 1
                    obj.save()
                else:
                    obj = DataCount.objects.create(editor=1)
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

        if User.objects.filter(id=request.data['editor_id']).exists():
            user_obj = User.objects.get(id=request.data['editor_id'])
            if user_obj.phone != request.data['phone']:
                if User.objects.filter(phone=request.data['phone']).exists():
                    return Response({'error': 'User already present with this number.'}, status=status.HTTP_400_BAD_REQUEST)
            
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
            # user.deactivate_commentator = 'pending'
            user.is_delete = True
            user.save()
            return Response({"success": "The deactivation request for a user has been processed successfully."}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        

class UpdateStatusForVerifyRequest(APIView):
    def get(self, request, format=None):
        try:
            verification_request_count = BlueTick.objects.filter(status='pending').count()
            return Response(data={'verification_request_count': verification_request_count}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        
    def post(self, request, id, format=None, *args, **kwargs):
        try:
            if 'status' not in request.data:
                    return Response({'error': 'Status not found.'}, status=status.HTTP_400_BAD_REQUEST)
            obj_status = request.data.get('status')
            obj = BlueTick.objects.get(id=id)
            obj.status = obj_status
            obj.save()
            serializer = BlueTickSerializer(obj).data
            return Response(data=serializer, status=status.HTTP_200_OK)
        except BlueTick.DoesNotExist:
            return Response(data={'error': 'BlueTick object not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
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
                if 'lavel' in request.data and request.data.get('lavel') != None and request.data.get('lavel') != "Select":
                    filters['commentator_level'] = request.data.get('lavel').lower()

                if 'category' in request.data and request.data.get('category')[0] != None and request.data.get('category') != "Select":
                    filters['category__contains'] = request.data.get('category')

                if 'success_rate' in request.data and request.data.get('success_rate') != None and request.data.get('success_rate') != "Select":
                    success_rate__range = request.data.get('success_rate').split(" - ")
                    filters['success_rate__range'] = (float(success_rate__range[0]), float(success_rate__range[1]))

                if 'score_point' in request.data and request.data.get('score_point') != None and request.data.get('score_point') != "Select":
                    if request.data['score_point'] == '800+':
                        filters['score_points__gt'] = 800
                    else:
                        score_point__range = request.data.get('score_point').split(" - ")
                        filters['score_points__range'] = (int(score_point__range[0]), int(score_point__range[1]))
                    
                if 'city' in request.data and request.data.get('city') != None and request.data.get('city') != "Select":
                    filters['city'] = request.data.get('city')

                if 'age' in request.data and request.data.get('age') != None and request.data.get('age') != "Select":
                    filters['age'] = request.data.get('age')

                if 'gender' in request.data and request.data.get('gender') != None and request.data.get('gender') != "Select":
                    filters['gender'] = request.data.get('gender')

                filters['user_role'] = 'commentator'
                query_filters = Q(**filters)
                filtered_comments = User.objects.filter(query_filters)
                data = []
                for obj in filtered_comments:
                    details = {}
                    count = Subscription.objects.filter(commentator_user=obj).count()
                    serializer = UserSerializer(obj)
                    details['editor_data'] = serializer.data
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
        now = timezone.now()
        previous_24_hours = now - timedelta(hours=24)
        try:
            """Subscribers percentage"""
            status_changed_to_pending = Subscription.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, status='pending').count()
            new_subscriptions = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, status='active').count()
            subscriptions_before_24_hours = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
            count = (subscriptions_before_24_hours - status_changed_to_pending) + new_subscriptions
            subscriptions_percentage = ((count-subscriptions_before_24_hours)/subscriptions_before_24_hours) * 100
            data_list['new_subscriptions_percentage'] = subscriptions_percentage

            """Highlights percentage"""
            highlights_status_changed_to_pending = Highlight.objects.annotate(date_updated=TruncDate('updated')).filter(status='pending', date_updated__gte=previous_24_hours).count()
            highlights_purchased = Highlight.objects.annotate(date_created=TruncDate('created')).filter(status='active', highlight=True, date_created__gte=previous_24_hours).count()
            highlights_before_24_hours = Highlight.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
            highlights_count = (highlights_before_24_hours - highlights_status_changed_to_pending) + highlights_purchased
            highlights_percentage = ((highlights_count-highlights_before_24_hours)/highlights_before_24_hours) * 100
            data_list['new_subscriptions_percentage'] = highlights_percentage

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
                # if 'type' not in request.data:
                    # type = request.data.get('type')
                    # return Response({'error': 'Type not found.'}, status=status.HTTP_400_BAD_REQUEST)
                
                if 'date' in request.data:
                    filters['start_date__contains'] = request.data.get('date')
                if 'status' in request.data:
                    filters['status'] = request.data.get('status')
                if 'duration' in request.data:
                    filters['duration'] = request.data.get('duration')


                if request.data.get('type'):
                    type = request.data.get('type').lower()
                else:
                    type = ''

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
        

class FilterSalesManagement(APIView):
    def post(self, request, format=None, *args, **kwargs):
        data_list = []
        try:
            filters = {}
            if request.data:
                if 'date' in request.data and request.data.get('date') != None and request.data.get('date') != "Select":
                    filters['start_date__contains'] = request.data.get('date')

                if 'status' in request.data and request.data.get('status') != None and request.data.get('status') != "Select":
                    filters['status'] = request.data.get('status')

                if 'duration' in request.data and request.data.get('duration') != None and request.data.get('duration') != "Select":
                    filters['duration'] = request.data.get('duration')

                if request.data.get('type'):
                    type = request.data.get('type').lower()
                else:
                    type = ''
                query_filters = Q(**filters)

                if type == 'subscription':
                    subscription_obj = Subscription.objects.filter(query_filters)
                    serializer = SubscriptionSerializer(subscription_obj, many=True)
                    data_list.append(serializer.data)

                elif type == 'highlights':
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
                return Response({'error': 'Request data not found'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class SupportManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        all_data = {}
        now = timezone.now()
        previous_24_hours = now - timedelta(hours=24)
        try:
            """Ticket percentage"""
            status_changed_to_resolved = TicketSupport.objects.annotate(date_updated=TruncDate('updated')).filter(status='resolved', date_updated__gte=previous_24_hours).count()
            new_tickets_progress = TicketSupport.objects.annotate(date_created=TruncDate('created')).filter(status='pending', date_created__gte=previous_24_hours).count()
            tickets_before_24_hours = TicketSupport.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
            count = (tickets_before_24_hours - status_changed_to_resolved) + new_tickets_progress
            tickets_percentage = ((count-tickets_before_24_hours)/tickets_before_24_hours) * 100
            all_data['new_tickets_percentage'] = tickets_percentage

            """Total Ticket percentage"""
            total_status_changed_to_resolved = TicketSupport.objects.annotate(date_updated=TruncDate('updated')).filter(status='resolved', date_updated__gte=previous_24_hours).count()
            total_new_tickets_progress = TicketSupport.objects.annotate(date_created=TruncDate('created')).filter(status='pending', date_created__gte=previous_24_hours).count()
            total_tickets_before_24_hours = TicketSupport.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
            total_count = (total_tickets_before_24_hours - total_status_changed_to_resolved) + total_new_tickets_progress
            total_tickets_percentage = ((total_count-total_tickets_before_24_hours)/total_tickets_before_24_hours) * 100
            all_data['total_ticket_percentage'] = total_tickets_percentage

            current_datetime = timezone.now()

            twenty_four_hours_ago = current_datetime - timedelta(hours=24)

            last_24_hours_data = TicketSupport.objects.filter(created__gte=twenty_four_hours_ago).count()
            all_data['new_request'] = last_24_hours_data

            pending_ticket = TicketSupport.objects.filter(status='pending').count()
            all_data['pending_request'] = pending_ticket

            resolved_ticket = TicketSupport.objects.filter(status='resolved').count()
            all_data['resolved_request'] = resolved_ticket

            all_ticket = TicketSupport.objects.all().order_by('-created')
            all_data['total'] = all_ticket.count()

            # pending_tickets = TicketSupport.objects.filter(status='pending')
            # serializer = TicketSupportSerializer(pending_tickets, many=True)
            serializer = TicketSupportSerializer(all_ticket, many=True)
            all_data['tickets'] = serializer.data

            support_history = TicketHistory.objects.all().order_by('-created')
            serializer11 = TicketHistorySerializer(support_history, many=True)
            all_data['support_history'] = serializer11.data

            sub_users = User.objects.filter(user_role='sub_user')
            serializer12 = UserSerializer(sub_users, many=True)
            all_data['sub_users'] = serializer12.data

            return Response(data=all_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
            ticket_id = request.data.get('ticket_id')

            message = request.data.get('message')


            if not message:
                return Response({'error': 'Message not found.'}, status=status.HTTP_400_BAD_REQUEST)

            ticket_support = None
            try:
                ticket_support = TicketSupport.objects.get(pk=ticket_id)
            except TicketSupport.DoesNotExist:
                return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)

            res_obj = ResponseTicket.objects.create(user=user,ticket=ticket_support, response=message)
            print('res_obj: ', res_obj)
            if res_obj != None:
                ticket_obj = TicketHistory.objects.create(user=user, ticket_support=ticket_support, status='comment_by_user',
                                                            response_ticket=res_obj)
                ticket_support.status = 'progress'
                ticket_support.save()

            serializer = ResponseTicketSerializer(res_obj)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SubUserShowTicketData(APIView):
    def get(self, request, ticket_id, format=None, *args, **kwargs):
        try:
            ticket_obj = TicketSupport.objects.get(id=ticket_id)
            try:
                history = TicketHistory.objects.filter(ticket_support=ticket_obj).latest('created')
                if history.message is None:
                    serializer = TicketSupportSerializer(ticket_obj).data
                    return Response(data=serializer, status=status.HTTP_200_OK)
                else:
                    serializer = TicketSupportSerializer(ticket_obj).data
                    serializer['updated_ticket_message'] = history.message
                    return Response(data=serializer, status=status.HTTP_200_OK)
            except TicketHistory.DoesNotExist:
                serializer = TicketSupportSerializer(ticket_obj).data
                return Response(data=serializer, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(data={"error": "Ticket not found"}, status=status.HTTP_404_NOT_FOUND)


class RetrieveSubUserView(APIView):
    # Retrieve the sub user as per department.
    def post(self, request, format=None, *args, **kwargs):
        try:
            department = request.data.get('department')
            print('department: ', department)
            if not department:
                return Response({'error': 'Department not found.'}, status=status.HTTP_400_BAD_REQUEST)

            sub_users = User.objects.filter(department=department, user_role='sub_user')
            print('sub_users: ', sub_users)
            serializer = UserSerializer(sub_users, many=True)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class TicketRedirectView(APIView):
    def post(self, request, id, ticket_id, format=None, *args, **kwargs):
        """
        store history for which admin user assign the ticket to sub user.
        """
        try:
            admin_user = User.objects.get(id=id)
            ticket = TicketSupport.objects.get(id=ticket_id)
            note = request.data.get('note')
            print('note: ', note)
            user_id = request.data.get('id')  # sub user id
            print('user_id: ', user_id)
            
            if user_id is None:
                return Response({'error': 'User-Id not found.'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                user_obj = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
            
            ticket_redirect_history = TicketHistory.objects.create(user=admin_user, ticket_support=ticket, status='redirect',
                                                                   redirect_to=user_obj, note=note)
            if ticket_redirect_history != None:
                ticket.status = 'progress'
                ticket.save()
            serializer = TicketHistorySerializer(ticket_redirect_history)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)

        except TicketSupport.DoesNotExist:
            return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class SubUserSupportTicket(APIView):
    """show Sub user's assign tickets."""
    def get(self, request, id, format=None, *args, **kwargs):
        try:
            data_list = []
            user = User.objects.get(id=id)  # sub user

            try:
                ticket_obj = TicketHistory.objects.filter(redirect_to=user)
                for obj in ticket_obj:
                    serializer = TicketSupportSerializer(obj.ticket_support).data
                    data_list.append(serializer)
                return Response(data=data_list, status=status.HTTP_200_OK)
            except TicketHistory.DoesNotExist:
                return Response(data={"detail": "No ticket history found for this user."},
                                status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response(data={"detail": "User not found."},
                            status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RedirectAnswerView(APIView):
    """Sub user open perticular ticket."""
    def get(self, request, id, ticket_id, format=None, *args, **kwargs):
        details = {}
        
        try:
            user = get_object_or_404(User, id=id)  # sub user
            ticket = get_object_or_404(TicketSupport, id=ticket_id)
            
            ticket_serializer = TicketSupportSerializer(ticket).data
            details['ticket'] = ticket_serializer

            ticket_history = TicketHistory.objects.filter(ticket_support=ticket, status='redirect').latest('created')
            admin_serializer = UserSerializer(ticket_history.user).data
            details['admin_user'] = admin_serializer
            details['note'] = ticket_history.note

            return Response(data=details, status=status.HTTP_200_OK)
        except (User.DoesNotExist, TicketSupport.DoesNotExist, TicketHistory.DoesNotExist):
            return Response(data={'error': 'Resource not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    """Sub user answer the ticket."""
    def post(self, request, id, ticket_id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id) # sub user
            message = request.data.get('message') # ticket answer

            if not message:
                return Response({'error': 'Message not found.'}, status=status.HTTP_400_BAD_REQUEST)

            ticket_support = None
            try:
                ticket_support = TicketSupport.objects.get(id=ticket_id)
            except TicketSupport.DoesNotExist:
                return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)

            res_obj = ResponseTicket.objects.create(user=user,ticket=ticket_support, response=message)
            if res_obj != None:
                ticket_obj = TicketHistory.objects.create(user=user, ticket_support=ticket_support, status='comment_by_user',
                                                            response_ticket=res_obj)
                ticket_support.status = 'progress'
                ticket_support.save()

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
        # print('request.data: ', request.data)
        try:
            subject = request.data.get('subject')
            user_type = request.data.get('user_type')
            to = request.data.get('to')  # need receiver user id
            sending_type = request.data.get('sending_type')
            date = request.data.get('date')
            message = request.data.get('message')
            sender = request.query_params.get('sender')
            sender_instance = User.objects.get(id=sender)

            if not subject:
                return Response({'error': 'Subject not found.'}, status=status.HTTP_400_BAD_REQUEST)
            if not to:
                return Response({'error': 'Receiver User not found.'}, status=status.HTTP_400_BAD_REQUEST)
            if not date:
                return Response({'error': 'Date not found.'}, status=status.HTTP_400_BAD_REQUEST)
            if not message:
                return Response({'error': 'Message not found.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                user = User.objects.get(username=to)
                # print('user: ', user)
            except User.DoesNotExist:
                return Response({'error': 'Receiver User does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

            """sender and receiver baki.."""

            notification_obj = Notification.objects.create(receiver=user, subject=subject, status=False, date=date, context=message, sender=sender_instance)

            serializer = NotificationSerializer(notification_obj)
            return Response({'data' : serializer.data, 'status' : status.HTTP_200_OK})

        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SubUserManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}

        try:
            subuser_count = User.objects.filter(user_role='sub_user',is_delete=False)
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
            all_notification = Notification.objects.filter(Q(subject__icontains='subscription') | Q(subject__icontains='highlights')).order_by('-created')
            # all_notification = Notification.objects.all().order_by('-created')
            serializer1 = NotificationSerializer(all_notification, many=True)
            data_list['user_timeline'] = serializer1.data
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=data_list, status=status.HTTP_200_OK)

    def post(self, request, format=None, *args, **kwargs):
        try:
            if request.data:
                # print('request.data: ', request.data)
                role = 'sub_user'
                
                # required_fields = ['file', 'name', 'phone', 'password', 'authorization_type', 'department', 'permission']
                # for field in required_fields:
                #     if field not in request.data:
                #         return Response({'error': f'{field.replace("_", " ").title()} not found'}, status=status.HTTP_400_BAD_REQUEST)
                
                password = request.data.get('password')
                # print('password: ', password)

                permission_type = request.data.get('permission')
                # print('permission_type: ', permission_type)
                if permission_type == 'transaction':
                    transaction = True
                    all_permission = request.data.get('all_permission')
                    # print('all_permission: ', all_permission)
                    
                    if all_permission and all_permission.lower() == 'true':
                        process_withdrawal = True
                        rule_update = True
                        price_update = True
                        withdrawal_export = True
                        sales_export = True
                    else:
                        process_withdrawal = request.data.get('process_withdrawal')
                        # print('process_withdrawal: ', process_withdrawal)
                        rule_update = request.data.get('rule_update')
                        price_update = request.data.get('price_update')
                        withdrawal_export = request.data.get('withdrawal_export')
                        sales_export = request.data.get('sales_export')
                        all_permission = False

                    # print("================================")
                    # print("================================", request.data.get('file'))
                    # print("================================request.data.get('name')", request.data.get('name'))
                    # print("================================request.data.get('phone')", request.data.get('phone'))
                    # print("================================request.data.get('authorization_type')", request.data.get('authorization_type'))
                    # print("================================request.data.get('department')", request.data.get('department'))

                    sub_user_obj = User.objects.create(profile_pic=request.data.get('file'),user_role=role, name=request.data.get('name'), phone=request.data.get('phone'),
                                                       password=password, authorization_type=request.data.get('authorization_type'),
                                                       department=request.data.get('department'), is_transaction=transaction, is_process_withdrawal_request=process_withdrawal,
                                                       is_rule_update=rule_update, is_price_update=price_update, is_withdrawal_export=withdrawal_export,
                                                       is_sales_export=sales_export, is_all_permission=all_permission)
                    # print(sub_user_obj,"===================sub_user_obj")
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

                # print("***************************")
                # sub_user_obj.set_password(password)
                sub_user_obj.save()
                # if sub_user_obj != None:
                #     if DataCount.objects.filter(id=1).exists():
                #         obj = DataCount.objects.get(id=1)
                #         obj.user += 1
                #         obj.save()
                #     else:
                #         obj = DataCount.objects.create(user=1)
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
        # print('erializer.is_valid: ', serializer.is_valid)
        if serializer.is_valid():
            try:
                serializer.save()
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response({'data' : serializer.data, 'status' : status.HTTP_200_OK})
        else:
            # print('serializer.errors: ', serializer.errors)
            return Response({'data' : serializer.errors, 'status' : status.HTTP_400_BAD_REQUEST})
        
    def delete(self, request, pk, format=None, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
            action = request.query_params.get('action')
            if action == 'delete':
                try:
                    user.delete()
                    return Response("User deleted Successfully", status= status.HTTP_200_OK)
                except Exception as e:
                    return Response({"error": f"Failed to delete user: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            elif action == 'deactive':
                user.is_delete = True
                user.save()
                return Response({'data' : "User Deleted", 'status' : status.HTTP_200_OK})
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        
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
                # print('request.data:: ', request.data)
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
                if ads_obj != None:
                    if DataCount.objects.filter(id=1).exists():
                        obj = DataCount.objects.get(id=1)
                        obj.advertisement += 1
                        obj.save()
                    else:
                        obj = DataCount.objects.create(advertisement=1)
                
                serializer = AdvertisementSerializer(ads_obj)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, pk, format=None, *args, **kwargs):
        try:
            user = Advertisement.objects.get(pk=pk)
        except Advertisement.DoesNotExist:
            return Response({"error": "Advertisement not found."}, status=status.HTTP_404_NOT_FOUND)
        print("request.data['data']============", request.data)
        if 'count' in request.data:
            if 'ads_view' in request.data['data']:
                user.ad_views_count += 1
                success_message = 'Ad view count incremented successfully.'

            elif 'redirected_to_ad' in request.data['data']:
                user.ad_clicks_and_redirected_count += 1
                success_message = 'Ad click and redirection count incremented successfully.'

            else:
                return Response({'error': 'Invalid request data.'}, status=status.HTTP_400_BAD_REQUEST)
            user.save()
            return Response({'data': success_message}, status=status.HTTP_200_OK)
        
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
            
            if level.lower() == 'expert':
                level = 'master'
            
            level_obj = CommentatorLevelRule.objects.filter(commentator_level=level)
            
            if not level_obj.exists():
                return Response(data={'error': 'No rule found for the given level'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = CommentatorLevelRuleSerializer(level_obj, many=True)
            if level.lower() == 'expert':
                for data in serializer.data:
                    if data['commentator_level'].lower() == 'master':
                        data['commentator_level'] = 'expert'
            
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, format=None, *args, **kwargs):
        commentator_level = request.query_params.get('commentator_level')
        # commentator_level = request.data.get('commentator_level')
        existing_record = CommentatorLevelRule.objects.filter(commentator_level=commentator_level).first()
        
        if existing_record:
            serializer = CommentatorLevelRuleSerializer(existing_record, data=data,  partial=True)
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
        commentator_level = request.query_params.get('commentator_level')
        existing_record = MembershipSetting.objects.filter(commentator_level=commentator_level).first()

        if existing_record:
            serializer = MembershipSettingSerializer(existing_record, data=request.data, partial=True)
        else:
            request.data['commentator_level'] = commentator_level
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
        commentator_level = request.query_params.get('commentator_level')
        existing_record = SubscriptionSetting.objects.filter(commentator_level=commentator_level).first()

        data = request.data
        data.update({'commentator_level': commentator_level})
        if existing_record:
            serializer = SubscriptionSettingSerializer(existing_record, data=data, partial=True)
        else:
            request.data['commentator_level'] = commentator_level
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
        commentator_level = request.query_params.get('commentator_level')
        existing_record = HighlightSetting.objects.filter(commentator_level=commentator_level).first()

        if existing_record:
            serializer = HighlightSettingSerializer(existing_record, data=request.data, partial=True)
        else:
            serializer = HighlightSettingSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            if DataCount.objects.filter(id=1).exists():
                obj = DataCount.objects.get(id=1)
                obj.highlight += 1
                obj.save()
            else:
                obj = DataCount.objects.create(highlight=1)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CommentSetting(APIView):
    def post(self, request, format=None, *args, **kwargs):
        data = request.data.copy() 

        comment_serializer = CommentsSerializer(data=data)
        if comment_serializer.is_valid():

            editor = request.data['editor']

            user = User.objects.get(username=editor)

            category = request.data.get('category')
            country = request.data.get('country')
            league = request.data.get('league')
            match_detail = request.data.get('match_detail')
            prediction_type = request.data.get('prediction_type')
            prediction = request.data.get('prediction')
            if user.commentator_level == 'apprentice':
                public_content = True
            else:
                public_content = request.data.get('public_content')
            comment_1 = request.data.get('comment')

            comment = Comments.objects.create(
                    commentator_user=user,
                    category=[category],
                    country=country,
                    league=league,
                    match_detail=match_detail,
                    prediction_type=prediction_type,
                    prediction=prediction,
                    public_content=public_content,
                    comment=comment_1
                )

            if DataCount.objects.filter(id=1).exists():
                obj = DataCount.objects.get(id=1)
                obj.comment += 1
                obj.save()
            else:
                obj = DataCount.objects.create(comment=1)

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
        # print("==========")
        # print('comment_serializer.errors: ', comment_serializer.errors)
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

def Statistics(user_obj=None, user_id=None):
    try:
        user = User.objects.get(id=user_id) if not user_obj else user_obj
        
        data = Comments.objects.filter(commentator_user=user)
        win_count = data.filter(is_prediction=True).count()
        lose_count = data.filter(is_prediction=False).count()

        if len(data) != 0:
            Success_rate = round((win_count/len(data))*100, 2)
        else:
            Success_rate = 0
        
        Score_point = ((10*win_count)- (10*lose_count))

        if win_count >= 60:
            user.commentator_level = "journeyman"
            user.save(update_fields=['commentator_level','updated'])

        # Match_result = data.filter(prediction_type="Match Result")
        # Goal_count = data.filter(prediction_type="Goal Count")
        # Halftime = data.filter(prediction_type="Halftime")
        # print(len(Match_result), len(Goal_count), len(Halftime))
        # Match_result_rate = round((len(Match_result)/len(data))*100,2)
        # Goal_count_rate = round((len(Goal_count)/len(data))*100, 2)
        # Halftime_rate = round((len(Halftime)/len(data))*100,2)

        country_leagues = {}
        only_leagues = []
        avg_odd = 0
        for i in data:
            avg_odd += i.average_odds
            only_leagues.append(i.league)
            country = i.country
            league = i.league
            if country in country_leagues:
                country_leagues[country].append(league)
            else:
                country_leagues[country] = [league]

        if 0 < Success_rate < 60:
            user.commentator_level = "apprentice"
        if 60 < Success_rate< 65:
            user.commentator_level = "journeyman"
        if 65 < Success_rate < 70:
            user.commentator_level = "master"
        if 70 < Success_rate < 100:
            user.commentator_level = "grandmaster"

        if len(data) != 0:
            avg_odd = round(avg_odd/len(data), 2)
        else:
            avg_odd = 0

        user.save(update_fields=['commentator_level','updated'])
        # return Success_rate, Score_point, Match_result_rate, Goal_count_rate, Halftime_rate,country_leagues, avg_odd, win_count, lose_count
        return Success_rate, Score_point, win_count, lose_count, country_leagues, avg_odd, only_leagues
    except:
        raise HttpResponseServerError("Statistics Exception")

# class UserStatistics(APIView):
#     def get(self, request, id=id):
#         user = User.objects.get(id=id)
#         Success_Rate, Score_Points,Match_result_rate, Goal_count_rate, Halftime_rate,Countries_Leagues, avg_odd, win_count, lose_count= Statistics(id)
#         recent_comments = (Comments.objects.filter(commentator_user=id).order_by('-created'))[:30]
#         recent_correct = Comments.objects.filter(commentator_user=id, is_prediction=True).order_by('-created')[:30]
#         recent_success = (len(recent_correct)/30)*100
#         print(len(recent_comments))
#         user_cmt = Comments.objects.filter(commentator_user= id)
#         resolve_comment = user_cmt.filter(is_resolve=True)
#         Active_comment = user_cmt.filter(is_resolve=False)
#         return Response(data={'success': 'successfully sent.', 
#                             'user': user.name, 
#                             'Success_Rate': f'{Success_Rate}%', 
#                             'Score_Points': Score_Points, 
#                             'recent_success_rate': recent_success, 
#                             'Countries_Leagues': Countries_Leagues,
#                             'Match_result_rate': Match_result_rate, 
#                             'Goal_count_rate': Goal_count_rate, 
#                             'Halftime_rate': Halftime_rate,
#                             'avg_odd': round(avg_odd, 2),
#                             'resolve_comment': resolve_comment.values(),
#                             'Active_comment': Active_comment.values(),
#                             }, status=status.HTTP_200_OK)

class UserStatistics(APIView):
   
    def get(self, request, id, format=None, *args, **kwargs):
        try:
            user = get_object_or_404(User, id=id)
            serializer = UserSerializer(user).data

            Success_rate, Score_point, win_count, lose_count, country_leagues, avg_odd, only_leagues = Statistics(user_obj=user)
            user.success_rate = Success_rate
            user.score_points = Score_point
            user.save(update_fields=['success_rate', 'score_points', 'updated'])

            element_counts = Counter(only_leagues)
            most_common_element = None
            if element_counts.most_common() and element_counts.most_common(1):
                most_common_element, max_count = element_counts.most_common(1)[0]

            result_list = [most_common_element] if most_common_element else []

            data = {
                "user": serializer,
                "Success_rate": Success_rate,
                "Score_point": Score_point,
                "win_count": win_count,
                "lose_count": lose_count,
                "avg_odd": avg_odd,
                "leagues": result_list
            }
            return Response(data=data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(data={"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# class MonthlySubScriptionChart(APIView):
#     def get(self,request, id):
#         user = User.objects.get(id=id)
#         commentator_user = FollowCommentator.objects.filter(commentator_user=user.id)
#         months_dict = {
#                 '1': [],
#                 '2': [],
#                 '3': [],
#                 '4': [],
#                 '5': [],
#                 '6': [],
#                 '7': [],
#                 '8': [],
#                 '9': [],
#                 '10': [],
#                 '11': [],
#                 '12': [],
#             }
#         for i in commentator_user:
#             months_dict[str(i.created.month)].append(i.standard_user.name)
#         return Response({"data": commentator_user.values(), 'monthly_subscription_chart': months_dict.__str__()})


class SportsStatisticsView(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        datalist = []

        try:
            p_type_lst = []
            details = {}
            Comments_Journey_basketball = []
            user_all_cmt = Comments.objects.filter(commentator_user__id=id, category__icontains='Basketball')
            total_user_cmt = user_all_cmt.count()
            
            p_type_lst = [obj.prediction_type for obj in user_all_cmt]

            prediction_type_counts = Counter(p_type_lst)

            top_3_prediction_types = prediction_type_counts.most_common(3)

            top_3_prediction_types = [prediction[0] for prediction in top_3_prediction_types]

            prediction_types_data = []
            for i in top_3_prediction_types:
                predict_type = Comments.objects.filter(commentator_user__id=id,prediction_type=i, category__icontains='Basketball').count()

                cal = (predict_type / total_user_cmt)* 100
                data ={
                    "prediction_type":i,
                    "calculation":round(cal, 2)
                }
                prediction_types_data.append(data)

            if total_user_cmt == 0:
                prediction_types_data = []
            else:
                b_avg = 0
                for i in prediction_types_data:
                    b_avg += i['calculation']

                other_data = {
                    "prediction_type":'Other',
                    "calculation":round(100-b_avg, 2)
                }
                prediction_types_data.append(other_data)
                
            recent_30_comments = Comments.objects.filter(commentator_user__id=id, category__icontains='Basketball').order_by('-created')[:30]
            for obj in recent_30_comments:
                Comments_Journey_basketball.append(obj.is_prediction)
            details['Comments_Journey_basketball'] = Comments_Journey_basketball

            correct_prediction_basketball = Comments.objects.filter(commentator_user__id=id, is_prediction=True, category__icontains='Basketball').order_by('-created')[:30]

            basketball_calculation = (len(correct_prediction_basketball)/30)*100
            details['basketball_calculation'] = round(basketball_calculation, 2)

            basketball_Leagues = []
            Countries_Leagues_basketball = Comments.objects.filter(commentator_user__id=id, category__icontains='Basketball')
            for obj in Countries_Leagues_basketball:
                data = {
                    "country":obj.country,
                    "league":obj.league,
                }
                basketball_Leagues.append(data)
                # basketball_Leagues.append(obj.league)
            frozen_dicts = [frozenset(d.items()) for d in basketball_Leagues]
            counter = Counter(frozen_dicts)
            most_common_duplicates = counter.most_common(8)
            result = [dict(frozenset_pair) for frozenset_pair, count in most_common_duplicates]


            # basketball_counter = Counter(basketball_Leagues)
            # basketball_most_common_duplicates = [item for item, count in basketball_counter.most_common() if count >= 1][:8]
            details['basketball_Leagues'] = result
            details['basketball_comment_types'] = prediction_types_data
            datalist.append(details)
        except Comments.DoesNotExist:
            datalist.append({})  # Append an empty dictionary

        try:
            fb_p_type_lst = []
            Fb_details = {}
            Comments_Journey_football = []
            fb_user_all_cmt = Comments.objects.filter(commentator_user__id=id, category__icontains='Football')
            fb_total_user_cmt = fb_user_all_cmt.count()
            
            fb_p_type_lst = [obj.prediction_type for obj in fb_user_all_cmt]

            fb_prediction_type_counts = Counter(fb_p_type_lst)

            fb_top_3_prediction_types = fb_prediction_type_counts.most_common(3)

            fb_top_3_prediction_types = [prediction[0] for prediction in fb_top_3_prediction_types]

            fb_prediction_types_data = []
            for i in fb_top_3_prediction_types:
                predict_type = Comments.objects.filter(commentator_user__id=id,prediction_type=i, category__icontains='Football').count()

                cal = (predict_type / fb_total_user_cmt)* 100
                data ={
                    "prediction_type":i,
                    "calculation":round(cal, 2)
                }
                fb_prediction_types_data.append(data)

            if fb_total_user_cmt == 0:
                fb_prediction_types_data = []
            else:
                fb_avg = 0
                for i in fb_prediction_types_data:
                    fb_avg += i['calculation']
                fb_other_data = {
                    "prediction_type":'Other',
                    "calculation":round(100-fb_avg, 2)
                }
                fb_prediction_types_data.append(fb_other_data)

            fb_recent_30_comments = Comments.objects.filter(commentator_user__id=id, category__icontains='Football').order_by('-created')[:30]
            for obj in fb_recent_30_comments:
                Comments_Journey_football.append(obj.is_prediction)
            Fb_details['Comments_Journey_football'] = Comments_Journey_football

            correct_prediction_football = Comments.objects.filter(commentator_user__id=id, is_prediction=True, category__icontains='Football').order_by('-created')[:30]

            football_calculation = (len(correct_prediction_football)/30)*100
            Fb_details['football_calculation'] = round(football_calculation, 2)

            football_Leagues = []
            Countries_Leagues_football = Comments.objects.filter(commentator_user__id=id, category__icontains='Football')
            for obj in Countries_Leagues_football:
                # football_Leagues.append(obj.league)
                translator= Translator(from_lang="turkish",to_lang="english")
                translation_coutry = translator.translate(obj.country)
                data = {
                    "country":translation_coutry,
                    "league":obj.league,
                }
                football_Leagues.append(data)
            fb_frozen_dicts = [frozenset(d.items()) for d in football_Leagues]
            fb_counter = Counter(fb_frozen_dicts)
            fb_most_common_duplicates = fb_counter.most_common(8)
            fb_result = [dict(frozenset_pair) for frozenset_pair, count in fb_most_common_duplicates]
            # football_counter = Counter(football_Leagues)
            # football_most_common_duplicates = [item for item, count in football_counter.most_common() if count >= 1][:8]
            Fb_details['football_Leagues'] = fb_result
            Fb_details['football_comment_types'] = fb_prediction_types_data
            datalist.append(Fb_details)
        except Comments.DoesNotExist:
            datalist.append({})  # Append an empty dictionary

        return Response(data=datalist, status=status.HTTP_200_OK)


"""class BecomeEditorView(APIView):
    
    # def get(self, request):
    #     data = BecomeEditor.objects.all() 
    #     serializer = BecomeEditorSerializer(data, many=True)
    #     return Response(serializer.data)

    def get(self, request, id=None):
        if id is not None:
            try:
                data = BecomeEditor.objects.get(id=id)
                serializer = BecomeEditorSerializer(data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except BecomeEditor.DoesNotExist:
                return Response({"msg": "DoesNotExist"}, status=status.HTTP_204_NO_CONTENT)
        else:
            data = BecomeEditor.objects.all() 
            serializer = BecomeEditorSerializer(data, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = BecomeEditorSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request, id):
        try:
            data_update = BecomeEditor.objects.get(id=id)
            serializer = BecomeEditorSerializer(instance=data_update, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
            print(data_update)
            return Response(status=status.HTTP_200_OK)
        except BecomeEditor.DoesNotExist:
            return Response({'msg':"DoesNotExist"},status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, id):
        try:
            data_delete = BecomeEditor.objects.get(id=id)
            data_delete.delete()
            return Response({"msg": "deleted"}, status=status.HTTP_200_OK)
        except BecomeEditor.DoesNotExist:
            return Response({'msg':"DoesNotExist"},status=status.HTTP_404_NOT_FOUND)"""
        

"""class BecomeEditorEarnDetailsview(APIView):

    def get(self, request, id=None, subscriber=None):
        if id is not None and subscriber is not None:
            data = BecomeEditorEarnDetails.objects.get(id=id)
            total_earning = (float(data.earn_amount) * int(subscriber))/int(data.threshold_subscriber)
            return Response({"total_earning": round(total_earning, 2)})
        if id is not None:
            try:
                data = BecomeEditorEarnDetails.objects.get(id=id)
                serializer = BecomeEditorEarnDetailsSerializer(data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except BecomeEditorEarnDetails.DoesNotExist:
                return Response({"msg": "DoesNotExist"}, status=status.HTTP_404_NOT_FOUND)
        else:
            data = BecomeEditorEarnDetails.objects.all()
            serializer = BecomeEditorEarnDetailsSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        try:
            serializer = BecomeEditorEarnDetailsSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_404_NOT_FOUND)
        except IntegrityError as e:
            return Response({"error": "subscription_type already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request, id):
        try:
            data_update = BecomeEditorEarnDetails.objects.get(id=id)
            serializer = BecomeEditorEarnDetailsSerializer(instance=data_update, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            print(data_update)
            return Response(status=status.HTTP_200_OK)
        except BecomeEditorEarnDetails.DoesNotExist:
            return Response({'msg':"DoesNotExist"},status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, id):
        try:
            data_delete = BecomeEditorEarnDetails.objects.get(id=id)
            data_delete.delete()
            return Response({"msg": "deleted"}, status=status.HTTP_200_OK)
        except BecomeEditorEarnDetails.DoesNotExist:
            return Response({'msg':"DoesNotExist"},status=status.HTTP_404_NOT_FOUND)"""



class BecomeEditorEarnDetailsview(APIView):
    def get(self, request, subscriber, format=None, *args, **kwargs):
        try:
            type = request.query_params.get('type')
            value = SubscriptionSetting.objects.get(commentator_level=type)
            try:
                data = BecomeEditorEarnDetails.objects.get(subscription_type=type)
                total_earning = (float(value.month_1) * int(subscriber)) / int(data.threshold_subscriber)
                return Response({"total_earning": round(total_earning, 2)})
            except ObjectDoesNotExist:
                data = BecomeEditorEarnDetails.objects.create(subscription_type=type, threshold_subscriber=1, earn_amount=value.month_1)
                total_earning = (float(value.month_1) * int(subscriber)) / int(data.threshold_subscriber)
                return Response({"total_earning": round(total_earning, 2)})
        except SubscriptionSetting.DoesNotExist:
            return Response({"error": "SubscriptionSetting not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BecomeEditorView(APIView):
    def patch(self, request, id, format=None, *args, **kwargs):
        """
        Payment gateway code here.
        After sucessfully payment below code execute.
        """
        user = User.objects.get(id=id)
        print(request.data)
        if user.user_role == "standard":
            if user.profile_pic == "":
                if 'profile_pic' not in request.data:
                    return Response({'error': 'Profile-Pic not found.'}, status=status.HTTP_400_BAD_REQUEST)
            user.user_role = "commentator"
            user.commentator_level = "apprentice"
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                try:
                    serializer.save()
                except Exception as e:
                    return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':"You are not Standard user."},status=status.HTTP_404_NOT_FOUND)
# class OtpVerify(APIView):
#     def post(self, request, format=None, *args, **kwargs):
#         try:
#             otp = request.data.get('otp')
#             verification_result = totp.verify(otp)

#             if verification_result:
#                 return Response(data={'success': 'Otp successfully verified.'}, status=status.HTTP_200_OK)
#             else:
#                 return Response(data={'error': 'The OTP verification failed.'}, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as e:
#             return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class FootbalAndBasketballContentView(APIView):
#     def get(self, request, *args, **kwargs):
#         try:
#             category = request.query_params.get('category')
#             print('category: ', category)
#             if category:
#                 queryset = Comments.objects.filter(category=[category])
#                 print('queryset: ', queryset)
#                 data = CommentsSerializer(queryset, many=True)
#                 # Fetch comment reactions and calculate the total count of reactions

#                 for comment in queryset:
#                     print(comment.id,"=????d")
#                     comment = Comments.objects.get(id=comment.id)
#                     comment_reactions = CommentReaction.objects.filter(comment=comment)
#                     total_reactions = comment_reactions.aggregate(
#                         total_likes=Sum('like'),
#                         total_favorite=Sum('favorite'),
#                         total_clap=Sum('clap')
#                     )
                
#                 reactions = {
#                     'total_likes': total_reactions['total_likes'] or 0,
#                     'total_favorite': total_reactions['total_favorite'] or 0,
#                     'total_clap': total_reactions['total_clap'] or 0
#                 }
#                 return Response({'data' : data.data, 'total_reactions' : reactions}, status=status.HTTP_200_OK)
#             else:
#                 return Response({'error' : 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as e:
#             return Response({'error' : f'Error while fetching data. {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
# 

class FootbalAndBasketballContentView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            category = request.query_params.get('category')
            print('category: ', category)
            if category:
                queryset = Comments.objects.filter(category=[category])  # Remove square brackets around category
                print('queryset: ', queryset)
                data = CommentsSerializer(queryset, many=True).data  # Serialize queryset

                # Create a list to store comments with their total reactions
                comments_with_reactions = []

                for comment in queryset:
                    comment_data = CommentsSerializer(comment).data
                    comment_reactions = CommentReaction.objects.filter(comment=comment)
                    total_reactions = comment_reactions.aggregate(
                        total_likes=Sum('like'),
                        total_favorite=Sum('favorite'),
                        total_clap=Sum('clap')
                    )

                    # total_reactions = {
                    #     'total_likes': total_reactions['total_likes'] or 0,
                    #     'total_favorite': total_reactions['total_favorite'] or 0,
                    #     'total_clap': total_reactions['total_clap'] or 0
                    # }
                    comment_data['total_reactions'] = {
                    'total_likes': total_reactions['total_likes'] or 0,
                    'total_favorite': total_reactions['total_favorite'] or 0,
                    'total_clap': total_reactions['total_clap'] or 0
                }

                    # Include comment data and total reactions in the list
                    # comments_with_reactions.append({
                    #     'comment_data': CommentsSerializer(comment).data,
                    #     'reactions': reactions
                    # })
                    # data['reactions'] = reactions
                
                    comments_with_reactions.append(comment_data)

                # return Response({'data': data}, status=status.HTTP_200_OK)
                return Response({'data': comments_with_reactions}, status=status.HTTP_200_OK)
                # return Response({'data': data}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'Error while fetching data. {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class GetALLUsers(APIView):
    def get(self, request):
        try:
            userType =  request.query_params.get('userType')
            if userType == '':
                return Response({'error' : 'Please specify User Type.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                queryset = User.objects.filter(user_role=userType)
                data = UserSerializer(queryset, many=True).data
                return Response({'data': data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f'Error while fetching users. {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrievePageData():

    def get_public_comments(self, unique_comment_ids):
        """ Return public comments data """
        public_comments = []

        try:
            all_comments = Comments.objects.filter(status='approve', public_content=True).order_by('-created').only('id')

            for comment in all_comments:
                comment_data = CommentsSerializer(comment).data
                date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")
        
                # Fetch comment reactions and calculate the total count of reactions
                comment_reactions = CommentReaction.objects.filter(comment=comment).values('like', 'favorite', 'clap')
                total_reactions = comment_reactions.aggregate(
                    total_likes=Sum('like'),
                    total_favorite=Sum('favorite'),
                    total_clap=Sum('clap')
                )
                
                # Update comment_data
                comment_data['date'] = date_obj.strftime("%d.%m.%Y") 
                comment_data['total_reactions'] = {
                    'total_likes': total_reactions['total_likes'] or 0,
                    'total_favorite': total_reactions['total_favorite'] or 0,
                    'total_clap': total_reactions['total_clap'] or 0
                }
                
                if comment.id not in unique_comment_ids:
                    unique_comment_ids.add(comment.id)
                    public_comments.append(comment_data)

        except:
            public_comments = []

        return public_comments, unique_comment_ids
    
    def get_subscription_comments(self, id, unique_comment_ids):
        """ Return subscription comments data """
        subscription_comments = []

        try:
            # Id validation
            if id == 'null':
                return subscription_comments

            # Is user exist validation
            is_user_exist = User.objects.filter(id=id).exists()
            if not is_user_exist:
                return subscription_comments
            
            subscription_obj = Subscription.objects.filter(standard_user_id=id, end_date__gte=datetime.now(), status='active').order_by('-created').only('id','commentator_user')
            for obj in subscription_obj:
                if Comments.objects.filter(commentator_user=obj.commentator_user, status='approve').exists():
                    subscription_comment = Comments.objects.filter(commentator_user=obj.commentator_user, status='approve').order_by('-created')

                    for comment in subscription_comment:
                        comment_data = CommentsSerializer(comment).data
                        date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")
                        comment_reactions = CommentReaction.objects.filter(comment=comment).values('like', 'favorite', 'clap')
                        total_reactions = comment_reactions.aggregate(
                            total_likes=Sum('like'),
                            total_favorite=Sum('favorite'),
                            total_clap=Sum('clap')
                        )
                        
                        # Update comment data
                        comment_data['date'] = date_obj.strftime("%d.%m.%Y") 
                        comment_data['total_reactions'] = {
                            'total_likes': total_reactions['total_likes'] or 0,
                            'total_favorite': total_reactions['total_favorite'] or 0,
                            'total_clap': total_reactions['total_clap'] or 0
                        }

                        if comment.id not in unique_comment_ids:
                            unique_comment_ids.add(comment.id)
                            subscription_comments.append(comment_data)

        except:
            subscription_comments = []
        
        return subscription_comments, unique_comment_ids
    
    def get_highlights(self, id):
        """ Return highlights data """
        highlights = []
        standard_user_id = id if id != 'null' else None

        try:
            # Validation
            standard_user_id = id if User.objects.filter(id=standard_user_id).exists() else None

            # Get data
            all_highlights = Highlight.objects.filter(status='active').order_by('-created').only('id')
            for obj in all_highlights:
                highlighted_data = HighlightSerializer(obj).data
                user_data = highlighted_data['user'] 

                count = Subscription.objects.filter(commentator_user=user_data['id']).count()
                highlighted_data['subscriber_count'] = count

                if standard_user_id:
                    highlighted_data['is_fav_editor'] = FavEditors.objects.filter(commentator_user_id=user_data['id'], standard_user_id=standard_user_id).exists()
                else:
                    highlighted_data['is_fav_editor'] = False

                highlights.append(highlighted_data)
        except:
            highlights = []
        
        return highlights
    

    def get_ads(self):
        """ Return advertisment data """
        try:
            ads = Advertisement.objects.all()
            serializer = AdvertisementSerializer(ads, many=True)
            data = serializer.data
            return data
        except:
            return []
    

    def get_following_user(self, id):
        """ Return following user data """
        following_user = []
        try:
            if id != 'null':
                if FollowCommentator.objects.filter(standard_user__id=id).exists():
                    following = FollowCommentator.objects.filter(standard_user__id=id).only('id', 'commentator_user')
                    for obj in following:
                        serializer = UserSerializer(obj.commentator_user).data
                        following_user.append(serializer)
        except:
            following_user = []
        
        return following_user
    

    def get_verify_ids(self):
        """ Return verify ids data """
        return list(BlueTick.objects.values_list('user_id', flat=True))

    def get_comment_reactions(self, id):
        """ Return comment reactions data """
        comment_reactions_data = []
        try:
            if id != 'null':
                if CommentReaction.objects.filter(user__id=id).exists():
                    cmt_reacts = CommentReaction.objects.filter(user__id=id).only('comment', 'like', 'favorite', 'clap')
                    for obj in cmt_reacts:
                        details = {
                            "comment_id":obj.comment.id,
                            "like":obj.like,
                            "favorite":obj.favorite,
                            "clap":obj.clap,
                        }
                        comment_reactions_data.append(details)
        except:
            comment_reactions_data = []
        
        return comment_reactions_data

    def get_commentator(self, id):
        """ Return commentator data """
        user_detail = []
        user_id = id if id != 'null' else None
        try:
            # Validation
            user_id = user_id if User.objects.filter(id=user_id).exists() else None

            # Get data
            all_commentator = User.objects.filter(~Q(id=user_id), user_role='commentator').order_by('-created').only('id')
            for obj in all_commentator:
                detail = {}
                count = Subscription.objects.filter(commentator_user_id=obj.id).count()
                user_data = UserSerializer(obj).data

                if user_id:
                    detail['is_fav_editor'] = FavEditors.objects.filter(commentator_user_id=user_data['id'], standard_user_id=user_id).exists()
                else:
                    detail['is_fav_editor'] = False
                
                detail['user'] = user_data
                detail['subscriber_count'] = count
                user_detail.append(detail)
        except:
            user_detail = []

        return user_detail

class RetrieveHomeView(APIView):
    """
    for Home page:
    """
    def get(self, request, format=None, *args, **kwargs):
        data_list = {
            "Public_Comments": [],
            "Subscription_Comments": [],
            "highlights": [],
            "ads": [],
            "following_user": [],
            "verify_ids": [],
            "comment_reactions": [],
        } # data_list to return in response
        
        # Instantiate RetrievePageData object
        retrieve_data = RetrievePageData()
        self.unique_comment_ids = set()

        # Get public comments data
        data_list['Public_Comments'], self.unique_comment_ids  = retrieve_data.get_public_comments(self.unique_comment_ids)

        # Get subscription comments data
        data_list['Subscription_Comments'], self.unique_comment_ids  = retrieve_data.get_subscription_comments(request.query_params.get('id'), self.unique_comment_ids)
      
        # Get highlights data
        data_list['highlights'] = retrieve_data.get_highlights(request.query_params.get('id'))
        
        # Get advertisment data
        data_list['ads'] = retrieve_data.get_ads()

        # Get following user data
        data_list['following_user'] = retrieve_data.get_following_user(request.query_params.get('id'))
        
        # Get verify ids data
        data_list['verify_ids'] = retrieve_data.get_verify_ids()

        # Get comment reactions data
        data_list['comment_reactions'] = retrieve_data.get_comment_reactions(request.query_params.get('id'))
        
        return Response(data=data_list, status=status.HTTP_200_OK)
    

class RetrieveEditorView(APIView):
    """
    Editor list view
    """
    def get(self, request, format=None, *args, **kwargs):
        data_list = {
            "Commentator": [],
        } # data_list to return in response

        # Instantiate RetrievePageData object
        retrieve_data = RetrievePageData()

        # Get commentator data
        data_list['Commentator'] = retrieve_data.get_commentator(request.query_params.get('id'))
        
        return Response(data=data_list, status=status.HTTP_200_OK)