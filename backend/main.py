from flask import Flask, jsonify, request
from flask_cors import CORS

# Activate

from controller.users import UsersController
from controller.mediaEntries import MediaEntriesController

app = Flask(__name__)
# Apply CORS to this app
CORS(app)


@app.route('/')
def greeting():
    return 'Hello! Welcome to the Universal Entertainment Media Tracker app.'


##### User Functions #####

@app.route('/getAllUsers', methods=['GET'])
def get_all_Users_handler():
    if request.method == 'GET':
        return UsersController().getAllUsers()
    else:
        return jsonify("Not Supported"), 405


@app.route('/register', methods=['POST'])
def registerUser():
    if request.method == 'POST':
        return UsersController().registerUser(request.json)
    else:
        return jsonify("Not Supported"), 405


@app.route('/getUserByUserPassword', methods=['POST'])
def get_user_by_user_password_handler():
    if request.method == "POST":
        return UsersController().getUserByUserPassword(request.json)
    else:
        return jsonify("Not supported"), 405


@app.route('/getUserInfo', methods=['POST'])
def getUserInfo():
    if request.method == 'POST':
        return UsersController().getUserInfo(request.json)
    else:
        return jsonify("Not Supported"), 405

@app.route('/getUserInfoByID', methods=['GET'])
def getUserInfoByID(uid):
    if request.method == 'POST':
        return UsersController().getUserInfoByID(uid)
    else:
        return jsonify("Not Supported"), 405
@app.route('/updateUser<int:uid>', methods = ['PUT'])
def updateUser(uid):
    if request.method == 'PUT':
        return UsersController().updateUser(uid, request.json)

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        return UsersController().login(request.json)
    else:
        return jsonify("Not Supported"), 405


##### Mediaentry Functions #####

@app.route('/getAllMediaEntries', methods=['GET'])
def get_All_Media_Entries():
    if request.method == 'GET':
        return MediaEntriesController().getAllMediaEntries()
    else:
        return jsonify("Not Supported"), 405

@app.route('/getMediaEntryByID', methods=['POST'])
def get_Media_Entry_By_ID():
    if request.method == 'POST':
        return MediaEntriesController().getMediaEntryByID(request.json)
    else:
        return jsonify("Not Supported"), 405

@app.route('/getMediaEntryByType', methods=['POST'])
def get_Media_Entry_By_Type():
    if request.method == 'POST':
        return MediaEntriesController().getMediaEntryByType(request.json)
    else:
        return jsonify("Not Supported"), 405

@app.route('/getMediaEntryByGenre', methods=['POST'])
def get_Media_Entry_By_Genre():
    if request.method == 'POST':
        return MediaEntriesController().getMediaEntryByGenre(request.json)
    else:
        return jsonify("Not Supported"), 405

@app.route('/getMediaEntryByName', methods=['POST'])
def get_Media_Entry_By_Name():
    if request.method == 'POST':
        return MediaEntriesController().getMediaEntryByName(request.json)
    else:
        return jsonify("Not Supported"), 405

@app.route('/updateMediaEntryStatus', methods=['POST'])
def update_Media_Entry_Status():
    if request.method == 'POST':
        return MediaEntriesController().updateMediaEntryStatus(request.json)
    else:
        return jsonify("Not Supported"), 405

@app.route('/addMediaEntry', methods=['POST'])
def add_Media_Entry():
    if request.method == 'POST':
        return MediaEntriesController().addMediaEntry(request.json)
    else:
        return jsonify("Not Supported"), 405


@app.route('/entries/filter', methods=['POST'])
def filter_Entries():
    if request.method == 'POST':
        return MediaEntriesController().filterEntries(request.json)
    else:
        return jsonify("Not Supported"), 405



if __name__ == '__main__':
    app.run()
