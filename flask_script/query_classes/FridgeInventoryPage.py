from Response import Response
import json
from flask import Flask, request, jsonify
from .CategoryLookup import CategoryLookup
from .Category import Category
from .Food import Food
from .FoodInventory import FoodInventory

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
                    newFoodItemModel = {
                        self.food.foodID: eachFoodItem[self.food.foodID],
                        self.food.foodName: eachFoodItem[self.food.foodName],
                        self.foodInv.amount: eachFoodItem[self.foodInv.amount]
                    }
                    if not foodItems in eachCategory:
                        eachCategory.update({foodItems:[]})
                    eachCategory[foodItems].append(newFoodItemModel)

        return json.dumps(jsonObjectCategories)