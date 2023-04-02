from backend.config.dbconfig import dbconfig
import psycopg2


class EntriesDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s host=%s port=%s " \
                         % (dbconfig['dbname'], dbconfig['user'], dbconfig['password'], dbconfig['dbhost'],
                            dbconfig['dbport'])

        self.conn = psycopg2.connect(connection_url)

    def getAllEntries(self):
        cursor = self.conn.cursor()
        query = "select * from mediaentry;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result






    def filterEntries(self,type):
        cursor = self.conn.cursor()
        query = "select * from mediaentry where mtype=%s;"
        cursor.execute(query, (type,))
        result = []
        for row in cursor:
            result.append(row)
        return result


#check this one
    def getEntryById(self, mid):
        cursor = self.conn.cursor()
        query = "select mname,mtype,mgenre,msynopsis,mstatus,mcount,mruntime,mrating,mcreator,mcompany from mediaentry where mid=%s;"
        cursor.execute(query, (mid,))
        result = cursor.fetchone()
        return result

    def insertNewEntry(self, mname,mtype,mgenre,msynopsis,mstatus,mcount,mruntime,mrating,mcreator,mcompany):
        query="insert into mediaentry (mname,mtype,mgenre,msynopsis,mstatus,mcount,mruntime,mrating,mcreator,mcompany) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) returning mid;"
        cursor = self.conn.cursor()
        cursor.execute(query, (mname,mtype,mgenre,msynopsis,mstatus,mcount,mruntime,mrating,mcreator,mcompany,))
        mid=cursor.fetchone()[0]
        self.conn.commit()
        return mid
    #checkthisone
    def update(self,mid,mstatus):
        query="update mediaentry set mstatus=%s, where mid= %s;"
        cursor=self.conn.cursor()
        cursor.execute(query, (mstatus,mid,))
        self.conn.commit()
        return mid



    def checktype(self,mtype):
        query="select exists(select mtype from mediaentry where mtype=%s);"
        cursor = self.conn.cursor()
        cursor.execute(query, (mtype,))
        result=cursor.fetchone()[0]
        return result



