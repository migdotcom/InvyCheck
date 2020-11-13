from Response import Response
import json
from flask import Flask, request, jsonify


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

    def deleteFoodInventory(self):
        result = self.response.delete(f"DELETE FROM {self.table}")
        return result
       


