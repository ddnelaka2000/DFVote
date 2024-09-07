import torch
import torch.nn as nn
import torch.nn.functional as F

class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.fc1 = nn.Linear(4, 50)  
        self.fc2 = nn.Linear(50, 3) 

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x
