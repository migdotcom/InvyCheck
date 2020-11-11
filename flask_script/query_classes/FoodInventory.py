from Response import Response
import json
from flask import Flask, request, jsonify
from .CategoryLookup import CategoryLookup
from .Category import Category
from .Food import Food

#Contains all queries for food_inventory Table
class FoodInventory:
    def __init__(self):
        self.table = 'food_inventory'
        self.foodID = 'foodID'
        self.amount = 'amount'
        self.foodItems = 'foodItems'
        self.foodIDParam = self.table + '.' + self.foodID
        self.amountParam = self.table + '.' + self.amount
        self.response = Response()

    def getFoodInventory(self):
        result = self.response.get(f"SELECT * FROM {self.table}")
        return result

    def addFoodInventory(self, content):
        foodID = content[self.foodID]
        amount = content[self.amount]
        return self.response.post(f"INSERT INTO {self.table}({self.foodID}, {self.amount}) VALUES({foodID},{amount})")

    def getFoodInventoryByCat(self):
        food = Food()
        category = Category()
        categoryLookup = CategoryLookup()
        resultCategories = self.response.get(f"SELECT DISTINCT {category.categoryIDParam}, {category.categoryNameParam} FROM {category.table}, {self.table}, {categoryLookup.table} WHERE {self.foodIDParam} = {categoryLookup.foodIDParam} AND {categoryLookup.categoryIDParam} = {category.categoryIDParam} ORDER BY {category.categoryIDParam}")
        resultFoods = self.response.get(f"SELECT {category.categoryIDParam}, {self.foodIDParam}, {food.foodNameParam}, {self.amountParam} FROM {self.table}, {category.table}, {categoryLookup.table}, {food.table} WHERE {self.foodIDParam} = {food.foodIDParam} AND {food.foodIDParam} = {categoryLookup.foodIDParam} AND {categoryLookup.categoryIDParam} = {category.categoryIDParam} ORDER BY {category.categoryIDParam}")
        result = self.sortFoodInventoryByCat(resultCategories, resultFoods, category.categoryID)
        return result

    def sortFoodInventoryByCat(self, resultCategories, resultFoods, categoryID):
        jsonObjectCategories = json.loads(resultCategories)
        jsonObjectFoods = json.loads(resultFoods) 
        
        for index, item in enumerate(jsonObjectCategories):
            jsonObjectCategories[index].update({self.foodItems:[]})

        for indexCat in range(len(jsonObjectCategories)):
            for indexFood in range(len(jsonObjectFoods)): 
                if jsonObjectCategories[indexCat][categoryID] == jsonObjectFoods[indexFood][categoryID]:
                    jsonObjectCategories[indexCat][self.foodItems].append(jsonObjectFoods[indexFood])

        return json.dumps(jsonObjectCategories)