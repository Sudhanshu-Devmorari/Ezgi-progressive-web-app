from django.db import models
from django.contrib.postgres.fields import ArrayField
from datetime import date, datetime
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.

USER_ROLE_CHOISE = (
        ('standard','Standard'),
        ('commentator','Commentator'),
        ('sub_user','Sub_User'),
    )

COMMENTATOR_ROLE_CHOISE = (
        ('apprentice','Apprentice'),
        ('journeyman','Journeyman'),
        ('master','Master'),
        ('grandmaster','Grandmaster'),
    )
DEACTIVATE_STATUS = (
        ('accept','Accept'),
        ('reject','Reject'),
        ('pending','Pending'),
    )

EDITOR_STATUS = (
        ('active','Active'),
        ('pending','Pending'),
        ('deactive','Deactive'),
    )

class User(AbstractBaseUser):
    name = models.CharField(max_length=150)
    username = models.CharField(max_length=150)
    phone = models.CharField(max_length=15,unique=True)
    password = models.CharField(max_length=255)
    country = models.CharField(max_length=50, null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    gender  = models.CharField(max_length=30, null=True, blank=True)
    age = models.CharField(max_length=12, null=True, blank=True)
    category = ArrayField(models.CharField(null=True, blank=True), default=list)
    profile_pic = models.ImageField(upload_to='profile_pic', null=True, blank=True)
    user_role = models.CharField(max_length = 20, choices = USER_ROLE_CHOISE, default='standard')
    commentator_level = models.CharField(max_length = 20, choices = COMMENTATOR_ROLE_CHOISE, null=True, blank=True)
    deactivate_commentator = models.CharField(max_length = 20, choices = DEACTIVATE_STATUS, null=True, blank=True)
    commentator_status = models.CharField(max_length = 20, choices = EDITOR_STATUS, null=True, blank=True)
    authorization_type = models.CharField(max_length=100,null=True, blank=True)
    department = models.CharField(max_length=100,null=True, blank=True)
    is_transaction = models.BooleanField(default=False)
    is_view_only = models.BooleanField(default=False)
    is_process_withdrawal_request = models.BooleanField(default=False)
    is_rule_update = models.BooleanField(default=False)
    is_price_update = models.BooleanField(default=False)
    is_withdrawal_export = models.BooleanField(default=False)
    is_sales_export = models.BooleanField(default=False)
    is_all_permission = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s"%(self.name)
    
    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = []


class FollowCommentator(models.Model):
    commentator_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commentator_user')
    standard_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='standard_user')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


NEW_COMMENT_CHOISE = (
        ('pending','Pending'),
        ('approve','Approve'),
        ('reject','Reject'),
    )
class Comments(models.Model):
    commentator_user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = ArrayField(models.CharField(null=True, blank=True), default=list)
    country = models.CharField(max_length=50)
    league = models.CharField(max_length=120)
    date = models.DateField(default=date.today)
    match_detail = models.CharField(max_length=120)
    prediction_type = models.CharField(max_length=120)
    prediction = models.CharField(max_length=120)
    public_content = models.BooleanField()
    comment = models.CharField(max_length=250)
    status = models.CharField(max_length = 20, choices = NEW_COMMENT_CHOISE, default='pending')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


SUBSCRIPTION_STATUS = (
        ('active','Active'),
        ('pending','Pending'),
        ('deactive','Deactive'),
    )
class Subscription(models.Model):
    commentator_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commentator')
    standard_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='standard')
    money = models.FloatField()
    subscription = models.BooleanField()
    duration = models.CharField(max_length=20)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()
    status = models.CharField(max_length = 20, choices = SUBSCRIPTION_STATUS)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class Notification(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver')
    subject = models.CharField(max_length = 100)
    status = models.BooleanField()
    date = models.DateField()
    context = models.CharField(max_length = 100)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


# REACTION_STATUS = (
#         ('like','Like'),
#         ('favorite','Favorite'),
#         ('clap','Clap'),
#     )
class CommentReaction(models.Model):
    comment = models.ForeignKey(Comments, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    # reaction = models.CharField(max_length = 20, choices = REACTION_STATUS)
    like = models.IntegerField(null=True, blank=True)
    favorite = models.IntegerField(null=True, blank=True)
    clap = models.IntegerField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class FavEditors(models.Model):
    commentator_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commentator1')
    standard_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='standard1')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


SUPPORT_STATUS = (
        ('progress','Progress'),
        ('resolved','Resolved'),
        ('pending','Pending'),
    )
class TicketSupport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    department = models.CharField(max_length = 100)
    subject = models.CharField(max_length = 100)
    message = models.TextField()
    status = models.CharField(max_length = 20, choices = SUPPORT_STATUS, default='pending')
    # chat = ArrayField(models.JSONField(null=True, blank=True))
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class ResponseTicket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ticket = models.ForeignKey(TicketSupport, on_delete=models.CASCADE)
    response = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


# class DeactivateCommentator(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     is_deactivated = models.BooleanField()
#     created = models.DateTimeField(auto_now_add=True)
#     updated = models.DateTimeField(auto_now=True)

HIGHLIGHT_STATUS = (
        ('active','Active'),
        ('pending','Pending'),
        ('deactive','Deactive'),
    )
class Highlight(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    duration = models.CharField(max_length=20)
    money = models.FloatField()
    highlight = models.BooleanField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length = 20, choices = HIGHLIGHT_STATUS)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class MatchDetail(models.Model):
    comment = models.ForeignKey(Comments, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


ADVERTISEMENT_STATUS = (
        ('active','Active'),
        ('pending','Pending'),
        ('end','End'),
    )
class Advertisement(models.Model):
    picture = models.ImageField(upload_to='advertisement_pic', null=True, blank=True)
    ads_space = models.CharField(max_length=100,null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    company_name = models.CharField(max_length=100,null=True, blank=True)
    link = models.CharField(max_length=100,null=True, blank=True)
    ads_budget = models.FloatField()
    status = models.CharField(max_length = 20, choices = ADVERTISEMENT_STATUS, default='pending')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class CommentatorLevelRule(models.Model):
    commentator_level = models.CharField(max_length = 20, choices = COMMENTATOR_ROLE_CHOISE, null=True, blank=True)
    daily_match_limit = models.IntegerField()
    monthly_min_limit = models.IntegerField()
    ods_limit = models.CharField(max_length=50,null=True, blank=True)
    winning_limit = models.IntegerField()
    sucess_rate = models.CharField(max_length=50,null=True, blank=True)
    subscriber_limit = models.CharField(max_length=50,null=True, blank=True)
    level_icon = models.ImageField(upload_to='level_icon', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class MembershipSetting(models.Model):
    commentator_level = models.CharField(max_length = 20, choices = COMMENTATOR_ROLE_CHOISE, null=True, blank=True)
    plan_price = models.FloatField()
    commission_rate = models.CharField(max_length=50,null=True, blank=True)
    promotion_rate = models.CharField(max_length=50,null=True, blank=True)
    promotion_duration = models.CharField(max_length=50,null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


SUBSCRIPTION_ROLE_CHOISE = (
        ('journeyman','Journeyman'),
        ('master','Master'),
        ('grandmaster','Grandmaster'),
    )
class SubscriptionSetting(models.Model):
    commentator_level = models.CharField(max_length = 20, choices = SUBSCRIPTION_ROLE_CHOISE, null=True, blank=True)
    duration = models.CharField(max_length=50,null=True, blank=True)
    month_1 = models.FloatField()
    month_3 = models.FloatField()
    month_6 = models.FloatField()
    year_1 = models.FloatField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class HighlightSetting(models.Model):
    commentator_level = models.CharField(max_length = 20, choices = SUBSCRIPTION_ROLE_CHOISE, null=True, blank=True)
    week_1 = models.FloatField()
    week_2 = models.FloatField()
    month_1 = models.FloatField()
    highlight_icon = models.ImageField(upload_to='highlight_icon', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class OtpDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp_secret = models.CharField(max_length=16)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)