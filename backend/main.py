from flask import Flask, jsonify, request
from flask_cors import CORS

# Activate

from controller.users import UsersController

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
        return UsersController().getAllUsers();
    else:
        return jsonify("Not Supported"), 405


@app.route('/register', methods=['POST'])
def registerUser():
    if request.method == 'POST':
        return UsersController().registerUser(request.json)
    else:
        return jsonify("Not Supported"), 405


@app.route('/getUserInfo', methods=['POST'])
def getUserInfo():
    if request.method == 'POST':
        return UsersController().getUserInfo(request.json)
    else:
        return jsonify("Not Supported"), 405


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        return UsersController().login(request.json)
    else:
        return jsonify("Not Supported"), 405


if __name__ == '__main__':
    app.run()
