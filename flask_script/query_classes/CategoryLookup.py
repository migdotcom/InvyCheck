from Response import Response

#Contains all queries for category_lookup Table
class CategoryLookup:
    def __init__(self):
        self.table = 'category_lookup'
        self.foodID = 'foodID'
        self.categoryID = 'categoryID'
        self.response = Response()

    def getCategoryLookup(self):
        result = self.response.get(f"SELECT * FROM {self.table}")
        return result