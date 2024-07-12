# Games Project

This project is based on the creation of a game with an API made with node, express and different dependencies that are used in the development environment. We also perform CRUD operations using an MVC structure with a relational database in MySQL

## File and Folder Description

### `node_modules/`
Contains the dependencies and Node.js modules required for the project.

### `src/`
Main directory containing all the project's source code.

#### `common/`
Folder containing utilities and common handlers for the application.

##### `errors/`
Custom error handling and related utilities.
- **`appError.js`**: Class to handle custom errors.
- **`cathAsync.js`**: Function to handle errors in asynchronous functions.

##### `utils/`
General utilities for data handling.
- **`extractErrorData.js`**: Function to extract error data.

#### `config/`
Project configurations, including database and environments.

##### `database/`
Database configurations and initializations.
- **`database.js`**: Database configuration and connection.


##### `enviroments/`
Project environment configurations.
- **`enviroments.js`**: Environment variables and configurations.

#### `Module/`
Contains the application modules. Each module is organized in its own folder.

##### `Juego/`
Specific module for managing games.
- **`Juego.controller.js`**: Controllers to handle requests related to games.
- **`Juego.middleware.js`**: Middlewares specific to the games module.
- **`Juego.model.js`**: Data model definition for games using Sequelize.
- **`Juego.route.js`**: Route definitions for the games module.
- **`Juego.schema.js`**: Validation schemas for the games module.
- **`Juego.service.js`**: Services containing business logic for the games module.

#### `Routes/`
Main route definitions for the application.
- **`index.js`**: Main route file that imports and uses module routes.

### `App.js`
Main application file that initializes the server and connects all configurations and routes.

## Config Project

- initializa the project with command
```
npm init
```
- install dependecies
```
npm install
```
- configure in file .env and place rute database, port
```
PORT=3001
NODE_ENV=development
DB_URL=mysql://{user}:{password}@localhost:3306/{Database}
```
- Configure Database file ```config/database.js```

1.  when you create your database and after you have placed the path for the connection to the database inside .env.
2.  You must set "true" on line 25 where it says {force:true} and execute the API so that sequelize creates the model within the database.
3.  then you put it in the false state so that it does not delete the database or you just comment it out
```
export const syncUp = async()=>{
 try{
    await sequelize.sync({/*force:true*/});
    console.log('Synced has been sucessfull')
 }catch(error){
    console.log(error)
 } 
}
```

## Execute Project
```
npm run start:dev
```
## Endpoint CRUD

### Create
```
POS: http://localhost:3001/juego/api/v1/administrador/register
```
### Read
```
GET: http://localhost:3001/juego/api/v1/administrador/
```
### Read Id
```
GET: http://localhost:3001/juego/api/v1/administrador/${id}
```
### Update
```
PUT: http://localhost:3001/juego/api/v1/administrador/${id}
```
```
PATCH: http://localhost:3001/juego/api/v1/administrador/${id}
```
### Delete
```
DELETE: http://localhost:3001/juego/api/v1/administrador/${id}
```