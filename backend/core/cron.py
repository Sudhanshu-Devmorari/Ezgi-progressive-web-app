from core.models import Subscription, Notification
from datetime import datetime, timedelta, timezone
import pytz
from core.utils import sms_send
from core.models import User

def subscriptionstatus():
    today_date = datetime.now(timezone.utc)
    # utc = pytz.timezone('UTC')

    add_threeday = today_date + timedelta(days=3)
    # add_threeday_utc = add_threeday.astimezone(utc)
    # utc_offset_formatted = add_threeday_utc.strftime('%z')
    # utc_offset_formatted = f"{utc_offset_formatted[:-2]}:{utc_offset_formatted[-2:]}"
    # formatted_add_threeday = add_threeday_utc.strftime("%Y-%m-%d %H:%M:%S") + utc_offset_formatted
    if Subscription.objects.filter(end_date=add_threeday).exists():
        notify_user = Subscription.objects.filter(end_date=add_threeday)
        if notify_user.exists():
            """
            Notification : for Renew Subscription.
            """
            
            for obj in notify_user:
                notification_obj = Notification.objects.get(user=obj.standard_user, status=False, context=f'Your {obj.commentator_user.username} commentator subscription expires in three days.')

                user = obj.standard_user
                message = "Hello, {}! This is a test SMS from your Django app.".format(user.username)
                to_number = user.phone
                sms_send(to_number, message)

    # today_date1 = datetime.now(timezone.utc)
    # formatted_date = today_date1.strftime('%Y-%m-%d %H:%M:%S') + '+00:00'
    if Subscription.objects.filter(end_date__lt=today_date).exists():
        pending_status = Subscription.objects.filter(end_date=today_date)
        for obj in pending_status:
            obj.status = 'pending'
            obj.save()

    sub_threeday = today_date - timedelta(days=3)
    # sub_threeday_utc = sub_threeday.astimezone(utc)
    # utc_offset_formatted1 = sub_threeday_utc.strftime('%z')
    # utc_offset_formatted2 = f"{utc_offset_formatted1[:-2]}:{utc_offset_formatted1[-2:]}"
    # formatted_sub_threeday = sub_threeday_utc.strftime("%Y-%m-%d %H:%M:%S") + utc_offset_formatted2
    if Subscription.objects.filter(end_date = sub_threeday).exists():
        deactivate_status = Subscription.objects.filter(end_date = sub_threeday)
        for deobj in deactivate_status:
            deobj.status = 'deactive'
            deobj.save()


