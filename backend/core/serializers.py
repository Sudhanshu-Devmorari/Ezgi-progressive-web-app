from rest_framework import serializers
from core.models import (User, FollowCommentator, Comments, Subscription, Notification,
                          CommentReaction, FavEditors, TicketSupport, ResponseTicket,
                          Highlight, Advertisement, CommentatorLevelRule, MembershipSetting,
                          SubscriptionSetting, HighlightSetting)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class FollowCommentatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowCommentator
        fields = '__all__'


class CustomDateField(serializers.Field):
    def to_representation(self, value):
        if value:
            return value.strftime("%d.%m.%Y")
        return None
class CommentsSerializer(serializers.ModelSerializer):
    commentator_user = UserSerializer()
    # date = CustomDateField()
    class Meta:
        model = Comments
        fields = '__all__'


class SubscriptionSerializer(serializers.ModelSerializer):
    commentator_user=UserSerializer()
    standard_user = UserSerializer()
    class Meta:
        model = Subscription
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    sender=UserSerializer()

    class Meta:
        model = Notification
        fields = '__all__'


class CommentReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentReaction
        fields = '__all__'


class FavEditorsSerializer(serializers.ModelSerializer):
    commentator_user=UserSerializer()
    class Meta:
        model = FavEditors
        fields = '__all__'


class TicketSupportSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = TicketSupport
        fields = '__all__'


class ResponseTicketSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    ticket = TicketSupportSerializer()
    class Meta:
        model = ResponseTicket
        fields = '__all__'


class HighlightSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Highlight
        fields = '__all__'

class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = '__all__'


class CommentatorLevelRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentatorLevelRule
        fields = '__all__'


class MembershipSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipSetting
        fields = '__all__'


class SubscriptionSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionSetting
        fields = '__all__'


class HighlightSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = HighlightSetting
        fields = '__all__'