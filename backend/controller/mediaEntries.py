from flask import jsonify
from backend.dao.mediaEntries import MediaEntriesDAO
from backend.dao.users import usersDAO


class MediaEntriesController:

    def build_entries_dict(self, row):
        result = {}
        result['MediaID'] = row[0]
        result['MediaName'] = row[1]
        result['MediaSynopsis'] = row[2]
        result['MediaCreator'] = row[3]
        result['MediaCompany'] = row[4]
        result['MediaStatus'] = row[5]
        result['MediaCount'] = row[6]
        result['MediaRuntime'] = row[7]
        result['MediaRating'] = row[8]
        result['MediaType'] = row[9]
        result['MediaGenre'] = row[10]
        return result

    def media_id_dict(self, row):
        result = {}
        result['MediaName'] = row[0]
        result['MediaSynopsis'] = row[1]
        result['MediaCreator'] = row[2]
        result['MediaCompany'] = row[3]
        result['MediaStatus'] = row[4]
        result['MediaCount'] = row[5]
        result['MediaRuntime'] = row[6]
        result['MediaRating'] = row[7]
        result['MediaType'] = row[8]
        result['MediaGenre'] = row[9]
        return result

    def update_media_entries_status(self, row):
        result = {}
        result['MediaStatus'] = row[0]
        return result

    def getAllMediaEntries(self):
        dao = MediaEntriesDAO()
        entries_list = dao.getAllEntries()
        result_list = []
        for row in entries_list:
            result = self.build_entries_dict(row)
            result_list.append(result)
        return jsonify(result_list)

    def getMediaEntryByID(self, json):

        if json and len(json) == 1:
            mid = json['MediaID']

            if mid:
                dao = MediaEntriesDAO()
                result_tuples = dao.getMediaEntryByID(mid)
                result = []

                if len(result_tuples) < 1:
                    return jsonify(Error="No such Media Entry ID found"), 401

                for row in result_tuples:
                    dict = self.media_id_dict(row)
                    result.append(dict)
                return jsonify(result)
            else:
                return jsonify(Error="Malformed post request"), 400
        else:
            return jsonify(Error="Malformed post request"), 400

    def getMediaEntryByType(self, json):

        if json and len(json) == 1:
            mtype = json['MediaType']

            if mtype:
                dao = MediaEntriesDAO()
                result_tuples = dao.getMediaEntryByType(mtype)
                result = []

                if len(result_tuples) < 1:
                    return jsonify(Error="No such Media Type found"), 401

                for row in result_tuples:
                    dict = self.media_id_dict(row)
                    result.append(dict)
                return jsonify(result)
            else:
                return jsonify(Error="Malformed post request"), 400
        else:
            return jsonify(Error="Malformed post request"), 400

    def getMediaEntryByGenre(self, json):

        if json and len(json) == 1:
            mgenre = json['MediaGenre']

            if mgenre:
                dao = MediaEntriesDAO()
                result_tuples = dao.getMediaEntryByGenre(mgenre)
                result = []

                if len(result_tuples) < 1:
                    return jsonify(Error="No such Media Genre found"), 401

                for row in result_tuples:
                    dict = self.media_id_dict(row)
                    result.append(dict)
                return jsonify(result)
            else:
                return jsonify(Error="Malformed post request"), 400
        else:
            return jsonify(Error="Malformed post request"), 400

    def getMediaEntryByName(self, json):

        if json and len(json) == 1:
            mname = json['MediaName']

            if mname:
                dao = MediaEntriesDAO()
                result_tuples = dao.getMediaEntryByName(mname)
                result = []

                if len(result_tuples) < 1:
                    return jsonify(Error="No such Media Genre found"), 401

                for row in result_tuples:
                    dict = self.media_id_dict(row)
                    result.append(dict)
                return jsonify(result)
            else:
                return jsonify(Error="Malformed post request"), 400
        else:
            return jsonify(Error="Malformed post request"), 400

    # Not yet implemented
    def filterEntries(self, json):
        dao = MediaEntriesDAO()
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

    def addMediaEntry(self, json):
        if json and len(json) == 10:
            mname = json['MediaName']
            msynopsis = json['MediaSynopsis']
            mcreator = json['MediaCreator']
            mcompany = json['MediaCompany']
            mstatus = json['MediaStatus']
            mcount = json['MediaCount']
            mruntime = json['MediaRuntime']
            mrating = json['MediaRating']
            mtype = json['MediaType']
            mgenre = json['MediaGenre']

            if mname and msynopsis and mcreator and mcompany and mstatus and mcount and mruntime and mrating and mtype \
                    and mgenre:
                dao = MediaEntriesDAO()
                mid = dao.addMediaEntry(mname, msynopsis, mcreator, mcompany, mstatus, mcount, mruntime, mrating, mtype,
                                        mgenre)
                if mid == 0:
                    return jsonify(
                        Error="This entry already exists in database.")
                result = {}
                result['MediaID'] = mid
                result['MediaName'] = mname
                result['MediaSynopsis'] = msynopsis
                result['MediaCreator'] = mcreator
                result['MediaCompany'] = mcompany
                result['MediaStatus'] = mstatus
                result['MediaCount'] = mcount
                result['MediaRuntime'] = mruntime
                result['MediaRating'] = mrating
                result['MediaType'] = mtype
                result['MediaGenre'] = mgenre
                return jsonify(MediaEntry=result), 201

            else:
                return jsonify(Error="Malformed post request"), 400
        else:
            return jsonify(Error="Malformed post request"), 400

    # For some reason only return first letter of updated status
    def updateMediaEntryStatus(self, json):
        if json and len(json) == 2:
            mid = json["MediaID"]
            mstatus = json["MediaStatus"]

            if mstatus and mid:
                dao = MediaEntriesDAO()
                result_tuples = dao.updateMediaEntryStatus(mstatus, mid)
                result = []

            if mid == 0:
                return jsonify(Error="No such Media Entry found"), 401

            if mstatus == "Watching" or "Plan to Watch" or "Dropped" or "Completed" \
                    or "Reading" or "Plan to Read" or "Playing" or "Plan to Play":

                for row in result_tuples:
                    dict = self.update_media_entries_status(row)
                    result.append(dict)
                    return jsonify(result)
            else:
                return jsonify(Error="Not a possible status"), 401
        else:
            return jsonify(Error="Malformed post request"), 401

    def getAllMediaEntriesByUser(self,uid):
        dao = MediaEntriesDAO()
        entries_list = dao.getAllEntriesByUser(uid)
        result_list = []
        for row in entries_list:
            result = self.build_entries_dict(row)
            result_list.append(result)
        return jsonify(result_list)

    def addEntryToLibrary(self, mid, uid):

        dao = MediaEntriesDAO()
        dao1 = usersDAO()
        user = dao1.getUserInfo(uid)
        checkentry = dao.checkDuplicateEntry(mid, uid)
        if not user:
            return jsonify(Error="User Not Found"), 404
        elif checkentry:
            return jsonify(Error="Product Already in Library"), 409
        else:
            dao.addToLibrary(mid, uid)
        return jsonify("Entry Added Successfully", mid)

