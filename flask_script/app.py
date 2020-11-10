from flask import Flask, request, jsonify
from Response import Response
from flask_cors import CORS
import LocalHostIP
from query_classes.Category import Category
from query_classes.Food import Food
from query_classes.FoodInventory import FoodInventory
from query_classes.CategoryLookup import CategoryLookup

customHost = LocalHostIP.getLocalIP()
app = Flask(__name__)
CORS(app)

@app.route("/api/getCategories", methods = ['GET'])
def getCategories():
    category = Category()
    result = category.getCategories()
    return result

@app.route("/api/getCategoryLookup", methods = ['GET'])
def getCategoryLookup():
    categoryLookup = CategoryLookup()
    result = categoryLookup.getCategoryLookup()
    return result

@app.route("/api/getFoodItems", methods = ['GET'])
def getFoodItems():
    food = Food()
    result = food.getFoodItems()
    return result

@app.route("/api/getFoodInventory", methods = ['GET'])
def getFoodInventory():
    foodInventory = FoodInventory()
    result = foodInventory.getFoodInventory()
    return result

if __name__ == '__main__': 
    app.jinja_env.cache = {}
    app.run(host=customHost)