import mysql.connector
import json
#cnx = mysql.connector.connect(user="team9project@group9project", password={your_password}, host="group9project.mysql.database.azure.com", port=3306, database={your_database}, ssl_ca={ca-cert filename}, ssl_verify_cert=true)
# This Query Engine is used to simplify the querying process in python

class QueryEngine:
  
  def __init__(self, host="", user="", password="", database=""):
    self.host = host
    self.user = user
    self.password = password
    self.database = database
    self.connected = False
    if(len(self.host + self.user + self.password + self.database) == 0):
      self.setup_default()
  
  def setup_default(self):
    self.host = "invycheck-rds.c7l0e0kjkc0s.us-east-1.rds.amazonaws.com"
    self.user = "admin"
    self.password = "Monkey90"
    self.database = "invycheck"
  
  def connect(self):
    if(self.connected):
      return
    self.con = mysql.connector.connect(host = self.host, user = self.user, password = self.password, database = self.database)
    self.connected = True
    
  def disconnect(self):
    if(not self.connected):
      return
    self.con.close()
    self.connected = False
  
  def commit(self):
    if(self.connected):
      self.con.commit()
  
  def do_query(self, query_string):
    if(not self.connected):
        return
    mycursor = self.con.cursor(dictionary=True)
    mycursor.execute(query_string)
    return mycursor

  def get_query(self, query_string):
    if(not self.connected):
        return
    mycursor = self.do_query(query_string)
    result = mycursor.fetchall()
    # List to return all results
    return json.dumps(result)
  
  
