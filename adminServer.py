from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Admin login endpoint (Web-based API)
@app.route('/admin-login', methods=['POST'])
def admin_login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        if username == '1' and password == '1':
            return jsonify(success=True, message="Login successful")
        else:
            return jsonify(success=False, message="Invalid credentials"), 401
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

# Push notification via Web-based API
@app.route('/push-notification', methods=['POST'])
def push_notification():
    try:
        data = request.get_json()
        message = data.get('message')
        if message:
            # Broadcast the notification to all connected WebSocket clients
            socketio.emit('admin_response', {'message': message}, namespace='/admin')
            return jsonify(success=True, message="Notification sent successfully")
        else:
            return jsonify(success=False, message="Notification message cannot be empty"), 400
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

# In-memory store data (for demonstration purposes)
stores = []

# Endpoint to create new items
@app.route('/create-store', methods=['POST'])
def create_store():
    data = request.get_json()
    store = data
    stores.append(store)
    # Notify all WebSocket clients about the new store
    socketio.emit('store_created', store, namespace='/admin')
    return jsonify({'message': 'Store created successfully'}), 200

@app.route('/get-stores', methods=['GET'])
def get_stores():
    return jsonify({'stores': stores}), 200

# WebSocket connection for real-time updates
@socketio.on('connect', namespace='/admin')
def handle_connect():
    print('Admin connected via WebSocket')

@socketio.on('admin_action', namespace='/admin')
def handle_admin_action(data):
    try:
        message = data.get('message', 'No message')
        emit('admin_response', {'message': message}, namespace='/admin')
    except Exception as e:
        print(f"Error handling admin action: {str(e)}")

# WebSocket event for real-time updates on item creation
@socketio.on('store_created', namespace='/admin')  # Use 'store_created' event
def handle_store_created(data):
    try:
        emit('store_created', data, namespace='/admin')
    except Exception as e:
        print(f"Error handling store creation: {str(e)}")

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=3000, debug=True)
