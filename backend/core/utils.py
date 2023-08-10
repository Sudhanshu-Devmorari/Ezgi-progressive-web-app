import requests, os
import xml.etree.ElementTree as ET

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
    xml = f'<?xml version="1.0"?><mainbody><header><usercode>{usercode}</usercode><password>{password}</password><msgheader>{usercode}</msgheader></header><body><msg><![CDATA[{msg}]]></msg><no>{number}</no></body></mainbody>'
    headers = {'Content-Type': 'application/xml'}
    res =  requests.post('https://api.netgsm.com.tr/sms/send/otp', data=xml, headers=headers)

    root = ET.fromstring(res.text)

    # Find the 'code' element in the response
    code_element = root.find('main/code')

    if code_element is not None:
        # Extract the value of the 'code' element
        code_value = code_element.text
        
        if code_value == '0':
            return "Success"
        else:
            return "Failure"
    else:
        return "Code element not found in the response."