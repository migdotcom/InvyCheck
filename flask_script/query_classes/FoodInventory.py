from Response import Response

#Contains all queries for food_inventory Table
class FoodInventory:
    def __init__(self):
        self.table = 'food_inventory'
        self.foodID = 'foodID'
        self.amount = 'amount'
        self.response = Response()

    def getFoodInventory(self):
        result = self.response.get(f"SELECT * FROM {self.table}")
        return result