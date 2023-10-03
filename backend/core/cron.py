from core.models import Subscription, Notification, CommentatorLevelRule, PendingBalanceHistory, BankDetails
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
        # u = User.objects.get(id=68)
        # u.name = 'mansiiiiiiiii00000-------------------'
        # u.save()
        # print("\n\n =======>>>>>> Entering subscription")
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

            level = CommentatorLevelRule.objects.get(commentator_level=user.commentator_level)
            
            if level.winning_limit < correct_prediction.count():
                if int(level.sucess_rate) < Success_rate :

                    if user.commentator_level == 'apprentice':
                        user.commentator_level = "journeyman"
                        user.save()

                    elif user.commentator_level == 'journeyman':
                        user.commentator_level = "master"
                        user.save()

                    elif user.commentator_level == 'master':
                        user.commentator_level = "grandmaster"
                        user.save()
 
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

                            # Save match score 
                            match_score_url = f'https://www.nosyapi.com/apiv2/service/matches-result/details?matchID={matchID}'

                            get_match_score = requests.get(match_score_url, headers=headers)
                            matchScore_data = get_match_score.json()
                            matchScore_data_list = matchScore_data["data"]

                            team_1 = 0
                            team_2 = 0
                            for value in matchScore_data_list[0]['matchResult']:
                                if value['metaName'] == 'msHomeScore':                                    
                                    team_1 = value['value']
                                elif value['metaName'] == 'msAwayScore':                                    
                                    team_2 = value['value']

                            i.match_score = f'{team_1} - {team_2}'

                            i.save(update_fields=['match_score', 'updated'])
                            
                            matchid_url = f"https://www.nosyapi.com/apiv2/service/bettable-result?matchID={matchID}"

                            data = requests.get(matchid_url, headers=headers)
                            matchID_data = data.json()
                            matchID_data_list = matchID_data["data"]
                            logger.info("matchID_data_list : %s", matchID_data_list)

                            for match in matchID_data_list:

                                bettableResult = match.get("bettableResult")

                                for obj in bettableResult:

                                    if obj['gameName'] == i.prediction_type:
                                        # if obj['game_result'][0]['value'] == i.prediction:
                                        #     i.is_prediction = True
                                        #     i.save()
                                        # else:
                                        #     i.is_prediction = False
                                        #     i.save()
                                        for obj_data in obj['game_result']:
                                            if obj_data['value'] == i.prediction:
                                                i.is_prediction = True
                                                i.save()
                                                break
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


def weekly_comment_count_check(): 
    # try:
    all_user = User.objects.filter(user_role='commentator')

    now = datetime.now()
    last_week_start = now - timedelta(days=7)

    for user in all_user:
        logger.info("user: %s", user.username)

        last_week_comments_count = Comments.objects.filter(
                commentator_user=user,
                created__date__gte=last_week_start.date(),
                created__date__lte=now.date()
            ).count()
        if last_week_comments_count < 5:
            notification_obj = Notification.objects.create(
                receiver=user, 
                subject='Weekly shared comment count',
                date=datetime.now().date(), 
                status=False,
                context=f"{user.username}, we noticed you haven't reached the required comment count. You should share comments as soon as possible."
            )
            notification_obj.save()
         
    # except Exception as e:
    #     logger.error('\n Error occurred during check weeky comment count: %s', str(e))


def withdrawable_balance_update():
    today_date = datetime.now().date()
    pending_history = PendingBalanceHistory.objects.filter(date=today_date)

    for obj in pending_history:
        
        bank_obj = BankDetails.objects.get(user=obj.editor)
        
        if bank_obj.withdrawable_balance is None:
            bank_obj.withdrawable_balance = 0.0

        bank_obj.pending_balance -= obj.amount
        bank_obj.withdrawable_balance += obj.amount

        bank_obj.save()
