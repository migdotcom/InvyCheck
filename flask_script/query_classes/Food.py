from Response import Response

#Contains all queries for food Table
class Food:
    def __init__(self):
        self.table = 'food'
        self.foodID = 'foodID'
        self.foodName = 'foodName'
        self.foodIDParam = self.table + '.' + self.foodID
        self.foodNameParam = self.table + '.' + self.foodName
        self.response = Response()

    def getFoodItems(self):
        result = self.response.get(f"SELECT * FROM {self.table}")
        return result