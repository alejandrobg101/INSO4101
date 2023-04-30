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

    def build_login_dict(self, row):
        result = {}
        result['UserID'] = row[0]
        result['UserUsername'] = row[1]
        result['UserPassword'] = row[2]
        result['UserStatus'] = row[3]
        return result

    def build_uiddictionary(self, row):
        result = {}
        result['UserID'] = row[0]
        result['UserStatus'] = row[1]
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

    def getUserInfoByID(self, uid):
        if uid:
            dao = usersDAO()
            result_tuples = dao.getUserInfo(uid)
            result = []

            if len(result_tuples) < 1:
                return jsonify(Error="Submitted invalid UserID"), 400

            for row in result_tuples:
                dict = self.build_dict(row)
                result.append(dict)
            return jsonify(result)
        else:
            return jsonify(Error="Malformed post request"), 400


    def registerUser(self, json):
        if json and len(json) == 7:
            ufirstname = json['UserFirstName']
            ulastname = json['UserLastName']
            uusername = json['UserUsername']
            uemailaddress = json['UserEmailAddress']
            upassword = json['UserPassword']
            ubio = json['UserBio']
            ustatus = json['UserStatus']

            if ufirstname and ulastname and uusername and uemailaddress and upassword and ubio and ustatus:
                dao = usersDAO()
                uid = dao.registerUser(ufirstname, ulastname, uusername, uemailaddress, upassword, ubio, ustatus)
                if uid == 0:
                    return jsonify(
                        Error="Username already in use. Please try another one"), 406
                result = {}
                result["UserID"] = uid
                result["UserFirstName"] = ufirstname
                result["UserLastName"] = ulastname
                result["UserUsername"] = uusername
                result["UserEmailAddress"] = uemailaddress
                result["UserPassword"] = upassword
                result["UserBio"] = ubio
                result["UserStatus"] = ustatus
                return jsonify(Users=result), 201
            else:
                return jsonify(Error="Malformed post request"), 400
        else:
            return jsonify(Error="Malformed post request"), 400

    def getUserByUserPassword(self, json):

        if json and len(json) == 2:
            uusername = json['UserUsername']
            upassword = json['UserPassword']

            if uusername and upassword:
                dao = usersDAO()
                result_tuples = dao.getUserByUserPassword(uusername, upassword)
                result = []

                if len(result_tuples) < 1:
                    return jsonify(Error="Submitted invalid Username or Password"), 401

                for row in result_tuples:
                    dict = self.build_login_dict(row)
                    result.append(dict)
                return jsonify(result)
            else:
                return jsonify(Error="Malformed post request"), 400
        else:
            return jsonify(Error="Malformed post request"), 400

    def login(self, json):
        uusername = json['UserUsername']
        upassword = json['UserPassword']
        dao = usersDAO()
        login = dao.loginuser(uusername, upassword)
        if login:
            dictionary = self.build_uiddictionary(login)
            return jsonify(dictionary)
        else:
            return jsonify("User does not exist")

#update user (status not included)
    def updateUser(self, uid, json):
        ufirstname = json['UserFirstName']
        ulastname = json['UserLastName']
        uusername = json['UserUsername']
        uemailaddress = json['UserEmailAddress']
        upassword = json['UserPassword']
        ubio = json['UserBio']

        dao = usersDAO()
        check1 = dao.checkDuplicateUser(uusername,uid)
        user = dao.getUserInfo(uid)

        if check1 and user:
            return jsonify(Error="Select other Username"), 404

        updated = dao.updateUser(ufirstname, ulastname, uusername, uemailaddress, upassword, ubio, uid,)

        if user and updated:
            return jsonify(json), 200

        else:
            return jsonify (Error="User Not Found"), 404