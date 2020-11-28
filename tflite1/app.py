import os
import os.path
from flask import Flask
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/api/capture", methods = ["GET"])
def captureImage():
    os.system('./tensorflow.sh')
    with open("data.json") as f:
        data = json.load(f)
    return json.dumps(data)

if __name__ == '__main__':
    app.jinja_env.cache = {}
    app.run()