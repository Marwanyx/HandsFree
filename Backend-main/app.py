# Imports
from flask import Flask, session, request
from flask_mail import Mail, Message

import os

import requests
import random
import string
import base64

from flask_cors import CORS


# Load environment variables
load_dotenv()
username = os.environ.get('EMAIL_USERNAME')
password = os.environ.get('EMAIL_PASSWORD')

# init backend
app = Flask(__name__)
CORS(app)

# CORS Headers 
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response
# config mail settings
mail= Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = username
app.config['MAIL_PASSWORD'] = password
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

# Generate License Key -- We used a base64 encoded string, but in production we would use a more complex solution
def generateLicenseKey():
    secret = "RU_Hacks"

    # Generate random string
    prefix = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(5))
    suffix = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(5))

    # Generate license key
    licenseKey = f"{prefix}{secret}{suffix}"

    # encode with base 64
    # licenseKey = base64.b64encode(licenseKey.encode('utf-8'))

    return licenseKey

def decodeLicenseKey(licenseKey):
    # decode with base64
    licenseKey = base64.b64decode(licenseKey).decode('utf-8')

    if "RU_Hacks" in licenseKey:
        return "Valid"
    else:
        return "Invalid"

# Get access token
def getBearerToken(assetId):
    accessKey = os.environ.get('accessKey')
    accessSecret = os.environ.get('accessSecret')

    url = "https://kbdgsb6g57.execute-api.us-east-1.amazonaws.com/prod/auth/getAccessToken"

    payload = {
        "accessKey": accessKey,
        "accessSecret": accessSecret
    }
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    token = requests.post(url, json=payload, headers=headers).json()['token']

    return token

# CreateQrCodeByAssetId
def createQRCode(assetId, licenseKey, token):
    url = f"https://kbdgsb6g57.execute-api.us-east-1.amazonaws.com/prod/assets/{assetId}/qrcodes"

    payload = {
        "dynamicRedirectType": "SCAN_ID_IN_QUERY_STRING_PARAMETER",
        "intent": str(licenseKey),
        "intentType": "STATIC_REDIRECT",
        "locatorKeyType": "HASHED_ID",
        "status": "ACTIVE"
    }
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": token   
    }

    qrCodeId = requests.post(url, json=payload, headers=headers).json()

    return qrCodeId['qrCode']['qrCodeId']

# get image of QR code
def getImage(qrCodeId, token):
    # Get Image of QR Code #################################################################
    url = f"https://kbdgsb6g57.execute-api.us-east-1.amazonaws.com/prod/qrcodes/{qrCodeId}?version=1"

    headers = {
        "Accept": "application/json",
        "Authorization": token   
    }

    encodedImage = requests.get(url, headers=headers).json()['image']['data']

    return encodedImage

def updateQRCodes(assetId, token):
    # Get all qr Codes

    # Update each with new license key

    pass

# create QR code
def QRCode():
    # Constants
    assetId = "71cad610-90d0-4fa3-a1da-bdae50d899e7"

    # generate QR code with openscreen

    # get bearer token
    token = getBearerToken(assetId)

    # Generate License Key
    licenseKey = generateLicenseKey()
    print("-------------------------------------")
    print(licenseKey)
    print(type(licenseKey))
    print("-------------------------------------")

    # create QR code
    qrCodeId = createQRCode(assetId, licenseKey, token)
    print(qrCodeId)
   
    # get image of QR code
    image = getImage(qrCodeId, token)
    
    return image


    
# /email route to send emails
@app.route("/email", methods=['POST'])
def sendEmail():
    # get request data
    userEmail = request.json['email']
    userName = request.json['name']
    
    # Base64 of image
    image = QRCode()

    # genrate random number of 5 digits
    randomNumber = ''.join(random.choice(string.digits) for x in range(5))
    
    # write base64 to file
    with open(f"qrCode-{randomNumber}.png", "wb") as f:
        f.write(base64.b64decode(image))


    # Attach QR code to the message
    mail = Mail(app)
    mail.init_app(app)
    msg = Message("Your License Key is Here!", sender="rehmafar@gmail.com",recipients=[userEmail])
    msg.body = "Hello! your license key is attached in the forrm of a QR code in this email. Please download and submit this QR code to the prompt on the website. Do not share this QR code with anyone!"
    
    # attach Qr code
    with app.open_resource(f"qrCode-{randomNumber}.png") as fp:
        msg.attach(f"qrCode-{randomNumber}.png", "image/png", fp.read())

    # msg.attach(data=open(f"qrCode-{randomNumber}.png", 'rb'), filename=f"qrCode-{randomNumber}.png")

    mail.send(msg)

    return "OK"


# start app
if __name__ == '__main__':
    app.run(debug=True)

