from backend.config.dbconfig import dbconfig
import psycopg2


class usersDAO:

    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s host=%s port=%s " \
                         % (dbconfig['dbname'], dbconfig['user'], dbconfig['password'], dbconfig['dbhost'],
                            dbconfig['dbport'])

        self.conn = psycopg2.connect(connection_url)

    def registerUser(self, ufirstname, ulastname, uusername, uemailaddress, upassword, ubio, ustatus):
        cursor = self.conn.cursor()
        query = "insert into users(ufirstname, ulastname, uusername, uemailaddress, upassword, ubio, ustatus) values " \
                "(%s, %s, %s, %s, %s, %s, %s) on conflict do nothing returning uid;"
        cursor.execute(query, (ufirstname, ulastname, uusername, uemailaddress, upassword, ubio, ustatus))

        uidfetch = cursor.fetchone()
        if uidfetch is None:
            uid = 0
        else:
            uid = uidfetch[0]
        self.conn.commit()
        return uid

    def getAllUsers(self):
        query = "select * from users;"
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

    def getUserByUserPassword(self, uusername, upassword):
        cursor = self.conn.cursor()
        query = "select uid, uusername, upassword, ustatus from users where uusername = %s and upassword = %s"
        cursor.execute(query, (uusername, upassword,))
        getResult = []
        for row in cursor:
            getResult.append(row)
        return getResult

    def loginuser(self, uusername, upassword):
        query = "select uid, ustatus from users where uusername=%s and upassword =%s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (uusername, upassword))
        return cursor.fetchone()

# update user
    def updateUser(self, ufirstname, ulastname, uusername, uemailaddress,upassword,ubio, uid):
            query = "update users set ufirstname=%s, ulastname=%s, uusername=%s,uemailaddress=%s, upassword=%s, ubio=%s where uid=%s;"
            cursor = self.conn.cursor()
            cursor.execute(query, (ufirstname, ulastname, uusername, uemailaddress, upassword,ubio, uid,))
            rowcount = cursor.rowcount
            self.conn.commit()
            return rowcount != 0

# check duplicate user
    def checkDuplicateUser(self, username, uid):
        cursor = self.conn.cursor()
        query = "select uusername  from users where uusername=%s and uid!=%s";
        cursor.execute(query, (username, uid,))
        self.conn.commit()
        result = cursor.fetchone()
        return result


