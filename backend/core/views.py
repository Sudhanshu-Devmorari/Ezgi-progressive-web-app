from django.shortcuts import render
from core.utils import create_response, sms_send, get_league_data
from datetime import datetime, timedelta, date, time
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.db.models.functions import TruncDate
from django.db.models import Count, F, Value
from django.db.models import Q
from django.db.models import Sum
from django.db.models import Case, When, IntegerField
from django.db.models.functions import Coalesce
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

from collections import Counter, defaultdict
import math

# Models
from core.models import (User, FollowCommentator, Comments, Subscription, Notification, CommentReaction,
                          FavEditors, TicketSupport, ResponseTicket, Highlight, Advertisement, CommentatorLevelRule,
                          MembershipSetting, SubscriptionSetting, HighlightSetting, BecomeCommentator, BlueTick, DataCount,
                          TicketHistory, BecomeEditor, BecomeEditorEarnDetails, BankDetails, EditorBanner, MatchDetail,
                          PendingBalanceHistory, CommissionEarning, Withdrawable, BankUpdate, GiftSubscription, Otp, WithdrawalSetting)

# Serializers
from core.serializers import (UserSerializer, FollowCommentatorSerializer, CommentsSerializer,
                             SubscriptionSerializer, NotificationSerializer, CommentReactionSerializer, FavEditorsSerializer, 
                             TicketSupportSerializer, ResponseTicketSerializer, HighlightSerializer, AdvertisementSerializer,HighlightSettingSerializer,MembershipSettingSerializer,
                             SubscriptionSettingSerializer, CommentatorLevelRuleSerializer, BecomeCommentatorSerializer, BlueTickSerializer,
                             TicketHistorySerializer, BecomeEditorSerializer, BecomeEditorEarnDetailsSerializer, UpdateUserRoleSerializer, BankDetailsSerializer,
                             EditorBannerSerializer, PendingBalanceHistorySerializer, CommissionEarningSerializer, WithdrawableSerializer, BankUpdateSerializer,
                             GiftSubscriptionSerializer, WithdrawalSettingSerializer)
import pyotp
from django.contrib.auth import authenticate

# from translate import Translator
from googletrans import Translator
from core.models import BLUETICK_CHOISE
from core.models import DEACTIVATE_STATUS
import os
import string

class SignupUserExistsView(APIView):
    def post(self, request, format=None):
        try:
            if User.objects.filter(Q(username__iexact=request.data['username']) | Q(phone=request.data['phone']), is_admin=False, is_delete=False).exists():
                return Response({'data': 'User with the same username or phone number already exists', 'status': status.HTTP_400_BAD_REQUEST})
            else:
                return Response({'data': 'User can create', 'status': status.HTTP_200_OK})           
        except Exception as e:
            return Response(data=e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



def generate_otp():
    return random.randrange(100000,999999)

def send_otp(phone):
    otp = generate_otp()
    is_otp_obj = Otp.objects.filter(phone=phone).exists()
    
    if is_otp_obj:
        otp_obj = Otp.objects.get(phone=phone)
        otp_obj.otp = otp
        otp_obj.save(update_fields=['otp','updated'])
        return otp
    else:
        otp_obj = Otp.objects.create(otp=otp,phone=phone)
        return otp
    
class SignupView(APIView):
    def post(self, request, format=None):
        phone = request.data['phone']

        otp = send_otp(phone)

        res = sms_send(phone, otp)  
        if res == 'Success':
            return Response(data={'success': 'Otp successfully sent.', 'otp' : otp ,'status' : status.HTTP_200_OK})
        else:
            return Response(data={'error': 'Otp not sent. Try again.', 'status' : status.HTTP_500_INTERNAL_SERVER_ERROR})  
        return Response(data={'error': 'Something went wrong', 'status' : status.HTTP_500_INTERNAL_SERVER_ERROR})


class OtpVerify(APIView):
    def post(self, request):
        try:
            otp = request.data.get('otp')
            phone = request.data.get('phone')
            signup = request.data.get('signup')
            
            otp_obj = Otp.objects.get(phone=phone)
            expired_OTP_time = otp_obj.updated + timezone.timedelta(seconds=30)
            
            if otp_obj.otp != otp:
                return Response({'error': 'Invalid OTP.', 'status': status.HTTP_400_BAD_REQUEST})
            
            if timezone.now() > expired_OTP_time:
                otp_obj.otp = ''
                otp_obj.save(update_fields=['otp', 'updated'])
                return Response({'error': 'OTP has been expired!', 'status': status.HTTP_400_BAD_REQUEST})
            
            if signup:
                serializer = UserSerializer(data=request.data)
                if serializer.is_valid():
                    data = serializer.save()
                    otp_obj.delete()
                    return Response({'success': 'OTP successfully verified.', 'user': serializer.data, 'status': status.HTTP_200_OK})
                else:
                    return Response({'error': serializer.errors, 'status': status.HTTP_400_BAD_REQUEST})

            otp_obj.delete()
            return Response({'success': 'OTP successfully verified.', 'status': status.HTTP_200_OK})

        except Otp.DoesNotExist:
            return Response({'error': 'No OTP found for the given phone.', 'status': status.HTTP_404_NOT_FOUND})
        except Exception as e:
            return Response({'error': str(e), 'status': status.HTTP_500_INTERNAL_SERVER_ERROR})

class OtpReSend(APIView):
    def post(self, request, format=None, *args, **kwargs):
        phone = request.data['phone']
        try:
            if 'is_admin' in request.data:
                user = User.objects.filter(phone=phone, is_admin=True, is_delete=False).first()
            elif 'signup' in request.data:

                otp = send_otp(phone)

                res = sms_send(phone, otp)  
                if res == 'Success':
                    return Response(data={'success': 'Otp successfully sent.', 'otp' : otp ,'status' : status.HTTP_200_OK})
                else:
                    return Response(data={'error': 'Otp not sent. Try again.', 'status' : status.HTTP_500_INTERNAL_SERVER_ERROR})
            else:
                user = User.objects.filter(phone=phone, is_admin=False, is_delete=False).first()

            if not user:
                return Response({
                    'data':"User Doesn't exists.",
                    'status' : status.HTTP_404_NOT_FOUND
                })

            otp = send_otp(phone)
            res = sms_send(phone, otp)  
            if res == 'Success':
                return Response(data={'success': 'Otp successfully sent.', 'otp' : otp ,'status' : status.HTTP_200_OK})
            else:
                return Response(data={'error': 'Otp not sent. Try again.', 'status' : status.HTTP_500_INTERNAL_SERVER_ERROR})
        except:
            return Response({
                'data':"Something went wrong!",
                'status' : status.HTTP_404_NOT_FOUND
            })
        

class LoginView(APIView):

    def post(self, request, format=None):
        phone = request.data['phone']
        password = request.data['password']
        try:
            if 'is_admin' in request.data:
                user_phone = User.objects.filter(phone=phone, is_admin=True, is_delete=False).only('id', 'password', 'user_role', 'username').first()
            else:
                user_phone = User.objects.filter(phone=phone, is_delete=False).only('id', 'password', 'user_role', 'username').first()
            
            if not user_phone:
                return Response({
                    'data':"User Doesn't exists!",
                    'status' : status.HTTP_404_NOT_FOUND
                })

            if user_phone.password == password:
                return Response({'data' : "Login successfull!", 'userRole' : user_phone.user_role, 'userId' : user_phone.id, 'username' : user_phone.username, 'status' : status.HTTP_200_OK})
            else:
                return Response({'data' : 'Please enter your correct password.', 'status' : status.HTTP_400_BAD_REQUEST})
        except:
            return Response({
                'data':"Something went wrong!",
                'status' : status.HTTP_500_INTERNAL_SERVER_ERROR
            })

class GoogleLoginview(APIView):
    def post(self, request, format=None):
        email = request.data.get('email')
        try: 
            user = User.objects.get(Q(email=email) & Q(logged_in_using='google'))
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
        email = request.data.get('email')
        try: 
            user = User.objects.get(Q(email=email) & Q(logged_in_using='facebook'))
        except User.DoesNotExist:
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

            data_list['Commentator'] = user_detail
        except ObjectDoesNotExist:
            return Response(data={'error': 'No commentator found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            all_comments = Comments.objects.filter(status='approve', public_content=True).order_by('-created').only('id')
            data_list['Public_Comments'] = []

            for comment in all_comments:
                comment_data = CommentsSerializer(comment).data
                date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")
        
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
                            if comment.id not in unique_comment_ids:
                                unique_comment_ids.add(comment.id)
                                data_list['Subscription_Comments'].append(comment_data)

            else:
                data_list['Subscription_Comments'] = []
        except ObjectDoesNotExist:
            data_list['Subscription_Comments'] = []

        try:
            # for retrieving Highlights:
            standard_user_id = request.query_params.get('id') if request.query_params.get('id') != 'null' else None
            all_highlights = Highlight.objects.filter(status='active', user__is_admin=False).order_by('-created').only('id')
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
            data_list['verify_ids'] = list(BlueTick.objects.filter(status='approve').values_list('user_id', flat=True))
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

        # approved_comments = Comments.objects.filter(status='approve')
        # comment_queryset = approved_comments.annotate(
        #     has_purchased_highlight=Coalesce(
        #         F('commentator_user__highlight__pk'), Value(0)
        #     )
        # )
        # sorted_comments = comment_queryset.order_by('-has_purchased_highlight', '-commentator_user__success_rate')
        # cmt_serializer = CommentsSerializer(sorted_comments, many=True).data
        # data_list['cmt_serializer'] = cmt_serializer

        return Response(data=data_list, status=status.HTTP_200_OK)
    
class FollowCommentatorView(APIView):

    def get(self, request, id, format=None, *args, **kwargs):
        user = User.objects.get(id=id)

        try:
            if user.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            if user.is_active == False:
                return Response("Your account has been deactivated. Contact support for assistance.", status=status.HTTP_400_BAD_REQUEST)
            commentator_id = request.query_params.get('id')
            if commentator_id:
                commentator_obj = User.objects.get(id=commentator_id)
                
                if FollowCommentator.objects.filter(commentator_user=commentator_obj, standard_user=user).exists():
                    follow_commentator_obj = FollowCommentator.objects.filter(commentator_user=commentator_obj, standard_user=user)
                    for obj in follow_commentator_obj:
                        follow_commentator_obj.delete()
                    return Response(data={"message":f"You unfollowed the {commentator_obj}."}, status=status.HTTP_200_OK)
                else:
                    follow_commentator_obj = FollowCommentator.objects.create(commentator_user=commentator_obj, standard_user=user)
                    # send follow notification:
                    notification_obj = Notification.objects.create(sender=user, receiver=commentator_obj,date=datetime.today().date(), status=False, context=f'{user.username} started following you.', admin_context=f'{user.username} started following user {commentator_obj.username}.')
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
    def post(self, request, id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
            if user.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            if user.is_active == False:
                return Response({'data' : "Your account has been deactivated. Contact support for assistance."}, status=status.HTTP_400_BAD_REQUEST)
            if user.commentator_status != "active":
                return Response({'data' : f"Your editor account is currently {user.commentator_status}. Please renew your membership."}, status=status.HTTP_400_BAD_REQUEST)

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
                cmt_id = request.data.get('cmt_id')
                if user.commentator_level == 'apprentice':
                    public_content = True
                else:
                    public_content = request.data.get('public_content')
                comment = request.data.get('comment')

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
                if not comment:
                    raise NotFound("Comment not found.")
                
                match_data = get_league_data(category, league, date, match_detail)
                match_time = match_data[0].get('Time', None) if match_data else None
                match_time_obj =  datetime.strptime(match_time, '%H:%M:%S').time() if match_time else None
                
                if Comments.objects.filter(commentator_user=user,
                    category=[category],
                    country=country,
                    league=league,
                    date=date,
                    match_detail=match_detail).exists():
                    return Response(data={'error': "You've already commented on this match. Try another one."}, status=status.HTTP_404_NOT_FOUND)
                
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
                    comment=comment,
                    match_time=match_time_obj,
                    match_id=cmt_id[0]
                )

                if comment_obj != None:
                    if DataCount.objects.filter(id=1).exists():
                        obj = DataCount.objects.get(id=1)
                        obj.comment += 1
                        obj.save()
                    else:
                        obj = DataCount.objects.create(comment=1)
                # # send new Comment notification:
                # subscription_obj = Subscription.objects.filter(commentator_user=user)
                # for obj in subscription_obj:
                #     notification_obj = Notification.objects.create(sender=user,receiver=obj.standard_user,date=datetime.today().date(), status=False, context=f'{user.username} upload a new Comment.')

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
    def get(self, request, id=None, *args, **kwargs):
        try:
            s_user = User.objects.get(id=id)
            query_id = request.query_params.get('id', None)
            if query_id is not None:
                try:
                    a_user = User.objects.get(id=query_id, user_role='commentator')
                except ObjectDoesNotExist:
                    return Response({'data': 'Editor-User does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

                if Subscription.objects.filter(standard_user=s_user, commentator_user=a_user, status='active').exists():
                    subscription_plan = Subscription.objects.get(standard_user=s_user, commentator_user=a_user, status='active')
                    end_date = subscription_plan.end_date
                    return Response({'data': 'Your Subscription plan is already active.', 'end_date': end_date.date()}, status=status.HTTP_400_BAD_REQUEST)
                return Response({'data': 'Subscription purchase request.'}, status=status.HTTP_200_OK)
            else:
                return Response({'data': 'Admin-User Id not found.'}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'data': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'data': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def patch(self, request, id):
        try:
            user = User.objects.get(id=id)
            commentator = User.objects.get(id=request.query_params.get('commentator_id')) 
            is_subscription = Subscription.objects.filter(standard_user=user, commentator_user=commentator,status='active').exists()
            if is_subscription:
                subscription_obj = Subscription.objects.get(standard_user=user, commentator_user=commentator,status='active')
                # subscription_obj.status = 'deactive'
                subscription_obj.is_cancelled = True
                subscription_obj.label = 4
                subscription_obj.save(update_fields=['is_cancelled', 'label', 'updated'])

                Notification.objects.create(
                        sender=user,receiver=commentator, 
                        subject='Subscription Purchase', 
                        date=datetime.today().date(), 
                        status=False, context=f'{user.username}, canceled the subscription plan.', 
                    )
                return Response({'data':'Your subscription plan has been canceled.'}, status=status.HTTP_200_OK)
            else:
                return Response({'data':'Your subscription plan is not active'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'data': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                

    """
    Standard user purchase the NEW Subscription to view commentator post:
    """
    def post(self, request, id, format=None, *args, **kwargs):
        """
        Subscription purchase logic here, if purchase is successful, below code runs.
        """
        try:
            user = User.objects.get(id=id)
            commentator = User.objects.get(id=request.data.get('commentator_id')) 
            # if Subscription.objects.filter(commentator_user=commentator, standard_user=user, duration=duration, subscription=True, start_date=start_date, end_date=end_date, status='active', money=money).exists():
            #     return Response({'data': 'You already subscribe to this user.'}, status=status.HTTP_400_BAD_REQUEST)
            # is_subscription = Subscription.objects.filter(standard_user=user, commentator_user=commentator,status='active').exists()
            # if is_subscription:
            #     return Response({'data':'Your subscription plan is already active'}, status=status.HTTP_400_BAD_REQUEST)
            flag = False
            is_subscription = Subscription.objects.filter(standard_user=user, commentator_user=commentator,status='active').exists()
            if is_subscription:
                flag = True
                sub_obj = Subscription.objects.filter(standard_user=user, commentator_user=commentator,status='active').update(subscription=False, status='deactive', label=3)
            
            duration = request.data.get('duration')
            start_date = datetime.now()
            if (duration != "" and duration != None):
                # if duration == "1 Months":
                #     end_date = start_date + timedelta(days=30)
                # if duration == "3 Months":
                #     end_date = start_date + timedelta(days=90)
                # if duration == "6 Months":
                #     end_date = start_date + timedelta(days=180)
                # if duration == "1 Year":
                #     end_date = start_date + timedelta(days=365)
                end_date = start_date + timedelta(days=1)

                money = request.data.get('money')
            
            if flag:
                label = 5
            else:
                label = 1

            if user.user_role == 'commentator':
                Subscription_obj = Subscription.objects.create(commentator_user=commentator, standard_user=user, duration=duration, subscription=True,
                                                            start_date=start_date, end_date=end_date, status='active', money=money, label=label)
            elif user.user_role == 'standard':
                Subscription_obj = Subscription.objects.create(commentator_user=commentator, standard_user=user, duration=duration, subscription=True,
                                                            start_date=start_date, end_date=end_date, status='active', money=money, label=label)
                
            if not FollowCommentator.objects.filter(commentator_user=commentator, standard_user=user).exists():
                follow_commentator_obj = FollowCommentator.objects.create(commentator_user=commentator, standard_user=user)
                # send follow notification:
                notification_obj = Notification.objects.create(sender=user, receiver=commentator,date=datetime.today().date(), status=False, context=f'{user.username} started following you.', admin_context=f'{user.username} started following user {commentator.username}.')
        
            # send Subscription notification:
            notification_obj = Notification.objects.create(sender=user,receiver=commentator, subject='Purchase Transactions', date=datetime.today().date(), status=False, context=f'{user.username} Subscribe you.', admin_context=f'{user.username} subscribed to user {commentator.username} for {duration}.')
            if Subscription_obj != None:
                if DataCount.objects.filter(id=1).exists():
                    obj = DataCount.objects.get(id=1)
                    obj.subscription += 1
                    obj.save()
                else:
                    obj = DataCount.objects.create(subscription=1)

            if Subscription_obj is not None:
                level_obj = MembershipSetting.objects.get(commentator_level=commentator.commentator_level)
                calculation = (float(level_obj.commission_rate) * float(money)) / 100
                
                commission_obj = CommissionEarning.objects.create(user=commentator, total_amount=calculation)
                commission_obj.save()

                money_cal = money - calculation

                durations = {
                    "1 Month": 1,
                    "3 Month": 3,
                    "6 Month": 6,
                    "1 Year": 12,
                    "1 Months": 1,
                    "3 Months": 3,
                    "6 Months": 6,
                    "1 Years": 12,
                }

                duration_months = durations.get(duration)
                print('duration_months: ', duration_months)
                
                if duration_months:
                    monthly_cal = money_cal / duration_months
                    start_date = datetime.now().date()
                    for i in range(duration_months):
                        days = (i + 1) * 30

                        end_date = start_date + timedelta(days=days)

                        duration_label = f'{i + 1}-{duration_months}'
                        pending_history = PendingBalanceHistory.objects.create(date=end_date, user=user, editor=commentator, duration=duration_label, amount=monthly_cal)
                        pending_history.save()
                        print('pending_history: ', pending_history)

                duration_mapping = {
                    '1 month': 1,
                    '1 months': 1,
                    '3 month': 3,
                    '3 months': 3,
                    '6 month': 6,
                    '6 months': 6,
                    '1 year': 12,
                    '1 years': 12,
                }


                subscriptions = Subscription.objects.filter(commentator_user=commentator)

                total_months = 0

                for obj in subscriptions:
                    lower_duration = obj.duration.lower()
                    if lower_duration in duration_mapping:
                        total_months += duration_mapping[lower_duration]

                if BankDetails.objects.filter(user=commentator).exists():
                    level_obj = MembershipSetting.objects.get(commentator_level=commentator.commentator_level)
                    calculation = (float(level_obj.commission_rate) * float(money)) / 100
                    final_cal = money - calculation
                    balance_obj = BankDetails.objects.get(user=commentator)
                    balance_obj.total_balance += final_cal
                    balance_obj.pending_balance += final_cal
                    balance_obj.save(update_fields=['total_balance', 'pending_balance', 'updated'])                    

                else:
                    level_obj = MembershipSetting.objects.get(commentator_level=commentator.commentator_level)
                    calculation = (float(level_obj.commission_rate) * float(money)) / 100
                    final_cal = money - calculation
                    balance_obj = BankDetails.objects.create(user=commentator, total_balance=final_cal, pending_balance=final_cal)

                    # balance_obj.save()

            serializer = SubscriptionSerializer(Subscription_obj)
            data = serializer.data
            return Response({"data":data, "flag":flag}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'data': 'User Doen not exist'}, status=status.HTTP_400_BAD_REQUEST)


class NotificationView(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        user = User.objects.get(id=id)
        try:
            ten_days_ago = timezone.now() - timedelta(days=10)
            notification_obj = Notification.objects.filter(receiver=user).exclude(sender=user).order_by('-created')[:30]
            flash_notification_obj = Notification.objects.filter(Q(Q(subject="Level Upgrade") | Q(subject="Membership Plan Expires") | Q(subject="Membership Remainder")), receiver=user, status=False).order_by("-created")
            serializer = NotificationSerializer(notification_obj, many=True)
            serializer1 = NotificationSerializer(flash_notification_obj, many=True)
            # data = serializer.data
            # data['flash_notification'] = serializer1.data
            data = {
                'notifications': serializer.data,
                'flash_notification': serializer1.data
            }
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
                if request.data['update-status']:
                    ids = request.data['update-status'] if request.data['update-status'] else []
                    notifications = Notification.objects.filter(id__in=ids).update(status=True)
                    return Response({'data' : 'Notifications updated successfully'}, status=status.HTTP_200_OK)

            else:
                return Response({"error": "Request data is missing"}, status=status.HTTP_400_BAD_REQUEST)
        except Notification.DoesNotExist:
            return Response({"error": "Notification not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CommentReactionView(APIView):

    def post(self, request, comment_id, id, format=None, *args, **kwargs):
        
        comment = Comments.objects.filter(id=comment_id).exists()
        if not comment:
            return Response({'error': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)
        comment_obj_ = Comments.objects.get(id=comment_id)

        is_user_exist = User.objects.filter(id=id).exists()
        if not is_user_exist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        user = User.objects.get(id=id)
        if user.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
        if not user.is_active:
            return Response({'error' : 'Your account has been deactivated. Contact support for assistance.'}, status=status.HTTP_400_BAD_REQUEST)

        reaction_type = request.data.get('reaction_type') 
        if reaction_type not in ('like', 'favorite', 'clap'):
            return Response({'error': 'Invalid reaction type'}, status=status.HTTP_400_BAD_REQUEST)

        comment_reaction = CommentReaction.objects.filter(comment_id=comment_id, user_id=id).first()
        
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
                notification_obj = Notification.objects.create(sender=user, receiver=comment_obj_.commentator_user, subject='Interactions', date=datetime.today().date(), status=False, context=f'{user.username} {reaction_type} the comment {comment_obj_.match_detail}.', admin_context=f'{user.username} {reaction_type} the comment of user {comment_obj_.commentator_user.username} on the {comment_obj_.match_detail} match.')

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
            
            setattr(comment_reaction, reaction_type, None)
            comment_reaction.save(update_fields=[reaction_type,'updated'])
            notification_obj = Notification.objects.create(sender=user, receiver=comment_obj_.commentator_user, subject='Interactions', date=datetime.today().date(), status=False, context=f'{user.username} removed the {reaction_type} for comment {comment_obj_.match_detail}.', admin_context=f'{user.username} removed the {reaction_type} for comment of user {comment_obj_.commentator_user.username} on the {comment_obj_.match_detail} match.')

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
            
            setattr(comment_reaction, reaction_type, 1)
            comment_reaction.save(update_fields=[reaction_type,'updated'])
            notification_obj = Notification.objects.create(sender=user, receiver=comment_obj_.commentator_user, subject='Interactions', date=datetime.today().date(), status=False, context=f'{user.username} {reaction_type} the comment {comment_obj_.match_detail}.', admin_context=f'{user.username} {reaction_type} the comment of user {comment_obj_.commentator_user.username} on the {comment_obj_.match_detail} match.')

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
            if user_obj.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            serializer = UserSerializer(user_obj)
            data = serializer.data

            standard_user_id = request.query_params.get('id') if request.query_params.get('id') != 'null' else None

            if user_obj.user_role == 'commentator':
                follow_obj = FollowCommentator.objects.filter(commentator_user=user_obj, standard_user__is_delete=False).count()
                data['Follower_Count'] = follow_obj

                subscriber_obj = Subscription.objects.filter(commentator_user=user_obj, standard_user__is_delete=False, status='active').count()
                data['Subscriber_Count'] = subscriber_obj

                comment_obj = Comments.objects.filter(commentator_user=user_obj).exclude(status='reject')
                data['Comment_Count'] = comment_obj.count()

                win_count = comment_obj.filter(is_prediction=True).count()
                lose_count = comment_obj.filter(is_prediction=False).count()
                data['win'] = win_count
                data['lose'] = lose_count
                
                if standard_user_id:
                    logged_in_user = User.objects.get(id=standard_user_id)
                    is_subscribe = Subscription.objects.filter(standard_user=logged_in_user, status='active', commentator_user=user_obj).exists()
                    data['is_subscribe'] = is_subscribe
                    if is_subscribe:
                        subscription = Subscription.objects.get(standard_user=logged_in_user, status='active', commentator_user=user_obj)
                        data['is_cancelled'] = subscription.is_cancelled
                        # if subscription.is_cancelled:
                        data['subscription_end_date'] = subscription.end_date

            else:
                subscription_obj = Subscription.objects.filter(standard_user=user_obj).count()
                data['Subscription_Count'] = subscription_obj

                following_obj = FollowCommentator.objects.filter(standard_user=user_obj).count()
                data['Follow_Up_Count'] = following_obj         

            if standard_user_id:
               data['is_fav_editor'] = FavEditors.objects.filter(commentator_user_id=data['id'], standard_user_id=standard_user_id).exists()
            else:
                data['is_fav_editor'] = False
            return Response(data=data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            
            return Response(data={'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)        

    def post(self, request, id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'User not found', 'status' : status.HTTP_404_NOT_FOUND})

        if user.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
        if not user.is_active:
            return Response({'error' : 'Your account has been deactivated. Contact support for assistance.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if 'profile' in request.data['update']:

            if 'file' not in request.data:
                return Response({'error': 'No file found', 'status' : status.HTTP_400_BAD_REQUEST})
            elif 'file' in request.data:
                profile_pic = request.data['file']
                user.profile_pic = profile_pic
                
                
        elif 'comment' in request.data['update']:

            if 'description' in request.data:
                description = request.data['description']
                user.description = description
            if 'description' not in request.data:
                return Response({'error': 'No description found', 'status' : status.HTTP_400_BAD_REQUEST})
        user.save(update_fields=['profile_pic', 'description', 'updated'])

        serializer = UserSerializer(user)
        return Response({ 'data' : serializer.data, 'status' : status.HTTP_200_OK})
        

class FavEditorsCreateView(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        data = []
        try:
            user = get_object_or_404(User, id=id)
            editor = request.query_params.get('commentator')

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

                if user.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
                
                if not user.is_active:
                    return Response({'error' : 'Your account has been deactivated. Contact support for assistance..'}, status=status.HTTP_400_BAD_REQUEST)

                if 'id' not in request.data:
                    return Response({'error': 'Commentator Id not found.'}, status=status.HTTP_400_BAD_REQUEST)

                commentator_id = request.data.get("id")
                comment = User.objects.get(id=commentator_id)

                response_data = {'user_id': commentator_id}
                if not FavEditors.objects.filter(commentator_user=comment, standard_user=user).exists():
                    editor_obj = FavEditors.objects.create(commentator_user=comment, standard_user=user)
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
        user = User.objects.get(id=id)
        if user.is_delete == True:
            return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
        try:
            editor = []
            editor_obj = FavEditors.objects.filter(standard_user_id=id, commentator_user__is_delete=False)
            for obj in editor_obj:
                details = {}

                # FavEditor data
                serializer = FavEditorsSerializer(obj)
                data_c = Comments.objects.filter(commentator_user=obj.commentator_user).only('id','is_prediction')
                win_count = data_c.filter(is_prediction=True).count()
                lose_count = data_c.filter(is_prediction=False).count()
                serializer.data['commentator_user']['win'] = win_count
                serializer.data['commentator_user']['lose'] = lose_count
                data = serializer.data
                details['data'] = data

                is_subscribe = Subscription.objects.filter(standard_user=user, commentator_user=obj.commentator_user, status='active').exists()
                details['is_subscribe'] = is_subscribe
                is_highlight = Highlight.objects.filter(user=obj.commentator_user, status='active').exists()
                details['is_highlight'] = is_highlight
                
                # Subscribe count
                count = Subscription.objects.filter(commentator_user=obj.commentator_user, standard_user__is_delete=False).count()
                details['subscriber_count'] = count

                editor.append(details)

            data_list['favEditors'] = editor
        except Exception as e:
            return Response(data={'error': 'Error retrieving favorite editors'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            comment_obj = CommentReaction.objects.filter(user_id=id, favorite=1, comment__commentator_user__is_delete=False)
            details = []
            for obj in comment_obj:
                data_c = Comments.objects.filter(commentator_user=obj.user, commentator_user__is_delete=False).only('id','is_prediction')
                win_count = data_c.filter(is_prediction=True).count()
                lose_count = data_c.filter(is_prediction=False).count()
                comment_data = CommentsSerializer(obj.comment).data
                comment_data['commentator_user']['win'] = win_count
                comment_data['commentator_user']['lose'] = lose_count
                date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")

                is_subscribe = Subscription.objects.filter(standard_user=user, commentator_user=obj.comment.commentator_user, status='active').exists()
                comment_data['is_subscribe'] = is_subscribe
                is_highlight = Highlight.objects.filter(user=obj.comment.commentator_user, status='active').exists()
                comment_data['is_highlight'] = is_highlight

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
            if user.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            support_obj = TicketSupport.objects.filter(user=user).order_by('-created')
            serializer = TicketSupportSerializer(support_obj, many=True)
            data = serializer.data
            return Response(data=data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # for create new ticket:
    def post(self, request, id, format=None, *args, **kwargs):
        try:
            if request.data:
                if 'department' not in request.data:
                        return Response({'error': 'Department not found.', 'status' : status.HTTP_400_BAD_REQUEST})
                if 'subject' not in request.data:
                        return Response({'error': 'Subject not found.', 'status' : status.HTTP_400_BAD_REQUEST})
                if 'message' not in request.data:
                        return Response({'error': 'Message not found.', 'status' : status.HTTP_400_BAD_REQUEST})
                # user = request.user
                user = User.objects.get(id=id)
                if user.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
                support_obj = TicketSupport.objects.create(user=user, department=request.data.get('department'), 
                                                        subject=request.data.get('subject'), message=request.data.get('message'))
                if support_obj != None:
                    ticket_obj = TicketHistory.objects.create(
                        user=user,
                        ticket_support=support_obj,
                        status='create',
                        message=request.data.get('message')
                    )
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
        serializer['admin_response'] = ResponseTicketSerializer(ticket_history.response_ticket).data if ticket_history else None

        
        history = TicketHistory.objects.filter(ticket_support=support_obj).order_by('-created')[:2]
        history_serializer = TicketHistorySerializer(history, many=True).data

        return Response(data=history_serializer, status=status.HTTP_200_OK)
        # return Response(data=serializer, status=status.HTTP_200_OK)


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
                ticket_obj.user_label = 'you responded'
                ticket_obj.admin_label = 'user responded'
                ticket_obj.save()

            if ticket_obj != None:
                ticket_obj.watched = False
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
            if user.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            if request.data:
                if 'ticket_id' not in request.data:
                    return Response({'error': 'Ticket-id not found.'}, status=status.HTTP_400_BAD_REQUEST)

                ticket_id = request.data.get('ticket_id')
                ticket_obj = TicketSupport.objects.get(id=ticket_id)

                # Ensure the ticket belongs to the current user (optional check)
                if ticket_obj.user != user:
                    return Response({'error': 'This ticket does not belong to the you.'}, status=status.HTTP_403_FORBIDDEN)

                ticket_obj.status = 'resolved'
                ticket_obj.user_label = 'resolved'
                ticket_obj.admin_label = 'resolved'
                ticket_obj.save()
                # ticket_obj.save(update_fields=['status', 'updated'])

                notification_obj = Notification.objects.create(
                        receiver=ticket_obj.user, 
                        subject='Support ticket',
                        date=datetime.now().date(), 
                        status=False,
                        context=f'Your ticket with the subject "{ticket_obj.subject}" has been successfully resolved.',
                    )

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
        user = User.objects.get(id=id)
        if user.is_delete == True:
            return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
        data_list = {}

        logged_in_user = request.query_params.get('logged_in_user', None)
        if logged_in_user is not None:
            logged_in_user_instance = User.objects.get(id=logged_in_user)

        try:
            details =[]
            all_active_comment = Comments.objects.filter(commentator_user_id=id, is_resolve=False).exclude(status='reject').only('id').order_by('-created')
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

                is_subscribe = Subscription.objects.filter(standard_user=logged_in_user_instance, commentator_user=obj.commentator_user, status='active').exists()
                comment_data['is_subscribe'] = is_subscribe

            data_list['active_comments'] = details
        except Comments.DoesNotExist:
            data_list['active_comments'] = []

        try:
            details =[]
            all_resolved_comment = Comments.objects.filter(commentator_user_id=id, is_resolve=True).exclude(status='reject').only('id').order_by('-created')
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

                is_subscribe = Subscription.objects.filter(standard_user=logged_in_user_instance, commentator_user=obj.commentator_user, status='active').exists()
                comment_data['is_subscribe'] = is_subscribe

                details.append(comment_data)
            data_list['resolved_comments'] = details
        except Comments.DoesNotExist:
            data_list['resolved_comments'] = []

        return Response(data=data_list, status=status.HTTP_200_OK)


class RetrieveSubscriberListAndSubscriptionList(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        user = User.objects.get(id=id)
        if user.is_delete == True:
            return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
        data_list = {}
        try:
            if user.user_role == 'commentator':
                subscriptions = []
                # my_subscribers = Subscription.objects.filter(commentator_user=user).order_by('-created')
                # serializer = SubscriptionSerializer(my_subscribers, many=True)
                # data_list['subscribers'] = serializer.data 
                my_subscribers = Subscription.objects.filter(commentator_user=user).order_by('-created')
                for obj in my_subscribers:
                    subscriptions.append(obj.standard_user.id)
                sup_commentator_users_id = list(set(subscriptions))
                sup_detail = []
                for id in sup_commentator_users_id:
                    subscriptions_obj = Subscription.objects.filter(standard_user__id=id, commentator_user=user).order_by('-created').first()
                    serializer1 = SubscriptionSerializer(subscriptions_obj).data
                    sup_detail.append(serializer1)
                data_list['subscribers'] = sup_detail

                commentator_users = []
                my_subscription = Subscription.objects.filter(standard_user=user).order_by('-created')
                for obj in my_subscription:
                    commentator_users.append(obj.commentator_user.id)
                
                commentator_users_id = list(set(commentator_users))
                details = []
                for id in commentator_users_id:
                    subscriptions_obj = Subscription.objects.filter(standard_user=user, commentator_user__id=id).order_by('-created').first()
                    serializer1 = SubscriptionSerializer(subscriptions_obj).data
                    details.append(serializer1)
                data_list['subscription'] = details
            else:
                # my_subscription = Subscription.objects.filter(standard_user=user).order_by('-created')
                # serializer = SubscriptionSerializer(my_subscription, many=True)
                # data_list['subscription'] = serializer.data
                commentator_users = []
                my_subscription = Subscription.objects.filter(standard_user=user).order_by('-created')
                for obj in my_subscription:
                    commentator_users.append(obj.commentator_user.id)
                
                commentator_users_id = list(set(commentator_users))
                details = []
                for id in commentator_users_id:
                    subscriptions_obj = Subscription.objects.filter(standard_user=user, commentator_user__id=id).order_by('-created').first()
                    serializer1 = SubscriptionSerializer(subscriptions_obj).data
                    details.append(serializer1)
                data_list['subscription'] = details
                    
            return Response(data=data_list, status=status.HTTP_200_OK) 
             
        except ObjectDoesNotExist as e:
            error_message = {"error": "Object does not exist."}
            return Response(data=error_message, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            error_message = {"error": "An unexpected error occurred."}
            return Response(data=e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class DeactivateProfile(APIView):
    def get(self, request, format=None, *args, **kwargs):
        user = request.user
        if user.user_role == 'standard':
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

    def get(self, request, *args, **kwargs):
        
        print("request.query_param.get('id', None): ", request.query_params.get('id', None))
        if request.query_params.get('id', None) != None:
            user = User.objects.get(id=request.query_params.get('id'))
            if Highlight.objects.filter(user=user,status='active').exists():
                highlight_plan = Highlight.objects.get(user=user,status='active')
                end_date = highlight_plan.end_date
                return Response({'data':'Your highlight plan is already active.', 'end_date': end_date}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'data' : 'Highlight purchase request'}, status=status.HTTP_200_OK)
        return Response({'data': 'User id not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request, format=None, *args, **kwargs):
        """
        if highlight purchase sucessfull then below code work
        """
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

                # if duration == "1 Week":
                #     end_date = start_date + timezone.timedelta(days=7)
                # elif duration == "2 Week":
                #     end_date = start_date + timezone.timedelta(days=14)
                # else:  # duration == "1 Month"
                #     end_date = start_date + timezone.timedelta(days=30)
                end_date = start_date + timezone.timedelta(days=1)
                
                user = User.objects.get(id=request.data['id'])

                if Highlight.objects.filter(user=user,status='active').exists():
                    return Response({'data':'Your highlight plan is already active.'}, status=status.HTTP_400_BAD_REQUEST)

                highlight_obj = Highlight.objects.create(user=user, duration=duration, start_date=start_date, end_date=end_date, money=money, highlight=True, status='active')
                if highlight_obj != None:
                    admin_user = User.objects.get(phone='5123456789', is_admin=True)

                    notification_obj = Notification.objects.create(
                            sender=admin_user,
                            receiver=user, 
                            subject='Purchase Transactions', 
                            date=datetime.today().date(), 
                            status=False, context=f'Congratulations! Your profile and comments are now listed at the top.', 
                            admin_context=f'{user.username} purchase the highlights for {duration}.'
                        )
                    
                    if DataCount.objects.filter(id=user.id).exists():
                        obj = DataCount.objects.get(id=user.id)
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
                return Response({'message': 'User does not have active membership for at least 3 months.'}, status=status.HTTP_400_BAD_REQUEST)

        except BecomeCommentator.DoesNotExist:
            return Response({'message': 'User does not have an active membership.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'message': 'An error occurred while processing the request.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AdminMainPage(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}
        previous_24_hours = timezone.now() - timedelta(hours=24)
        previous_day = datetime.now() - timedelta(days=1)

        user_id = request.query_params.get('id')
        user = User.objects.get(id=user_id)

        try:
            if user.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            try:
                """user percentage"""
                deleted_users_count = User.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, is_delete=True).count()
                users_previous_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, is_delete=False).count()
                users_before_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                count = (users_before_24_hours - deleted_users_count) + users_previous_24_hours
                user_percentage = ((count-users_before_24_hours)/users_before_24_hours) * 100
                data_list['new_user_percentage'] = user_percentage
            except:
                data_list['new_user_percentage'] = 0
            
            try:
                """editor percentage"""
                deleted_editor_count = User.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, is_delete=True, user_role='commentator').count()
                editor_previous_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, is_delete=False, user_role='commentator').count()
                editor_before_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours, user_role='commentator').count()
                count = (editor_before_24_hours - deleted_editor_count) + editor_previous_24_hours
                editor_percentage = ((count-editor_before_24_hours)/editor_before_24_hours) * 100
                data_list['new_editor_percentage'] = editor_percentage
            except:
                data_list['new_editor_percentage'] = 0

            try:
                """Subscribers percentage"""
                status_changed_to_pending = Subscription.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, status='pending').count()
                new_subscriptions = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, status='active').count()
                subscriptions_before_24_hours = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                count = (subscriptions_before_24_hours - status_changed_to_pending) + new_subscriptions
                subscriptions_percentage = ((count-subscriptions_before_24_hours)/subscriptions_before_24_hours) * 100
                data_list['new_subscriptions_percentage'] = subscriptions_percentage
            except:
                data_list['new_subscriptions_percentage'] = 0

            try:
                """Comments percentage"""
                status_changed_to_reject = Comments.objects.annotate(date_updated=TruncDate('updated')).filter(status='reject', date_updated__gte=previous_24_hours).count()
                new_pending_comments = Comments.objects.annotate(date_created=TruncDate('created')).filter(status='pending', date_created__gte=previous_24_hours).count()
                comments_before_24_hours = Comments.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                count = (comments_before_24_hours - status_changed_to_reject) + new_pending_comments
                comments_percentage = ((count-comments_before_24_hours)/comments_before_24_hours) * 100
                data_list['comments_percentage'] = comments_percentage
            except:
                data_list['comments_percentage'] = 0

            try:
                """Sales percentage"""
                status_changed_to_pending = BecomeCommentator.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, status='pending').count()
                new_subscriptions = BecomeCommentator.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, status='active').count()
                subscriptions_before_24_hours = BecomeCommentator.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                count = (subscriptions_before_24_hours - status_changed_to_pending) + new_subscriptions
                sales_percentage = ((count-subscriptions_before_24_hours)/subscriptions_before_24_hours) * 100
                # data_list['new_sales_percentage'] = sales_percentage
            except:
                sales_percentage = 0

            try:
                """Subscribers percentage"""
                status_changed_to_pending = Subscription.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, status='pending').count()
                new_subscriptions = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, status='active').count()
                subscriptions_before_24_hours = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                count = (subscriptions_before_24_hours - status_changed_to_pending) + new_subscriptions
                subscriptions_percentage = ((count-subscriptions_before_24_hours)/subscriptions_before_24_hours) * 100
                # data_list['new_subscriptions_percentage'] = subscriptions_percentage
            except:
                subscriptions_percentage = 0

            try:
                """Highlights percentage"""
                highlights_status_changed_to_pending = Highlight.objects.annotate(date_updated=TruncDate('updated')).filter(status='pending', date_updated__gte=previous_24_hours).count()
                highlights_purchased = Highlight.objects.annotate(date_created=TruncDate('created')).filter(status='active', highlight=True, date_created__gte=previous_24_hours).count()
                highlights_before_24_hours = Highlight.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                highlights_count = (highlights_before_24_hours - highlights_status_changed_to_pending) + highlights_purchased
                highlights_percentage = ((highlights_count-highlights_before_24_hours)/highlights_before_24_hours) * 100
                # data_list['new_highlights_percentage'] = highlights_percentage
            except:
                highlights_percentage = 0


            new_user = User.objects.filter(created__gte=previous_day, created__lt=datetime.now()).count()
            data_list['new_user'] = new_user

            new_editor = User.objects.filter(user_role='commentator', created__gte=previous_day, created__lt=datetime.now()).count()
            data_list['new_editor'] = new_editor

            new_subscriber = Subscription.objects.filter(created__gte=previous_day, created__lt=datetime.now()).count()
            data_list['new_subscriber'] = new_subscriber

            new_comment = Comments.objects.filter(status='pending',created__gte=previous_day, created__lt=datetime.now()).count()
            data_list['new_comment'] = new_comment

            cal_ = 0

            plan_sale_obj_cal = BecomeCommentator.objects.filter(commentator=True, created__gte=previous_day, created__lt=datetime.now())
            for obj in plan_sale_obj_cal:
                if obj.money is not None:
                    cal_ += obj.money

            subscription_obj_cal = Subscription.objects.filter(subscription=True, created__gte=previous_day, created__lt=datetime.now())
            for obj in subscription_obj_cal:
                if obj.money is not None:
                    cal_ += obj.money

            highlights_obj_cal = Highlight.objects.filter(highlight=True, created__gte=previous_day, created__lt=datetime.now())
            for obj in highlights_obj_cal:
                if obj.money is not None:
                    cal_ += obj.money

            data_list['daily'] = cal_
            data_list['daily_percentage'] = (sales_percentage + subscriptions_percentage + highlights_percentage) / 3

            all_user = User.objects.filter(is_delete=False,is_admin=False, is_active=True).exclude(user_role='sub_user').order_by('-created')
            serializer = UserSerializer(all_user, many=True)
            data = serializer.data
            data_list['users_list'] = data

            withdrawable = Withdrawable.objects.filter(status="pending").count()
            data_list['withdrawable'] = withdrawable

            return Response(data=data_list, status=status.HTTP_200_OK)

        except Exception as e:
            # Handle the exception appropriately, you can log it or return an error response.
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
from rest_framework.authtoken.models import Token
class UserManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}
        now = timezone.now()
        previous_24_hours = now - timedelta(hours=24)


        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            try:
                """user percentage"""
                deleted_users_count = User.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, is_delete=True).count()
                users_previous_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, is_delete=False).count()
                users_before_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                count = (users_before_24_hours - deleted_users_count) + users_previous_24_hours
                user_percentage = ((count-users_before_24_hours)/users_before_24_hours) * 100
                data_list['new_user_percentage'] = user_percentage
            except:
                data_list['new_user_percentage'] = 0
            
            try:
                """editor percentage"""
                deleted_editor_count = User.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, is_delete=True, user_role='commentator').count()
                editor_previous_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, is_delete=False, user_role='commentator').count()
                editor_before_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours, user_role='commentator').count()
                count = (editor_before_24_hours - deleted_editor_count) + editor_previous_24_hours
                editor_percentage = ((count-editor_before_24_hours)/editor_before_24_hours) * 100
                data_list['new_editor_percentage'] = editor_percentage
            except:
                data_list['new_editor_percentage'] = 0

            try:
                """Subscribers percentage"""
                status_changed_to_pending = Subscription.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, status='pending').count()
                new_subscriptions = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, status='active').count()
                subscriptions_before_24_hours = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                count = (subscriptions_before_24_hours - status_changed_to_pending) + new_subscriptions
                subscriptions_percentage = ((count-subscriptions_before_24_hours)/subscriptions_before_24_hours) * 100
                data_list['new_subscriptions_percentage'] = subscriptions_percentage
            except:
                data_list['new_subscriptions_percentage'] = 0


            new_user = User.objects.all().count()
            data_list['new_user'] = new_user

            new_editor = User.objects.filter(user_role='commentator').count()
            data_list['new_editor'] = new_editor

            new_subscriber = Subscription.objects.all().count()
            data_list['new_subscriber'] = new_subscriber

            # all_user = User.objects.filter(is_delete=False).order_by('-created')
            user_data = []
            all_user = User.objects.filter(is_delete=False, is_active=True).exclude(user_role='sub_user').order_by('-created')
            for obj in all_user:
                serializer = UserSerializer(obj).data
                if GiftSubscription.objects.filter(user__username=obj.username).exists():
                    gift_obj = GiftSubscription.objects.filter(user=obj).order_by('-created').first()
                    serializer['subscription'] = True
                    serializer['duration'] = gift_obj.duration
                    serializer['number'] = gift_obj.editor_count
                    serializer['level'] = gift_obj.editor_level
                    
                user_data.append(serializer)

            data_list['users_list'] = user_data

            all_notification = Notification.objects.all().exclude(admin_context = None).order_by('-created')
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
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            if adminuser.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            username = request.data['username']
            if User.objects.filter(username=username).exists():
                return Response({'error': 'This username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)
            phone = request.data['phone']
            if User.objects.filter(phone=phone).exists():
                return Response({'error': 'User already present with this number.'}, status=status.HTTP_400_BAD_REQUEST)
            profile = request.FILES.get('file')
            date = request.data.get('date')
            name = request.data['name']
            password = request.data['password']
            gender = request.data['gender']
            age = request.data['age']

            subscription = request.data.get('subscription')
            if subscription == 'True':

                if request.data.get('duration').lower() == 'undefined':
                    return Response({'error': 'Duration is not defined for free subscription.'}, status=status.HTTP_400_BAD_REQUEST)
                if request.data.get('number').lower() == 'undefined':
                    return Response({'error': "Number of editor's is not defined for free subscription."}, status=status.HTTP_400_BAD_REQUEST)
                if request.data.get('level').lower() == 'undefined':
                    return Response({'error': "Editor's level is not defined for free subscription."}, status=status.HTTP_400_BAD_REQUEST)

                duration = request.data.get('duration')
                number = request.data.get('number')
                editor_level = request.data.get('level')

                if editor_level.lower() == 'expert':
                    editor_level = 'master'
                else:
                    editor_level = request.data.get('level').lower()

                user_obj = User.objects.create(profile_pic=profile,
                    name=name, username=username, phone=phone,
                    password=password, gender=gender, age=age
                        )
                user_obj.save()


                tokenobj = Token.objects.create(user=user_obj)
                print("\n ====>tokenobj", tokenobj)
                gift_obj = GiftSubscription.objects.create(user=user_obj, duration=duration, editor_count=number, editor_level=editor_level)
                gift_obj.save()
                
            else:
                user_obj = User.objects.create(profile_pic=profile,
                    name=name, username=username, phone=phone,
                    password=password, gender=gender, age=age
                )
                user_obj.save()
                print("Type :", type(user_obj))
                tokenobj = Token.objects.create(user=user_obj)
                print("\n ====>tokenobj", tokenobj)

            if user_obj != None:
                if DataCount.objects.filter(id=1).exists():
                    obj = DataCount.objects.get(id=1)
                    obj.user += 1
                    obj.save()
                else:
                    obj = DataCount.objects.create(user=1)
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
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            if adminuser.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            
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
            if request.data.get('subscription') == 'True':
                if request.data.get('duration').lower() == 'undefined':
                    return Response({'error': 'Duration is not defined for free subscription.'}, status=status.HTTP_400_BAD_REQUEST)
                if request.data.get('number').lower() == 'undefined':
                    return Response({'error': "Number of editor's is not defined for free subscription."}, status=status.HTTP_400_BAD_REQUEST)
                if request.data.get('level').lower() == 'undefined':
                    return Response({'error': "Editor's level is not defined for free subscription."}, status=status.HTTP_400_BAD_REQUEST)

                duration = request.data.get('duration')
                number = request.data.get('number')
                editor_level = request.data.get('level')

                if editor_level.lower() == 'expert':
                    editor_level = 'master'
                else:
                    editor_level = request.data.get('level').lower()

                if not GiftSubscription.objects.filter(user=user, duration=duration, editor_count=number, editor_level=editor_level).exists():
                    obj = GiftSubscription.objects.create(user=user, duration=duration, editor_count=number, editor_level=editor_level)
                    obj.save()
                    serializer1 = GiftSubscriptionSerializer(obj)

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
                    pass
            
            # duration = request.data.get('duration')
            # start_date = datetime.now()
            # if duration == "1 Month":
            #     end_date = start_date + timedelta(days=30)
            # if duration == "3 Month":
            #     end_date = start_date + timedelta(days=90)
            # if duration == "6 Month":
            #     end_date = start_date + timedelta(days=180)
            
            # editor_obj = BecomeCommentator.objects.create(user=user, duration=duration, status='active', commentator=True, end_date=end_date)
            # editor_obj.save()
            # if editor_obj != None:
            #     if DataCount.objects.filter(id=1).exists():
            #         obj = DataCount.objects.get(id=1)
            #         obj.editor += 1
            #         obj.save()
            #     else:
            #         obj = DataCount.objects.create(editor=1)
            # serializer = BecomeCommentatorSerializer(editor_obj)
            # data = serializer.data
            # return Response(data=data, status=status.HTTP_200_OK)

            
    def delete(self, request, pk, format=None, *args, **kwargs):
        """
        Deactivate or delete user.
        """
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            if adminuser.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            
            user = User.objects.get(pk=pk)
            action = request.query_params.get('action')
            if action == 'delete':
                try:
                    user.delete()
                    return Response("User deleted Successfully", status= status.HTTP_200_OK)
                except Exception as e:
                    return Response({"error": f"Failed to delete user: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
            elif action == 'remove':
                # if user.user_role == "standard":

                # delete  match
                is_match_exist = MatchDetail.objects.filter(comment__commentator_user=user).exists()
                if is_match_exist:
                    MatchDetail.objects.filter(comment__commentator_user=user).delete()

                # delete comments reactions
                is_comments_reac_exist = CommentReaction.objects.filter(comment__commentator_user=user).exists()
                if is_comments_reac_exist:
                    CommentReaction.objects.filter(comment__commentator_user=user).delete()
                    
                # delete comments
                is_comments_exist = Comments.objects.filter(commentator_user=user).exists()
                if is_comments_exist:
                    Comments.objects.filter(commentator_user=user).delete()

                # delete subscription 
                is_subcription_exist = Subscription.objects.filter(standard_user=user).exists()
                if is_subcription_exist:
                    Subscription.objects.filter(standard_user=user).update(status='deactive')   
                    # Subscription.objects.filter(standard_user=user).delete()  
                                        
                # delete notifications 
                is_notifications_exist = Notification.objects.filter(sender=user,receiver=user).exists()
                if is_notifications_exist:
                    Notification.objects.filter(sender=user,receiver=user).delete()

                # delete tickets response
                is_tickets_res_exist = ResponseTicket.objects.filter(user=user).exists()
                if is_tickets_res_exist:
                    ResponseTicket.objects.filter(user=user).delete()   

                # delete tickets history
                is_tickets_history_exist = TicketHistory.objects.filter(user=user).exists()
                if is_tickets_history_exist:
                    TicketHistory.objects.filter(user=user).delete()  

                # delete tickets 
                is_tickets_exist = TicketSupport.objects.filter(user=user).exists()
                if is_tickets_exist:
                    TicketSupport.objects.filter(user=user).delete()      

                    # deactive subscription 
                is_highlight_exist = Highlight.objects.filter(user=user).exists()
                if is_highlight_exist:
                    Highlight.objects.filter(user=user).update(status='deactive')   

                    # blue tick 
                is_bluetick_exist = BlueTick.objects.filter(user=user).exists()
                if is_bluetick_exist:
                    BlueTick.objects.filter(user=user).delete()   


                user.is_delete = True
                user.save(update_fields=['is_delete', 'updated'])
                return Response({'data': "User profile removed sucessfully."}, status=status.HTTP_200_OK)
                
            elif action == 'deactive':
                user.is_active = False
                user.save(update_fields=['is_active', 'updated'])
                return Response({'data' : 'User profile deactivated sucessfully.'}, status=status.HTTP_200_OK)
            elif action == 'active':
                user.is_active = True
                user.save(update_fields=['is_active', 'updated'])
                return Response({'data' : 'User profile activated sucessfully.'}, status=status.HTTP_200_OK)
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
                
                if 'users' in request.data and request.data.get('users') != None and request.data.get('users') != "Select":
                    users = request.data.get('users')
                    # print('users: ', users)
                    if users == 'Deactivated Users':
                        filters.update({'is_active': False})
                    if users == 'Deleted Users':
                        filters.update({'is_delete': True})
                
                query_filters = Q(**filters)
                filtered_user = User.objects.filter(query_filters)
                serializer = UserSerializer(filtered_user, many=True)
                data = serializer.data

                
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
        
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            if adminuser.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)

            """Comments percentage"""
            status_changed_to_reject = Comments.objects.annotate(date_updated=TruncDate('updated')).filter(status='reject', date_updated__gte=previous_24_hours).count()
            new_pending_comments = Comments.objects.annotate(date_created=TruncDate('created')).filter(status='pending', date_created__gte=previous_24_hours).count()
            comments_before_24_hours = Comments.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
            count = (comments_before_24_hours - status_changed_to_reject) + new_pending_comments
            comments_percentage = ((count-comments_before_24_hours)/comments_before_24_hours) * 100
            management['comments_percentage'] = comments_percentage
        except:
            management['comments_percentage'] = 0

        try:
            """Comments win percentage"""
            status_changed_to_reject = Comments.objects.annotate(date_updated=TruncDate('updated')).filter(is_prediction=False, date_updated__gte=previous_24_hours).count()
            new_pending_comments = Comments.objects.annotate(date_created=TruncDate('created')).filter(is_prediction=True, date_created__gte=previous_24_hours).count()
            comments_before_24_hours = Comments.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
            count = (comments_before_24_hours - status_changed_to_reject) + new_pending_comments
            comments_percentage = ((count-comments_before_24_hours)/comments_before_24_hours) * 100
            management['comments_win_percentage'] = round(comments_percentage, 2)
        except:
            management['comments_win_percentage'] = 0

        try:
            """Comments lose percentage"""
            status_changed_to_reject = Comments.objects.annotate(date_updated=TruncDate('updated')).filter(is_prediction=True, date_updated__gte=previous_24_hours).count()
            new_pending_comments = Comments.objects.annotate(date_created=TruncDate('created')).filter(is_prediction=False, date_created__gte=previous_24_hours).count()
            comments_before_24_hours = Comments.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
            count = (comments_before_24_hours - status_changed_to_reject) + new_pending_comments
            comments_percentage = ((count-comments_before_24_hours)/comments_before_24_hours) * 100
            management['comments_lose_percentage'] = round(comments_percentage, 2)
        except:
            management['comments_lose_percentage'] = 0
        
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
                   
                    comment_reactions = CommentReaction.objects.filter(comment=i).values('like', 'favorite', 'clap')
                    total_reactions = comment_reactions.aggregate(
                        total_likes=Sum('like'),
                        total_favorite=Sum('favorite'),
                        total_clap=Sum('clap')
                    )
                    
                    # If the comment has no reactions, the total counts will be None, so you can set them to 0 if desired.
                    total_likes = total_reactions['total_likes'] or 0
                    total_favorites = total_reactions['total_favorite'] or 0
                    total_claps = total_reactions['total_clap'] or 0

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
                
        today = date.today()
        new_comment = Comments.objects.filter(status='pending',created__date=today)
        # daily_win_count = Comments.objects.filter(created__date=today, is_prediction=True).count()
        # daily_lose_count = Comments.objects.filter(created__date=today, is_prediction=False).count()

        daily_win_count = Comments.objects.filter(updated__date=today, is_prediction=True).count()
        daily_lose_count = Comments.objects.filter(updated__date=today, is_prediction=False).count()

        total_all_comment = Comments.objects.all().count()
        management['total_all_comment'] = total_all_comment

        total_all_win_comment = Comments.objects.filter(is_prediction=True).count()
        management['total_all_win_comment'] = total_all_win_comment

        total_all_lose_comment = Comments.objects.filter(is_prediction=False).count()
        management['total_all_lose_comment'] = total_all_lose_comment


        management['new_comment'] = CommentsSerializer(new_comment, many=True).data

        management['comments_count'] = new_comment.count()
        management['comments_win'] = daily_win_count
        management['comments_lose'] = daily_lose_count
        management['all_comment'] = serializer1.data
        management['most_like'] = commentator
        return Response(data=management, status=status.HTTP_200_OK)
    

    def patch(self, request, pk, format=None, *args, **kwargs):
        try:
            adminuser_id = request.query_params.get('admin_id')
            adminuser = User.objects.get(id=adminuser_id)
            if adminuser.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            
            comment = Comments.objects.get(pk=pk)
        except Comments.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CommentsSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                admin_id = request.query_params.get('admin_id')
                admin_user = User.objects.get(id=admin_id)
                if request.data.get('status') == 'approve':
                    notification_obj = Notification.objects.create(sender=admin_user,receiver=comment.commentator_user,date=datetime.today().date(), status=False, context=f"{comment.match_detail} comment has been approved by admin and is now visible to other users.")
                
                    # send new Comment notification:
                    # Send notification to followers who are not subscribers
                    followers = FollowCommentator.objects.filter(commentator_user=comment.commentator_user)
                    subscribers = Subscription.objects.filter(commentator_user=comment.commentator_user, standard_user__is_delete=False, status='active')
                    subscriber_ids = subscribers.values_list('standard_user__id', flat=True)
                    follower_notification = []

                    for follower in followers:
                        if follower.standard_user.id not in subscriber_ids:
                            obj = Notification(sender=comment.commentator_user,receiver=follower.standard_user,date=datetime.today().date(), status=False, context=f'{comment.commentator_user.username} upload a new Comment.')
                            follower_notification.append(obj)

                    Notification.objects.bulk_create(follower_notification)

                    # Send notification to subscribers
                    notification_to_subscribers = []
                    for subscriber in subscribers:
                        obj = Notification(sender=comment.commentator_user,receiver=subscriber.standard_user,date=datetime.today().date(), status=False, context=f'{comment.commentator_user.username} upload a new Comment.')
                        notification_to_subscribers.append(obj)

                    Notification.objects.bulk_create(notification_to_subscribers)

                else:
                    notification_obj = Notification.objects.create(sender=admin_user,receiver=comment.commentator_user,date=datetime.today().date(), status=False, context=f'{comment.match_detail} comment has been removed by admin.')
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
        if user.is_delete == True:
            return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
        try:
            if 'level' in request.data  and request.data.get('level') != None and request.data.get('level') != "" and request.data.get('level') != "Select":
                if request.data.get('level').lower() == 'expert':
                    filters['commentator_user__commentator_level'] = 'master'
                else:
                    filters['commentator_user__commentator_level'] = request.data.get('level').lower()

            if 'category' in request.data and request.data.get('category') != None and request.data.get('category') != "" and request.data.get('category') != "Select" and request.data.get('category')[0] != '':
                filters['category__icontains'] = request.data.get('category')

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

            if request.data.get("mobile") == 'True':
                filters['status'] = 'approve'

            filter_type = request.data.get('filter_type')  # This will contain 'public_content', 'finished', 'winning'
            if filter_type in ('public_content', 'finished', 'winning', 'published'):
                
                # filters['public_content'] = request.data.get('public_content')
                if filter_type == "public_content":
                    all_comments = Comments.objects.filter(status='approve', public_content=True,**filters).order_by('-created')
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
                
                if filter_type == "finished":
                    # all_resolved_comment = Comments.objects.filter(commentator_user=request.user, date__lt=datetime.now().date(),**filters)
                    all_resolved_comment = Comments.objects.filter(date__lt=datetime.now().date(),**filters).order_by('-created')
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

                if filter_type == "published":
                    all_comments = Comments.objects.filter(status='approve',**filters).order_by('-created')
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
                    all_comments = Comments.objects.filter(is_prediction=True,**filters).order_by('-created')
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
                    subscription_obj = Subscription.objects.filter(standard_user=user, end_date__gte=datetime.now(), status='approve').order_by('-created')

                    for obj in subscription_obj:
                        if Comments.objects.filter(commentator_user=obj.commentator_user, status='approve').exists():
                            subscription_comment = Comments.objects.filter(commentator_user=obj.commentator_user,**filters)
                            
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

                if filter_type0 == "not_stated":
                    # all_active_comment = Comments.objects.filter(commentator_user=request.user, date__gt=datetime.now().date(),**filters)
                    all_active_comment = Comments.objects.filter(date__gt=datetime.now().date(),**filters).order_by('-created')
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

                if filter_type0 == "pending":
                    all_comments = Comments.objects.filter(status='pending',**filters).order_by('-created')
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
                    all_comments = Comments.objects.filter(is_prediction=False,**filters).order_by('-created')
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

            if filter_type == "" and filter_type0 == "":

                query_filters = Q(**filters)
                filtered_comments = Comments.objects.filter(query_filters).order_by('-created')
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
            return Response(data=data_list, status=status.HTTP_200_OK)
    
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class EditorManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}
        now = timezone.now()
        previous_24_hours = now - timedelta(hours=24)
        today = date.today()

        try:
            try:
                adminuser_id = request.query_params.get('id')
                adminuser = User.objects.get(id=adminuser_id)
                
                if adminuser.is_delete == True:
                        return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
                
                """editor percentage"""
                deleted_editor_count = User.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, is_delete=True, user_role='commentator').count()
                editor_previous_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, is_delete=False, user_role='commentator').count()
                editor_before_24_hours = User.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours, user_role='commentator').count()
                count = (editor_before_24_hours - deleted_editor_count) + editor_previous_24_hours
                editor_percentage = ((count-editor_before_24_hours)/editor_before_24_hours) * 100
                data_list['new_editor_percentage'] = editor_percentage
            except:
                data_list['new_editor_percentage'] = 0


            editor_list = []
            # all_user = User.objects.filter(is_delete=False, is_active=True).exclude(user_role='sub_user').order_by('-created')
            commentator = User.objects.filter(user_role='commentator',is_delete=False, is_active=True, is_admin=False, commentator_status__in=['active','pending']).order_by('-created')
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

                if BankDetails.objects.filter(user = obj).exists():
                    total_transection = BankDetails.objects.get(user = obj)
                    detail['total_transection'] = total_transection.total_balance
                else:
                    detail['total_transection'] = 0.0

                editor_list.append(detail)

            data_list['editor_list'] = editor_list



            # editor_count = commentator.count()
            editor_count = User.objects.filter(user_role='commentator', created__date=today).count()
            data_list['editor_count'] = editor_count

            apprentice = User.objects.filter(commentator_level='apprentice', is_delete=False, is_active=True, is_admin=False, commentator_status__in=['active', 'pending'])
            data_list['apprentice_count'] = len(apprentice)

            journeyman = User.objects.filter(commentator_level='journeyman', is_delete=False, is_active=True, is_admin=False, commentator_status__in=['active', 'pending'])
            data_list['journeyman_count'] = len(journeyman)

            master = User.objects.filter(commentator_level='master', is_delete=False, is_active=True, is_admin=False, commentator_status__in=['active', 'pending'])
            data_list['master_count'] = len(master)

            grandmaster = User.objects.filter(commentator_level='grandmaster', is_delete=False, is_active=True, is_admin=False, commentator_status__in=['active', 'pending'])
            data_list['grandmaster_count'] = len(grandmaster)


            COMMENTATOR_PRIORITIES = {
                'apprentice': 1,
                'journeyman': 2,
                'master': 3,
                'grandmaster': 4,
            }

            # Get the top ten users with user_role='commentator' based on their commentator_level's priority
            top_ten_commentators = User.objects.filter(user_role='commentator', is_active=True, is_delete=False, is_admin=False).annotate(
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

                if BankDetails.objects.filter(user = obj).exists():
                    total_transection = BankDetails.objects.get(user = obj)
                    detail['total_transection'] = total_transection.total_balance
                else:
                    detail['total_transection'] = 0.0

                top_ten_commentators_list.append(detail)

            # serializer1 = UserSerializer(top_ten_commentators, many=True)
            # data1 = serializer1.data
            data_list['top_ten'] = top_ten_commentators_list


            # active_editor = User.objects.filter(user_role='commentator', commentator_status='active').count()
            active_editor = len(commentator)
            data_list['active_editor'] = active_editor

            pending_editor = User.objects.filter(user_role='commentator', commentator_status='pending')
            print('pending_editor: ', [i.id for i in pending_editor])
            data_list['pending_editor'] = pending_editor.count()

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


            user_id_list = BlueTick.objects.filter(status='pending').values_list('user', flat=True)
            user_objs = User.objects.filter(id__in=user_id_list).order_by('created')
            verify_obj_user = []
            for obj in user_objs:
                detail = {}
                detail['Follower_Count'] = FollowCommentator.objects.filter(commentator_user=obj).count()
                detail['Following_Count'] = FollowCommentator.objects.filter(standard_user=obj).count()
                detail['Subscriber_Count'] = Subscription.objects.filter(commentator_user=obj).count()
                detail['Subscription_Count'] = Subscription.objects.filter(standard_user=obj).count()

                serializer = UserSerializer(obj)
                detail['editor_data'] = serializer.data
                verify_obj_user.append(detail)

            data_list['verify_user'] = verify_obj_user
            data_list['verify_request_count'] = user_objs.count()

            return Response(data=data_list, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(data={'error': f'An error occurred while processing the request.{e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def post(self, request, format=None, *args, **kwargs):
        """
        Create new commentator User.
        """
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
        
            username = request.data['username']
            if User.objects.filter(username=username).exists():
                return Response({'error': 'This username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)
            phone = request.data['phone']
            if User.objects.filter(phone=phone).exists():
                return Response({'error': 'User already present with this number.'}, status=status.HTTP_400_BAD_REQUEST)
            profile = request.FILES.get('file')
            date = request.data.get('date')
            name = request.data['name']
            # username = request.data['username']
            password = request.data['password']
            gender = request.data['gender']
            age = request.data['age']
            experience = request.data['experience']
            city = request.data['city']
            category = request.data['category']
            role = 'commentator'
            commentator_level = request.data['level'].lower()
            if commentator_level == "expert":
                commentator_level = 'master'

            if request.data.get('membership_date') != 'undefined':
                membership_date = request.data.get('membership_date')
                user_obj = User.objects.create(profile_pic=profile,
                    name=name, username=username, phone=phone,
                    password=password, gender=gender, age=age,
                    user_role=role, commentator_level=commentator_level, commentator_status='active',
                    experience=experience, city=city, category=category, membership_date=membership_date
                )
                user_obj.save()
                if user_obj != None:
                    end_date = datetime.strptime(membership_date, '%Y-%m-%d') + timedelta(days=30)
                    editor_obj = BecomeCommentator.objects.create(user=user_obj, status='active', commentator_level=commentator_level, duration='1 Months', membership_status='new',money=0.0,
                                                                  commentator=True, start_date=datetime.strptime(membership_date, '%Y-%m-%d'), end_date=end_date)
            else:
                user_obj = User.objects.create(profile_pic=profile,
                    name=name, username=username, phone=phone,
                    password=password, gender=gender, age=age,
                    user_role=role, commentator_level=commentator_level, commentator_status='active',
                    experience=experience, city=city, category=category
                )
                user_obj.save()
                if user_obj != None:
                    end_date = datetime.now() + timedelta(days=30)
                    editor_obj = BecomeCommentator.objects.create(user=user_obj, status='active', commentator_level=commentator_level, duration='1 Months', membership_status='new',money=0.0,
                                                                  commentator=True, start_date=datetime.now(), end_date=end_date)

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
        data = {}
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        data['editor_id'] = request.data.get('editor_id')
        data['name'] = request.data.get('name')
        data['username'] = request.data.get('username')
        data['phone'] = request.data.get('phone')
        data['password'] = request.data.get('password')
        data['about'] = request.data.get('about')
        data['experience'] = request.data.get('experience')
        data['city'] = request.data.get('city')
        data['category'] = request.data.get('category').split(',')
        data['gender'] = request.data.get('gender')
        data['age'] = request.data.get('age')
        data['membership_date'] = request.data.get('membership_date')

        if request.FILES.get('profile_pic') != None:
            data['profile_pic'] = request.FILES.get('profile_pic')

        if User.objects.filter(id=data['editor_id']).exists():
            user_obj = User.objects.get(id=data['editor_id'])
            if user_obj.phone != data['phone']:
                if User.objects.filter(phone=data['phone']).exists():
                    return Response({'error': 'User already present with this number.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()
            except Exception as e:
                # print("error: ", e)
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.data)
        else:
            # print("ERROR: ", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, format=None, *args, **kwargs):
        """
        Deactivate or delete user.
        """
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            
            user = User.objects.get(pk=pk)
            action = request.query_params.get('action')
            if not action:
                return Response({'error' : 'Something went wrong. Try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            if action == 'delete':
                try:
                    user.delete()
                    return Response("User deleted Successfully", status= status.HTTP_200_OK)
                except Exception as e:
                    return Response({"error": f"Failed to delete user: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
            elif action == 'remove':
                # delete  match
                is_match_exist = MatchDetail.objects.filter(comment__commentator_user=user).exists()
                if is_match_exist:
                    MatchDetail.objects.filter(comment__commentator_user=user).delete()

                # delete comments reactions
                is_comments_reac_exist = CommentReaction.objects.filter(comment__commentator_user=user).exists()
                if is_comments_reac_exist:
                    CommentReaction.objects.filter(comment__commentator_user=user).delete()
                    
                # delete comments
                is_comments_exist = Comments.objects.filter(commentator_user=user).exists()
                if is_comments_exist:
                    Comments.objects.filter(commentator_user=user).delete()

                # delete subscription 
                is_subcription_exist = Subscription.objects.filter(standard_user=user).exists()
                if is_subcription_exist:
                    Subscription.objects.filter(standard_user=user).update(status='deactive')   
                    # Subscription.objects.filter(standard_user=user).delete()  
                                        
                # delete notifications 
                is_notifications_exist = Notification.objects.filter(sender=user,receiver=user).exists()
                if is_notifications_exist:
                    Notification.objects.filter(sender=user,receiver=user).delete()

                # delete tickets response
                is_tickets_res_exist = ResponseTicket.objects.filter(user=user).exists()
                if is_tickets_res_exist:
                    ResponseTicket.objects.filter(user=user).delete()   

                # delete tickets history
                is_tickets_history_exist = TicketHistory.objects.filter(user=user).exists()
                if is_tickets_history_exist:
                    TicketHistory.objects.filter(user=user).delete()  

                # delete tickets 
                is_tickets_exist = TicketSupport.objects.filter(user=user).exists()
                if is_tickets_exist:
                    TicketSupport.objects.filter(user=user).delete()      

                    # deactive subscription 
                is_highlight_exist = Highlight.objects.filter(user=user).exists()
                if is_highlight_exist:
                    Highlight.objects.filter(user=user).update(status='deactive')   

                    # blue tick 
                is_bluetick_exist = BlueTick.objects.filter(user=user).exists()
                if is_bluetick_exist:
                    BlueTick.objects.filter(user=user).delete()   
                user.is_delete = True
                user.save(update_fields=['is_delete', 'updated'])
                return Response({"data": "User profile removed sucessfully."}, status=status.HTTP_200_OK)
            
            elif action == 'deactive':
                user.is_active = False
                user.commentator_status = 'deactive'
                user.save(update_fields=['is_active', 'commentator_status', 'updated'])
                return Response({'data' : 'User profile deactivated sucessfully.'}, status=status.HTTP_200_OK)
            
            elif action == 'active':
                user.is_active = True
                user.save(update_fields=['is_active', 'updated'])
                return Response({'data' : 'User profile activated sucessfully.'}, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        

class UpdateStatusForVerifyRequest(APIView):
    def get(self, request, format=None):
        data_list = {'verification_requests': []}

        try:
            verification_requests = BlueTick.objects.filter(status='pending')
            serializer = BlueTickSerializer(verification_requests, many=True)
            data_list['verification_requests'] = serializer.data
            return Response(data=data_list, status=status.HTTP_200_OK)

        except:
            return Response(data=data_list, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, id, format=None, *args, **kwargs):
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            # Validations
            verify_status = request.data.get('status')
            if verify_status is None:
                return Response({'error': 'Status not found.'}, status=status.HTTP_400_BAD_REQUEST)

            if verify_status not in dict(BLUETICK_CHOISE).keys():
                return Response({'error': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

            # Update status
            user = User.objects.get(id=id)
            obj = BlueTick.objects.get(user=user)
            obj.status = verify_status
            obj.save(update_fields=['status','updated'])

            # Get data
            # serializer = BlueTickSerializer(obj).data
            return Response({'data' : 'Request Updated.'}, status=status.HTTP_200_OK)
       
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
            
            user_id = request.query_params.get('user_id', None) 
            user_id = user_id if User.objects.filter(id=user_id).exists() else None

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

                retrive_data = RetrievePageData()

                # highlight_user_list = retrive_data.get_highlight_user()
                highlight_user_list = Highlight.objects.filter(status="active").values_list('user_id', flat=True)

            
                highlighted_users = filtered_comments.filter(id__in=highlight_user_list).order_by('?')
                non_highlighted_users = filtered_comments.exclude(id__in=highlight_user_list)
                filtered_comments = list(highlighted_users) + list(non_highlighted_users)

                data = []
                for obj in filtered_comments:
                    details = {}
                    count = Subscription.objects.filter(commentator_user=obj).count()
                    is_highlight = Highlight.objects.filter(user=obj, status='active').exists()
                    details['is_highlight'] = is_highlight

                    if user_id != None:
                        details['is_fav_editor'] = FavEditors.objects.filter(commentator_user=obj, standard_user_id=user_id, commentator_user__is_delete=False).exists()

                    serializer = UserSerializer(obj)
                    details['editor_data'] = serializer.data
                
                    details['subscriber_count'] = count
                    data.append(details)

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
        
    def post(self, request, id, format=None, *args, **kwargs):
        try:
            # Validations
            deactivation_status = request.data.get('status')
            if deactivation_status is None:
                return Response({'error': 'Status not found.'}, status=status.HTTP_400_BAD_REQUEST)

            if deactivation_status not in dict(DEACTIVATE_STATUS).keys():
                return Response({'error': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

            # Update status
            obj = User.objects.get(id=id)
            if deactivation_status == 'accept':
                obj.deactivate_commentator = deactivation_status
                obj.is_active = False
                obj.commentator_status = 'deactive'
                obj.save(update_fields=['deactivate_commentator','commentator_status', 'is_active', 'updated'])
            elif deactivation_status == 'reject':
                obj.deactivate_commentator = ''
                obj.save(update_fields=['deactivate_commentator','updated'])

            # Get data
            serializer = UserSerializer(obj).data
            return Response(data=serializer, status=status.HTTP_200_OK)
       
        except User.DoesNotExist:
            return Response(data={'error': 'User data not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(pk=id)
            if user.deactivate_commentator == 'pending':
                return Response({'data' : 'You have already sent the request.'}, status=status.HTTP_400_BAD_REQUEST)
            user.deactivate_commentator = 'pending'
            user.commentator_status = 'pending'
            user.save()
            return Response({'data' : 'Deactivation request sent successfully.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
class SalesManagement(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}
        """
        Plan sale logic here.
        """
        now = timezone.now()
        previous_24_hours = now - timedelta(hours=24)
        previous_day = datetime.now() - timedelta(days=1)

        current_date = timezone.now().date()
        start_time = time(0, 0, 0)
        end_time = time(23, 59, 59)
        start_datetime = datetime.combine(current_date, start_time)
        end_datetime = datetime.combine(current_date, end_time)
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)

            try:
                """Sales percentage"""
                status_changed_to_pending = BecomeCommentator.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, status='pending').count()
                new_subscriptions = BecomeCommentator.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, status='active').count()
                subscriptions_before_24_hours = BecomeCommentator.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                count = (subscriptions_before_24_hours - status_changed_to_pending) + new_subscriptions
                subscriptions_percentage = ((count-subscriptions_before_24_hours)/subscriptions_before_24_hours) * 100
                data_list['new_sales_percentage'] = subscriptions_percentage
            except:
                data_list['new_sales_percentage'] = 0

            try:
                """Subscribers percentage"""
                status_changed_to_pending = Subscription.objects.annotate(date_updated=TruncDate('updated')).filter(date_updated__gte=previous_24_hours, status='pending').count()
                new_subscriptions = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__gte=previous_24_hours, status='active').count()
                subscriptions_before_24_hours = Subscription.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                count = (subscriptions_before_24_hours - status_changed_to_pending) + new_subscriptions
                subscriptions_percentage = ((count-subscriptions_before_24_hours)/subscriptions_before_24_hours) * 100
                data_list['new_subscriptions_percentage'] = subscriptions_percentage
            except:
                data_list['new_subscriptions_percentage'] = 0

            try:
                """Highlights percentage"""
                highlights_status_changed_to_pending = Highlight.objects.annotate(date_updated=TruncDate('updated')).filter(status='pending', date_updated__gte=previous_24_hours).count()
                highlights_purchased = Highlight.objects.annotate(date_created=TruncDate('created')).filter(status='active', highlight=True, date_created__gte=previous_24_hours).count()
                highlights_before_24_hours = Highlight.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                highlights_count = (highlights_before_24_hours - highlights_status_changed_to_pending) + highlights_purchased
                highlights_percentage = ((highlights_count-highlights_before_24_hours)/highlights_before_24_hours) * 100
                data_list['new_highlights_percentage'] = highlights_percentage
            except:
                data_list['new_highlights_percentage'] = 0

            try:
                # plan sale objects handling
                plan_sale_obj = BecomeCommentator.objects.filter(commentator=True)
                # print("*******", plan_sale_obj)
                # plan_sale_obj_cal = BecomeCommentator.objects.filter(commentator=True, created__gte=previous_day, created__lt=datetime.now())
                plan_sale_obj_cal = BecomeCommentator.objects.filter(commentator=True, created__range=(start_datetime, end_datetime))
                plan_sale_cal_ = 0
                for obj in plan_sale_obj_cal:
                    plan_sale_cal_ += obj.money

                serializer1 = BecomeCommentatorSerializer(plan_sale_obj, many=True)
                data_list['plan_sale_count'] = plan_sale_cal_
                data_list['plan_sale'] = serializer1.data

            except Exception as e:
                return Response(data={'error': f'An error occurred while fetching highlight data.{e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Subscription objects handling 

            subscription_obj = Subscription.objects.filter(subscription=True)
            # subscription_obj_cal = Subscription.objects.filter(subscription=True, created__gte=previous_day, created__lt=datetime.now())
            subscription_obj_cal = Subscription.objects.filter(subscription=True, created__range=(start_datetime, end_datetime))
            subscription_cal = 0
            for obj in subscription_obj_cal:
                subscription_cal += obj.money

            serializer = SubscriptionSerializer(subscription_obj, many=True)
            data_list['subscription'] = serializer.data
            data_list['subscription_count'] = subscription_cal
            # data_list['subscription_count'] = subscription_obj.count()

        except Exception as e:
            return Response(data={'error': f'An error occurred while fetching subscription data.{e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            # Highlight objects handling
            highlights_obj = Highlight.objects.filter(highlight=True)
            # highlights_obj_cal = Highlight.objects.filter(highlight=True, created__gte=previous_day, created__lt=datetime.now())
            highlights_obj_cal = Highlight.objects.filter(highlight=True, created__range=(start_datetime, end_datetime))
            highlights_cal_ = 0
            for obj in highlights_obj_cal:
                highlights_cal_ += obj.money

            serializer1 = HighlightSerializer(highlights_obj, many=True)
            data_list['highlight_count'] = highlights_cal_
            # data_list['highlight_count'] = highlights_obj.count()
            data_list['highlight'] = serializer1.data

        except Exception as e:
            return Response(data={'error': f'An error occurred while fetching highlight data.{e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        data_list['daily_total'] = plan_sale_cal_ + subscription_cal + highlights_cal_
        daily_total24 = plan_sale_cal_ + subscription_cal + highlights_cal_

        try:
            two_day_ago = now - timedelta(hours=48)
            plan_sale_obj_48cal = BecomeCommentator.objects.filter(commentator=True, created__gte=two_day_ago, created__lt=datetime.now())
            plan_sale_48cal_ = 0
            for obj in plan_sale_obj_48cal:
                plan_sale_48cal_ += obj.money
            plan48 = plan_sale_48cal_ - plan_sale_cal_

            subscription_obj_48cal = Subscription.objects.filter(subscription=True, created__gte=two_day_ago, created__lt=datetime.now())
            subscription_48cal = 0
            for obj in subscription_obj_48cal:
                subscription_48cal += obj.money
            sub48 = subscription_48cal - subscription_cal

            highlights_obj_48cal = Highlight.objects.filter(highlight=True, created__gte=two_day_ago, created__lt=datetime.now())
            highlights_48cal_ = 0
            for obj in highlights_obj_48cal:
                highlights_48cal_ += obj.money
            high48 = highlights_48cal_ - highlights_cal_

            daily_total48 = plan48+sub48+high48

            data_list['daily_total_persentage'] = round(((daily_total24 - daily_total48)/100) * 100, 2)

        except:
            data_list['daily_total_persentage'] = 0


        try:
            plan_sale_obj = BecomeCommentator.objects.filter(commentator=True)
            plan_sale_obj_cal = 0
            for obj in plan_sale_obj:
                plan_sale_obj_cal += obj.money

            subscription_obj = Subscription.objects.filter(subscription=True)
            subscription_cal = 0
            for obj in subscription_obj:
                subscription_cal += obj.money

            highlights_obj = Highlight.objects.filter(highlight=True)
            highlights_cal = 0
            for obj in highlights_obj:
                highlights_cal += obj.money

            data_list['all_time_total'] = plan_sale_obj_cal + subscription_cal + highlights_cal

        except Exception as e:
            return Response(data={'error': f'{e}.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        try:
            today = date.today()
            today_created_subscriptions = Subscription.objects.filter(created__date=today, subscription=True)

            total_cal = 0.0
            for obj in today_created_subscriptions:
                commission_rate = MembershipSetting.objects.get(commentator_level = obj.commentator_user.commentator_level)
                total_cal += float(float(obj.money) * float(commission_rate.commission_rate))/100
            
            data_list['commission_earnings'] = total_cal

        except Exception as e:
            return Response(data={'error': f'{e}.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        data_list['net_revenue'] = plan_sale_cal_+ total_cal + highlights_cal_
        net_revenue24 = plan_sale_cal_+ total_cal + highlights_cal_
        try:
            two_days_ago = date.today() - timedelta(days=2)
            two_days_ago_created_subscriptions = Subscription.objects.filter(created__date=two_days_ago, subscription=True)
            total_cal = 0.0
            for obj in two_days_ago_created_subscriptions:
                commission_rate = MembershipSetting.objects.get(commentator_level=obj.commentator_user.commentator_level)
                total_cal += float(float(obj.money) * float(commission_rate.commission_rate)) / 100

            net_revenue48 = plan_sale_48cal_ + total_cal + highlights_48cal_
       
            data_list['net_revenue_persentage'] = round(((net_revenue24 - net_revenue48)/100) * 100, 2)

        except:
            data_list['net_revenue_persentage'] = 0

        return Response(data=data_list, status=status.HTTP_200_OK)
    
    def post(self, request, format=None, *args, **kwargs):
        """
        filter for sales management.
        """
        data_list = []
        filters = {}
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            if request.data:
                details = {}
                
                if 'date' in request.data:
                    filters['start_date__contains'] = request.data.get('date')
                if 'status' in request.data:
                    filters['status'] = request.data.get('status').lower()
                if 'duration' in request.data:
                    filters['duration'] = request.data.get('duration')


                if request.data.get('type'):
                    type = request.data.get('type').lower()
                else:
                    type = ''

                query_filters = Q(**filters)

                if type.lower() == 'subscription':
                    subscription_obj = Subscription.objects.filter(query_filters)
                    serializer = SubscriptionSerializer(subscription_obj, many=True)
                    # data_list.append(serializer.data)
                    details['subscription'] = serializer.data
                    details['highlight'] = []
                    details['plan_sale'] = []
                    data_list.append(details)

                elif type.lower() == 'highlight':
                    highlight_obj = Highlight.objects.filter(query_filters)
                    serializer1 = HighlightSerializer(highlight_obj, many=True)
                    # data_list.append(serializer1.data)
                    details['subscription'] = []
                    details['plan_sale'] = []
                    details['highlight'] = serializer1.data
                    data_list.append(details)

                elif type.lower() == 'plansales':
                    plansale_obj = BecomeCommentator.objects.filter(query_filters)
                    serializer1 = BecomeCommentatorSerializer(plansale_obj, many=True)
                    # data_list.append(serializer1.data)
                    details['subscription'] = []
                    details['highlight'] = []
                    details['plan_sale'] = serializer1.data
                    data_list.append(details)
                else:
                    
                    subscription_obj = Subscription.objects.filter(query_filters)
                    serializer = SubscriptionSerializer(subscription_obj, many=True)
                    details['subscription'] = serializer.data

                    highlight_obj = Highlight.objects.filter(query_filters)
                    serializer1 = HighlightSerializer(highlight_obj, many=True)
                    details['highlight'] = serializer1.data

                    plansale_obj = BecomeCommentator.objects.filter(query_filters)
                    serializer2 = BecomeCommentatorSerializer(plansale_obj, many=True)
                    details['plan_sale'] = serializer2.data

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
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            try:
                """Ticket percentage"""
                status_changed_to_resolved = TicketSupport.objects.annotate(date_updated=TruncDate('updated')).filter(status='resolved', date_updated__gte=previous_24_hours).count()
                new_tickets_progress = TicketSupport.objects.annotate(date_created=TruncDate('created')).filter(status='pending', date_created__gte=previous_24_hours).count()
                tickets_before_24_hours = TicketSupport.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                count = (tickets_before_24_hours - status_changed_to_resolved) + new_tickets_progress
                tickets_percentage = ((count-tickets_before_24_hours)/tickets_before_24_hours) * 100
                all_data['new_tickets_percentage'] = tickets_percentage
            except:
                all_data['new_tickets_percentage'] = 0

            try:
                """Total Ticket percentage"""
                total_status_changed_to_resolved = TicketSupport.objects.annotate(date_updated=TruncDate('updated')).filter(status='resolved', date_updated__gte=previous_24_hours).count()
                total_new_tickets_progress = TicketSupport.objects.annotate(date_created=TruncDate('created')).filter(status='pending', date_created__gte=previous_24_hours).count()
                total_tickets_before_24_hours = TicketSupport.objects.annotate(date_created=TruncDate('created')).filter(date_created__lt=previous_24_hours).count()
                total_count = (total_tickets_before_24_hours - total_status_changed_to_resolved) + total_new_tickets_progress
                total_tickets_percentage = ((total_count-total_tickets_before_24_hours)/total_tickets_before_24_hours) * 100
                all_data['total_ticket_percentage'] = total_tickets_percentage
            except:
                all_data['total_ticket_percentage'] = 0

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
        
            if user.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            ticket_id = request.data.get('ticket_id')

            message = request.data.get('message')


            if not message:
                return Response({'error': 'Message not found.'}, status=status.HTTP_400_BAD_REQUEST)

            ticket_support = None
            try:
                ticket_support = TicketSupport.objects.get(pk=ticket_id)
            except TicketSupport.DoesNotExist:
                return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)

            is_res_obj = ResponseTicket.objects.filter(user=user,ticket=ticket_support)
            if not ResponseTicket.objects.filter(ticket=ticket_support).exists():
                ticket_support.status = 'progress'
                ticket_support.admin_label = 'answered'
                ticket_support.user_label = 'in progress'
                ticket_support.save()
            else:
                ticket_support.status = 'progress'
                ticket_support.admin_label = 'answered'
                ticket_support.user_label = 'answered'
                ticket_support.save()

            res_obj = ResponseTicket.objects.create(user=user,ticket=ticket_support, response=message)
            # print('res_obj: ', res_obj)
            if res_obj != None:
                ticket_obj = TicketHistory.objects.create(user=user, ticket_support=ticket_support, status='comment_by_user',
                                                            response_ticket=res_obj, message=message)
   

            if res_obj != None:             
                if is_res_obj:
                    notification_obj = Notification.objects.create(
                        sender=user,
                        receiver=ticket_support.user, 
                        subject='Support ticket',
                        date=datetime.now().date(), 
                        status=False,
                        context=f'Motiwy has responded to your ticket with the subject: {ticket_support.subject}.',
                    )
                else:
                    notification_obj = Notification.objects.create(
                        sender=user,
                        receiver=ticket_support.user, 
                        subject='Support ticket',
                        date=datetime.now().date(), 
                        status=False,
                        context=f'Motiwy has replied to your ticket with the subject: {ticket_support.subject}.',
                    )
                
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
            # print('department: ', department)
            if not department:
                return Response({'error': 'Department not found.'}, status=status.HTTP_400_BAD_REQUEST)

            sub_users = User.objects.filter(department=department, user_role='sub_user')
            # print('sub_users: ', sub_users)
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
            if admin_user.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            
            ticket = TicketSupport.objects.get(id=ticket_id)
            note = request.data.get('note')
            # print('note: ', note)
            user_id = request.data.get('id')  # sub user id
            # print('user_id: ', user_id)
            
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
            adminuser_id = request.query_params.get('admin_id')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            data = {}

            # Count the number of notifications with status=False
            # viewed = Notification.objects.filter(status=False).count()
            viewed = Notification.objects.filter(
                    Q(subject='Subscription Purchase') | 
                    Q(subject='Subscription Plan Expires') | 
                    Q(subject='Promotion'), 
                    status=True
                ).count()
            data['viewed'] = viewed

            # Count the number of notifications with status=True
            # pending = Notification.objects.filter(status=True).count()
            pending = Notification.objects.filter(
                    Q(subject='Subscription Purchase') | 
                    Q(subject='Subscription Plan Expires') | 
                    Q(subject='Promotion'), 
                    status=False
                ).count()
            data['pending'] = pending

            # Retrieve all notification objects
            # notification_obj = Notification.objects.all()
            admin_id = request.query_params.get('admin_id')
            admin_user = User.objects.get(id=admin_id,is_admin=True)
            
            notification_obj = Notification.objects.filter(
                Q(subject='Subscription Purchase') |
                Q(subject='Subscription Plan Expires') |
                Q(subject='Promotion') |
                Q(sender=admin_user)
            )

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
        # print('request.data: ', request.data.get('data'))
        try:
            subject = request.data.get('subject')
            user_type = request.data.get('user_type')
            to = request.data.get('to')  # need receiver user id
            sending_type = request.data.get('sending_type')
            date = request.data.get('date')
            message = request.data.get('message')
            sender = request.query_params.get('sender')
            sender_instance = User.objects.get(id=sender)

            user_list = request.data.get('data')

            if len(user_list) == 0:
                return Response({'error': 'Username not found'}, status=status.HTTP_400_BAD_REQUEST)

            if not subject:
                return Response({'error': 'Subject not found.'}, status=status.HTTP_400_BAD_REQUEST)
            # if not to:
            #     return Response({'error': 'Receiver User not found.'}, status=status.HTTP_400_BAD_REQUEST)
            if not date:
                return Response({'error': 'Date not found.'}, status=status.HTTP_400_BAD_REQUEST)
            if not message:
                return Response({'error': 'Message not found.'}, status=status.HTTP_400_BAD_REQUEST)

            notification_list = []
            for user in user_list:
                try:
                    receiver = User.objects.get(username=user)
                    notification_obj = Notification(
                        receiver=receiver,
                        subject=subject,
                        date=date,
                        status=False,
                        context=message,
                        sender=sender_instance
                    )
                    notification_list.append(notification_obj)
                except User.DoesNotExist:
                    return Response({'error': f'Receiver User with username "{user}" does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
            Notification.objects.bulk_create(notification_list)
            
            return Response({'data' : 'Notifications sent sucessfully', 'status' : status.HTTP_200_OK})

        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SubUserManagement(APIView):

    def get(self, request, format=None, *args, **kwargs):
        data_list = {}

        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            subuser_count = User.objects.filter(user_role='sub_user',is_delete=False, is_active=True).order_by("-created")
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
            ticket_history = TicketHistory.objects.filter(status__in=["redirect", "comment_by_user"]).order_by('-created')
            ticket_serializer = TicketHistorySerializer(ticket_history, many=True)
            data_list['user_timeline'] = ticket_serializer.data
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            notification_count = ticket_history.count()
            data_list['notification_count'] = notification_count
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        return Response(data=data_list, status=status.HTTP_200_OK)

    def post(self, request, format=None, *args, **kwargs):
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            if request.data:
                role = 'sub_user'

                phone = request.data['phone']

                if User.objects.filter(phone=phone).exists():
                    return Response({'data' : 'User already exists!'}, status=status.HTTP_400_BAD_REQUEST)
                
                password = request.data.get('password')
                permission_type = request.data.get('permission')

                if permission_type == 'transaction':
                    transaction = True
                    all_permission = request.data.get('all_permission')
                    
                    if all_permission and all_permission.lower() == 'true':
                        all_permission = True
                        process_withdrawal = True
                        rule_update = True
                        price_update = True
                        withdrawal_export = True
                        sales_export = True
                    else:
                        process_withdrawal = True if request.data.get('process_withdrawal') == 'true' else False
                        rule_update = True if request.data.get('rule_update') == 'true' else False
                        price_update = True if request.data.get('price_update') == 'true' else False
                        withdrawal_export = True if request.data.get('withdrawal_export') == 'true' else False
                        sales_export = True if request.data.get('sales_export') == 'true' else False
                        all_permission = False

                    sub_user_obj = User.objects.create(profile_pic=request.data.get('file'),user_role=role, name=request.data.get('name'), phone=request.data.get('phone'),
                                                        password=password, authorization_type=request.data.get('authorization_type'),
                                                        department=request.data.get('department'), is_transaction=transaction, is_process_withdrawal_request=process_withdrawal,
                                                        is_rule_update=rule_update, is_price_update=price_update, is_withdrawal_export=withdrawal_export,
                                                        is_sales_export=sales_export, is_all_permission=all_permission, is_admin=True)
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
                                                        is_sales_export=sales_export, is_all_permission=all_permission, is_admin=True)

                sub_user_obj.save()

                serializer = UserSerializer(sub_user_obj)
                return Response(data=serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def patch(self, request, pk, format=None, *args, **kwargs):
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        phone = request.data['phone']

        if User.objects.filter(~Q(id=pk), phone=phone).exists():
            return Response({'data' : 'User already exists!'}, status=status.HTTP_400_BAD_REQUEST)

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
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            user = User.objects.get(pk=pk)
            action = request.query_params.get('action')
            if not action:
                return Response({'error' : 'Something went wrong. Try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            if action == 'delete':
                try:
                    user.delete()
                    return Response("User deleted Successfully", status= status.HTTP_200_OK)
                except Exception as e:
                    return Response({"error": f"Failed to delete user: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
            elif action == 'remove':
                user.is_delete = True
                user.save(update_fields=['is_delete', 'updated'])
                return Response({"data": "User profile removed sucessfully."}, status=status.HTTP_200_OK)
            
            elif action == 'deactive':
                user.is_active = False
                user.save(update_fields=['is_active', 'updated'])
                return Response({'data' : 'User profile deactivated sucessfully.'}, status=status.HTTP_200_OK)
            
            elif action == 'active':
                user.is_active = True
                user.save(update_fields=['is_active', 'updated'])
                return Response({'data' : 'User profile activated sucessfully.'}, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
class FilterSubUserManagement(APIView):
    def post(self, request, format=None, *args, **kwargs):
        data_list = {}
        try:
            filters = {}
            if request.data:
                
                if 'users' in request.data and request.data.get('users') != None and request.data.get('users') != "Select":
                    users = request.data.get('users')
                    # print('users: ', users)
                    if users == 'Deactivated Users':
                        filters.update({'is_active': False})
                    if users == 'Deleted Users':
                        filters.update({'is_delete': True})
                
                query_filters = Q(**filters)
                filtered_user = User.objects.filter(query_filters, user_role='sub_user')
                serializer = UserSerializer(filtered_user, many=True)
                data = serializer.data

                return Response(data=data, status=status.HTTP_200_OK)
            else:
                return Response(data={'error': 'Request data not found'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
      
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
            print("request.data", request.data)
            if request.data:
                # print('request.data:: ', request.data)
                required_fields = ['picture', 'ads_space', 'start_date', 'end_date', 'company_name', 'link', 'ads_budget']
                for field in required_fields:
                    if field not in request.data:
                        return Response({'error': f'{field.replace("_", " ").title()} not found'}, status=status.HTTP_400_BAD_REQUEST)
               
                ads_obj = Advertisement.objects.create(picture=request.data.get('picture'), ads_space=request.data.get('ads_space'),
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
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, pk, format=None, *args, **kwargs):
        try:
            user = Advertisement.objects.get(pk=pk)
        except Advertisement.DoesNotExist:
            return Response({"error": "Advertisement not found."}, status=status.HTTP_404_NOT_FOUND)

        if 'count' in request.data:
            if 'ads_view' in request.data['data']:
                user.ad_views_count += 1
                success_message = 'Ad view count incremented successfully.'

            elif 'redirected_to_ad' in request.data['data']:
                user.ad_clicks_and_redirected_count += 1
                success_message = 'Ad click and redirection count incremented successfully.'

            else:
                return Response({'error': 'Invalid request data.'}, status=status.HTTP_400_BAD_REQUEST)
            user.save(update_fields=['ad_views_count', 'ad_clicks_and_redirected_count', 'updated'])
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


    def delete(self, request, pk, format=None, *args, **kwargs):
        try:
            ads_obj = Advertisement.objects.get(pk=pk)
            ads_obj.delete()
            return Response("Advertisement deleted Successfully", status= status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Failed to delete user: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class LevelRule(APIView):
    def get(self, request, format=None, *args, **kwargs):
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
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
        adminuser_id = request.query_params.get('admin')
        adminuser = User.objects.get(id=adminuser_id)
        
        if adminuser.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
        commentator_level = request.query_params.get('commentator_level')

        data = request.data.copy()
        if commentator_level.lower() == 'expert':
            data["commentator_level"] = 'master'
            commentator_level = 'master' 
        else:
            data["commentator_level"] = commentator_level

        # commentator_level = request.data.get('commentator_level')
        existing_record = CommentatorLevelRule.objects.filter(commentator_level=commentator_level).first()
        
        if existing_record:
            serializer = CommentatorLevelRuleSerializer(existing_record, data=data,  partial=True)
        else:
            # request.data['commentator_level'] = commentator_level
            serializer = CommentatorLevelRuleSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MembershipSettingView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        try:
            adminuser_id = request.query_params.get('admin', None)
            if adminuser_id is not None:
                adminuser = User.objects.get(id=adminuser_id)
            
                if adminuser.is_delete == True:
                        return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            level = request.query_params.get('commentator_level')
            
            if not level:
                return Response(data={'error': 'commentator_level parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)
            
            if level.lower() == 'expert':
                level = 'master'
            
            level_obj = MembershipSetting.objects.filter(commentator_level=level)
            
            if not level_obj.exists():
                return Response(data={'error': 'No rule found for the given level'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = MembershipSettingSerializer(level_obj, many=True)
            if level.lower() == 'expert':
                for data in serializer.data:
                    if data['commentator_level'].lower() == 'master':
                        data['commentator_level'] = 'expert'
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, format=None, *args, **kwargs):
        adminuser_id = request.query_params.get('admin')
        adminuser = User.objects.get(id=adminuser_id)
        
        if adminuser.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
        commentator_level = request.query_params.get('commentator_level')
        data = request.data.copy()
        if commentator_level.lower() == 'expert':
            data["commentator_level"] = 'master'
            commentator_level = 'master' 
        else:
            data["commentator_level"] = commentator_level

        existing_record = MembershipSetting.objects.filter(commentator_level=commentator_level).first()

        if existing_record:
            serializer = MembershipSettingSerializer(existing_record, data=data, partial=True)
        else:
            request.data['commentator_level'] = commentator_level
            serializer = MembershipSettingSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            promotion_rate = request.data['promotion_rate']
            notification_list = []
            standard_users = User.objects.filter(user_role='standard')
            for user in standard_users:
                notification_obj = Notification(
                    receiver=user, 
                    subject='Promotion',
                    date=datetime.today().date(), 
                    status=False,
                    context=f'Hi {user.username}, We have defined a special promotion for you. You can now make {promotion_rate}% off plan to upgrate your role'
                )
                notification_list.append(notification_obj)
            Notification.objects.bulk_create(notification_list)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
    

class SubscriptionSettingView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        try:
            level = request.query_params.get('commentator_level')
            
            if not level:
                return Response(data={'error': 'commentator_level parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)
            if level.lower() == 'expert':
                level = 'master'
            level_obj = SubscriptionSetting.objects.filter(commentator_level=level)
            
            if not level_obj.exists():
                return Response(data={'error': 'No rule found for the given level'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = SubscriptionSettingSerializer(level_obj, many=True)
            if level.lower() == 'expert':
                for data in serializer.data:
                    if data['commentator_level'].lower() == 'master':
                        data['commentator_level'] = 'expert'
            return Response(data=serializer.data, status=status.HTTP_200_OK)
    
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, format=None, *args, **kwargs):
        commentator_level = request.query_params.get('commentator_level')
        data = request.data.copy()
        if commentator_level.lower() == 'expert':
            data["commentator_level"] = 'master'
            commentator_level = 'master' 
        else:
            data["commentator_level"] = commentator_level

        existing_record = SubscriptionSetting.objects.filter(commentator_level=commentator_level).first()

        if existing_record:
            serializer = SubscriptionSettingSerializer(existing_record, data=data, partial=True)
        else:
            request.data['commentator_level'] = commentator_level
            serializer = SubscriptionSettingSerializer(data=data)

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
            if level.lower() == 'expert':
                level = 'master'
            level_obj = HighlightSetting.objects.filter(commentator_level=level)
            
            if not level_obj.exists():
                return Response(data={'error': 'No rule found for the given level'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = HighlightSettingSerializer(level_obj, many=True)
            if level.lower() == 'expert':
                for data in serializer.data:
                    if data['commentator_level'].lower() == 'master':
                        data['commentator_level'] = 'expert'
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, format=None, *args, **kwargs):
        commentator_level = request.query_params.get('commentator_level')
        data = request.data.copy()
        if commentator_level.lower() == 'master':
            # data["commentator_level"] = 'master'
            commentator_level = 'master' 
        else:
            data["commentator_level"] = commentator_level
        existing_record = HighlightSetting.objects.filter(commentator_level=commentator_level).first()

        if existing_record:
            serializer = HighlightSettingSerializer(existing_record, data=data, partial=True)
        else:
            serializer = HighlightSettingSerializer(data=data)

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
    try:
        
        def post(self, request, format=None, *args, **kwargs):
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            # print('=========================post calledd')
            data = request.data.copy() 

            comment_serializer = CommentsSerializer(data=data)

            editor = request.data['editor']

            user = User.objects.get(username=editor)
            
            category = request.data.get('category')
            # print('category: ', category)
            country = request.data.get('country')
            league = request.data.get('league')
            date = request.data.get('date')
            match_detail = request.data.get('match_detail')
            prediction_type = request.data.get('prediction_type')
            prediction = request.data.get('prediction')
            cmt_id = request.data.get('cmt_id')
            if user.commentator_level == 'apprentice':
                public_content = True
            else:
                public_content = request.data.get('public_content')
            comment_1 = request.data.get('comment')

            match_data = get_league_data(category, league, date, match_detail)
            match_time = match_data[0].get('Time', None) if match_data else None
            # print('match_time: ', match_time)
            match_time_obj =  datetime.strptime(match_time, '%H:%M:%S').time() if match_time else None
            # print('match_time_obj: ', match_time_obj)

            comment = Comments.objects.create(
                    comment=comment_1,
                    commentator_user=user,
                    category=[category],
                    country=country,
                    league=league,
                    date=date,
                    match_detail=match_detail,
                    prediction_type=prediction_type,
                    prediction=prediction,
                    public_content=public_content,
                    match_time=match_time_obj,
                    match_id=cmt_id[0]
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

            return Response({'data' : 'success'}, status=status.HTTP_201_CREATED)
    
    except:
        pass

totp = pyotp.TOTP('base32secret3232')
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
        

def create_notification(sender, receiver, context):
    return Notification.objects.create(
        sender=sender,
        receiver=receiver, 
        subject='Level Upgrade',
        date=datetime.now().date(), 
        status=False,
        context=context,
    )
        
def Statistics(user_obj=None, user_id=None):
    try:
        user = User.objects.get(id=user_id) if not user_obj else user_obj
        
        data = Comments.objects.filter(commentator_user=user, is_resolve=True)
        win_count = data.filter(is_prediction=True).count()
        lose_count = data.filter(is_prediction=False).count()

        if len(data) != 0:
            Success_rate = round((win_count/len(data))*100, 2)
        else:
            Success_rate = 0


        comments = data.exclude(status='reject').order_by('created')

        is_prediction_list = [item.is_prediction for item in comments if item.is_prediction is not None]

        Score_point = 0
        current_chain_true = 0
        current_chain_false = 0

        for is_prediction in is_prediction_list:
            if is_prediction:
                current_chain_false = 0
                current_chain_true += 1
                Score_point += current_chain_true * 10
            else:
                current_chain_true = 0
                current_chain_false += 1
                Score_point += current_chain_false * -10

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

        is_level_exists = CommentatorLevelRule.objects.filter(commentator_level=user.commentator_level).exists()
        if is_level_exists:
            level_obj = CommentatorLevelRule.objects.get(commentator_level=user.commentator_level)
            if win_count >= level_obj.winning_limit and Success_rate >= int(level_obj.sucess_rate):

                admin_user = User.objects.get(is_admin=True)

                if user.commentator_level == 'apprentice':
                    user.commentator_level = "journeyman"
                    create_notification(admin_user, user, "Congratulations! You've reached the Journeyman level! You can now turn your followers into subscribers and generate earnings!")

                    # Send notification to followers
                    followers = FollowCommentator.objects.filter(commentator_user=user)
                    notification = []
                    for follower in followers:
                        obj = Notification(
                            sender=admin_user,
                            receiver=follower.standard_user, 
                            subject='Level Upgrade',
                            date=datetime.now().date(), 
                            status=False,
                            context=f"The editor you're following, named {user.name}, has advanced to the Journyeman level! Stay tuned",
                        )
                        notification.append(obj)
                    Notification.objects.bulk_create(notification)

                elif user.commentator_level == 'journeyman':
                    user.commentator_level = "master"
                    
                    create_notification(admin_user, user, "Congratulations! You've reached the Master level! The rewards for your achievements will be even greater!")

                    # Send notification to followers who are not subscribers
                    followers = FollowCommentator.objects.filter(commentator_user=user)
                    subscribers = Subscription.objects.filter(commentator_user=user)
                    subscriber_ids = subscribers.values_list('standard_user__id', flat=True)
                    follower_notification = []

                    for follower in followers:
                        if follower.standard_user.id not in subscriber_ids:
                            obj = Notification(
                                sender=admin_user,
                                receiver=follower.standard_user, 
                                subject='Level Upgrade',
                                date=datetime.now().date(), 
                                status=False,
                                context=f"The editor you're following, named {user.name}, has advanced to the Master level! Stay tuned",
                            )
                            follower_notification.append(obj)

                    Notification.objects.bulk_create(follower_notification)

                    # Send notification to subscribers
                    notification_to_subscribers = []
                    for subscriber in subscribers:
                        obj = Notification(
                            sender=admin_user,
                            receiver=subscriber.standard_user, 
                            subject='Level Upgrade',
                            date=datetime.now().date(), 
                            status=False,
                            context=f"The editor you've subscribed, named {user.name}, has advanced to the Master level! Stay tuned",
                        )
                        notification_to_subscribers.append(obj)

                    Notification.objects.bulk_create(notification_to_subscribers)

                elif user.commentator_level == 'master':
                    user.commentator_level = "grandmaster"
                    create_notification(admin_user, user, "Congratulations! You've reached the Grandmaster level! You're now closer to becoming a Phenomenon in the world of analysis!")

                    # Send notification to followers who are not subscribers
                    followers = FollowCommentator.objects.filter(commentator_user=user)
                    subscribers = Subscription.objects.filter(commentator_user=user)
                    subscriber_ids = subscribers.values_list('standard_user__id', flat=True)
                    follower_notification = []

                    # Send notification to followers
                    followers = FollowCommentator.objects.filter(commentator_user=user)
                    notification = []
                    for follower in followers:
                        if follower.standard_user.id not in subscriber_ids:
                            obj = Notification(
                                sender=admin_user,
                                receiver=follower.standard_user, 
                                subject='Level Upgrade',
                                date=datetime.now().date(), 
                                status=False,
                                context=f"The editor you're following, named {user.name}, has advanced to the Grandmaster level! Stay tuned",
                            )
                            follower_notification.append(obj)
                    Notification.objects.bulk_create(notification)

                    # send notification to subscribers
                    notification_to_subcribers = []
                    for subscriber in subscribers:
                        obj1 = Notification(
                            sender=admin_user,
                            receiver=subscriber.standard_user, 
                            subject='Level Upgrade',
                            date=datetime.now().date(), 
                            status=False,
                            context=f"The editor you've subscribed, named {user.name}, has advanced to the Grandmaster level! Stay tuned",
                        )
                        notification_to_subcribers.append(obj1)
                    Notification.objects.bulk_create(notification_to_subcribers)
                
            user.save(update_fields=['commentator_level','updated'])

        # if level.winning_limit < win_count:
        #     if int(level.sucess_rate) < Success_rate :

        #         if user.commentator_level == 'apprentice':
        #             user.commentator_level = "journeyman"
        #             user.save()

        #         elif user.commentator_level == 'journeyman':
        #             user.commentator_level = "master"
        #             user.save()

        #         elif user.commentator_level == 'master':
        #             user.commentator_level = "grandmaster"
        #             user.save()

        if len(data) != 0:
            avg_odd = round(avg_odd/len(data), 2)
        else:
            avg_odd = 0

        # user.save(update_fields=['commentator_level','updated'])
        return Success_rate, Score_point, win_count, lose_count, country_leagues, avg_odd, only_leagues
    except:
        raise HttpResponseServerError("Statistics Exception")

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


def get_recent_comments(user_id, category, top_n=20):

    recent_comments = Comments.objects.filter(
            commentator_user__id=user_id,
            category__icontains=category,
            status='approve',
            is_resolve=True,
            is_prediction__in=[True, False]
        ).order_by('-created')[:top_n]

    correct_predictions = 0
    comments_journey = [obj.is_prediction for obj in recent_comments]

    for obj in recent_comments:
        if obj.is_prediction:
            correct_predictions += 1

    total_comments_recent = len(recent_comments) if len(recent_comments) != 0 else 1
    calculation = (correct_predictions / total_comments_recent) * 100

    return comments_journey, round(calculation, 2)

def get_translation_data(user_id, category):

    translation_cache = {}

    comments = Comments.objects.filter(
        commentator_user__id=user_id,
        category__icontains=category,
        status='approve',
        is_resolve=True,
        is_prediction__in=[True, False]
    ).values('league','country')

    frozen_dicts = [frozenset(d.items()) for d in comments]

    counter = Counter(frozen_dicts)

    most_common_duplicates = counter.most_common(5)

    result = [dict(frozenset_pair) for frozenset_pair, count in most_common_duplicates]

    translator = Translator()

    for i in result:
        country_to_translate = i['country']
        if country_to_translate in translation_cache:
            i['country'] = translation_cache[country_to_translate]
        else:
            # using googletras
            translated_country = translator.translate(country_to_translate)
            translation_cache[country_to_translate] = translated_country.text
            i['country'] = translated_country.text

            # USING tanslator library
            # translator= Translator(from_lang="turkish",to_lang="english")
            # translated_country = translator.translate(country_to_translate)
            # translation_cache[country_to_translate] = translated_country
            # i['country'] = translated_country

    return result

def get_comment_types(user_id, category, top_prediction_types):
    prediction_data = []
    other_comments = 0

    user_all_cmt = Comments.objects.filter(commentator_user__id=user_id, category__icontains=category, status='approve').count()


    for prediction_type in top_prediction_types:
        predict_type = Comments.objects.filter(
            commentator_user__id=user_id,
            prediction_type__icontains=prediction_type,
            category__icontains=category,
            status='approve'
        )

        if prediction_type == 'Alt/Üst':
            predict_type = predict_type.exclude(prediction_type__icontains='İlk Yarı')

        data = {
            "prediction_type": prediction_type,
            "calculation": len(predict_type)
        }
        prediction_data.append(data)
        other_comments += len(predict_type)

    if user_all_cmt == 0:
        prediction_data = []
    else:
        other_data = {
                "prediction_type":'Diger',
                "calculation": user_all_cmt - other_comments
            }
        prediction_data.append(other_data)

    return prediction_data

class SportsStatisticsView(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        datalist = []

        category = request.query_params.get('category', None)
        print('category: ', category)

        if category is not None:
            if category.lower() == 'basketball' or category.lower() == 'basketbol':

                try:
                    top_3_prediction_types_basketball = ['Maç Sonucu', 'İlk Yarı', 'Alt/Üst']
                    basketball_comment_types = get_comment_types(id, 'Basketbol', top_3_prediction_types_basketball)
                    basketball_comments_journey, basketball_calculation = get_recent_comments(id, 'Basketbol', top_n=20)
                    basketball_leagues = get_translation_data(id, 'Basketbol')

                    details = {
                        'comment_types': basketball_comment_types,
                        'comments_Journey': basketball_comments_journey,
                        'calculation': basketball_calculation,
                        'leagues': basketball_leagues
                    }
                    
                    datalist.append(details)
                except Comments.DoesNotExist:
                    datalist.append({})

            if category.lower() == 'football' or category.lower() == 'futbol':

                try:
                    top_3_prediction_types_football = ['Maç Sonucu', 'Karsilikli Gol', 'Alt/Üst']
                    football_comment_types = get_comment_types(id, 'Futbol', top_3_prediction_types_football)
                    football_comments_journey, football_calculation = get_recent_comments(id, 'Futbol', top_n=20)
                    football_leagues = get_translation_data(id, 'Futbol')

                    Fb_details = {
                        'comment_types': football_comment_types,
                        'comments_Journey': football_comments_journey,
                        'calculation': football_calculation,
                        'leagues': football_leagues
                    }
                    
                    datalist.append(Fb_details)
                    # datalist.insert(1, Fb_details)
                except Comments.DoesNotExist:
                    datalist.append({})

            return Response(data=datalist, status=status.HTTP_200_OK)

class BecomeEditorEarnDetailsview(APIView):
    def get(self, request, subscriber, format=None, *args, **kwargs): 
        try:
            commentator_level = request.query_params.get('type')
            value = SubscriptionSetting.objects.get(commentator_level=commentator_level)
            commission_rate = MembershipSetting.objects.get(commentator_level=commentator_level).commission_rate
            try:
                data = BecomeEditorEarnDetails.objects.get(subscription_type=commentator_level)
                value_with_commision_calc = int(value.month_1) - (int(value.month_1) * (int(commission_rate)/100))
                # total_earning = (float(value.month_1) * int(subscriber)) / int(data.threshold_subscriber)
                total_earning = (float(value_with_commision_calc) * int(subscriber)) / int(data.threshold_subscriber)
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
    def get(self, request, *args, **kwargs):
        if request.query_params.get('id', None) != None:
            user = User.objects.get(id=request.query_params.get('id'))
            if BecomeCommentator.objects.filter(user=user,status='active').exists():
                return Response({'data':'Your Membership plan is already active.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                if MembershipSetting.objects.filter(commentator_level = 'apprentice').exists():
                    obj = MembershipSetting.objects.get(commentator_level = 'apprentice')
                    serializer = MembershipSettingSerializer(obj).data
                    month = obj.promotion_duration.split(" ")[0]
                    monthly_amount = float(int(obj.plan_price)/int(month))
                    serializer['monthly_amount'] = monthly_amount
                    serializer['promotion_duration'] = "1 Months"
                    return Response(data=serializer, status=status.HTTP_200_OK)
                else:
                    return Response({'data':'Membership setting not found.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'data': 'User id not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def patch(self, request, id, format=None, *args, **kwargs):
        """
        Payment gateway code here.
        After sucessfully payment below code execute.
        """
        try:

            user = User.objects.filter(id=id).first()
            if not user:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            
          
            if user.user_role == "standard":
               
                data = dict(request.data)
                category_data = request.data.get('category', '').split(',')

               
                data["user_role"] = "commentator"
                data["commentator_level"] = "apprentice"
                data['category'] = category_data  
                data['experience'] = request.data.get('experience', None)
                data["commentator_status"] = "active"
                # data["remaining_monthly_count"] = (int(request.data.get('duration').split(" ")[0])-1)
                data["remaining_monthly_count"] = request.data.get('duration').split(" ")[0]

                
                serializer = UserSerializer(user, data=data, partial=True)
                if serializer.is_valid():
                    try:
                        serializer.save()
                        # editor_obj = BecomeEditor.objects.get(question = 'Become Editor price')
                        startdate_str = request.data.get('startdate')
                        formatted_startdate = datetime.strptime(startdate_str, '%d.%m.%Y %H:%M:%S')
                        # enddate = formatted_startdate + timedelta(days=30)
                        enddate = formatted_startdate + timedelta(days=1)
                        # enddate = ''
                        obj = BecomeCommentator.objects.create(user=user, money=request.data.get('monthly_amount'), membership_status='new', 
                                                               commentator=True, commentator_level='apprentice', status='active', duration=request.data.get('duration'), 
                                                               start_date=formatted_startdate, end_date=enddate)
                        obj.save()
                        admin_user = User.objects.get(phone='5123456789', is_admin=True)
                        notification_obj = Notification.objects.create(
                            sender=admin_user,
                            receiver=user, 
                            subject='Purchase Transactions', 
                            date=datetime.today().date(), 
                            status=False, context=f'Congratulations! You are now editor.', 
                            admin_context=f'{user.username} purchased the plan for becoming an editor.'
                        )
                        
                    except Exception as e:
                        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    return Response(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error':"You are not Standard user."},status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

class FootbalAndBasketballContentView(APIView):
    def get(self, request, *args, **kwargs):
        try:

            category = request.query_params.get('category')
            logged_in_user = request.query_params.get('userId', None)

            if category:
                queryset = Comments.objects.filter(status='approve', category=[category], commentator_user__is_delete=False, is_resolve=False).order_by('-created')
                data = CommentsSerializer(queryset, many=True).data  
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

                    comment_data['total_reactions'] = {
                        'total_likes': total_reactions['total_likes'] or 0,
                        'total_favorite': total_reactions['total_favorite'] or 0,
                        'total_clap': total_reactions['total_clap'] or 0
                    }

                    comments_with_reactions.append(comment_data)

                    if logged_in_user != 'null':
                        logged_in_user_id = User.objects.get(id=logged_in_user)
                        is_subscribe = Subscription.objects.filter(standard_user=logged_in_user_id, status='active', commentator_user=comment.commentator_user).exists()
                        comment_data['is_subscribe'] = is_subscribe

                return Response({'data': comments_with_reactions}, status=status.HTTP_200_OK)
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

def success_rate_score_points(user_id):
    user = User.objects.get(id=user_id) if user_id != None else None
    if user != None:
        data = Comments.objects.filter(commentator_user=user, is_resolve=True)
        win_count = data.filter(is_prediction=True).count()
        lose_count = data.filter(is_prediction=False).count()

        if len(data) != 0:
            Success_rate = round((win_count/len(data))*100, 2)
        else:
            Success_rate = 0

        # Score_point = ((10*win_count)- (10*lose_count))

        comments = data.exclude(status='reject').order_by('created')

        is_prediction_list = [item.is_prediction for item in comments if item.is_prediction is not None]

        Score_point = 0
        current_chain_true = 0
        current_chain_false = 0

        for is_prediction in is_prediction_list:
            if is_prediction:
                current_chain_false = 0
                current_chain_true += 1
                Score_point += current_chain_true * 10
            else:
                current_chain_true = 0
                current_chain_false += 1
                Score_point += current_chain_false * -10

        user.score_points = Score_point
        user.success_rate = Success_rate
        user.save(update_fields=['success_rate', 'score_points', 'updated'])
        return True
    return False
    

class RetrievePageData():

    def is_highlight_user(self, user_id, compare_date=None):
        try:
            if not compare_date: compare_date = datetime.now()
            is_highlight_user = Highlight.objects.filter(user_id=user_id, start_date__lte=compare_date, end_date__gte=compare_date, status="active").exists()
            return is_highlight_user
        except:
            return False
        
    def get_highlight_user(self, compare_date=None):
        try:
            if not compare_date: compare_date = datetime.now()
            highligth_user_list = list(Highlight.objects.filter(start_date__lte=compare_date, end_date__gte=compare_date, status="active").values_list('user_id', flat=True))
            print("--------", highligth_user_list)
            # highligth_user_list = list(Highlight.objects.filter(status="active").values_list('user_id', flat=True))
            return highligth_user_list
        except:
            return []
    
    def get_public_comments(self, id, category, highligt_user_list):
        """ Return public comments data """
        public_comments = []

        try:
            current_datetime = datetime.now()
            logged_in_user = User.objects.filter(id=id).first() if id != 'null' else None
            # is_highlight_user = self.is_highlight_user(id, current_datetime) if logged_in_user else False
            is_highlight_user = True

            highlight_comments = []
            if is_highlight_user:
                highlight_comments = Comments.objects.filter(commentator_user_id__in=highligt_user_list, status='approve', commentator_user__is_delete=False, is_resolve=False, category=[category]).order_by('?').only('id')

            highlight_comments_ids = highlight_comments.values_list('id', flat=True) if highlight_comments else []
            comments_data = Comments.objects.filter(status='approve', commentator_user__is_delete=False, is_resolve=False, category=[category]).exclude(id__in=highlight_comments_ids).order_by('-created').only('id')
            
            # all_comments = highlight_comments.union(comments_data) if highlight_comments else comments_data
            all_comments = list(highlight_comments) + list(comments_data) if highlight_comments else comments_data

            for comment in all_comments:
                comment_data = CommentsSerializer(comment).data
                date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")
        
                data = Comments.objects.filter(commentator_user=comment.commentator_user, commentator_user__is_delete=False).only('id','is_prediction')

                win_count = data.filter(is_prediction=True).count()
                lose_count = data.filter(is_prediction=False).count()
                comment_data['commentator_user'] ['win'] = win_count
                comment_data['commentator_user'] ['lose'] = lose_count

                is_subscribe = Subscription.objects.filter(standard_user=logged_in_user, commentator_user=comment.commentator_user, status='active').exists()
                comment_data['is_subscribe'] = is_subscribe

                compare_date = datetime.now()
                is_highlight = Highlight.objects.filter(user=comment.commentator_user, status='active').exists()
                comment_data['is_highlight'] = is_highlight

                success_rate_score_points(comment.commentator_user.id)
                
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
                
                public_comments.append(comment_data)

        except:
            public_comments = []

        return public_comments
    
    def get_subscription_comments(self, id, category, highligt_user_list):
        """ Return subscription comments data """
        subscription_comments = []

        try:
            current_datetime = datetime.now()

            # Id validation
            if id == 'null':
                return subscription_comments

            # Is user exist validation
            is_user_exist = User.objects.filter(id=id).exists()
            if not is_user_exist:
                return subscription_comments

            is_highlight_user = True

            # Is login user is highlight user than get random 5 subscription comments of all highlighted users
            highlight_comments = []
            if is_highlight_user:
                highlight_comments = Subscription.objects.filter(standard_user_id=id, commentator_user_id__in=highligt_user_list, commentator_user__is_delete=False, end_date__gte=datetime.now(), status='active').order_by('?').only('id','commentator_user')[:5]

            highlight_comments_ids = highlight_comments.values_list('id', flat=True) if highlight_comments else []
            subscription_data = Subscription.objects.filter(standard_user_id=id, commentator_user__is_delete=False, end_date__gte=datetime.now(), status='active').exclude(id__in=highlight_comments_ids).order_by('-created').only('id','commentator_user')

            # subscription_obj = highlight_comments.union(subscription_data) if highlight_comments else subscription_data
            subscription_obj = list(highlight_comments) + list(subscription_data) if highlight_comments else subscription_data

            for obj in subscription_obj:
                if Comments.objects.filter(commentator_user=obj.commentator_user, status='approve', commentator_user__is_delete=False, category=[category]).exists():
                # if Comments.objects.filter(commentator_user=obj.commentator_user, status='approve', commentator_user__is_delete=False).exists():
                    subscription_comment = Comments.objects.filter(commentator_user=obj.commentator_user, status='approve', public_content=False, commentator_user__is_delete=False, is_resolve=False, category=[category]).order_by('-created')

                    for comment in subscription_comment:
                        comment_data = CommentsSerializer(comment).data

                        is_highlight = Highlight.objects.filter(user=comment_data.commentator_user, status='active').exists()
                        comment_data['is_highlight'] = is_highlight

                        date_obj = datetime.strptime(comment_data['date'], "%Y-%m-%d")
                        comment_reactions = CommentReaction.objects.filter(comment=comment).values('like', 'favorite', 'clap')
                        total_reactions = comment_reactions.aggregate(
                            total_likes=Sum('like'),
                            total_favorite=Sum('favorite'),
                            total_clap=Sum('clap')
                        )

                        comment_data['is_subscribe'] = True

                        comment_data['commentator_user']['is_subscribed'] = True

                        success_rate_score_points(obj.commentator_user.id)

                        comment_data['date'] = date_obj.strftime("%d.%m.%Y") 
                        comment_data['total_reactions'] = {
                            'total_likes': total_reactions['total_likes'] or 0,
                            'total_favorite': total_reactions['total_favorite'] or 0,
                            'total_clap': total_reactions['total_clap'] or 0
                        }

                        subscription_comments.append(comment_data)

        except:
            subscription_comments = []
        
        return subscription_comments
    
    def get_highlights(self, id, category):
        """ Return highlights data """
        highlights = []
        standard_user_id = id if id != 'null' else None

        try:
            # Validation
            standard_user_id = id if User.objects.filter(id=standard_user_id).exists() else None

            # Get data
            all_highlights = Highlight.objects.filter(status='active', user__is_delete=False, user__is_admin=False, user__category__contains=[category]).order_by('?')[:5]
            
            for obj in all_highlights:
                highlighted_data = HighlightSerializer(obj).data
                user_data = highlighted_data['user'] 

                data = Comments.objects.filter(commentator_user=obj.user, commentator_user__is_delete=False).only('id','is_prediction')
                win_count = data.filter(is_prediction=True).count()
                lose_count = data.filter(is_prediction=False).count()
                highlighted_data['user'] ['win'] = win_count
                highlighted_data['user'] ['lose'] = lose_count

                success_rate_score_points(obj.user.id)

                if standard_user_id is not None:
                    logged_in_user = User.objects.get(id=standard_user_id)
                    is_subscribe = Subscription.objects.filter(standard_user=logged_in_user, commentator_user=obj.user, status='active').exists()
                    highlighted_data['is_subscribe'] = is_subscribe
                    is_highlight = Highlight.objects.filter(user=obj.user, status='active').exists()
                    highlighted_data['is_highlight'] = is_highlight

                count = Subscription.objects.filter(commentator_user=user_data['id'], commentator_user__is_delete=False, status='active').count()
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
            # ads = Advertisement.objects.all()
            today_date = timezone.now()
            ads = Advertisement.objects.filter(end_date__gte=today_date)
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
                    following = FollowCommentator.objects.filter(standard_user__id=id, commentator_user__is_delete=False).only('id', 'commentator_user')
                    for obj in following:
                        serializer = UserSerializer(obj.commentator_user).data
                        following_user.append(serializer)
        except:
            following_user = []
        
        return following_user
    

    def get_verify_ids(self):
        """ Return verify ids data """
        return list(BlueTick.objects.filter(status='approve', user__is_delete=False).values_list('user_id', flat=True))

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
            current_datetime = datetime.now()

            # Validation
            user_id = user_id if User.objects.filter(id=user_id).exists() else None
            
            user = User.objects.get(id=user_id) if id is not None else None       

            # Get all highlight user
            # compare_date = datetime.now()
            # highligth_user_list = list(Highlight.objects.filter(start_date__lte=compare_date, end_date__gte=compare_date, status="active").values_list('user_id', flat=True))
            highligt_user_list = Highlight.objects.filter(status="active").values_list('user_id', flat=True)
            # highligt_user_list = self.get_highlight_user()
            highlight_users = User.objects.filter(id__in=highligt_user_list, user_role='commentator', is_admin=False, is_delete=False).order_by('?').only('id')
            # highlight_users = User.objects.filter(id__in=highligt_user_list, user_role='commentator', is_admin=False, is_delete=False).annotate(random_order=F('id') * 0).order_by('random_order')[:5]

            # highlight_users = User.objects.filter(~Q(id=user_id), id__in=highligt_user_list, user_role='commentator', is_admin=False, is_delete=False).order_by('?').only('id')[:5]
            highlight_users_ids = highlight_users.values_list('id', flat=True)

            # Get data
            all_commentator_data = User.objects.filter(Q(~Q(id=user_id) & ~Q(id__in=highlight_users_ids)), user_role='commentator', is_admin=False, is_delete=False).order_by('?').only('id')
            all_commentator = list(highlight_users) + list(all_commentator_data)

            for obj in all_commentator:
                detail = {}
                count = Subscription.objects.filter(commentator_user_id=obj.id, standard_user__is_delete=False, status='active').count()
                # count = Subscription.objects.filter(commentator_user_id=obj.id, commentator_user__is_delete=False).count()
                user_data = UserSerializer(obj).data
                
                success_rate_score_points(obj.id)

                if user is not None:
                    is_subscribe = Subscription.objects.filter(standard_user=user, commentator_user=obj.id, status='active').exists()
                    detail['is_subscribe'] = is_subscribe
                    is_highlight = Highlight.objects.filter(user=obj.id, status='active').exists()
                    detail['is_highlight'] = is_highlight

                if user_id:
                    detail['is_fav_editor'] = FavEditors.objects.filter(commentator_user_id=user_data['id'], standard_user_id=user_id, commentator_user__is_delete=False).exists()
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

        category = request.query_params.get('category', None)
     
        retrieve_data = RetrievePageData()
        highligt_user_list = retrieve_data.get_highlight_user()

        # Get public comments data
        data_list['Public_Comments']  = retrieve_data.get_public_comments(request.query_params.get('id', None), category, highligt_user_list)

        # Get subscription comments data
        data_list['Subscription_Comments'] = retrieve_data.get_subscription_comments(request.query_params.get('id', None), category, highligt_user_list)
      
        # Get highlights data
        data_list['highlights'] = retrieve_data.get_highlights(request.query_params.get('id', None), category)
        
        # Get advertisment data
        data_list['ads'] = retrieve_data.get_ads()

        # Get following user data
        data_list['following_user'] = retrieve_data.get_following_user(request.query_params.get('id', None))
        
        # Get verify ids data
        data_list['verify_ids'] = retrieve_data.get_verify_ids()

        # Get comment reactions data
        data_list['comment_reactions'] = retrieve_data.get_comment_reactions(request.query_params.get('id', None))
        
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
    
class BecomeEditorFAQView(APIView):

    def get(self, request, id=None):
        adminuser_id = request.query_params.get('admin', None)
        if adminuser_id is not None:
            adminuser = User.objects.get(id=adminuser_id)
        
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
        if request.query_params.get("id", None) is not None:
            user = User.objects.get(id=request.query_params.get('id'))
            if user.is_delete == True:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
        if id != None:
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
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            data_list = []
            faq_data = request.data['faq_data'] if request.data['faq_data'] else []
            for index, data in enumerate(faq_data):
                # Update
                if data.get('id', None):
                    editor_obj = BecomeEditor.objects.filter(id=data['id']).first()
                
                # Add
                else:
                    editor_obj = BecomeEditor()
                
                if editor_obj:
                    editor_obj.index = index
                    editor_obj.question = data['question'] if data['question'] else None
                    editor_obj.answer = data['answer'] if data['answer'] else None
                    editor_obj.save()
                    data_list.append(editor_obj)
            
            serializer = BecomeEditorSerializer(data_list, many=True)
            return Response({'msg': 'Data saved successfully.', 'data': serializer.data}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
    def delete(self, request, id):
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            data_delete = BecomeEditor.objects.get(id=id)
            data_delete.delete()
            return Response({"msg": "deleted"}, status=status.HTTP_200_OK)
        except BecomeEditor.DoesNotExist:
            return Response({'msg':"DoesNotExist"},status=status.HTTP_404_NOT_FOUND)
        

def create_reminder_notification():
    try:
        notification_list = []
        cutoff_date = timezone.now() + timedelta(days=3)

        expires_sub = Subscription.objects.filter(end_date__date=cutoff_date.date())
        for sub in expires_sub:
            notification_obj = Notification(
                receiver=sub.commentator_user, 
                subject='Subscription Plan Expires',
                date=datetime.today().date(), 
                status=False,
                context=f'Hi {sub.commentator_user.username}, 3 days left until the subscription plan expires. You can renew your plan.'
            )
            
            notification_list.append(notification_obj)

        Notification.objects.bulk_create(notification_list)
        return True
    except:
        False

class BankDetailsView(APIView):
    def get(self, request, id=None, *args, **kwargs):
        try:
            adminuser_id = request.query_params.get('admin', None)
            if adminuser_id is not None:
                adminuser = User.objects.get(id=adminuser_id)
                
                if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            if id is not None:
                user = get_object_or_404(User, id=id)
                data = {}
                if user.user_role == 'commentator':
                    transactions = []

                    # Check if the user has bank details, and if not, handle it
                    try:
                        bank_details = BankDetails.objects.get(user=user)
                    except BankDetails.DoesNotExist:
                        bank_details = None

                    if bank_details:
                        bank_details_serializer = BankDetailsSerializer(bank_details).data
                    else:
                        bank_details_serializer = {}

                    withdrawable_rqst = Withdrawable.objects.filter(bankdetails=bank_details)
                    for obj in withdrawable_rqst:

                        formatted_date = obj.created.strftime("%d.%m.%Y - %H:%M")
                        details = {
                            "type":"Withdrawal Request",
                            "duration": obj.status,
                            "date":formatted_date,
                            "amount": obj.amount
                        }
                        transactions.append(details)

                    subscription_obj = Subscription.objects.filter(commentator_user=user)
                    for obj in subscription_obj:

                        level_obj = MembershipSetting.objects.get(commentator_level=user.commentator_level)
                        calculation = (float(level_obj.commission_rate) * float(obj.money)) / 100
                        final_cal = obj.money - calculation

                        # formatted_date = obj.start_date.strftime("%d.%m.%Y - %H:%M")
                        formatted_date = obj.created.strftime("%d.%m.%Y - %H:%M")
                        details = {
                            "type":"New Subscriber",
                            "duration":obj.duration,
                            "date":formatted_date,
                            "amount": final_cal
                        }
                        transactions.append(details)

                    my_subcriptions = Subscription.objects.filter(standard_user=user)
                    for obj in my_subcriptions:

                        # formatted_date = obj.start_date.strftime("%d.%m.%Y - %H:%M")
                        formatted_date = obj.created.strftime("%d.%m.%Y - %H:%M")
                        details = {
                            "type":"New Subscription",
                            "duration":obj.duration,
                            "date":formatted_date,
                            "amount": obj.money
                        }
                        transactions.append(details)

                    highlight_obj = Highlight.objects.filter(user=user)
                    for obj in highlight_obj:
                        # formatted_date = obj.start_date.strftime("%d.%m.%Y - %H:%M")
                        formatted_date = obj.created.strftime("%d.%m.%Y - %H:%M")
                        details = {
                            "type":"Highlight",
                            "duration":obj.duration,
                            "date":formatted_date,
                            "amount":obj.money
                        }
                        transactions.append(details)

                    become_editor = BecomeCommentator.objects.filter(user=user)
                    for obj in become_editor:
                        # formatted_date = obj.start_date.strftime("%d.%m.%Y - %H:%M")
                        formatted_date = obj.created.strftime("%d.%m.%Y - %H:%M")
                        details = {
                            "type":"Become Editor",
                            "duration":obj.duration,
                            "date":formatted_date,
                            "amount":obj.money
                        }
                        transactions.append(details)

                    bank_details_serializer['Transection_history'] = transactions
                    return Response({'data': bank_details_serializer}, status=status.HTTP_200_OK)

                if user.user_role == 'standard':
                    transactions = []
                    subscription_obj = Subscription.objects.filter(standard_user=user)
                    for obj in subscription_obj:
                        formatted_date = obj.start_date.strftime("%d.%m.%Y - %H:%M")
                        details = {
                            "type":"New Subscriber",
                            "duration":obj.duration,
                            "date":formatted_date,
                            "amount":obj.money
                        }
                        transactions.append(details)
                    return Response(data = transactions , status=status.HTTP_200_OK)
            else:
                data = {}
                queryset = BankDetails.objects.all().order_by('-created')
                bank_details_serializer = BankDetailsSerializer(queryset, many=True).data

                # Get counts for specific statuses
                # pending = BankDetails.objects.filter(status='pending').count()
                # approved = BankDetails.objects.filter(status='approve').count()
                # new = BankDetails.objects.filter(status='pending',created__date=datetime.today()).count()

                new_request = Withdrawable.objects.filter(status='pending')
                approve_request = Withdrawable.objects.filter(status='approve')

                # previous month data count:
                today = datetime.today()
                last_month_start = today.replace(day=1) - timedelta(days=1)
                last_month_end = today.replace(day=1) - timedelta(days=today.day)
                previous_month_count = Withdrawable.objects.filter(
                    created__gte=last_month_start,
                    created__lte=last_month_end
                ).count()

                # current month data count:
                current_date = timezone.now()
                first_day_of_month = current_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
                last_day_of_month = first_day_of_month.replace(month=first_day_of_month.month + 1)
                current_count = Withdrawable.objects.filter(created__gte=first_day_of_month, created__lt=last_day_of_month).count()

                lastmonth = ((current_count - previous_month_count)/100)*100

                notifications = Notification.objects.filter(subject='Purchase Transactions').order_by('-created')
                notifications_serializer = NotificationSerializer(notifications, many=True).data

                today = date.today()
                
                total_approved_amount_today = Withdrawable.objects.filter(
                    status='approve',
                    updated__date=today
                ).aggregate(total_approved=Sum('amount'))
               
                total_payment = total_approved_amount_today['total_approved'] or 0.0

                data.update({
                    'bank_details': bank_details_serializer,
                    'pending': new_request.count(),
                    'approved': approve_request.count(),
                    'new': new_request.count(),
                    'lastmonth': round(lastmonth, 2),
                    'notifications': notifications_serializer,
                    'total_payment': total_payment,
                })
                return Response({'data': data}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        # except BankDetails.DoesNotExist:
        #     return Response({'error': 'Bank details do not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
    def post(self, request, id):
        try:
            user = User.objects.get(id=id)
            
            if user.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)

            if 'bank_iban' not in request.data:
                return Response({'error' : 'bank_iban not found'}, status=status.HTTP_404_NOT_FOUND)
            else:
                bank_iban = request.data['bank_iban']

                bank_details, created = BankDetails.objects.get_or_create(user=user, defaults={'bank_iban': bank_iban})

                if not created:
                    bank_details.bank_iban = bank_iban
                    bank_details.save(update_fields=['bank_iban', 'updated'])
                    return Response({'data': 'Bank Iban has been updated successfully'}, status=status.HTTP_200_OK)
                else:
                    bank_details.total_balance = 0.0
                    bank_details.pending_balance = 0.0
                    bank_details.withdrawable_balance = 0.000
                    bank_details.save(update_fields=['total_balance', 'pending_balance', 'withdrawable_balance', 'updated'])
                    return Response({'data': 'Bank Iban has been created successfully'}, status=status.HTTP_201_CREATED)

        except User.DoesNotExist:
            return Response({'error' : 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    def patch(self, request, id):
        try:
            user = User.objects.get(id=id) 
            is_admin = user.is_admin

            if is_admin:
                action = request.data['action'] if 'action' in request.data else None
                bank_id = request.data['bank_id'] if 'bank_id' in request.data else None
                withdrawal_id = request.data['w_id'] if 'w_id' in request.data else None
                if action is not None and bank_id is not None and withdrawal_id is not None:
                    try:
                        query = BankDetails.objects.get(id=bank_id) 
                        query.status = action
                        query.save(update_fields=['status', 'updated'])
                        is_withdrawal_obj = Withdrawable.objects.filter(bankdetails=query).exists()
                        if is_withdrawal_obj:
                            # withdrawal_obj = Withdrawable.objects.filter(bankdetails=query).order_by('-created').first()
                            withdrawal_obj = Withdrawable.objects.get(bankdetails=query, id=withdrawal_id)
                            withdrawal_obj.status = action
                            withdrawal_obj.save(update_fields=['status', 'updated'])
                            if action == 'reject':
                                notification_obj = Notification.objects.create(
                                                sender=user,
                                                receiver=query.user, 
                                                subject='Withdrawal Request',
                                                date=datetime.now().date(), 
                                                status=False,
                                                context=f'Your withdrawal request has been declined by Motiwy.',
                                            )
                            if action == 'approve':
                                query.total_balance -= query.withdrawable_balance
                                # query.pending_balance -= query.withdrawable_balance
                                query.withdrawable_balance = 0
                                withdrawal_obj.new_total_balance -= withdrawal_obj.amount
                                withdrawal_obj.save(update_fields=['new_total_balance', 'updated'])
                                notification_obj = Notification.objects.create(
                                                sender=user,
                                                receiver=query.user, 
                                                subject='Withdrawal Request',
                                                date=datetime.now().date(), 
                                                status=False,
                                                context=f'Your withdrawal request has been approved by Motiwy.',
                                            )
                                query.save(update_fields=['total_balance', 'pending_balance', 'withdrawable_balance', 'updated'])
                            if action == 'in progress':
                                notification_obj = Notification.objects.create(
                                        sender=user,
                                        receiver=query.user, 
                                        subject='Withdrawal Request',
                                        date=datetime.now().date(), 
                                        status=False,
                                        context=f'Withdrawal request has been processed. The transaction will be completed as soon as possible.',
                                    )

                        return Response({'data' : 'Bank request successfully updated.'}, status=status.HTTP_200_OK)
                    except BankDetails.DoesNotExist:
                        return Response({'error' : 'Bank details doen not exist'}, status=status.HTTP_404_NOT_FOUND) 
                else:
                    return Response({'error' : 'Something went wrong'}, status=status.HTTP_404_NOT_FOUND)
            else:

                withdrawable_amount = request.data['withdrawable_amount'] if 'withdrawable_amount' in request.data else None
                bank_iban = request.data['bank_iban'] if 'bank_iban' in request.data else None

                if withdrawable_amount is not None and bank_iban is not None:
                    query = BankDetails.objects.get(user=user,bank_iban=bank_iban)
                    if query.status == None:
                        query.status = 'pending'
                        query.save(update_fields=['status','updated'])
                        return Response({'data': 'Your withdrawal request has been successfully submitted!'}, status=status.HTTP_200_OK)
                    else:
                        query.is_withdrawable_request = True
                        query.save()
                        return Response({'data': 'Your withdrawal request is currently in progress. Please await the first response before generating another request.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error' : 'Failed to process withdrawal request. Please try again later.'}, status=status.HTTP_404_NOT_FOUND) 

        except User.DoesNotExist:
            return Response({'error' : 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)     

class CheckDeactivatedAccount(APIView):
    def get(self, request, id):
        try:
            try:
                if request.query_params.get('editor_id') != 'undefined':
                    editor_id = request.query_params.get('editor_id')
                    editor_user = User.objects.get(id=editor_id) 
                    if editor_user.is_active == False:
                        return Response({"error":"Due to deactivated editor profile, you cannot subscribe to this user."}, status=status.HTTP_400_BAD_REQUEST)
        
                user = User.objects.get(id=id) 
                if user.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
                if not user.is_active:
                    return Response({'error' : 'Your account has been deactivated. Contact support for assistance.'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'data' : 'Your account is activated.'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error' : 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
          
class GetUserdata(APIView):
    def get(self, request, id):
        try:
            try:
                user = User.objects.get(id=id) 
                data = Comments.objects.filter(commentator_user=user).only('id','is_prediction')
                win_count = data.filter(is_prediction=True).count()
                lose_count = data.filter(is_prediction=False).count()
                serializer = UserSerializer(user).data
                serializer['win'] = win_count
                serializer['lose'] = lose_count

                return Response({'data' : serializer}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error' : 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   

class EditorBannerView(APIView):
    def get(self, request):
        try:
            adminuser_id = request.query_params.get('admin', None)
            if adminuser_id is not None:
                adminuser = User.objects.get(id=adminuser_id)
                
                if adminuser.is_delete == True:
                        return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            banner =  EditorBanner.objects.all()    
            data = EditorBannerSerializer(banner, many=True).data
            return Response({'data' : data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request): 
        try:
            adminuser_id = request.query_params.get('admin')
            adminuser = User.objects.get(id=adminuser_id)
            
            if adminuser.is_delete == True:
                    return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            # print('request.data: ', request.data)
            if 'editor_banner' not in request.data:
                return Response({'data' : 'Editor banner is required.'}, status=status.HTTP_404_NOT_FOUND)
            
            editor_banner = request.data['editor_banner']
            bannerId = request.data['bannerId'] if 'bannerId' in request.data else None

            if bannerId is not None:
                banner =  EditorBanner.objects.get(id=int(bannerId))
                banner.editor_banner = editor_banner
                banner.save(update_fields=['editor_banner','updated'])
                return Response({'data' : 'Editor banner updated successfully.'}, status=status.HTTP_200_OK) 
            else:
                data = EditorBanner.objects.create(editor_banner=editor_banner)
                return Response({'data' : 'Editor banner created successfully.'}, status=status.HTTP_200_OK) 

        except Exception as e:
            return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
            
class GetFutbolAndBasketbolCountView(APIView):
    def get(self, request):
        try:
            futbol = Comments.objects.filter(commentator_user__is_delete=False, category=['Futbol'], is_resolve=False, status='approve').count()
            basketbol = Comments.objects.filter(commentator_user__is_delete=False, category=['Basketbol'], is_resolve=False, status='approve').count()
            return Response({'futbol' : futbol, 'basketbol' : basketbol}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class EditorsFutbolAndBasketbolCountView(APIView):
    def get(self, request):
        try:
            futbol = User.objects.filter(user_role='commentator', is_delete=False, category=['Futbol'], commentator_status='active').count()
            basketbol = User.objects.filter(user_role='commentator', is_delete=False, category=['Basketbol'], commentator_status='active').count()
            return Response({'futbol' : futbol, 'basketbol' : basketbol}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetPendingBalance(APIView):
    def get(self, request, id=None, format=None, *args, **kwargs):
        try:
            if id is not None:
                data_list = []
                editor_user = get_object_or_404(User, id=id)
                print('editor_user: ', editor_user)
                print('editor_user_id: ', editor_user.id)
                data = PendingBalanceHistory.objects.filter(editor=editor_user)
                print('data: ', data)

                monthwise_data = defaultdict(list)
                monthwise_amount_sum = defaultdict(float)

                for record in data:
                    if record.date:
                        month_year = record.date.strftime("%B %Y")
                        monthwise_data[month_year].append(record)
                        monthwise_amount_sum[month_year] += record.amount

                for month_year, records in monthwise_data.items():
                    data = {
                        "month_year": month_year,
                        "total_amount": round(monthwise_amount_sum[month_year], 2),
                    }
                    monthly_data = []
                    for record in sorted(records, key=lambda x: x.date):
                        details = {
                            "date": record.date.strftime("%d.%m.%Y"),
                            "user": record.user.username,
                            "duration": record.duration,
                            "amount": round(record.amount, 2),
                        }
                        monthly_data.append(details)

                    data['data'] = monthly_data
                    data_list.append(data)
                return Response(data=data_list, status=status.HTTP_200_OK)
            else:
                return Response(data={"message": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response(data={"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={"message": "An error occurred: {}".format(str(e))}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class TransactionHistory(APIView):
    def get(self, request, id=None, format=None, *args, **kwargs):
        try:
            if id is not None:
                details = {}
                editor_user = get_object_or_404(User, id=id)
                data = PendingBalanceHistory.objects.filter(editor=editor_user)
                subscriber_income = PendingBalanceHistorySerializer(data, many=True).data
                details['subscriber_income'] = subscriber_income

                """withdrawal remaning"""
                withdrawal = []
                details['withdrawal'] = withdrawal

                payment = []
                subscription_obj = Subscription.objects.filter(subscription=True, standard_user=editor_user)
                for obj in subscription_obj:
                    subscription_payment = SubscriptionSerializer(obj).data
                    payment.append(subscription_payment)
                highlight_obj = Highlight.objects.filter(highlight=True, user=editor_user)
                for obj in highlight_obj:
                    highlight_payment = HighlightSerializer(obj).data
                    payment.append(highlight_payment)

                details['payment'] = payment

                return Response(data=details, status=status.HTTP_200_OK)
            else:
                return Response(data={"message": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response(data={"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={"message": "An error occurred: {}".format(str(e))}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserTransactionHistory(APIView):
    def get(self, request, id=None, format=None, *args, **kwargs):
        try:
            user = get_object_or_404(User, id=id)
            if user.user_role == 'standard':
                subscription_obj = Subscription.objects.filter(subscription=True, standard_user=user)
                subscription_payment = SubscriptionSerializer(subscription_obj, many=True).data
                return Response(data=subscription_payment, status=status.HTTP_200_OK)
            if user.user_role == 'commentator':
                payment = []
                subscription_obj = Subscription.objects.filter(subscription=True, standard_user=user)
                for obj in subscription_obj:
                    subscription_payment = SubscriptionSerializer(obj).data
                    payment.append(subscription_payment)
                highlight_obj = Highlight.objects.filter(highlight=True, user=user)
                for obj in highlight_obj:
                    highlight_payment = HighlightSerializer(obj).data
                    payment.append(highlight_payment)
                return Response(data=payment, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(data={"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={"message": "An error occurred: {}".format(str(e))}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from core.cron import Userst
class TestCronView(APIView):
    def get(self, request, id=None, format=None, *args, **kwargs):
        Userst()
        return Response(data={"message": "Cron run successfully"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CheckTicketActionView(APIView):
    def get(self, request, ticket_id=None, format=None, *args, **kwargs):
        try:
            current_time = datetime.now(timezone.utc)

            ticket_obj = TicketSupport.objects.get(id=ticket_id)
            if ticket_obj.admin_label == 'responded':
                response_obj = ResponseTicket.objects.filter(ticket=ticket_obj).order_by('-created').first()
                if response_obj:
                    time_difference = current_time - response_obj.created
                    hours_old = time_difference.total_seconds() / 3600
                    if hours_old >= 24:
                        ticket_obj.status = 'resolved'
                        ticket_obj.admin_label = 'resolved'
                        ticket_obj.user_label = 'resolved'
                        ticket_obj.save()
                        return Response(data={"message": "Since you did not take any action in the last 24 hours, so this ticket has been closed."}, status=status.HTTP_404_NOT_FOUND)
                    else:
                        serializer = TicketSupportSerializer(ticket_obj).data
                        return Response(data=serializer, status=status.HTTP_200_OK)
                else:
                    return Response(data={"message": "No response found for the ticket."}, status=status.HTTP_404_NOT_FOUND)
            else:
                serializer = TicketSupportSerializer(ticket_obj).data
                return Response(data=serializer, status=status.HTTP_200_OK)
        except TicketSupport.DoesNotExist:
            return Response(data={"message": "Ticket with the specified ID does not exist."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={"message": "An error occurred: {}".format(str(e))}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CheckNewSupportTicketView(APIView):
    def get(self, request, ticket_id=None, format=None, *args, **kwargs):
        if TicketSupport.objects.filter(watched=False).exists():
            return Response(data=True, status=status.HTTP_200_OK)
        else:
            return Response(data=False, status=status.HTTP_200_OK)

class CheckChangeSupportTicket(APIView):
    def get(self, request, ticket_id=None, format=None, *args, **kwargs):
        if TicketSupport.objects.filter(watched=False).exists():
            Ticket_obj = updated_count = TicketSupport.objects.filter(watched=False).update(watched=True)
            return Response(data=True, status=status.HTTP_200_OK)
        else:
            return Response(data=False, status=status.HTTP_200_OK)


class CreateWithdrawableRequest(APIView):
    def post(self, request, id=None, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id)

            if user.is_delete:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            if not user.is_active:
                return Response("Your account has been deactivated. Contact support for assistance.", status=status.HTTP_400_BAD_REQUEST)

            bankiban = request.data.get("bank_iban")
            amount = request.data.get("amount")

            try:
                bankdetails = BankDetails.objects.get(user=user, bank_iban=bankiban)
                if not Withdrawable.objects.filter(Q(Q(status="pending") | Q(status="in progress")), bankdetails=bankdetails).exists():
                    obj = Withdrawable.objects.create(bankdetails=bankdetails, amount=amount, withdrawable=True, 
                                                      old_total_balance=bankdetails.total_balance, new_total_balance=bankdetails.total_balance)
                    obj.save()
                    bankdetails.status = 'pending'
                    bankdetails.save(update_fields=['status','updated'])
                    serializer = WithdrawableSerializer(obj).data
                    return Response(data=serializer, status=status.HTTP_200_OK)
                else:
                    return Response(data={"message": "Your withdrawal request is currently in progress. Please await the first response before generating another request."}, status=status.HTTP_404_NOT_FOUND)
            except BankDetails.DoesNotExist:
                return Response(data={"message": "There are no bank details found for the specific Bank Iban."}, status=status.HTTP_404_NOT_FOUND)

        except User.DoesNotExist:
            return Response(data={"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateBankUpdateRequest(APIView):
    def post(self, request, id=None, format=None, *args, **kwargs):
        try:
            user = get_object_or_404(User, id=id)

            if user.is_delete:
                return Response("Your account has been deleted", status=status.HTTP_204_NO_CONTENT)
            if not user.is_active:
                return Response("Your account has been deactivated. Contact support for assistance.", status=status.HTTP_400_BAD_REQUEST)

            new_bank_iban = request.data.get("bank_iban")

            if BankDetails.objects.filter(user=user).exists():
                bankdetails = BankDetails.objects.get(user=user)
                obj = BankUpdate.objects.create(bankdetails=bankdetails, new_iban=new_bank_iban, bankupdate=True)
                obj.save()
                serializer = BankUpdateSerializer(obj).data
                return Response(data=serializer, status=status.HTTP_200_OK)

            return Response("Bank details not found for this user.", status=status.HTTP_404_NOT_FOUND)

        except User.DoesNotExist:
            return Response("User not found.", status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class ShowWithdrawableData(APIView):
    def get(self, request, format=None, *args, **kwargs):
        data_list = {}
        
        try:
            # all_request = Withdrawable.objects.all()
            all_request = Withdrawable.objects.all().order_by("-created")
            serializer = WithdrawableSerializer(all_request, many=True).data
            data_list['all_request'] = serializer
        except Exception as e:
            return Response(data={'error': 'An error occurred while fetching all requests.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        try:
            new_request = Withdrawable.objects.filter(status='pending')
            serializer1 = WithdrawableSerializer(new_request, many=True).data
            data_list['new_request'] = serializer1
            data_list['new_request_count'] = new_request.count()

            approve_request = Withdrawable.objects.filter(status='approve')
            data_list['approve_request_count'] = approve_request.count()

        except Exception as e:
            return Response(data={'error': 'An error occurred while fetching new requests.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=data_list, status=status.HTTP_200_OK)

def random_num():
    uppercase_letters = ''.join(random.choice(string.ascii_uppercase) for _ in range(2))    
    lowercase_letters = ''.join(random.choice(string.ascii_lowercase) for _ in range(2))    
    digits = ''.join(random.choice(string.digits) for _ in range(2))    
    random_string = uppercase_letters + lowercase_letters + digits    
    return random_string
class PaymentView(APIView):
    def post(self, request):

        ref_no = random_num()
        print()
        print()
        print()
        print('ref_no: ', ref_no)

        id = request.data.get('id', None)
        user_id = request.data.get('user_id', None)
        duration = request.data.get('duration', None)
        money = str(int(round(float(request.data.get('amount', None)))))
        commentator_username = request.data.get('commentator_username', None)

        category = request.data.get('category', None)
        experience = request.data.get('experience', None)
        profile_pic = request.data.get('profile_pic', None)
        profile_file = request.data.get('profile_file', None)

        if 'highlight' in request.data['payment']:

            if 'id' not in request.data:
                raise KeyError('Commentator Id not found.')
            if 'duration' not in request.data:
                raise KeyError('Duration not found.')
            if 'amount' not in request.data:
                raise KeyError('Amount not found.')           

            if duration not in ["1 Week", "2 Week", "1 Month"]:
                raise ValueError('Invalid duration.')
        
        if 'subscription' in request.data['payment']:
            # user = User.objects.get(id=id)
            # if user.is_active == False:
            #     return Response({"data":"Due to deactivated editor profile, you cannot subscribe to this user."}, status=status.HTTP_404_NOT_FOUND)
            pass

        if 'withdrawal' in request.data['payment']:
            pass

        
        if 'membership renew' in request.data['payment']:

            if 'id' not in request.data:
                raise KeyError('Commentator Id not found.')
            if 'duration' not in request.data:
                raise KeyError('Duration not found.')
            if 'amount' not in request.data:
                raise KeyError('Amount not found.')  
            
        if 'membership' in request.data['payment']:

            if 'id' not in request.data:
                raise KeyError('Commentator Id not found.')
            if 'duration' not in request.data:
                raise KeyError('Duration not found.')
            if 'amount' not in request.data:
                raise KeyError('Amount not found.')           

        if request.data.get('payment') == 'membership':
            data = {
                "Config": {
                    "MERCHANT": os.environ.get('MERCHANT'),
                    "MERCHANT_KEY": os.environ.get('MERCHANT_KEY'),
                    "ORDER_REF_NUMBER": ref_no,
                    "ORDER_AMOUNT": money,
                    "PRICES_CURRENCY": "TRY",
                    # "BACK_URL": f"http://localhost:3000/?ref={ref_no}"
                    "BACK_URL": f"https://motiwy.com/?ref={ref_no}"
                },
                "Customer": {
                    "FIRST_NAME": "Firstname",
                    "LAST_NAME": "Lastname",
                    "MAIL": "destek@esnekpos.com",
                    "PHONE": "05435434343",
                    "CITY": "İstanbul",
                    "STATE": "Kağıthane",
                    "ADDRESS": "Merkez Mahallesi, Ayazma Cd. No:37/91 Papirus Plaza Kat:5, 34406 Kağıthane / İSTANBUL"
                },
                "Product": [
                    {
                        "PRODUCT_ID": id,
                        "PRODUCT_NAME": duration if duration != None else 'Ürün Adı 1',
                        "PRODUCT_CATEGORY": request.data['payment'],
                        "PRODUCT_DESCRIPTION": "Ürün Açıklaması",
                        "PRODUCT_AMOUNT": money,
                    },
                    {
                        "PRODUCT_ID" : "1",
                        "PRODUCT_NAME" : experience,
                        "PRODUCT_CATEGORY" : category,
                        "PRODUCT_DESCRIPTION" : "Ürün Açıklaması",
                        "PRODUCT_AMOUNT" : money,
                    }
                ]
            }

            url = "https://posservicetest.esnekpos.com/api/pay/CommonPaymentDealer"
            print("data:", data)
            response = requests.post(url, json=data)
            json_data = response.json()
            if json_data['RETURN_CODE'] == '0':
                detail ={"profile_pic":request.FILES.get('profile_file', None)}
                user = User.objects.get(id=request.data.get('id'))
                serializer = UserSerializer(user, data=detail, partial=True)
                if serializer.is_valid():
                    try:
                        serializer.save()
                        return Response({"data": "Payment request successful", "URL_3DS": json_data['URL_3DS']}, status=status.HTTP_200_OK)
                    except Exception as e:
                        return Response({"data": str(e)}, status=status.HTTP_400_BAD_REQUEST)
                return Response({"data": "Payment request successful", "URL_3DS": json_data['URL_3DS']}, status=status.HTTP_200_OK)
            else:
                return Response({"data": "Payment Request Failed, Try again later.", 'response': json_data}, status=status.HTTP_400_BAD_REQUEST)

        elif request.data.get('payment') == 'subscription':
            data = {
            "Config": {
                "MERCHANT": os.environ.get('MERCHANT'),
                "MERCHANT_KEY": os.environ.get('MERCHANT_KEY'),
                "ORDER_REF_NUMBER": ref_no,
                "ORDER_AMOUNT": money,
                "PRICES_CURRENCY": "TRY",
                # "BACK_URL": f"http://localhost:3000/?ref={ref_no}"
                "BACK_URL": f"https://motiwy.com/?ref={ref_no}"
            },
            "Customer": {
                "FIRST_NAME": "Firstname",
                "LAST_NAME": "Lastname",
                "MAIL": "destek@esnekpos.com",
                "PHONE": "05435434343",
                "CITY": "İstanbul",
                "STATE": "Kağıthane",
                "ADDRESS": "Merkez Mahallesi, Ayazma Cd. No:37/91 Papirus Plaza Kat:5, 34406 Kağıthane / İSTANBUL"
            },
            "Product": [
                {
                    "PRODUCT_ID": id,
                    "PRODUCT_NAME": duration if duration != None else 'Ürün Adı 1',
                    "PRODUCT_CATEGORY": request.data['payment'],
                    "PRODUCT_DESCRIPTION": commentator_username if commentator_username != None  else "Ürün Açıklaması",
                    "PRODUCT_AMOUNT": money
                },
                {
                    "PRODUCT_ID" : user_id,
                    "PRODUCT_NAME" : experience,
                    "PRODUCT_CATEGORY" : category,
                    "PRODUCT_DESCRIPTION" : "Ürün Açıklaması",
                    "PRODUCT_AMOUNT" : money,
                }
            ]
        }

            url = "https://posservicetest.esnekpos.com/api/pay/CommonPaymentDealer"
            response = requests.post(url, json=data)
            json_data = response.json()
            if json_data['RETURN_CODE'] == '0':
                return Response({"data": "Payment request successful", "URL_3DS": json_data['URL_3DS']}, status=status.HTTP_200_OK)
            else:
                return Response({"data": "Payment Request Failed, Try again later.", 'response': json_data}, status=status.HTTP_400_BAD_REQUEST)

        else:
            data = {
            "Config": {
                "MERCHANT": os.environ.get('MERCHANT'),
                "MERCHANT_KEY": os.environ.get('MERCHANT_KEY'),
                "ORDER_REF_NUMBER": ref_no,
                "ORDER_AMOUNT": money,
                "PRICES_CURRENCY": "TRY",
                # "BACK_URL": f"http://localhost:3000/?ref={ref_no}"
                "BACK_URL": f"https://motiwy.com/?ref={ref_no}"
            },
            "Customer": {
                "FIRST_NAME": "Firstname",
                "LAST_NAME": "Lastname",
                "MAIL": "destek@esnekpos.com",
                "PHONE": "05435434343",
                "CITY": "İstanbul",
                "STATE": "Kağıthane",
                "ADDRESS": "Merkez Mahallesi, Ayazma Cd. No:37/91 Papirus Plaza Kat:5, 34406 Kağıthane / İSTANBUL"
            },
            "Product": [
                {
                    "PRODUCT_ID": id,
                    "PRODUCT_NAME": duration if duration != None else 'Ürün Adı 1',
                    "PRODUCT_CATEGORY": request.data['payment'],
                    "PRODUCT_DESCRIPTION": commentator_username if commentator_username != None  else "Ürün Açıklaması",
                    "PRODUCT_AMOUNT": money
                }
            ]
        }

            url = "https://posservicetest.esnekpos.com/api/pay/CommonPaymentDealer"
            response = requests.post(url, json=data)
            json_data = response.json()
            if json_data['RETURN_CODE'] == '0':
                return Response({"data": "Payment request successful", "URL_3DS": json_data['URL_3DS']}, status=status.HTTP_200_OK)
            else:
                return Response({"data": "Payment Request Failed, Try again later.", 'response': json_data}, status=status.HTTP_400_BAD_REQUEST)

class CheckTransactionEnquiry(APIView):
    def post(self, request):
        print()
        print()
        ref_no = request.data.get('ref_no', None)
        print('ref_no: ', ref_no)
        if ref_no != None:
            url = "https://posservicetest.esnekpos.com/api/services/ProcessQuery"
            data = {
                    "MERCHANT": os.environ.get('MERCHANT'),
                    "MERCHANT_KEY": os.environ.get('MERCHANT_KEY'),
                    "ORDER_REF_NUMBER" : ref_no
                    }
            response = requests.post(url, json=data)
            json_data = response.json()
            print('json_data: ', json_data)
            print()
            print()
            print()
            return Response({'data' : json_data}, status=status.HTTP_200_OK)
        else:
            return Response({'data' : 'Ref number not found!'}, status=status.HTTP_404_NOT_FOUND)

class ViewAllTicketHistory(APIView):
    def get(self, request, id, ticket_id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response(data={"error": "User not found for the given ID"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            support_obj = TicketSupport.objects.get(id=ticket_id)
        except TicketSupport.DoesNotExist:
            return Response(data={"error": "TicketSupport not found for the given ID"}, status=status.HTTP_404_NOT_FOUND)

        try:
            history = TicketHistory.objects.filter(ticket_support=support_obj).order_by('-created')
            history_serializer = TicketHistorySerializer(history, many=True).data
            return Response(data=history_serializer, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"error": f"An error occurred while retrieving the ticket history: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RenewModelData(APIView):
    def get(self, request, id, *args, **kwargs):
        data = {}
        try:
            user = User.objects.get(id=id)
            if user.remaining_monthly_count != 0:
                data['plan_duration'] = "1 Months"
                membership_obj = MembershipSetting.objects.get(commentator_level=user.commentator_level)
                # data['plan_price'] = (float(membership_obj.plan_price) / float((membership_obj.promotion_duration).split(" ")[0]))
                data['plan_price'] = float(membership_obj.plan_price)
                data['plan_promotion_rate'] = membership_obj.promotion_rate
            else:
                membership_obj = MembershipSetting.objects.get(commentator_level=user.commentator_level)
                data['plan_duration'] = "1 Months"
                # data['plan_price'] = membership_obj.plan_price
                # data['plan_price'] = (float(membership_obj.plan_price) / float((membership_obj.promotion_duration).split(" ")[0]))
                data['plan_price'] = float(membership_obj.plan_price)
                data['plan_promotion_rate'] = membership_obj.promotion_rate
        except ObjectDoesNotExist as e:
            return Response(data={'error': f'{e}'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={'error': f'An error occurred.{e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=data, status=status.HTTP_200_OK)


class SubscriptionReNew(APIView):
    def get(self, request, id, *args, **kwargs):
        user = User.objects.get(id=id)
        if BecomeCommentator.objects.filter(user=user,status='active').exists():
            return Response({'data':'Your Membership plan is already active.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if user.remaining_monthly_count != 0:
                obj = BecomeCommentator.objects.get(user=user)
                serializer = BecomeCommentatorSerializer(obj).data
                # serializer['monthly_duration'] = ''
                return Response(data=serializer, status=status.HTTP_200_OK)
            else:
                return Response({'data':'You have to purchase new membership plan.'}, status=status.HTTP_400_BAD_REQUEST)
    

    def patch(self, request, id, format=None, *args, **kwargs):
        try:
            user = User.objects.filter(id=id).first()
            if not user:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            if user.user_role == "commentator":
                data = {}

                # data['money'] = request.data.get('money')
                # data['duration'] = request.data.get('duration')
                # data['commentator'] = True

                startdate_str = request.data.get('start_date')
                formatted_startdate = datetime.strptime(startdate_str, '%d.%m.%Y %H:%M:%S')
                data['start_date'] = formatted_startdate

                # enddate = formatted_startdate + timedelta(days=30)
                enddate = formatted_startdate + timedelta(days=1)
                # data['end_date'] = enddate

                # data['user'] = UserSerializer(user).data
                # data['status'] = 'active'
                # data['membership_status'] = 'renew'
                # data['commentator_level'] = user.commentator_level
                duration = request.data.get('duration')
                money = request.data.get('money')
                if BecomeCommentator.objects.filter(user=user).exists():
                    obj = BecomeCommentator.objects.filter(user=user).update(status='deactive')
                
                # serializer = BecomeCommentatorSerializer(data=data)
                membership = BecomeCommentator.objects.create(user = user, duration=duration, money=money, commentator=True,
                                                              start_date=formatted_startdate, end_date=enddate,
                                                              status='active', membership_status='renew', commentator_level=user.commentator_level)
                membership.save()
                    
                serializer = BecomeCommentatorSerializer(membership).data
                        
                user.commentator_status = "active"
                user.deactivate_commentator = ""
                user.is_active = True
                user.save()

                admin_user = User.objects.get(phone='5123456789', is_admin=True)
                notification_obj = Notification.objects.create(
                    sender=admin_user,
                    receiver=user, 
                    subject='Purchase Transactions', 
                    date=datetime.today().date(), 
                    status=False, context=f'Congratulations! You sucessfully renew the membership.', 
                    admin_context=f'{user.username} renew the plan for becoming an editor.'
                    )

                return Response(serializer)

                    # except Exception as e:
                    #     return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    
                
                # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                #     serializer = BecomeCommentatorSerializer(obj, data=data, partial=True)
                #     if serializer.is_valid():
                #         try:
                #             serializer.save()
                            
                #             user.commentator_status = "active"
                #             user.deactivate_commentator = ""
                #             user.is_active = True
                #             user.save()

                #             if obj.membership_status.lower() == 'new':
                #                 user.remaining_monthly_count = user.remaining_monthly_count - 1
                #                 user.save()
                #         except Exception as e:
                #             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                        
                #         admin_user = User.objects.get(phone='5123456789', is_admin=True)
                #         notification_obj = Notification.objects.create(
                #             sender=admin_user,
                #             receiver=user, 
                #             subject='Purchase Transactions', 
                #             date=datetime.today().date(), 
                #             status=False, context=f'Congratulations! You sucessfully renew the membership.', 
                #             admin_context=f'{user.username} renew the plan for becoming an editor.'
                #             )
                #         return Response(serializer.data)
                # else:
                #     return Response({'error':"You don't have any membership plan."},status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'error':"You are not Commentator user."},status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class CheckAllTicketActionView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        try:
            current_time = datetime.now(timezone.utc)

            ticket_obj = TicketSupport.objects.all()
            for ticket in ticket_obj:

                if ticket.admin_label == 'responded':
                    response_obj = ResponseTicket.objects.filter(ticket=ticket).order_by('-created').first()
                    if response_obj:
                        time_difference = current_time - response_obj.created
                        hours_old = time_difference.total_seconds() / 3600
                        if hours_old >= 24:
                            ticket_obj.status = 'resolved'
                            ticket_obj.admin_label = 'resolved'
                            ticket_obj.user_label = 'resolved'
                            ticket_obj.save()
                            return Response(data={"message": "Since user did not take any action in the last 24 hours, so this ticket has been closed."}, status=status.HTTP_200_OK)
            return Response(data={"message": "Since user did not take any action in the last 24 hours, so this ticket has been closed."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"message": "An error occurred: {}".format(str(e))}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrieveBecomeCommentatorData(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response(data={"message": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={"message": f"An error occurred.{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        try:
            obj = BecomeCommentator.objects.filter(user__id=id).order_by("-created").first()
        except BecomeCommentator.DoesNotExist:
            return Response(data={"message": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={"message": f"An error occurred.{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            membership_obj = MembershipSetting.objects.get(commentator_level=user.commentator_level)
        except MembershipSetting.DoesNotExist:
            return Response(data={"message": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={"message": f"An error occurred.{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = BecomeCommentatorSerializer(obj).data
        # serializer['money'] = (float(membership_obj.plan_price) / float((membership_obj.promotion_duration).split(" ")[0]))
        serializer['money'] = float(membership_obj.plan_price)
        return Response(data=serializer, status=status.HTTP_200_OK)

class AccountStatus(APIView):
    def get(self, request, id=None):
        try:
            if id != None:
                user = User.objects.get(id=id)
                level_obj = CommentatorLevelRule.objects.get(commentator_level=user.commentator_level)
                
                required_wins = level_obj.winning_limit
                required_success_rate = level_obj.sucess_rate
                user_current_wins = len(Comments.objects.filter(commentator_user=user, is_resolve=True, is_prediction=True))
                user_success_rate = user.success_rate
                print('user.success_rate: ', user.success_rate)
                user_current_success_rate = user_success_rate

                percentage_left = (user_current_wins / required_wins) * 100
                print()
                print()
                print('round(user_current_success_rate, 2): ', math.floor(user_current_success_rate))
                print()
                print()

                data = {
                    'comments_left' : round(percentage_left, 0),
                    'commentator_status' : user.commentator_status,
                    'account_status' : user.is_active,
                    'required_wins' : required_wins,
                    'user_current_wins' : user_current_wins,
                    'required_success_rate' : required_success_rate,
                    'user_current_success_rate' : math.floor(user_current_success_rate),
                }

                return Response({'data': data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'data' : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrieveChartData(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response("User not found.", status=status.HTTP_404_NOT_FOUND)

        current_date = datetime.now()
        months = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        }
        year_month = {}
        for i in range(1, 7):
            months_ago = current_date - timedelta(days=30 * i)
            # print(f"{months_ago.month}:{months_ago.year}")
            try:
                obj = Subscription.objects.filter(commentator_user=user, created__month=months_ago.month, created__year=months_ago.year).count()
            except Exception as e:
                return Response(data={"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            month_name = months.get(months_ago.month)
            year_month[month_name] = obj

        return Response(data=year_month, status=status.HTTP_200_OK)
    

class WithdrawalSettingView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        level = request.query_params.get('level').lower()
        print("level", level)
        try:
            obj = WithdrawalSetting.objects.get(commentator_level=level)
            serializer = WithdrawalSettingSerializer(obj).data
            return Response(serializer, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({"error": "Withdrawal settings not found."}, status=status.HTTP_400_BAD_REQUEST)
            
    def post(self, request, format=None, *args, **kwargs):
        try:
            commentator_level = request.data.get('commentator_level', None)
            minimum_amount = request.data.get('minimum_amount', None)
            income_blocked_days = request.data.get('income_blocked_days', None)

            if commentator_level is None:
                return Response({"error": "Commentator level not found."}, status=status.HTTP_400_BAD_REQUEST)
            
            if WithdrawalSetting.objects.filter(commentator_level=commentator_level).exists():
                obj = WithdrawalSetting.objects.get(commentator_level=commentator_level)
                serializer = WithdrawalSettingSerializer(obj, data=request.data, partial=True)
                if serializer.is_valid():
                    try:
                        serializer.save()
                    except Exception as e:
                        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                if minimum_amount is None:
                    return Response({"error": "Minimum amount not found."}, status=status.HTTP_400_BAD_REQUEST)
                if income_blocked_days is None:
                    return Response({"error": "Income blocked days not found."}, status=status.HTTP_400_BAD_REQUEST)

                obj = WithdrawalSetting.objects.create(commentator_level=commentator_level, minimum_amount=minimum_amount, income_blocked_days=income_blocked_days)
                serializer = WithdrawalSettingSerializer(obj).data
                return Response(serializer, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetMinimumAmount(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
            obj = WithdrawalSetting.objects.get(commentator_level=user.commentator_level)
            serializer = WithdrawalSettingSerializer(obj).data
            return Response(serializer, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except WithdrawalSetting.DoesNotExist:
            return Response({"error": "Withdrawal Setting not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class CheckEditorStatus(APIView):
    def get(self, request, id, format=None, *args, **kwargs):
        user = User.objects.get(id=id)
        if user.is_active == False:
            return Response({"data":"Due to deactivated editor profile, you cannot subscribe to this user."}, status=status.HTTP_404_NOT_FOUND)
        return Response({"data":"you can subscribe to this user."}, status=status.HTTP_200_OK)
