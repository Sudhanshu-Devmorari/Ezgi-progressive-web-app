from django.contrib import admin
from core.models import (User, FollowCommentator, Comments, Subscription, Notification, 
                         CommentReaction, FavEditors, TicketSupport, Highlight)

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id','name','username','phone','password','country','city','age','category','profile_pic','user_role','commentator_level','deactivate_commentator','commentator_status','created','updated')

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
    list_display = ('id','user','status', 'context','created','updated')


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