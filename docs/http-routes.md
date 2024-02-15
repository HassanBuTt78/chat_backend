Certainly! Here is a more structured documentation in markdown format:

# Chat Application HTTP JSON API Documentation

## Base URL
All routes start with `/api/v1`.

## Authentication

### Sign Up
- **Endpoint:** `/auth/signup`
- **Method:** `POST`
- **Description:** Creates a new user account.
- **Request Body:**
  ```json
  {
    "name": "string (max 20 characters)",
    "email": "string (valid email)",
    "password": "string (8-30 characters)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "string",
    "data": {
      "_id": "string (random id)",
      "name": "string",
      "email": "string",
      // Additional user data
    }
  }
  ```

### Login
- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Description:** Logs in a user and sends a JWT token in cookies as "jwt".
- **Request Body:**
  ```json
  {
    "email": "string (valid email)",
    "password": "string (8-30 characters)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "string",
    "data": {}
  }
  ```

## File Uploads and Downloads

### Upload File
- **Endpoint:** `/uploads`
- **Method:** `POST`
- **Description:** Allows logged-in users to upload files (max 50MB).
- **Request Body:**
  - Form data with field name `file` containing the file to upload.
- **Response:**
  ```json
  {
    "success": true,
    "message": "string",
    "data": {
      "_id": "string (random id)",
      "filename": "string",
      "originalname": "string",
      "mimetype": "string",
      "uploader": "string (user id)",
      "size": "number",
      "address": "string"
    }
  }
  ```

### Download File
- **Endpoint:** `/uploads/:filename`
- **Method:** `GET`
- **Description:** Returns information about the uploaded file with the specified filename.
- **Response:**
  ```json
  {
    "success": true,
    "message": "string",
    "data": {
      // File information (similar to upload response)
    }
  }
  ```

## Chat Messages

### Get Chat Messages
- **Endpoint:** `/chat/:userEmail`
- **Method:** `GET`
- **Description:** Gets chat messages between the logged-in user and the specified user by email.
- **Query Parameters:**
  - `limit` (default: 50)
  - `page` (default: 1)
- **Response:**
  ```json
  {
    "success": true,
    "message": "string",
    "data": [
      // Array of chat messages
    ]
  }
  ```

**Note:** Authentication is required for `/uploads` and `/chat` endpoints. The JWT token obtained during login should be included in the request headers for these authenticated routes.