import pytest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    yield driver
    driver.quit()

def test_add_task(driver):
    driver.get('http://localhost:3000')
    task_input = driver.find_element_by_id('task-input')
    task_input.send_keys('Test Task')
    task_input.send_keys(Keys.RETURN)
    assert 'Test Task' in driver.page_source

# Add more frontend tests here
