from flask import jsonify
from backend.dao.users import usersDAO


class UsersController:

    def build_dict(self, row):
        result = {}
        result['UserFirstName'] = row[0]
        result['UserLastName'] = row[1]
        result['UserUsername'] = row[2]
        result['UserPassword'] = row[3]
        result['UserBio'] = row[3]
        result['UserStatus'] = row[4]
        return result

    def registerUser(self, json):
        if json and len(json) == 5:
            ufirstname = json['ufirstname']
            ulastname = json['ulastname']
            uemailaddress = json['username'] + '@gmail.com'
            upassword = json['upassword']
            ubio = json['ubio']
            ustatus = json['ustatus']
            if ufirstname and ulastname and uemailaddress and upassword and ubio and ustatus:
                dao = usersDAO()
                uid = dao.registerUser(ufirstname, ulastname, uemailaddress, upassword, ubio and ustatus)
                if (uid == 0):
                    return jsonify(
                        Error="Username already in use. Try adding a number to your username or changing it."), 406
                result = {}
                result["uid"] = uid
                result["ufirstname"] = ufirstname
                result["ulastname"] = ulastname
                result["uemailaddress"] = uemailaddress
                result["upassword"] = upassword
                result["ubio"] = ubio
                result["ustatus"] = ustatus
                return jsonify(Users=result), 201
            else:
                return jsonify(Error="Malformed post request"), 400
        else:
            return jsonify(Error="Malformed post request"), 400

    def getAllUsers(self):
        dao = usersDAO()
        result_tuples = dao.getAllUsers()
        result = []

        for row in result_tuples:
            dict = self.build_dict(row)
            result.append(dict)
        return jsonify(result)

    def getUserInfo(self, json):
        if json and len(json) == 1:
            userid = json['UserID']

            if userid:
                dao = usersDAO()
                result_tuples = dao.getUserInfo(userid)
                result = []

                if len(result_tuples) < 1:
                    return jsonify(Error="Submitted invalid UserID"), 400

                for row in result_tuples:
                    dict = self.build_dict(row)
                    result.append(dict)
                return jsonify(result)
            else:
                return jsonify(Error="Malformed post request"), 400
        else:
            return jsonify(Error="Malformed post request"), 400
