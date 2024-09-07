import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn.functional as F
from model import Net  
from utils import load_data
from torch.utils.data import DataLoader, TensorDataset
app = Flask(__name__)
CORS(app)
from utils import get_parameters, pin_to_ipfs, save_to_blockchain

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'files' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    files = request.files.getlist('files')
    for file in files:
        file.save(os.path.join(UPLOAD_FOLDER, file.filename))
    return jsonify({'message': 'Files successfully uploaded'}), 200

@app.route('/train', methods=['POST'])
def train():
    data = request.json
    client_id = data['client_id']
    
    print("client_id: ", client_id)

    file_path = os.path.join(UPLOAD_FOLDER, data['file_path'])
    if not client_id or not file_path:
        return jsonify({'message': 'Invalid client_id or file_path'}), 400
    
    # Load data and train the model
    X, y = load_data(file_path)
    dataset = TensorDataset(torch.tensor(X, dtype=torch.float32), torch.tensor(y, dtype=torch.long))
    train_loader = DataLoader(dataset, batch_size=4, shuffle=True)
  
    model= Net()
    optimizer = torch.optim.SGD(model.parameters(), lr=0.1)

    print("Training the model...")
    print("fc1 weights:", model.fc1.weight)
    print("fc1 bias:", model.fc1.bias)


    train_model(model, optimizer, train_loader)


    print("After Training the model...")
    print("fc1 weights:", model.fc1.weight)
    print("fc1 bias:", model.fc1.bias)
    
    params = get_parameters(model)
    ipfs_hash = pin_to_ipfs(params)

 
    save_to_blockchain(client_id, ipfs_hash)
    return jsonify({'message': 'Training started successfully'}), 200

def train_model(model, optimizer , train_loader, epochs=1):    
    # Convert X and y to tensors

    for epoch in range(epochs):
        for data, target in train_loader:
            optimizer.zero_grad()
            output = model(data)
            loss = F.cross_entropy(output, target)
            loss.backward()
            optimizer.step()

        

if __name__ == '__main__':
    app.run(debug=True, port=5000)
