from rest_framework import serializers
from core.models import (User, FollowCommentator, Comments, Subscription, Notification,
                          CommentReaction, FavEditors, TicketSupport, ResponseTicket,
                          Highlight, Advertisement, CommentatorLevelRule, MembershipSetting,
                          SubscriptionSetting, HighlightSetting, BlueTick, BecomeCommentator,
                          TicketHistory, BecomeEditor, BecomeEditorEarnDetails)
from datetime import datetime
from django.template.defaultfilters import timesince
from django.utils import timezone



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class FollowCommentatorSerializer(serializers.ModelSerializer):
    commentator_user = UserSerializer()
    standard_user = UserSerializer()
    class Meta:
        model = FollowCommentator
        fields = '__all__'


class CustomDateField(serializers.Field):
    def to_representation(self, value):
        if value:
            return value.strftime("%d.%m.%Y")
        return None
class CommentsSerializer(serializers.ModelSerializer):
    commentator_user = UserSerializer(required=False)
    # date = CustomDateField()
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
    def get_start_date(self, obj):
        formatted_date = obj.start_date.strftime("%d.%m.%Y")
        formatted_time = obj.start_date.strftime("%H:%M")
        return f"{formatted_date} - {formatted_time}"

# class NotificationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Notification
#         fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    receiver = UserSerializer()
    time_since_created = serializers.SerializerMethodField()
    def get_time_since_created(self, obj):
        now = timezone.now()
        time_difference = timesince(obj.created, now)

        # Check if the notification was created within the same day
        if "hour" in time_difference and "day" not in time_difference:
            return time_difference.split(",")[0] + " ago"
        else:
            return time_difference + " ago"
    class Meta:
        model = Notification
        fields = '__all__'
        extra_fields = ['time_since_created']

class CommentReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentReaction
        fields = '__all__'


class FavEditorsSerializer(serializers.ModelSerializer):
    commentator_user = UserSerializer()
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


class BecomeCommentatorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = BecomeCommentator
        fields = '__all__'


class BlueTickSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = BlueTick
        fields = '__all__'


class TicketHistorySerializer(serializers.ModelSerializer):
    user = UserSerializer()
    ticket_support = TicketSupportSerializer()
    response_ticket = ResponseTicketSerializer()
    request_to = UserSerializer()
    class Meta:
        model = TicketHistory
        fields = '__all__'


class BecomeEditorSerializer(serializers.Serializer):
    question = serializers.CharField(required=True)
    answer = serializers.CharField(required=True)

    class Meta:
        model = BecomeEditor
        fields = '__all__'
        REQUIRED_FIELDS = '__all__'

    def create(self, validated_data):
        return BecomeEditor.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.question = validated_data.get('question', instance.question)
        instance.answer = validated_data.get('answer', instance.answer)
        instance.save()
        return instance
    

class BecomeEditorEarnDetailsSerializer(serializers.Serializer):
    SUBSCRIPTION_ROLE_CHOICES = (
        ('journeyman','Journeyman'),
        ('master','Master'),
        ('grandmaster','Grandmaster'),
    )
    subscription_type = serializers.ChoiceField(choices=SUBSCRIPTION_ROLE_CHOICES, allow_blank=False)
    threshold_subscriber = serializers.IntegerField(required=True)
    earn_amount = serializers.FloatField(required=True)


    class Meta:
        model = BecomeEditorEarnDetails
        fields = '__all__'
        REQUIRED_FIELDS = '__all__'

    def create(self, validated_data):
        return BecomeEditorEarnDetails.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.subscription_type = validated_data.get('subscription_type', instance.subscription_type)
        instance.threshold_subscriber = validated_data.get('threshold_subscriber', instance.threshold_subscriber)
        instance.earn_amount = validated_data.get('earn_amount', instance.earn_amount)
        instance.save()
        return instance
    

class UpdateUserRoleSerializer(serializers.Serializer):
    EXPERIENCE = (
        ('1-2 years', '1-2 years'),
        ('3-4 years', '3-4 years'),
        ('5+ years', '5+ years'),
        ('10+ years', '10+ years'),
    )
    CATEGORY = (
        ('football', 'football'),
        ('basketball', 'basketball'),
        ('both', 'both')
    )
    profile_pic = serializers.ImageField()
    category = serializers.ListField(child=serializers.ChoiceField(choices=CATEGORY))
    experience = serializers.ChoiceField(choices= EXPERIENCE)
    class Meta:
        model = User
        fields = ['category', 'experience', 'profile_pic']
        REQUIRED_FIELDS = ['category', 'experience', 'profile_pic']

    def update(self, instance, validated_data):
        instance.profile_pic = validated_data.get('profile_pic', instance.profile_pic)
        instance.category = validated_data.get('category', instance.category)
        instance.experience = validated_data.get('experience', instance.experience)
        instance.save()
        return instance