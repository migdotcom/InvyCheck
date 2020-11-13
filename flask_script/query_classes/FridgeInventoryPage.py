from Response import Response
import json
from flask import Flask, request, jsonify
from .CategoryLookup import CategoryLookup
from .Category import Category
from .Food import Food
from .FoodInventory import FoodInventory
from ResponseStatus import *

class FridgeInventoryPage:
    def __init__(self):
        self.foodInv = FoodInventory()
        self.food = Food()
        self.category = Category()
        self.categoryLookup = CategoryLookup()
        self.response = Response()
       
    def getFoodInventoryByCat(self):
        resultCategories = self.response.get(f"SELECT DISTINCT {self.category.categoryIDParam}, {self.category.categoryNameParam} \
                                             FROM {self.category.table}, {self.foodInv.table}, {self.categoryLookup.table} \
                                             WHERE {self.foodInv.foodIDParam} = {self.categoryLookup.foodIDParam} \
                                             AND {self.categoryLookup.categoryIDParam} = {self.category.categoryIDParam} \
                                             ORDER BY {self.category.categoryIDParam}")
        resultFoods = self.response.get(f"SELECT {self.category.categoryIDParam}, {self.foodInv.foodIDParam}, {self.food.foodNameParam}, {self.foodInv.amountParam} \
                                        FROM {self.foodInv.table}, {self.category.table}, {self.categoryLookup.table}, {self.food.table} \
                                        WHERE {self.foodInv.foodIDParam} = {self.food.foodIDParam} \
                                        AND {self.food.foodIDParam} = {self.categoryLookup.foodIDParam} AND {self.categoryLookup.categoryIDParam} = {self.category.categoryIDParam} \
                                        ORDER BY {self.category.categoryIDParam}")
        result = self.sortFoodInventoryByCat(resultCategories, resultFoods, self.category.categoryID)
        return result

    def sortFoodInventoryByCat(self, resultCategories, resultFoods, categoryID):
        foodItems = "foodItems"
        jsonObjectCategories = json.loads(resultCategories)
        jsonObjectFoods = json.loads(resultFoods) 

        for eachFoodItem in jsonObjectFoods: 
            for eachCategory in jsonObjectCategories:
                if eachFoodItem[categoryID] == eachCategory[categoryID]:
                    newFoodItemModel = self.foodItemsModel(eachFoodItem)
                    if not foodItems in eachCategory:
                        eachCategory.update({foodItems:[]})
                    eachCategory[foodItems].append(newFoodItemModel)

        return json.dumps(jsonObjectCategories)

    def updateFoodInventory(self, content):
        self.foodInv.deleteFoodInventory()
        status = {}
        for searcher in content:
            foodName = searcher[self.food.foodName]
            foodAmount = searcher[self.foodInv.amount]
            foodID = self.response.get(f"SELECT {self.food.foodID} FROM {self.food.table} WHERE {self.food.foodName} = '{foodName}'")
            if not checkEmptyResponse(foodID):
                status = badRES
                break
            foodID = json.loads(foodID)
         
            foodInvModel = self.addFoodInvModel(foodID[0][self.foodInv.foodID], foodAmount)
            
            status = self.foodInv.addFoodInventory(foodInvModel)

        return status

    def foodItemsModel(self, foodItem):
        newFoodItemModel = {
            self.food.foodID: foodItem[self.food.foodID],
            self.food.foodName: foodItem[self.food.foodName],
            self.foodInv.amount: foodItem[self.foodInv.amount]
        }
        return newFoodItemModel
    
    def addFoodInvModel(self, foodID, foodAmount):
        foodInvModel = {
            self.food.foodID:foodID,
            self.foodInv.amount:foodAmount
        }
        return foodInvModel