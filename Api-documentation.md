# Ajali API Documentation

## Base Information

- Base URL: `http://localhost:5000`
- Content-Type: `application/json`
- Authentication: Session-based

## Authentication

### Response Status Codes

| Status | Description |
|--------|------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

## Endpoints

### 🔐 Authentication

#### Register User
```http
POST /users
```

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "is_admin": "boolean" (optional)
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "user_id": "integer"
}
```

#### Login
```http
POST /login
```

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "is_admin": "boolean",
  "token": "string"
}
```

#### Logout
```http
POST /logout
```

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

### 🚨 Incidents

#### List All Incidents
```http
GET /incidents
```

**Query Parameters:**
- `page` (integer, optional): Page number for pagination
- `per_page` (integer, optional): Items per page
- `status` (string, optional): Filter by status
- `user_id` (integer, optional): Filter by user

**Success Response (200):**
```json
{
  "incidents": [
    {
      "id": "integer",
      "description": "string",
      "status": "string",
      "latitude": "string",
      "longitude": "string",
      "user_id": "integer",
      "created_at": "string",
      "updated_at": "string",
      "images": ["string"],
      "videos": ["string"]
    }
  ],
  "pagination": {
    "current_page": "integer",
    "total_pages": "integer",
    "total_items": "integer"
  }
}
```

#### Get Single Incident
```http
GET /incidents/{id}
```

**Success Response (200):**
```json
{
  "id": "integer",
  "description": "string",
  "status": "string",
  "latitude": "string",
  "longitude": "string",
  "user_id": "integer",
  "created_at": "string",
  "updated_at": "string",
  "images": ["string"],
  "videos": ["string"]
}
```

#### Create Incident
```http
POST /incidents
```

**Request Body:**
```json
{
  "description": "string",
  "latitude": "string",
  "longitude": "string",
  "status": "string" (optional)
}
```

**Success Response (201):**
```json
{
  "message": "Incident created successfully",
  "incident_id": "integer"
}
```

#### Update Incident
```http
PUT /incidents/{id}
```

**Request Body:**
```json
{
  "description": "string" (optional),
  "status": "string" (optional),
  "latitude": "string" (optional),
  "longitude": "string" (optional)
}
```

**Success Response (200):**
```json
{
  "message": "Incident updated successfully",
  "incident": {
    "id": "integer",
    "description": "string",
    "status": "string",
    "latitude": "string",
    "longitude": "string",
    "updated_at": "string"
  }
}
```

#### Delete Incident
```http
DELETE /incidents/{id}
```

**Success Response (204):**
No content

### 📸 Media

#### Add Image to Incident
```http
POST /incidents/{incident_id}/images
```

**Request Body:**
```json
{
  "image_url": "string"
}
```

**Success Response (201):**
```json
{
  "message": "Image added successfully",
  "image_id": "integer"
}
```

#### Add Video to Incident
```http
POST /incidents/{incident_id}/videos
```

**Request Body:**
```json
{
  "video_url": "string"
}
```

**Success Response (201):**
```json
{
  "message": "Video added successfully",
  "video_id": "integer"
}
```

## Error Responses

### Bad Request (400)
```json
{
  "message": "Field is required",
  "errors": {
    "field_name": ["error message"]
  }
}
```

### Unauthorized (401)
```json
{
  "message": "Invalid credentials or session expired"
}
```

### Forbidden (403)
```json
{
  "message": "Permission denied"
}
```

### Not Found (404)
```json
{
  "message": "Resource not found"
}
```

### Server Error (500)
```json
{
  "message": "Internal server error",
  "error": "Error details" (only in development)
}
```

## Status Values

Incidents can have the following status values:
- `pending` - Initial state when incident is created
- `under_investigation` - Being reviewed by authorities
- `resolved` - Incident has been handled
- `closed` - No further action needed
- `rejected` - Invalid or duplicate report

## Rate Limiting

- 100 requests per minute per IP address
- 1000 requests per hour per user

## Changelog

### v1.0.0 (2025-05-03)
- Initial API release
- Basic CRUD operations for incidents
- User authentication
- Media upload support