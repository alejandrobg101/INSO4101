from flask import jsonify
from backend.dao.mediaEntries import EntriesDAO


class EntriesController:

    def build_entries_dict(self, row):
        result = {}
        result['MediaID'] = row[0]
        result['MediaName'] = row[1]
        result['MediaType'] = row[2]
        result['MediaGenre'] = row[3]
        result['MediaSynopsis'] = row[4]
        result['MediaStatus'] = row[5]
        result['MediaAccount'] = row[6]
        result['MediaRuntime'] = row[7]
        result['MediaRating'] = row[8]
        result['MediaCreator'] = row[9]
        result['MediaCompany'] = row[10]
        return result

    def build_entries_attributes(self, mid, mname, mtype, mgenre, msynopsis, mstatus, mcount, mruntime, mrating,
                                 mcreator, mcompany):
        result = {}
        result['MediaID'] = mid
        result['MediaName'] = mname
        result['MediaType'] = mtype
        result['MediaGenre'] = mgenre
        result['MediaSynopsis'] = msynopsis
        result['MediaStatus'] = mstatus
        result['MediaCount'] = mcount
        result['MediaRuntime'] = mruntime
        result['MediaRating'] = mrating
        result['MediaCreator'] = mcreator
        result['MediaCompany'] = mcompany
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

    def filterEntries(self, json):
        dao = EntriesDAO()
        mtype = json["Mediatype"]

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
        mname = json['MediaName']
        mtype = json['MediaType']
        mgenre = json['MediaGenre']
        msynopsis = json['MediaSynopsis']
        mstatus = json['MediaStatus']
        mcount = json['MediaCount']
        mruntime = json['MediaRuntime']
        mrating = json['MediaRating']
        mcreator = json['MediaCreator']
        mcompany = json['MediaCompany']

        dao = EntriesDAO()
        # check for duplicates
        mid = dao.insertNewEntry(mname, mtype, mgenre, msynopsis, mstatus, mcount, mruntime, mrating, mcreator,
                                 mcompany)
        result = self.build_entries_attributes(mid, mname, mtype, mgenre, msynopsis, mstatus, mcount, mruntime, mrating,
                                               mcreator, mcompany)

        return jsonify(result), 201

    def updateEntryStatus(self, mid, json):
        dao = EntriesDAO()
        if not dao.getEntryById(mid):
            return jsonify(Error="Entry not found."), 404

        else:

            mstatus = json['MediaStatus']

            dao.update(mid, mstatus)
            temp = dao.getEntryById(mid)
            result = self.build_product_dict(temp)
            return jsonify(result)
