import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_add_task(client):
    response = client.post('/add', json={'task': 'Test Task'})
    assert response.status_code == 200
    assert response.json['message'] == 'Task added successfully'

# Add more backend tests here
