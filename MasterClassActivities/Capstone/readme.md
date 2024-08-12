# Project: UNO Card Game

This project is an implementation of the UNO card game using Node.js and Express. The application is structured following a layered architecture and uses Sequelize as the ORM for database management.

### Description of Folders and Files

- **Business/errors**: Contains files related to error handling.
  - `appError.js`: Defines a custom class for application errors.
  - `cathAsync.js`: Middleware for handling errors in asynchronous functions.
  - `extractErrorData.js`: Function to extract error data.

- **middleware**: Contains custom middlewares.

- **Models**: Contains Sequelize models for the database.

- **plugins**: Additional plugins for the application.

- **schemas**: Data validation schemas.

- **config**: Configuration files.
  - **enviroments**: Environment variable configurations.
  - **Utils**: Utilities and helper functions.

- **Data**: Contains data access logic.
  - **Database**: Database configuration.
  - **Service**: Data services.

- **Presentation**: Contains presentation logic.
  - **Controllers**: Controllers to handle HTTP requests.
  - **router**: Route definitions.
  - `App.js`: Express application setup.
  - `server.js`: Main file to start the server.

- **test**: Contains automated tests.

### Architecture
In this project, I am using the 3-layer architecture as it allows me to have a more structured and organized development, improving the quality of my code and the efficiency of the development process. In addition, it optimizes the application for future expansions or modifications, making it more robust and adaptable in the long term.

## Setup and Execution

### Requirements

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
```
git clone https://gitlab.com/jala-university1/cohort-1/oficial-es-programaci-n-4-apr-221-grupo-a/secci-n-a/p4-labs.git
```
2. initialize npm
```
npm init -y
```
3. Install Dependencis
```
npm install
```

### Environment Variables
Configure environment variables in the `.env` file. Example:
```
PORT=3002
NODE_ENV=development
DB_URL=mysql://root:73157942q@localhost:3306/gameone
SECRET_JWT_SEED=NzMxNTc5NDJx
JWT_EXPIRE_IN=8h
```

## Running the Server
To start the server, run:
```
npm run start:dev
```
## Running Tests
To run the tests, use:
```
npm test
```

## Dependencies
**1. axios:**
- Usage: Library for making HTTP requests.
- Description: Allows you to send and receive data from and to an API easily and manageably. It's used for consuming external services or APIs from your application.

**2. dotenv:**
- Usage: Load environment variables from a .env file.
- Description: Simplifies managing configuration and secrets (like API keys) in different environments (development, production) by loading environment variables from a .env file.

**3. env-var:**
- Usage: Validation and handling of environment variables.
- Description: Helps validate, parse, and manage environment variables, providing a more robust interface for working with environment variables in your application.

**4. express:**
- Usage: Web framework for Node.js.
- Description: A minimalistic framework for building web applications and APIs. It simplifies setting up routes and handling HTTP requests and responses.

**5. jsonwebtoken:**
- Usage: Create and verify JSON Web Tokens (JWT).
- Description: Used for handling authentication and authorization in web applications by generating and validating JWTs.

**6. mysql2:**
- Usage: MySQL client for Node.js.
- Description: Provides an interface for interacting with MySQL databases from Node.js, supporting both promises and callbacks.

**7. nodemon:**
- Usage: Node.js monitoring tool.
- Description: Automatically restarts the server when changes are detected in project files, facilitating development.

**8. sequelize:**
- Usage: ORM for Node.js.
- Description: Maps data models to a SQL database (such as MySQL) and allows interaction with the database using high-level queries.

**9. zod:**
- Usage: Data schema validation.
- Description: Library for schema validation and parsing in TypeScript and JavaScript, useful for ensuring data conforms to a specific schema.

## Development Dependencies
**1. @babel/core:**
- Usage: Core of Babel for JavaScript transpilation.
- Description: Tool that converts modern JavaScript (ES6+) to a compatible version for older JavaScript environments, ensuring compatibility across different platforms.

**2. @babel/preset-env:**
- Usage: Babel preset for transforming modern JavaScript.
- Description: Babel preset that compiles modern JavaScript based on the target environment you specify, making it compatible with multiple browsers and Node.js versions.

**3. babel-jest:**
- Usage: Babel integration with Jest.
- Description: Allows using Babel to transform code during tests with Jest, ensuring modern code is compatible with the testing environment.

**4. jest:**
- Usage: Testing framework.
- Description: JavaScript testing framework used for writing and running unit and integration tests, providing a way to verify that your code works correctly.

**5. sequelize-mock:**
- Usage: Mocking Sequelize models for testing.
- Description: Library for creating mocks of Sequelize models, useful for testing without needing a real database.

**6. supertest:**
- Usage: HTTP request testing.
- Description: Library for testing routes and controllers in Express applications, allowing you to make HTTP requests and verify responses in tests.

## EndPoints
### Games
- `GET`http://localhost:3002/juego/v1/api/games/:id
- `GET`http://localhost:3002/juego/v1/api/games/
- `POST`http://localhost:3002/juego/v1/api/games/register
- `PATCH`http://localhost:3002/juego/v1/api/games/:id
- `DELETE`http://localhost:3002/juego/v1/api/games/:id
### Players
- `GET`http://localhost:3002/juego/v1/api/players/:id
- `GET`http://localhost:3002/juego/v1/api/players/
- `POST`http://localhost:3002/juego/v1/api/players/register
- `PATCH`http://localhost:3002/juego/v1/api/players/:id
- `DELETE`http://localhost:3002/juego/v1/api/players/:id
- `POST`http://localhost:3002/juego/v1/api/players/login
- `POST`http://localhost:3002/juego/v1/api/players/logout
- `POST`http://localhost:3002/juego/v1/api/players/profile
- `POST`http://localhost:3002/juego/v1/api/players/createGame
- `POST`http://localhost:3002/juego/v1/api/players/joinGame
- `POST`http://localhost:3002/juego/v1/api/players/startGame
### Cards
- `GET`http://localhost:3002/juego/v1/api/cards/:id
- `GET`http://localhost:3002/juego/v1/api/cards/
- `POST`http://localhost:3002/juego/v1/api/cards/register
- `PATCH`http://localhost:3002/juego/v1/api/cards/:id
- `DELETE`http://localhost:3002/juego/v1/api/cards/:id
### Scores
- `GET`http://localhost:3002/juego/v1/api/scores/:id
- `GET`http://localhost:3002/juego/v1/api/scores/
- `POST`http://localhost:3002/juego/v1/api/scores/register
- `PATCH`http://localhost:3002/juego/v1/api/scores/:id
- `DELETE`http://localhost:3002/juego/v1/api/scores/:id
### PlayerGames
- `GET`http://localhost:3002/juego/v1/api/playerGame/


## Video and Commit
[Link del videoCapstone](https://drive.google.com/file/d/1Tcgfw1JVxTHppfYLxSZNRirpA8dpXZwU/view?usp=sharing)

[Link del ultimo commit](https://github.com/Ochoa42/CapstoneJalaU/commit/e1f11bb9cdad8dc75f006ec7016af672653b7594)

*Nota*: 
- before running the app make sure to set the correct environment variables
- to run in postman first create a player, then log in as this will generate a token. Otherwise it will not give you access to the other endpoints as we work with private routes
- after generating the token, place the token in the key as authentication