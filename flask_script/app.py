from flask import Flask, request, jsonify
from Response import Response
from flask_cors import CORS
import LocalHostIP
from query_classes.Category import Category
customHost = LocalHostIP.getLocalIP()
app = Flask(__name__)
CORS(app)

@app.route("/api/getCategories", methods = ['GET'])
def getCategories():
    category = Category()
    result = category.getCategories()
    return result

if __name__ == '__main__': 
    app.jinja_env.cache = {}
    app.run(host=customHost)