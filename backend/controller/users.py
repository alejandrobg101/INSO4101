from flask import jsonify
from backend.dao.users import usersDAO

class UsersController:

    def build_dict(self, row):
        result = {}
        result['UserID'] = row[0]
        result['UserFirstName'] = row[1]
        result['UserLastName'] = row[2]
        result['UserUsername'] = row[3]
        result['UserEmailAddress'] = row[4]
        result['UserPassword'] = row[5]
        result['UserBio'] = row[6]
        result['UserStatus'] = row[7]
        return result

    def build_uiddictionary(self, row):
        result = {}
        result['UId'] = row[0]
        result['Admin'] = row[1]
        return result



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

    def registerUser(self, json):
        if json and len(json) == 7:
            ufirstname = json['ufirstname']
            ulastname = json['ulastname']
            uusername = json['uusername']
            uemailaddress = json['uemailaddress']
            upassword = json['upassword']
            ubio = json['ubio']
            ustatus = json['ustatus']
            if ufirstname and ulastname and uusername and uemailaddress and upassword and ubio and ustatus:
                dao = usersDAO()
                uid = dao.registerUser(ufirstname, ulastname, uusername, uemailaddress, upassword, ubio, ustatus)
                if uid == 0:
                    return jsonify(
                        Error="Username already in use. Please try another one"), 406
                result = {}
                result["uid"] = uid
                result["ufirstname"] = ufirstname
                result["ulastname"] = ulastname
                result["uusername"] = uusername
                result["uemailaddress"] = uemailaddress
                result["upassword"] = upassword
                result["ubio"] = ubio
                result["ustatus"] = ustatus
                return jsonify(Users=result), 201
            else:
                return jsonify(Error="Malformed post request"), 400
        else:
            return jsonify(Error="Malformed post request"), 400

    def login(self, json):
        username = json['Username']
        password = json['Password']
        dao = usersDAO()
        login = dao.loginuser(username, password)
        if login:
            dictionary = self.build_uiddictionary(login)
            return jsonify(dictionary)
        else:
            return jsonify("User does not exist")



