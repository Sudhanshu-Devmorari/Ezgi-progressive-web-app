from core.models import Subscription, Notification
from datetime import datetime, timedelta, timezone
import pytz
import requests
from core.utils import sms_send
from core.models import User, Comments
import logging
# from django_cron import CronJobBase, Schedule

logger = logging.getLogger('django_cron')

def subscription_reminder_cron():
    try:
        u = User.objects.get(id=68)
        u.name = 'mansiiiiiiiii00000-------------------'
        u.save()
        print("\n\n =======>>>>>> Entering subscription")
        notification_list = []
        today_date = timezone.now().date() 
        cutoff_date = timezone.now() + timedelta(days=3)

        # Send notification and sms before 3 days of subscription expiration
        reminder_notification_sub_data = Subscription.objects.filter(end_date__date=cutoff_date.date(), status='active')
        for sub in reminder_notification_sub_data:
            is_exist = Notification.objects.filter(receiver=sub.standard_user, subject='Subscription Plan Expires', date=today_date).exists()
            
            if not is_exist:
                notification_obj = Notification(
                    receiver=sub.standard_user, 
                    subject='Subscription Plan Expires',
                    date=today_date, 
                    status=True,
                    context=f'Hi {sub.standard_user.username}, 3 days left until the subscription plan expires. You can renew your plan.'
                )

                notification_list.append(notification_obj)

        Notification.objects.bulk_create(notification_list)
        send_notification_sms(notification_list) 

        # Update subscription status to pending if subscription is not actived after subscription expiration
        pending_status = Subscription.objects.filter(end_date__gt=(today_date+ timedelta(days=3)), end_date__lt=(today_date+ timedelta(days=5)), status='active').update(status='pending')
        
        # Deactivate subscription after 3 days of expiration if subscription not activated
        pending_status = Subscription.objects.filter(end_date=(today_date+ timedelta(days=7)), status='pending').update(status='deactive')
        return True
    
    except:
        return False

def send_notification_sms(notification_data):
    try:
        for notification_obj in notification_data:
            message = f'Hi {notification_obj.receiver.username}, 3 days left until the subscription plan expires. You can renew your plan.'
            to_number = notification_obj.receiver.phone
            sms_send(to_number, message)
            return True
        return False
    
    except:
        return False

# def subscriptionstatus():
#     today_date = datetime.now(timezone.utc)

#     add_threeday = today_date + timedelta(days=3)

#     if Subscription.objects.filter(end_date=add_threeday).exists():
#         notify_user = Subscription.objects.filter(end_date=add_threeday)
#         if notify_user.exists():
#             """
#             Notification : for Renew Subscription.
#             """
            
#             for obj in notify_user:
#                 notification_obj = Notification.objects.get(user=obj.standard_user, status=False, context=f'Your {obj.commentator_user.username} commentator subscription expires in three days.')

#                 user = obj.standard_user
#                 message = "Hello, {}! This is a test SMS from your Django app.".format(user.username)
#                 to_number = user.phone
#                 sms_send(to_number, message)

#     if Subscription.objects.filter(end_date__lt=today_date).exists():
#         pending_status = Subscription.objects.filter(end_date=today_date)
#         for obj in pending_status:
#             obj.status = 'pending'
#             obj.save()

#     sub_threeday = today_date - timedelta(days=3)
#     if Subscription.objects.filter(end_date = sub_threeday).exists():
#         deactivate_status = Subscription.objects.filter(end_date = sub_threeday)
#         for deobj in deactivate_status:
#             deobj.status = 'deactive'
#             deobj.save()

def Userst():
    try:
        all_user = User.objects.filter(user_role='commentator')
        for individual in all_user:
            user = User.objects.get(id=individual.id)
            logger.info("Processing user: %s", user.username)

            if not Comments.objects.filter(status='approve', is_prediction=None, commentator_user= user).exists():
                continue
            data = Comments.objects.filter(status='approve', is_prediction=None, commentator_user= user)
            logger.info("Processing Comment data: %s", data)

            correct_prediction = data.filter(is_prediction=True)
            incorrect_prediction = data.filter(is_prediction=False)
            Score_point = (10*len(correct_prediction)- 10*(len(incorrect_prediction)))

            Success_rate = round((len(correct_prediction)/len(data))*100, 2)
            user.success_rate = Success_rate
            user.score_points = Score_point
            if 0 < Success_rate < 60:
                user.commentator_level = "apprentice"
            if 60 < Success_rate< 65:
                user.commentator_level = "journeyman"
            if 65 < Success_rate < 70:
                user.commentator_level = "master"
            if 70 < Success_rate < 100:
                user.commentator_level = "grandmaster"
            user.save()

            for i in data:
                logger.info("i.category[0] : %s", i.category[0])
                if (i.category[0].lower()) == 'futbol':
                    url = f"https://www.nosyapi.com/apiv2/service/bettable-matches?type=1&league={i.league}&date={i.date}"
                    logger.info("url : %s", url)
                else:
                    url = f"https://www.nosyapi.com/apiv2/service/bettable-matches?type=2&league={i.league}&date={i.date}"
                    logger.info("url : %s", url)

                headers = {
                    "Authorization": "Bearer lnIttTJHmoftk74gnHNLgRpTjrPzOAkh5nK5yu23SgxU9P3wARDQB2hqv3np"
                }
                response = requests.get(url, headers=headers)
                json_data = response.json()
                match_data_list = json_data["data"]
                logger.info("match_data_list : %s", match_data_list)
                
                if len(match_data_list) <= 0:
                    continue
                
                for match in match_data_list:
                    logger.info("LiveStatus : %s", match['LiveStatus'])
                    if match['LiveStatus'] != 0:
                        teams = match.get("Teams")

                        if teams == i.match_detail:

                            matchID = match.get("MatchID")
                            logger.info("matchID : %s", matchID)
                            
                            matchid_url = f"https://www.nosyapi.com/apiv2/service/bettable-result?matchID={matchID}"

                            data = requests.get(matchid_url, headers=headers)
                            matchID_data = data.json()
                            matchID_data_list = matchID_data["data"]
                            logger.info("matchID_data_list : %s", matchID_data_list)

                            for match in matchID_data_list:

                                bettableResult = match.get("bettableResult")

                                for obj in bettableResult:

                                    if obj['gameName'] == i.prediction_type:
                                        if obj['game_result'][0]['value'] == i.prediction:
                                            i.is_prediction = True
                                            i.save()
                                        else:
                                            i.is_prediction = False
                                            i.save()

                                HomeWin = float(match['HomeWin'])
                                Draw = float(match['Draw'])
                                AwayWin = float(match['AwayWin'])
                                GoalUnder = float(match['Under25'])
                                GoalOver = float(match['Over25'])
                                avg = (GoalOver+GoalUnder+AwayWin+HomeWin+Draw)/5
                                
                                i.average_odds =round(avg, 2)
                                i.save()

                                if match['LiveStatus'] != 0:
                                    i.is_resolve = True
                                    i.save()
    except Exception as e:
        logger.error('\n Error occurred in comment prediction check cron: %s', str(e))