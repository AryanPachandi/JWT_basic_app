Here’s a sample `README.md` for your JWT-based authentication project and the Bash commands to push it to your GitHub repository.

### `README.md`

```markdown
# JWT Authentication System

This is a simple authentication system using JSON Web Tokens (JWT) for user login and signup. It demonstrates a file-based storage system instead of a database.

## Features

- **Signup**: Create a new user account by providing a username and password.
- **Login**: Authenticate using username and password to receive a JWT.
- **User Info**: Retrieve the logged-in user's details using the JWT.
- **File-based Storage**: User data is stored in a `user.json` file.

## Tech Stack

- Backend: Node.js with Express.js
- JWT Authentication: `jsonwebtoken`
- File-based storage: Node.js `fs` module
- Frontend: HTML, CSS, and JavaScript

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AryanPachandi/JWT_basic_app.git
   cd JWT_basic_app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   node backend.js
   ```

4. Open the frontend in a browser:
   - Serve the files in the `public` folder locally using any HTTP server, or open `index.html` directly.

## API Endpoints

### Signup (`POST /up`)
- **Request**: 
  ```json
  {
    "username": "your-username",
    "password": "your-password"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "You have successfully created an account"
  }
  ```

### Login (`POST /in`)
- **Request**:
  ```json
  {
    "username": "your-username",
    "password": "your-password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt-token"
  }
  ```

### User Info (`GET /me`)
- **Headers**:
  ```json
  {
    "Authorization": "Bearer jwt-token"
  }
  ```
- **Response**:
  ```json
  {
    "user": "your-username",
    "pass": "your-password"
  }
  ```

## Limitations

- **File-based Storage**: 
  - User data is stored in `user.json`. Simultaneous writes could lead to data corruption.
  - Not suitable for production use.

- **No Encryption**: Passwords are stored as plain text.
