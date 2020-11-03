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
    self.host = "127.0.0.2"
    self.user = "root"
    self.password = "root"
    self.database = "sample_schema"
  
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
    mycusor = self.con.cursor(dictionary=True)
    mycusor.execute(query_string)
    result = mycusor.fetchall()
    # List to return all results
    return json.dumps(result)
  
  
