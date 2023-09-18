from core.models import Subscription, Notification
from datetime import datetime, timedelta, timezone
import pytz
import requests
from core.utils import sms_send
from core.models import User, Comments

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

def Userst():
    all_user = User.objects.filter(user_role='commentator')

    for individual in all_user:
        user = User.objects.get(id=individual.id)

        if not Comments.objects.filter(status='approve', is_prediction=None, commentator_user= user).exists():
            continue
        data = Comments.objects.filter(status='approve', is_prediction=None, commentator_user= user)

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
            if (i.category[0].lower()) == 'football':
                url = f"https://www.nosyapi.com/apiv2/service/bettable-matches?type=1&league={i.league}&date={i.date}"
            else:
                url = f"https://www.nosyapi.com/apiv2/service/bettable-matches?type=2&league={i.league}&date={i.date}"

            headers = {
                "Authorization": "Bearer lnIttTJHmoftk74gnHNLgRpTjrPzOAkh5nK5yu23SgxU9P3wARDQB2hqv3np"
            }
            response = requests.get(url, headers=headers)
            json_data = response.json()
            match_data_list = json_data["data"]
            
            if len(match_data_list) <= 0:
                continue
            
            for match in match_data_list:
                if match['LiveStatus'] != 0:
                    teams = match.get("Teams")

                    if teams == i.match_detail:

                        matchID = match.get("MatchID")
                        matchid_url = f"https://www.nosyapi.com/apiv2/service/bettable-result?matchID={matchID}"

                        data = requests.get(matchid_url, headers=headers)
                        matchID_data = data.json()
                        matchID_data_list = matchID_data["data"]

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