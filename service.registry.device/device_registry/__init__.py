import os
import markdown
import shelve # persistent data storage, string key and any object as value
from webargs.flaskparser import parser

# Import the flask framework
''' g: referring to data being "global" within context 
    flask_restful: flask extension with useful API tools                
'''
from flask import Flask, g
from flask_restful import Resource, Api, reqparse

# Create instance of Flask
app = Flask(__name__)
# Create RESTful API
api = Api(app)

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = shelve.open("devices.db")
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route("/")
def index():
    """Present some documentation"""
    # Open the readme file
    with open(os.path.dirname(app.root_path) + '/README.md', 'r') as md_file:
        # Read the content of the file
        content = md_file.read()
        # Convert to HTML
        return markdown.markdown(content)


class DeviceList(Resource):
    '''Get device list or post new device'''

    def get(self):
        shelf = get_db()
        keys = list(shelf.keys())

        devices = []
        for key in keys:
            devices.append(shelf[key])

        return {'message': 'Success', 'data': devices}, 200

    def post(self):
        shelf = get_db()

        parser = reqparse.RequestParser()

        parser.add_argument('identifier', required=True)
        parser.add_argument('name', required=True)
        parser.add_argument('device_type', required=True)
        #parser.add_argument('controller_name', required=True)
        parser.add_argument('attributes', type=dict, required=False, location='json')
        
        # Parse the arguments into an object
        args = parser.parse_args()

        # Insert arguments into database
        shelf[args['identifier']] = args

        return {'message': 'Device registered', 'data': args}, 201

class Device(Resource):
    def get(self, identifier):
        shelf = get_db()

        # if the key does not exist in the data store, return 404 error
        if not (identifier in shelf):
            return {'message': 'Device not found', 'data': {}}, 404

        return {'message': 'Device found', 'data': shelf[identifier]}, 200

    def delete(self, identifier):
        shelf = get_db()

        # if the key does not exist in the data store, return 404 error
        if not (identifier in shelf):
            return {'message': 'Device not found', 'data': {}}, 404

        del shelf[identifier]

        return '', 204


api.add_resource(DeviceList, '/devices')
api.add_resource(Device, '/device/<string:identifier>')
