# Chat Backend

Welcome to the Chat Backend! This repository contains the backend implementation of a chat application with features like user authentication, file uploads, and real-time messaging using Socket.IO.

## Documentation

Explore the API documentation:  
- [http endpoints usage](./docs/http-routes.md)
- [socket events usage](./docs/socket.md)


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HassanBuTt78/chat_backend
   cd chat_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
DBURI=your-mongodb-connection-string
```

Adjust the values accordingly.

## Usage

### Start
Starting application with node:
```bash
npm start
```

### Development

Start the server in development mode with nodemon:

```bash
npm run dev
```

### Linting

Run ESLint for code linting:

```bash
npm run lint
```

## Dependencies

- bcrypt: ^5.1.1
- dotenv: ^16.4.3
- express: ^4.18.2
- express-async-errors: ^3.1.1
- joi: ^17.12.1
- jsonwebtoken: ^9.0.2
- mongoose: ^8.1.2
- multer: ^1.4.5-lts.1
- socket.io: ^4.7.4

## Development Dependencies

- eslint: ^8.56.0
