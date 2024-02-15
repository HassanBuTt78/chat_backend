## Overview
The API uses Socket.IO for real-time socket connections between clients and the server.

### Installation
Install Socket.IO on the client-side to establish a connection with the server.

### Connection
Send the connection request to the root endpoint `/`.

### Events
The socket connection handles two main events: `chat` and `error`.

## Authentication
Before establishing a socket connection, users must be logged in and have a JWT token in the headers with the `Authorization` field set to `Bearer <token>`.

## Sending Chat Message
- **Event:** `chat`
- **Description:** Emit this event to send a chat message.
- **Arguments:**
  ```json
  {
    "to": "string (email of receiver)",
    "message": "string (actual message)"
  }
  ```

## Sending File in Message
- **Event:** `chat`
- **Description:** Upload the file on `(POST) /uploads` and add the object received in response to `file` down here.(read more about [uploading](./http-routes.md))
- **Arguments:**
  ```json
  {
    "to": "string (email of receiver)",
    "message": "string (actual message)",
    "file":{
      //file object you receive in response
    }
  }
  ```

## Receiving Chat Message
- **Event:** `chat`
- **Description:** Listen to this event to receive chat messages live.
- **Data:**
  ```json
  {
    "to": "string (email of receiver)",
    "from": "string (email of sender)",
    "message": "string (actual message)",
    "file": "null if there is no file, other wise a file object"
  }
  ```
  you can see file object structure in [http docs](./http-routes.md) in `/uploads` description

## Handling Errors
- **Event:** `error`
- **Description:** Listen to this event to handle errors.
- **Data:**
  ```json
  {
    "message": "string (error message)"
  }
  ```

**Note:** Users must remain connected to the socket to receive chat messages in real-time. If the server encounters an error, it emits an `error` event with the corresponding error message.