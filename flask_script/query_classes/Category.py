from Response import Response

#Contains all queries for category Table
class Category:
    def __init__(self):
        self.table = 'category'
        self.categoryID = 'categoryID'
        self.categoryName = 'categoryName'
        self.categoryIDParam = self.table + '.' + self.categoryID
        self.categoryNameParam = self.table + '.' + self.categoryName
        self.response = Response()

    def getCategories(self):
        result = self.response.get(f"SELECT * FROM {self.table}")
        return result