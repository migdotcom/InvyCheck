from flask import Flask, request, jsonify
from Response import Response
from flask_cors import CORS
customHost = "192.168.68.111"
resp = Response()
app = Flask(__name__)
CORS(app)

@app.route("/api/getItems", methods = ['GET'])
def getItem():
    result = resp.get(f"SELECT * FROM sample_table")
    return result

if __name__ == '__main__': 
    app.jinja_env.cache = {}
    app.run(host=customHost)