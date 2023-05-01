from backend.config.dbconfig import dbconfig
import psycopg2


class MediaEntriesDAO:
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

    def filterEntries(self, type):
        cursor = self.conn.cursor()
        query = "select * from mediaentry where mtype=%s;"
        cursor.execute(query, (type,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    # check this one
    def getMediaEntryByID(self, mid):
        cursor = self.conn.cursor()
        query = "select mname,msynopsis,mcreator,mcompany,mstatus,mcount,mruntime,mrating,mtype,mgenre from " \
                "mediaentry where mid=%s; "
        cursor.execute(query, (mid,))
        getResult = []
        for row in cursor:
            getResult.append(row)
        return getResult

    def getMediaEntryByType(self, mtype):
        cursor = self.conn.cursor()
        query = "select mname,msynopsis,mcreator,mcompany,mstatus,mcount,mruntime,mrating,mtype,mgenre from " \
                "mediaentry where mtype=%s; "
        cursor.execute(query, (mtype,))
        getResult = []
        for row in cursor:
            getResult.append(row)
        return getResult

    def getMediaEntryByGenre(self, mgenre):
        cursor = self.conn.cursor()
        query = "select mname,msynopsis,mcreator,mcompany,mstatus,mcount,mruntime,mrating,mtype,mgenre from " \
                "mediaentry where mgenre=%s; "
        cursor.execute(query, (mgenre,))
        getResult = []
        for row in cursor:
            getResult.append(row)
        return getResult

    def getMediaEntryByName(self, mname):
        cursor = self.conn.cursor()
        query = "select mname,msynopsis,mcreator,mcompany,mstatus,mcount,mruntime,mrating,mtype,mgenre from " \
                "mediaentry where mname=%s; "
        cursor.execute(query, (mname,))
        getResult = []
        for row in cursor:
            getResult.append(row)
        return getResult

    def addMediaEntry(self, mname, msynopsis, mcreator, mcompany, mstatus, mcount, mruntime, mrating, mtype, mgenre):
        cursor = self.conn.cursor()
        query = "insert into mediaentry (mname, msynopsis, mcreator, mcompany, mstatus, mcount, mruntime, mrating, mtype, mgenre) " \
                "values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) returning mid;"
        cursor.execute(query, (mname, msynopsis, mcreator, mcompany, mstatus, mcount, mruntime, mrating, mtype, mgenre,))

        midfetch = cursor.fetchone()
        if midfetch is None:
            mid = 0
        else:
            mid = midfetch[0]
        self.conn.commit()
        return mid

    # checkthisone
    def updateMediaEntryStatus(self, mstatus, mid):
        cursor = self.conn.cursor()
        query = "update mediaentry set mstatus = %s where mid = %s;"
        cursor.execute(query, (mstatus, mid,))
        self.conn.commit()
        return mstatus

    def checktype(self, mtype):
        query = "select exists(select mtype from mediaentry where mtype=%s);"
        cursor = self.conn.cursor()
        cursor.execute(query, (mtype,))
        result = cursor.fetchone()[0]
        return result

    #library
    def addToLibrary(self, mid, uid):
        cursor=self.conn.cursor()
        query= "insert into library (mid, uid) values (%s,%s) returning mid"
        cursor.execute(query, (mid, uid,))
        midfetch = cursor.fetchone()
        if midfetch is None:
            mid = 0
        else:
            mid = midfetch[0]
        self.conn.commit()
        return mid

    def getAllEntriesByUser(self, uid):
        cursor = self.conn.cursor()
        query = "with L1 as (select mid from library where uid=%s) select * from L1 natural inner join mediaentry ;"
        cursor.execute(query, (uid, ))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def checkDuplicateEntry(self, mid, uid):
        cursor = self.conn.cursor()
        query = "select mid from library where mid=%s and uid=%s;"
        cursor.execute(query, (mid, uid,))
        self.conn.commit()
        result = cursor.fetchone()
        return result



