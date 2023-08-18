from django.contrib import admin
from core.models import (User, FollowCommentator, Comments, Subscription, Notification, 
                         CommentReaction, FavEditors, TicketSupport, Highlight, Advertisement,
                         CommentatorLevelRule, MembershipSetting, SubscriptionSetting, HighlightSetting ,
                         BecomeCommentator, BlueTick, DataCount)

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id','name','username','phone','password','country','city','age','category','profile_pic','user_role', 'is_delete','commentator_level','deactivate_commentator','commentator_status','created','updated')

@admin.register(FollowCommentator)
class FollowCommentatorAdmin(admin.ModelAdmin):
    list_display = ('id','commentator_user','standard_user','created','updated')

@admin.register(Comments)
class CommentsAdmin(admin.ModelAdmin):
    list_display = ('id','commentator_user','category','country','league','date','match_detail','prediction_type','prediction','public_content','comment', 'status','created','updated')


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('id','commentator_user','standard_user','subscription','duration','money','start_date','end_date','status', 'created','updated')


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id','sender', 'receiver','status', "subject", 'context','created','updated')


@admin.register(CommentReaction)
class CommentReactionAdmin(admin.ModelAdmin):
    list_display = ('id','comment','user','like','favorite','clap','created','updated')


@admin.register(FavEditors)
class FavEditorsAdmin(admin.ModelAdmin):
    list_display = ('id','commentator_user','standard_user','created','updated')


@admin.register(TicketSupport)
class SupportTicketAdmin(admin.ModelAdmin):
    list_display = ('id','user','department','subject','message','status','created','updated')


@admin.register(Highlight)
class HighlightAdmin(admin.ModelAdmin):
    list_display = ('id','user','duration','start_date','end_date','status','created','updated')


@admin.register(Advertisement)
class AdvertisementAdmin(admin.ModelAdmin):
    list_display = ('id','picture','ads_space','start_date','end_date','company_name','link','ads_budget','status','created','updated')


@admin.register(CommentatorLevelRule)
class CommentatorLevelRuleAdmin(admin.ModelAdmin):
    list_display = ('id','commentator_level','daily_match_limit','monthly_min_limit','ods_limit','winning_limit','sucess_rate','subscriber_limit','level_icon','created','updated')


@admin.register(MembershipSetting)
class MembershipSettingAdmin(admin.ModelAdmin):
    list_display = ('id','commentator_level','plan_price','commission_rate','promotion_rate','promotion_duration','created','updated')


@admin.register(SubscriptionSetting)
class SubscriptionSettingAdmin(admin.ModelAdmin):
    list_display = ('id','commentator_level','duration','month_1','month_3','month_6','year_1','created','updated')


@admin.register(HighlightSetting)
class HighlightSettingAdmin(admin.ModelAdmin):
    list_display = ('id','commentator_level','week_1','week_2','month_1','highlight_icon','created','updated')


@admin.register(BecomeCommentator)
class BecomeCommentatorAdmin(admin.ModelAdmin):
    list_display = ('id','user','duration', 'money', 'commentator','start_date','end_date','status','created','updated')


@admin.register(BlueTick)
class BlueTickAdmin(admin.ModelAdmin):
    list_display = ('id','user','status','created','updated')


@admin.register(DataCount)
class DataCountAdmin(admin.ModelAdmin):
    list_display = ('id','user','editor','subscription','comment','highlight','advertisement', 'ticket','comment_win','comment_lose','created','updated')
