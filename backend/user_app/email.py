import requests
from string import Template
from backend.configuration import MG_SANDBOX, MG_KEY

MG_URL = f'https://api.mailgun.net/v3/{MG_SANDBOX}/messages'

with open(r"./email_templates/forgot_password.html", "r") as fp:
    forgot_password_html = fp.read()

with open(r"./email_templates/welcome.html", "r") as fp:
    welcome_html = fp.read()

forgot_password_template = Template(forgot_password_html)
welcome_template = Template(welcome_html)


def forgot_pass_mail(recipient: str, username: str, reset_token: str) -> bool:
    body = forgot_password_template.substitute(firstname=username, token=reset_token)
    request = requests.post(MG_URL, auth=('api', MG_KEY), data={
        'from': 'no-reply@pricepalette.tech',
        'to': recipient,
        'subject': '[IMPORTANT] Reset Password',
        'html': body
    })

    if request.status_code != 200:
        return False
    return True


def welcome_email(recipient: str, username: str) -> bool:
    body = welcome_template.substitute(firstname=username)
    request = requests.post(MG_URL, auth=('api', MG_KEY), data={
        'from': 'no-reply@pricepalette.tech',
        'to': recipient,
        'subject': 'Welcome to Price Palette!',
        'html': body
    })

    if request.status_code != 200:
        return False
    return True
