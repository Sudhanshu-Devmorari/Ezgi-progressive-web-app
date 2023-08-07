from rest_framework import serializers
from core.models import (User, FollowCommentator, Comments, Subscription, Notification,
                          CommentReaction, FavEditors, TicketSupport, ResponseTicket,
                          Highlight)
from datetime import datetime, timedelta

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class FollowCommentatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowCommentator
        fields = '__all__'


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'


class SubscriptionSerializer(serializers.ModelSerializer):
    commentator_user=UserSerializer()
    standard_user = UserSerializer()
    start_date = serializers.SerializerMethodField()
    class Meta:
        model = Subscription
        fields = '__all__'
    def get_created(self, obj):
        formatted_date = obj.start_date.strftime("%d.%m.%Y")
        formatted_time = obj.start_date.strftime("%H:%M")
        return f"{formatted_date} - {formatted_time}"

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class CommentReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentReaction
        fields = '__all__'


class FavEditorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavEditors
        fields = '__all__'


class TicketSupportSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    created = serializers.SerializerMethodField()
    class Meta:
        model = TicketSupport
        fields = '__all__'

    def get_created(self, obj):
        formatted_date = obj.created.strftime("%d.%m.%Y")
        formatted_time = obj.created.strftime("%H:%M")
        return f"{formatted_date} - {formatted_time}"


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