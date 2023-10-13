from core.models import Subscription, Notification, CommentatorLevelRule, PendingBalanceHistory, BankDetails
from datetime import datetime, timedelta, timezone
import pytz
import requests
from core.utils import sms_send
from core.models import User, Comments, Highlight
import logging
# from django_cron import CronJobBase, Schedule

logger = logging.getLogger('django_cron')

def subscription_reminder_cron():
    try:
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


        # Send notification expiration highlight purchase
        highlight_list = []
        expiration_highlight = Highlight.objects.filter(end_date__date__lt=today_date, status='active')
        for highlight in expiration_highlight:
            is_highlight_notification = Notification.objects.filter(receiver=highlight.user, subject='Highlight Plan Expires', date=today_date).exists()

            if not is_highlight_notification:
                notification = Notification(
                    receiver=highlight.user, 
                    subject='Highlight Plan Expires',
                    date=today_date, 
                    status=False,
                    context=f'Your Highlights period has ended! Boost your interactions by featuring again!'
                )
                highlight_list.append(notification)
        Notification.objects.bulk_create(highlight_list)
        
        if Highlight.objects.filter(end_date__date__lt=today_date, status='active').exists():
            Highlight.objects.filter(end_date__date__lt=today_date, status='active').update(status='deactive')

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
            logger.info("cron starttttttttt: %s", 'cron starttttt')
            logger.info("Processing user: %s", user.username)
            print("user", user.username)

            if not Comments.objects.filter(status='approve', is_prediction=None, commentator_user= user).exists():
                continue
            data = Comments.objects.filter(status='approve', is_prediction=None, commentator_user= user)
            logger.info("Processing Comment data: %s", data)
            print("startttt")
            print("comment_count", data.count())

            # correct_prediction = data.filter(is_prediction=True)
            # incorrect_prediction = data.filter(is_prediction=False)
            # Score_point = (10*len(correct_prediction)- 10*(len(incorrect_prediction)))

            # total_predictions = len(correct_prediction) + len(incorrect_prediction)
            # Success_rate = round((len(correct_prediction)/total_predictions)*100, 2)
            # user.success_rate = Success_rate
            # user.score_points = Score_point

            # level = CommentatorLevelRule.objects.get(commentator_level=user.commentator_level)
            
            # if level.winning_limit < correct_prediction.count():
            #     if int(level.sucess_rate) < Success_rate :

            #         if user.commentator_level == 'apprentice':
            #             user.commentator_level = "journeyman"
            #             user.save()

            #         elif user.commentator_level == 'journeyman':
            #             user.commentator_level = "master"
            #             user.save()

            #         elif user.commentator_level == 'master':
            #             user.commentator_level = "grandmaster"
            #             user.save()
 
            # if 0 < Success_rate < 60:
            #     user.commentator_level = "apprentice"
            # if 60 < Success_rate< 65:
            #     user.commentator_level = "journeyman"
            # if 65 < Success_rate < 70:
            #     user.commentator_level = "master"
            # if 70 < Success_rate < 100:
            #     user.commentator_level = "grandmaster"
            # user.save()

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
                        # if match['LiveStatus'] != 0:
                        teams = match.get("Teams")

                        if teams == i.match_detail:

                            matchID = match.get("MatchID")
                            logger.info("matchID : %s", matchID)
                            print("matchID", matchID)

                            # Save match score 
                            match_score_url = f'https://www.nosyapi.com/apiv2/service/matches-result/details?matchID={matchID}'

                            get_match_score = requests.get(match_score_url, headers=headers)
                            matchScore_data = get_match_score.json()
                            matchScore_data_list = matchScore_data["data"]
                            team_1 = 0
                            team_2 = 0
                            if matchScore_data_list:
                                i.is_resolve = True if matchScore_data_list[0]['matchResult'] and not i.is_resolve else i.is_resolve
                                for value in matchScore_data_list[0]['matchResult']:
                                    if value['metaName'] == 'msHomeScore':                                    
                                        team_1 = value['value']
                                    elif value['metaName'] == 'msAwayScore':                                    
                                        team_2 = value['value']

                            i.match_score = f'{team_1} - {team_2}'
                            logger.info("match_score: %s" % i.match_score)

                            i.save(update_fields=['match_score', 'is_resolve', 'updated'])
                            
                            matchid_url = f"https://www.nosyapi.com/apiv2/service/bettable-result?matchID={matchID}"

                            data1 = requests.get(matchid_url, headers=headers)
                            matchID_data = data1.json()
                            matchID_data_list = matchID_data["data"]
                            logger.info("matchID_data_list : %s", matchID_data_list)

                            for match in matchID_data_list:

                                bettableResult = match.get("bettableResult")

                                for obj in bettableResult:

                                    if obj['gameName'] == i.prediction_type:
                                        for obj_data in obj['game_result']:
                                            if obj_data['value'] == i.prediction:
                                                i.is_prediction = True
                                                i.save()
                                                break
                                            else:
                                                i.is_prediction = False
                                                i.save()

                                HomeWin = float(match['HomeWin']) if match['HomeWin'] is not None else 0.0
                                Draw = float(match['Draw'])  if match['Draw'] is not None else 0.0
                                AwayWin = float(match['AwayWin']) if match['AwayWin'] is not None else 0.0
                                GoalUnder = float(match['Under25']) if match['Under25'] is not None else 0.0
                                GoalOver = float(match['Over25']) if match['Over25'] is not None else 0.0
                                avg = (GoalOver+GoalUnder+AwayWin+HomeWin+Draw)/5
                                
                                i.average_odds =round(avg, 2)
                                i.save()

                                if match['LiveStatus'] != 0:
                                    i.is_resolve = True
                                    i.save()
            print("FOR LOOP END")
            correct_prediction = data.filter(is_prediction=True)
            incorrect_prediction = data.filter(is_prediction=False)
            Score_point = (10*len(correct_prediction)- 10*(len(incorrect_prediction)))

            total_predictions = len(correct_prediction) + len(incorrect_prediction)

            if total_predictions > 0:
                Success_rate = round((len(correct_prediction) / total_predictions) * 100, 2)
            else:
                Success_rate = 0

            user.success_rate = Success_rate
            user.score_points = Score_point
            print('score_points: ', Score_point)
            print('success_rate: ', Success_rate)

            level = CommentatorLevelRule.objects.get(commentator_level=user.commentator_level)
            print('level: ', level)
            
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

            logger.info("last debug: ======================%s")
            print("last debug")
            # Update is_resolve status for pending comment
            pending_comments = Comments.objects.filter(status='pending', is_resolve=False, commentator_user= user)
            resolve_pending_comments(pending_comments)
            
            user.save()
    except Exception as e:
        logger.error('\n Error occurred in comment prediction check cron: %s', str(e))


def resolve_pending_comments(comments_data):
    try:
        for i in comments_data:
            pending_category = 1 if (i.category[0].lower()) == 'futbol' else 2
            url = f"https://www.nosyapi.com/apiv2/service/bettable-matches?type={pending_category}&league={i.league}&date={i.date}"
            
            headers = {
                "Authorization": "Bearer lnIttTJHmoftk74gnHNLgRpTjrPzOAkh5nK5yu23SgxU9P3wARDQB2hqv3np"
            }
            response = requests.get(url, headers=headers)
            json_data = response.json()
            pending_match_data_list = json_data["data"]

            for match in pending_match_data_list:
                if match['LiveStatus'] != 0:
                    teams = match.get("Teams")

                    if teams == i.match_detail:
                        matchID = match.get("MatchID")

                        # Save match score 
                        match_score_url = f'https://www.nosyapi.com/apiv2/service/matches-result/details?matchID={matchID}'

                        get_match_score = requests.get(match_score_url, headers=headers)
                        matchScore_data = get_match_score.json()
                        matchScore_data_list = matchScore_data["data"]
                        team_1 = 0
                        team_2 = 0
                        if matchScore_data_list:
                            i.is_resolve = True if matchScore_data_list[0]['matchResult'] and not i.is_resolve else i.is_resolve
                            for value in matchScore_data_list[0]['matchResult']:
                                if value['metaName'] == 'msHomeScore':                                    
                                    team_1 = value['value']
                                elif value['metaName'] == 'msAwayScore':                                    
                                    team_2 = value['value']

                        i.match_score = f'{team_1} - {team_2}'
                        i.save(update_fields=['match_score', 'is_resolve', 'updated'])

        return True
    except Exception as e:
        logger.error('\n Error occurred in pending comment prediction check cron: %s', str(e))
        return True

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
