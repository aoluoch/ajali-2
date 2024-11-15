Ajali API Documentation
Overview
This API provides functionality for Ajali’s incident reporting system, allowing users to
create, update, view, and delete incidents. The API also allows users to upload associated
images and videos for each incident report. User authentication and authorization are managed
using sessions. The API is built using Flask and Flask-RESTful.
Base URL
http://localhost:5000
Available Endpoints
1. User Registration
Endpoint: POST /users
Description: Registers a new user by creating an account with a username, email, and
password.
Parameters:
username (string, required): The username for the new user.
email (string, required): The email address of the user.
password (string, required): The password for the new user.
is_admin (boolean, optional): Indicates if the user has admin privileges. Defaults to
False.
Response:
Success (201): { "message": "User created successfully" }
Error (400): { "message": "Field is required" } if any required fields are missing.
Error (500): { "message": "Error creating user: <details>" } if an internal error occurs.
Example Request:
{
"username": "johndoe",
"email": "johndoe@example.com",
"password": "mypassword123"
}
Example Response:
{
"message": "User created successfully"
}
2. User Login
Endpoint: POST /login
Description: Authenticates a user and starts a session for subsequent requests.
Parameters:
username (string, required): The username of the user.
password (string, required): The password of the user.
Response:
Success (200): { "message": "Login successful", "is_admin": <boolean> }
Error (401): { "message": "Invalid username or password" }
Example Request:
{
"username": "johndoe",
"password": "mypassword123"
}
Example Response:
{
"message": "Login successful",
"is_admin": false
}
3. User Logout
Endpoint: POST /logout
Description: Logs the user out by clearing their session.
Response:
Success (200): { "message": "Logged out successfully" }
Error (401): { "message": "Session not found or invalid" }
Example Request:
POST /logout
Example Response:
{
"message": "Logged out successfully"
}
4. List Incidents
Endpoint: GET /incidents
Description: Fetches a list of all incidents reported in the system.
Session Required: Yes
Response:
Success (200): Returns a list of incidents with their details.
Error (401): { "message": "Session expired or invalid" }
Example Response:
[
{
"id": 1,
"description": "Car accident on highway",
"status": "under investigation",
"latitude": "-1.2921",
"longitude": "36.8219",
"user_id": 3
},
{
"id": 2,
"description": "Fire at the shopping mall",
"status": "resolved",
"latitude": "-1.2921",
"longitude": "36.8219",
"user_id": 2
}
]
5. Create Incident
Endpoint: POST /incidents
Description: Creates a new incident report.
Session Required: Yes
Parameters:
description (string, required): A brief description of the incident.
latitude (string, required): The latitude of the incident location.
longitude (string, required): The longitude of the incident location.
status (string, optional): The status of the incident (default is "under investigation").
Response:
Success (201): { "message": "Incident created successfully" }
Error (400): { "message": "Field is required" } if any required fields are missing.
Error (500): { "message": "Error creating incident: <details>" } if an internal error occurs.
Example Request:
{
"description": "A robbery took place",
"latitude": "-1.2921",
"longitude": "36.8219"
}
Example Response:
{
"message": "Incident created successfully"
}
6. Get Single Incident
Endpoint: GET /incidents/<id>
Description: Fetches the details of a single incident by its ID.
Response:
Success (200): Returns the details of the specified incident.
Error (404): { "message": "Incident not found" }
Example Response:
{
"id": 1,
"description": "Car accident on highway",
"status": "under investigation",
"latitude": "-1.2921",
"longitude": "36.8219",
"user_id": 3
}
7. Update Incident
Endpoint: PUT /incidents/<id>
Description: Updates the details of an incident. Only the user who reported the incident
can modify it. Admin users can also modify the status.
Session Required: Yes
Parameters:
description (string, optional): Updated description.
status (string, optional, admin only): Updated status of the incident.
latitude (string, optional): Updated latitude.
longitude (string, optional): Updated longitude.
Response:
Success (200): Returns the updated incident details.
Error (403): { "message": "Permission denied" } if the user does not have permission to
update
Example Request:
{
"description": "Updated description"
}
Example Response:
{
"id": 1,
"description": "Updated description",
"status": "under investigation",
"latitude": "-1.2921",
"longitude": "36.8219",
"user_id": 3
}
8. Delete Incident
Endpoint: DELETE /incidents/<id>
Description: Deletes an incident and all associated images and videos. Only the user
who reported the incident or an admin can delete it.
Session Required: Yes
Response:
Success (204): No content is returned on success.
Error (403): { "message": "Permission denied" } if the user does not have permission
to delete.
Example Request:
DELETE /incidents/1
Example Response:
{
"message": "Incident report and associated media deleted"
}
9. Add Incident Image
Endpoint: POST /incidents/<incident_id>/images
Description: Uploads an image related to a specific incident.
Session Required: Yes
Parameters:
image_url (string, required): The URL of the image to be uploaded.
Response:
Success (201): { "message": "Image posted" }
Example Request:
{
"image_url": "https://example.com/image.jpg"
}
Authentication/Authorization
Authentication is managed through sessions. After logging in, the server creates a
session, which is then used for subsequent requests. Each request that requires
authentication should include the necessary session cookie or header to identify the
user.
Error Codes
400 Bad Request: The request is missing required parameters or has invalid input.
401 Unauthorized: Invalid or missing session. User must log in again.
403 Forbidden: The user does not have the required permissions to perform the action.
404 Not Found: The requested resource does not exist.
500 Internal Server Error: An unexpected error occurred on the server.