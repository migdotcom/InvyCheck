from flask import Flask, request, jsonify
from Response import Response
from flask_cors import CORS
customHost = "192.168.1.80"
resp = Response()
app = Flask(__name__)
CORS(app)

@app.route("/api/getItems", methods = ['GET'])
def getItem():
    result = resp.get(f"SELECT * FROM testtable")
    return result

if __name__ == '__main__': 
    app.jinja_env.cache = {}
    app.run(host=customHost)