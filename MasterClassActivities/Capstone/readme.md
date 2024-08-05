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

*Nota*: 
- before running the app make sure to set the correct environment variables
- to run in postman first create a player, then log in as this will generate a token. Otherwise it will not give you access to the other endpoints as we work with private routes
- after generating the token, place the token in the key as authentication