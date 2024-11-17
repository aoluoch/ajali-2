### Ajali! Website Back-End

## Project Overview

Ajali! is a web application designed to facilitate the reporting of accidents and emergencies in Kenya. The application allows users to create, edit, and manage incident reports, which can be viewed by the admin and the users. The backend of the application is built using Python and Flask, providing a robust and scalable solution for handling user requests and managing data.



## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (registration and login)
- Incident report creation, editing, and deletion
- Geolocation support (latitude and longitude)
- Image and video uploads for incident reports
- Admin functionalities to manage incident report statuses
- Pagination for API responses


## Technologies

- *Backend Framework:* Python (Flask)
- *Database:* SQLite (or other, as specified in configuration)
- *ORM:* SQLAlchemy
- *Authentication:* Flask-JWT-Extended
- *File Uploads:* Flask-Uploads
- *Testing Framework:* Pytest


## Installation

To set up the backend for the Ajali! project, follow these steps:

1. *Clone the repository:*

   git clone https://github.com/aoluoch/ajali-2
   cd ajali-2

2.Create a virtual environment:

   -pipenv install &&  pipenv shell
   -source venv/bin/activate 

3,Install the required dependencies:
 
    pip install -r requirements.txt
    set up the database

##  Run migration
Initialize the database migrations and apply them:

    flask db init
    flask db migrate
    flask db upgrade

## Start the Application

    flask run

## API Endpoints
Here are some key API endpoints for the Ajali! backend:

User Registration: POST /api/register
User Login: POST /api/login
Create Incident Report: POST /api/reports
Edit Incident Report: PUT /api/reports/<report_id>
Delete Incident Report: DELETE /api/reports/<report_id>
Get Incident Reports: GET /api/reports
Admin Update Report Status: PATCH /api/reports/<report_id>/status
Note: Each endpoint should include pagination where applicable.

##Testing 
To run the tests for the backend, use the following command:

    pytest

## Contributions
We welcome contributions to the Ajali! project! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
3. git checkout -b feature/YourFeature
4. Make your changes and commit them:
 - git commit -m "Add a new feature"
 - Push to your branch:
 - git push origin feature/YourFeature
 - Create a pull request

## License
 This project is licensed under the MIT License. See the LICENSE file for more information.

Credits
This project was developed by Mark Tony,Amos Oluoch,Jean Gathoni. Special thanks to the following libraries and tools:

- Flask
- SQLAlchemy
- Flask-Restful
- Flask-Migrate

### Acknowledgements
Thanks to the Flask community for their extensive documentation and support.
Additional thanks to tutorials and resources that guided the development process.


 