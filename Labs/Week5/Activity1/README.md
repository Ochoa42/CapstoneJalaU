# Pet Store Management System

## What it's about

This project is a management system for a pet store, developed by applying SOLID principles in JavaScript. The system handles various aspects of the store, including pets, products, customers, and care services, with a modular and scalable design.

## Code structure

The project is organized as follows:

### Main directories:
- `src/`: Contains the main source code
  - `Data/`: Handles data persistence
  - `interface/`: Defines interfaces and base classes
  - `Models/`: Contains implementations of main classes
- `test/`: Contains test files
- `node_modules/`: Project dependencies

### Main classes and functions:

1. `Pet`: Handles pet data (SRP)
2. `Product`, `Food`, `Toy`: Product hierarchy (OCP)
3. `Care`, `BasicCare`, `SpecialCare`: Care services hierarchy (LSP)
4. `Customer`: Represents store customers (ISP)
5. `Persistence`, `FilePersistence`: Data persistence management (DIP)
6. `PetStore`: Main class that utilizes other classes

Each class is defined in its own file within the `Models/` or `interface/` directory, following the Single Responsibility Principle.

## Dependencies

The project uses the following main dependencies:

- Node.js as the runtime environment
- A module system to organize code (likely ES modules or CommonJS)
- Possibly a testing framework (such as Jest or Mocha) for tests in `Models.test.js`

Specific dependencies can be found in the `package.json` file.

## How to start the application and tests

1. Install dependencies:
```
npm install
```
2. initializar npm
```
npm init -y
```

### Runing test
```
npm test
```