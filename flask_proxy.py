from flask import Flask, request, Response
import requests
from requests.auth import HTTPBasicAuth
from urllib.parse import urlparse

app = Flask(__name__)

@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>', methods=['GET'])
def catch_all_get(path):
    hostname = urlparse(request.host_url).hostname
    
    if hostname == "prefect.d.next.spr.ocket.cloud":
        print("Is prefect")
        resp = requests.get(
            request.url,
            auth=HTTPBasicAuth('shuckle','')
        )
    else:
        print(hostname)
        resp = requests.get(
            f"http://httpbin.org/{path}",
            auth=HTTPBasicAuth('username', 'password')
        )
    
    return Response(
        response=resp.text,
        status=resp.status_code,
        headers=dict(resp.headers)
    )

if __name__ == '__main__':
    app.run(port=42069)