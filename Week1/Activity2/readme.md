# Project Overview

This project is an Express.js application structured to follow best practices for scalability and maintainability. The main components include controllers, middlewares, routes, and a robust error handling mechanism.

## Project Structure

```plaintext
/mi-servidor-express
├── node_modules
├── src
│   ├── common
│   │   └── errors
│   │       └── appError.js
│   ├── config
│   │   └── environments
│   │       └── environments.js
│   ├── modules
│   │   └── MyEndpoint
│   │       ├── MyFirstEndpoint.controller.js
│   │       ├── MyFirstEndpoint.middleware.js
│   │       └── MyFirstEndpoint.route.js
│   ├── routes
│   │   ├── index.js
│   │   ├── App.js
│   │   └── Server.js
├── .env
├── .env.template
├── .gitkeep
├── package-lock.json
├── package.json
├── readme.md
└── usuarios.json
```

## Dependencies

The following dependencies are used in this project:

- **axios**: Promise-based HTTP client for making requests to APIs.
- **dotenv**: Loads environment variables from a .env file into process.env.
- **env-var**: Library to read, parse, and validate environment variables.
- **express**: Web framework for Node.js to build RESTful APIs.
- **nodemon**: Utility that monitors for changes in the source code and automatically restarts the server.

## Dependency Installation

```
npm install
```

## Running the Server and Executing the Endpoint

### Steps to Run the Server

1. Clone the Repository:
```
git clone https://gitlab.com/Aldo2902/aldo-ochoa.git
```
2. Navigate to the project directory:

```
cd Week1/Activity2
```
3. Install Dependencies
```
npm install
```

4. Start the Server
```
npm run start:dev
```

## Accessing the Endpoint

GET http://localhost:3000/actividad2/api/v1/MyFirstEndpoint

This endpoint will return a JSON response with a list of users.

### Example JSON Response

```
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan.perez@example.com"
  },
  {
    "id": 2,
    "nombre": "María Gómez",
    "email": "maria.gomez@example.com"
  },
  {
    "id": 3,
    "nombre": "Carlos Sánchez",
    "email": "carlos.sanchez@example.com"
  }
]
```