#!/bin/bash

# Run backend tests
echo 'Running backend tests...'
python3 -m pytest test_harness/test_backend.py

# Run frontend tests
echo 'Running frontend tests...'
python3 -m pytest test_harness/test_frontend.py

# Check if all tests passed
if [ $? -eq 0 ]; then
  echo 'All tests passed!'
else
  echo 'Some tests failed.'
  exit 1
fi