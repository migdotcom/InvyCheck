from flask import Flask, request, jsonify
from Response import Response
from flask_cors import CORS
import LocalHostIP
from query_classes.Category import Category
from query_classes.Food import Food
from query_classes.FoodInventory import FoodInventory
from query_classes.CategoryLookup import CategoryLookup
from query_classes.FridgeInventoryPage import FridgeInventoryPage

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

@app.route("/api/addFoodInventory", methods=['POST'])
def addFoodInventory():
    response = Response()
    if not request.get_json():
        return jsonify(Data="Empty")
    # content = request.data
    # valid = validateAddFoodInventory(content)
    # if valid == 'None':
    content = request.get_json()
    content = content['payload']
    foodInventory = FoodInventory()
    return foodInventory.addFoodInventory(content)
    # else:
    #    return jsonify(Error=valid)

@app.route("/api/getFoodInventoryByCat", methods = ['GET'])
def getFoodInventoryByCat():
    fridgeInvPage = FridgeInventoryPage()
    result = fridgeInvPage.getFoodInventoryByCat()
    return result
    
if __name__ == '__main__': 
    app.jinja_env.cache = {}
    app.run(host=customHost)