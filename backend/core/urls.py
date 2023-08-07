from django.urls import path
from core.views import (RetrieveCommentatorView, FollowCommentatorView, CommentView, NotificationView, SubscriptionView,
                         CommentReactionView, ProfileView, FavEditorsCreateView, RetrieveFavEditorsAndFavComment,
                         SupportView, UpdateTicketMessageView, ResolvedTicket, ActiveResolvedCommentRetrieveView,
                         RetrieveSubscriberListAndSubscriptionList, DeactivateProfile, OtpSend, OtpVerify)

from core.views import (AdminMainPage, UserManagement, CommentsManagement, FilterComments, EditorManagement, EditorSubscriptionDetails,
                        FilterEditors, DeactivateCommentator, SalesManagement, SupportManagement, NotificationManagement,
                        SubUserManagement, AdvertisementManagement, LevelRule, MembershipSettingView, SubscriptionSettingView,
                        HighlightSettingView, CommentSetting)


urlpatterns = [
    path('retrieve-commentator/', RetrieveCommentatorView.as_view(), name='Retrieve-Commentator'),
    path('follow-commentator/', FollowCommentatorView.as_view(), name='Follow-Commentator'),
    path('subscription/', SubscriptionView.as_view(), name='Subscription'),
    path('post-comment/', CommentView.as_view(), name='Post-Comment'),
    path('post-comment/<int:pk>/', CommentView.as_view(), name='Update-Comment'),
    path('notification/<int:id>', NotificationView.as_view(), name='Notification'),
    path('comment-reaction/<int:comment_id>/', CommentReactionView.as_view(), name='Comment-Reaction'),
    path('profile/<int:id>', ProfileView.as_view(), name='Profile'),
    path('fav-editor/', FavEditorsCreateView.as_view(), name='FavEditors'),
    path('fav-editor-comment/<int:id>', RetrieveFavEditorsAndFavComment.as_view(), name='FavEditors-FavComment'),
    path('support/<int:id>', SupportView.as_view(), name='Support'),
    path('update-support-ticket/', UpdateTicketMessageView.as_view(), name='Update-Ticket-Message'),
    path('resolved-ticket/', ResolvedTicket.as_view(), name='Resolved-Ticket'),
    path('active-resolved-comment/', ActiveResolvedCommentRetrieveView.as_view(), name='Active-Resolved-Comment-Retrieve'),
    path('retrieve-subscribers-subscription/<int:id>', RetrieveSubscriberListAndSubscriptionList.as_view(), name='SubscriberList-SubscriptionList'),
    path('deactivate-profile/', DeactivateProfile.as_view(), name='Deactivate-Profile'),
    path('otp-send/', OtpSend.as_view(), name='Otp-Send'),
    path('otp-verify/', OtpVerify.as_view(), name='Otp-Verify'),


    # Admin Panel's api
    path('home/', AdminMainPage.as_view(), name='Main-Page'),
    path('user-management/', UserManagement.as_view(), name='Main-Page'),
    path('user-management/<int:pk>/', UserManagement.as_view(), name='Main-Page'),
    path('comments-management/', CommentsManagement.as_view(), name='Comments-Management'),
    path('comments-management/<int:pk>/', CommentsManagement.as_view(), name='Updateomments'),
    path('filter-comments/', FilterComments.as_view(), name='Filter-Comments'),
    path('editor-management/', EditorManagement.as_view(), name='Editor-Management'),
    path('editor-management/<int:pk>/', EditorManagement.as_view(), name='Editor-Management'),
    path('editor-subscription-details/', EditorSubscriptionDetails.as_view(), name='Editor-Subscription-Details'),
    path('filter-editors/', FilterEditors.as_view(), name='Filter-Editors'),
    path('deactivate-commentator/', DeactivateCommentator.as_view(), name='Deactivate-Commentator'),
    path('deactivate-commentator/<int:pk>/', DeactivateCommentator.as_view(), name='Deactivate-Commentator'),
    path('sales-management/', SalesManagement.as_view(), name='Sales-Management'),
    path('support-management/', SupportManagement.as_view(), name='Support-Management'),
    path('notification-management/', NotificationManagement.as_view(), name='Notification-Management'),
    path('subuser-management/', SubUserManagement.as_view(), name='SubUser-Management'),
    path('subuser-management/<int:pk>/', SubUserManagement.as_view(), name='SubUser-Management'),
    path('ads-management/', AdvertisementManagement.as_view(), name='Advertisement-Management'),
    path('ads-management/<int:pk>/', AdvertisementManagement.as_view(), name='Advertisement-Management'),
    path('level-rule/', LevelRule.as_view(), name='Level-Rule'),
    path('membership-setting/', MembershipSettingView.as_view(), name='Membership-Setting'),
    path('subscription-setting/', SubscriptionSettingView.as_view(), name='Subscription-Setting'),
    path('highlight-setting/', HighlightSettingView.as_view(), name='Highlight-Setting'),
    path('comment-setting/', CommentSetting.as_view(), name='Comment-Setting'),

]
