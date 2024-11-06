from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime
import base64

app = Flask(__name__)
CORS(app)

QUEUE_DIR = "queue"
PENDING_FILE = os.path.join(QUEUE_DIR, "pending.json")
PROCESSED_FILE = os.path.join(QUEUE_DIR, "processed.json")

def ensure_queue_files():
    os.makedirs(QUEUE_DIR, exist_ok=True)
    
    for file_path in [PENDING_FILE, PROCESSED_FILE]:
        if not os.path.exists(file_path):
            with open(file_path, 'w') as f:
                json.dump([], f)

def read_json_file(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def write_json_file(file_path, data):
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/api/photo-transform', methods=['POST'])
def photo_transform():
    try:
        ensure_queue_files()
        
        data = request.json
        
        # Add timestamp and status
        data['timestamp'] = datetime.now().isoformat()
        data['status'] = 'pending'
        
        # Read current pending queue
        pending_queue = read_json_file(PENDING_FILE)
        
        # Add new request to pending queue
        pending_queue.append(data)
        
        # Save updated pending queue
        write_json_file(PENDING_FILE, pending_queue)
        
        return jsonify({'success': True, 'message': 'Request added to queue'})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)