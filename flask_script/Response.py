from QueryEngine import QueryEngine


class Response:
    def __init__(self):
        self.qe = QueryEngine()
        self.qe.connect()

    def get(self, query):
        result = self.qe.get_query(query)
        return result

    def post(self, query):
        self.qe.do_query(query)
        self.qe.commit()
        return {}

    def delete(self, query):
        result = self.qe.do_query(query)
        return result

    def put(self, query):
        result = self.qe.do_query(query)
        return result
