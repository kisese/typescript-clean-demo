# Pariti Take Home Assessment (Vending Machine API)

This project is a vending machine API built with Nodejs, Typescript, Express, TypeORM, and Swagger UI.

## Getting Started

To Access the API, you can use the following link: https://pariti.apps.kisese.com/api-docs/

### Prerequisites

- Nodejs 16.x or later
- npm or yarn
- Local databse option sqlite

### Installation

1. Clone this repository

   ```bash
   git clone https://github.com/kisese/pariti-take-home.git <your-project-name>
   ```

2. Install the dependencies
   ```bash
   cd <your-project-name>
   npm install or yarn install
   ```
3. Database Configuration

   Create an `.env` file base on the `.env.example` file and set the port you wish to run the API on
   You should set the following ENV variables:
   - `PORT` - Port to run the API on
   - `NODE_ENV` - Environment to run the API on
   ```bash
   cp .env.example .env
   ```

## Usage

1. Start Application

   ```cmd
   npm start
   ```
   Start with nodemon
   ```cmd
   npm run dev
   ```
2. Default database migrations will run on application startup and seed some inital data to start with. You can find the
   database seeder at:

  ```cmd
   src/infrastructure/typeorm.seeder.ts
   ```

2. Go to https://localhost:3000/

## Swagger UI

1. To interact with the API using the Swagger UI, go to http://localhost:3000/api-docs

## Functionality overview

The App provides a vending machine API that allows users to buy products and get change back. It also allows users to
add new products to the machine.
Available routes:

### Interactive API Docs

| Method | Route     | Description |
|--------|-----------|-------------|
| GET    | /api-docs | Swagger UI  |

### Purchase Routes

| Method | Route            | Description       |
|--------|------------------|-------------------|
| GET    | /api/v1/purchase | Get all purchases |
| POST   | /api/v1/purchase | Make a Purchase   |

### Product Routes

| Method | Route                | Description                              |
|--------|----------------------|------------------------------------------|
| GET    | /api-docs            | Swagger UI                               |
| GET    | /api/v1/products     | Get all products                         |
| GET    | /api/v1/products/:id | Get product by id                        |
| POST   | /api/v1/products     | Create a new product (Maintenance Route) |
| PUT    | /api/v1/products/:id | Update a product   (Maintenance Route)   |
| DELETE | /api/v1/products/:id | Delete a product    (Maintenance Route)  |

### Coin Routes

| Method | Route             | Description                           |
|--------|-------------------|---------------------------------------|
| GET    | /api/v1/coins     | Get all coins                         |
| GET    | /api/v1/coins/:id | Get coin by id                        |
| POST   | /api/v1/coins     | Create a new coin (Maintenance Route) |
| PUT    | /api/v1/coins/:id | Update a coin   (Maintenance Route)   |
| DELETE | /api/v1/coins/:id | Delete a coin    (Maintenance Route)  |

### Project structure

The app follows the Service Repository Pattern and is divided into the following layers. The aim is to achieve a clean maintainable codebase.

```bash
.
├── src/
|   |--application/         #
|   |   |--controllers/            #
|   |   |--dtos/            #
|   |   |--helpers/         #
|   |   |--http/         #
|   |   |  |--middlewares/         #
|   |   |--implementation/      #
|   |   |--interfaces/      #
|   |   |--services/        #
|   |--config/              #
|   |--domain/              #
|   |   |--entities/        #
|   |--error-handling/      #
|   |--infrastructure/      #
|   |   |--typeorm.config.ts   #
|   |   |--typeorm.seeder.ts    #
|   |--routes/      #
|   |   |--router.ts/     #
|   |--index.ts/     #
```
Base features are a reusable CRUD interface on top of TypeORM and a global error handling middleware.
The business logic is implemented in the application layer and the domain layer contains the entities and interfaces.

## Testing

Unit tests are written with Jest. To run the tests, run the following command:

```bash
npm run test
```

