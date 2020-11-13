import json
from QueryEngine import QueryEngine
import mysql.connector
from ResponseStatus import badRES, goodRES, checkGoodStatus

class Response:
    def __init__(self):
        self.qe = QueryEngine()
        self.qe.connect()

    def get(self, query):
        response = {}
        try:
            response = self.qe.get_query(query)
        except mysql.connector.Error as err:
            response = badRES
        return response

    def post(self, query):
        response = {}
        try:
            self.qe.do_query(query)
            self.qe.commit()
            response = goodRES
        except mysql.connector.Error as err:
            response = badRES
        return json.dumps(response)

    def delete(self, query):
        response = {}
        try:
            self.qe.do_query(query)
            self.qe.commit()
            response = goodRES
        except mysql.connector.Error as err:
            response = badRES
        return json.dumps(response)

    def put(self, query):
        result = self.qe.do_query(query)
        return result

    
