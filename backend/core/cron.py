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
    all_user = User.objects.all()
    for individual in all_user:
        user = User.objects.get(id=individual.id)
        data = Comments.objects.filter(commentator_user= user.id)

        correct_prediction = data.filter(is_prediction=True)
        Success_rate = round((len(correct_prediction)/len(data))*100, 2)
        user.success_rate = Success_rate
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
            # print("i", i.commentator_user)
            # print(i.date, i.country, i.match_detail, i.category, i.league, i.status, i.prediction_type, i.prediction)
            if (i.category[0].lower()) == 'football':
                url = f"https://www.nosyapi.com/apiv2/bets/getMatchesListv9?type=1&league={i.league}&t={i.date}"
            else:
                url = f"https://www.nosyapi.com/apiv2/bets/getMatchesListv9?type=2&league={i.league}&t={i.date}"

            headers = {
                "Authorization": "Bearer lnIttTJHmoftk74gnHNLgRpTjrPzOAkh5nK5yu23SgxU9P3wARDQB2hqv3np"
            }
            response = requests.get(url, headers=headers)
            json_data = response.json()
            match_data_list = json_data["data"]

            for match in match_data_list:

                takimlar = match.get("takimlar")
                # print("Teams:", takimlar)
                if takimlar == i.match_detail:

                    # print("i am here")
                    matchID = match.get("MatchID")
                    # print(matchID, "-------------here")

                    matchid_url = f"https://www.nosyapi.com/apiv2/service/matches-result/details?matchID={matchID}"

                    data = requests.get(matchid_url, headers=headers)

                    matchID_data = data.json()
                    matchID_data_list = matchID_data["data"]

                    for match in matchID_data_list:

                        data = match.get("LiveStatus")

                        data_2 = match.get("matchResult")
                        for j in data_2:
                            if j['metaName'] == 'msHomeScore':
                                result = j['value']
                                print(result, "result")
                                if result == 1:
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

                        if data == 0:
                            if i.date < datetime.now().date():
                                i.is_resolve = True
                                i.save()
                        if data == 1:
                            i.is_resolve = True
                            i.save()
                        # print(data, "live")

                # print(i.date, i.country, i.match_detail, i.category, i.league, i.status)
                # print(i.match_detail)