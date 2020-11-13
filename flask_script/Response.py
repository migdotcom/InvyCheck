import json
from QueryEngine import QueryEngine
import mysql.connector

class Response:
    def __init__(self):
        self.qe = QueryEngine()
        self.qe.connect()

    def get(self, query):
        result = self.qe.get_query(query)
        return result

    def post(self, query):
        status = "GOOD"
        try:
            self.qe.do_query(query)
            self.qe.commit()
        except mysql.connector.Error as err:
            status = "ERROR"
        response = {
            "status": status
        }
        return json.dumps(response)

    def delete(self, query):
        status = "GOOD"
        try:
            self.qe.do_query(query)
            self.qe.commit()
        except mysql.connector.Error as err:
            status = "ERROR"
        response = {
            "status": status
        }
        return json.dumps(response)

    def put(self, query):
        result = self.qe.do_query(query)
        return result
