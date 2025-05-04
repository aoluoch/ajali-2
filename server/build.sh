#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Initialize the database
python -c "from app import db, create_app; create_app().app_context().push(); db.create_all()"