import requests, os
import xml.etree.ElementTree as ET
from datetime import datetime
from django.db.models import Q

# Models
from core.models import Comments

from rest_framework.authtoken.models import Token


def create_response(stts,msg,data=None):
    if stts != 200:
        response = {
            "status":"error",
            "data":{},
            "message":msg
        }
        return response
    if stts == 200:
        response = {
            "status":"success",
            "data":data if data else {},
            "message":msg
        }
        return response


usercode = os.environ.get('USERCODE')
password = os.environ.get('PASSCODE')

def sms_send(number, msg):
    print('msg: ', msg)
    print('number: ', number)
    xml = f'<?xml version="1.0"?><mainbody><header><usercode>{usercode}</usercode><password>{password}</password><msgheader>{usercode}</msgheader></header><body><msg><![CDATA[{msg}]]></msg><no>{number}</no></body></mainbody>'
    headers = {'Content-Type': 'application/xml'}
    res =  requests.post('https://api.netgsm.com.tr/sms/send/otp', data=xml, headers=headers)
    print('sms--------------------res: ', res)

    root = ET.fromstring(res.text)
    print('root: ', root)

    # Find the 'code' element in the response
    code_element = root.find('main/code')
    print('code_element: ', code_element)

    if code_element is not None:
        # Extract the value of the 'code' element
        code_value = code_element.text
        print('code_value: ', code_value)
        
        if code_value == '0':
            return "Success"
        else:
            return "Failure"
    else:
        return "Code element not found in the response."
    

def get_league_data(match_type, league, date, match_detail):
    try:
        match_data = None    
        access_token = "lnIttTJHmoftk74gnHNLgRpTjrPzOAkh5nK5yu23SgxU9P3wARDQB2hqv3np"
        match_type_data = {
            'Futbol': 1,
            'Basketbol': 2,
        }
        match_type = match_type_data.get(match_type, None)

        # URL and headers to make API request
        url = f"https://www.nosyapi.com/apiv2/service/bettable-matches?type={match_type}&league={league}&date={date}"
        headers = {
            "Authorization": f"Bearer {access_token}"
        }

        # Make the GET request
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            response_data = response.json() 
            match_data = []
            if response_data.get('data', None) != None:
                data = response_data.get('data')
                for obj in data:

                    if obj['Teams'] == match_detail:
                        match_data.append(obj)
                        return match_data
    
        # return match_data
    except:
        return None


# def on_match_time_update_comment_status(view_func):
#     def wrapped_view(*args, **kwargs):
#         try:
#             current_time = datetime.now()
#             formatted_time = current_time.time().strftime('%H:%M:%S')
#             Comments.objects.filter(Q(date=current_time.date(), match_time__lte=current_time.time()) | Q(date__lt=current_time.date()), is_resolve=False).update(is_resolve=True, match_score='0 - 0')
#             return view_func(*args, **kwargs)
#         except:
#             return view_func(*args, **kwargs)
    
#     return wrapped_view


# def generate_auth_token(user_obj, created=True):
#     # print("********", user_obj)
#     if created:
#         obj = Token.objects.create(user=user_obj)
#     else:
#         old_token = Token.objects.filter(user=user_obj).last()
#         if old_token:
#             old_token.delete()
#         obj = Token.objects.create(user=user_obj)
#     return obj.key

def generate_auth_token(user_obj):
    old_token = Token.objects.filter(user=user_obj).last()
    if old_token:
        old_token.delete()
    obj = Token.objects.create(user=user_obj)
    return obj.key