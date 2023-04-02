from flask import jsonify
from backend.dao.mediaEntries import EntriesDAO


class EntriesController:

    def build_entries_dict(self, row):
        result = {}
        result['mid'] = row[0]
        result['mname'] = row[1]
        result['mtype'] = row[2]
        result['mgenre'] = row[3]
        result['msynopsis'] = row[4]
        result['mstatus'] = row[5]
        result['mcount'] = row[6]
        result['mruntime'] = row[7]
        result['mrating'] = row[8]
        result['mcreator'] = row[9]
        result['mcompany'] = row[10]
        return result

    def build_entries_attributes(self,mid,mname,mtype,mgenre,msynopsis,mstatus,mcount,mruntime,mrating,mcreator,mcompany):
        result = {}
        result['Mid']=mid
        result['Medianame']= mname
        result['Mediatype']= mtype
        result['Mediagenre']=mgenre
        result['Mediasynopsis']=msynopsis
        result['Mediastatus'] =mstatus
        result['Mediacount'] =mcount
        result['Mediaruntime']=mruntime
        result['Mediarating']=mrating
        result['Mediacreator']= mcreator
        result['Mediacompany']=mcompany
        return result



    def getAllEntries(self):
        dao = EntriesDAO()
        entries_list = dao.getAllEntries()
        result_list = []
        for row in entries_list:
            result = self.build_entries_dict(row)
            result_list.append(result)
        return jsonify(result_list)




    def getEntryById(self, mid):
        dao = EntriesDAO()
        row = dao.getEntryById(mid)
        if not row:
            return jsonify(Error="Entry Not Found"), 404
        else:
            entry = self.build_entries_dict(row)
            return jsonify(entry)

    def filterEntries(self,json):
        dao = EntriesDAO()
        mtype=json["Mediatype"]

        if dao.checktype(mtype):
            entries_list = dao.filterEntries(mtype)
            result_list = []
            for row in entries_list:
                result = self.build_entries_dict(row)
                result_list.append(result)
            return jsonify(result_list)
        else:
            return jsonify(Error="Type Not Found"), 404


    def addNewEntry(self, json):
        mname = json['Medianame']
        mtype = json['Mediatype']
        mgenre = json['Mediagenre']
        msynopsis = json['Mediasynopsis']
        mstatus = json['Mediastatus']
        mcount = json ['Mediacount']
        mruntime = json['Mediaruntime']
        mrating = json['Mediarating']
        mcreator = json['Mediacreator']
        mcompany = json['Mediacompany']

        dao= EntriesDAO()
        #check for duplicates
        mid= dao.insertNewEntry(mname,mtype,mgenre,msynopsis,mstatus,mcount,mruntime,mrating,mcreator,mcompany)
        result=self.build_entries_attributes(mid,mname,mtype,mgenre,msynopsis,mstatus,mcount,mruntime,mrating,mcreator,mcompany)

        return jsonify(result), 201

    def updateEntryStatus(self, mid, json):
        dao = EntriesDAO()
        if not dao.getEntryById(mid):
            return jsonify(Error="Entry not found."), 404

        else:

            mstatus = json['Mediastatus']



            dao.update(mid,mstatus)
            temp=dao.getEntryById(mid)
            result=self.build_product_dict(temp)
            return jsonify(result)







