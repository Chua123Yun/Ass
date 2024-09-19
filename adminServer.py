import eventlet
eventlet.monkey_patch()
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit


# Initialize Flask app and configure CORS
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# In-memory store for demonstration
stores = []

# Admin login endpoint (Web-based API)
@app.route('/admin-login', methods=['POST'])
def admin_login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        # Simple authentication check
        if username == '1' and password == '1':
            return jsonify(success=True, message="Login successful")
        else:
            return jsonify(success=False, message="Invalid credentials"), 401
    except Exception as e:
        app.logger.error(f"Error in /admin-login: {str(e)}")
        return jsonify(success=False, message=str(e)), 500

# Push notification endpoint (Web-based API)
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
        app.logger.error(f"Error in /push-notification: {str(e)}")
        return jsonify(success=False, message=str(e)), 500

# Create store endpoint (Web-based API)
@app.route('/create-store', methods=['POST'])
def create_store():
    try:
        data = request.get_json()
        store = data
        stores.append(store)
        
        # Notify all WebSocket clients about the new store
        socketio.emit('store_created', store, namespace='/admin')
        return jsonify({'message': 'Store created successfully'}), 200
    except Exception as e:
        app.logger.error(f"Error in /create-store: {str(e)}")
        return jsonify(success=False, message=str(e)), 500

# Get all stores (Web-based API)
@app.route('/get-stores', methods=['GET'])
def get_stores():
    try:
        return jsonify({'stores': stores}), 200
    except Exception as e:
        app.logger.error(f"Error in /get-stores: {str(e)}")
        return jsonify(success=False, message=str(e)), 500

# WebSocket connection handler for the /admin namespace
@socketio.on('connect', namespace='/admin')
def handle_connect():
    print('Admin connected via WebSocket')
    emit('admin_response', {'message': 'Connected to server'}, namespace='/admin')

# WebSocket disconnection handler
@socketio.on('disconnect', namespace='/admin')
def handle_disconnect():
    print('Admin disconnected from WebSocket')

# Handle admin actions through WebSocket
@socketio.on('admin_action', namespace='/admin')
def handle_admin_action(data):
    try:
        message = data.get('message', 'No message')
        emit('admin_response', {'message': message}, namespace='/admin')
    except Exception as e:
        app.logger.error(f"Error in handling admin action: {str(e)}")

# WebSocket event for real-time store creation updates
@socketio.on('store_created', namespace='/admin')
def handle_store_created(data):
    try:
        emit('store_created', data, namespace='/admin')
    except Exception as e:
        app.logger.error(f"Error in handling store creation: {str(e)}")

# Run the Flask-SocketIO app using Eventlet for WebSocket support
if __name__ == '__main__':
    eventlet.monkey_patch()
    socketio.run(app, host='0.0.0.0', port=3000, debug=True)
