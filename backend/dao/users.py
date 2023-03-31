from backend.config.dbconfig import dbconfig
import psycopg2


class usersDAO:

    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s host=%s port=%s " \
                         % (dbconfig['dbname'], dbconfig['user'], dbconfig['password'], dbconfig['dbhost'],
                            dbconfig['dbport'])

        self.conn = psycopg2.connect(connection_url)

    def registerUser(self, ufirstname, ulastname, uemailaddress, upassword, ubio, ustatus):
        cursor = self.conn.cursor()
        query = "insert into users(ufirstname, ulastname, uemailaddress, upassword, ubio, ustatus) values (%s, %s, %s, %s, %s, %s) on conflict do nothing returning uid;"
        cursor.execute(query, (ufirstname, ulastname, uemailaddress, upassword, ubio, ustatus))

    def getAllUsers(self):
        query = "select * from users as u order by u.uid;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getUserInfo(self, uid):
        query = "select * from users where uid = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (uid,))
        result = []
        for row in cursor:
            result.append(row)
        return result