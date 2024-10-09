# Flights and Search Service

## Table of Contents

1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
3. [Endpoints](#endpoints)
4. [Tools and Technologies](#tools-and-technologies)
5. [Database Design](#database-design)
6. [Acknowledgements](#acknowledgements)

## Project Overview

The Flights and Search Service is a microservice designed to handle CRUD operations for flights. It allows users to create, read, update, and delete flight information. The service also supports searching for flights based on various criteria such as price, departure, and arrival airports. This service is built using Node.js and Express, with Sequelize as the ORM for interacting with a MySQL database.

## Setup Instructions

### Installation

1. Clone the project:

   ```sh
   git clone https://github.com/amansharma999/FlightsAndSearchService
   cd flightsAndSearchService
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a .env file in the root directory with the following content:

```env
PORT=3000
SYNC_DB=true
```

4. Create a `config.json` file inside the `config` folder with the following content:

   ```json
   {
     "development": {
       "username": "<YOUR_DB_LOGIN_NAME>",
       "password": "<Your_DB_PASSWORD>",
       "database": "Flights_Search_DB_DEV",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```

5. Set up the database:

   ```sh
   npx sequelize db:create
   npx sequelize db:migrate
   ```

6. Start the server:

   ```sh
   npm start
   ```

## Endpoints

### City Endpoints

- **Create City**

  - **URL:** `/api/city`
  - **Method:** `POST`
  - **Body Parameters:**
    - `name` (string, required): The name of the city.
  - **Response:**
    - **Success:** 201 Created
      ```json
      {
        "data": { "id": 1, "name": "CityName" },
        "success": true,
        "message": "City created successfully",
        "err": {}
      }
      ```
    - **Error:** 400 Bad Request
      ```json
      {
        "data": {},
        "success": false,
        "message": "Invalid request body for creating a city",
        "err": "Missing required fields"
      }
      ```

- **Delete City**

  - **URL:** `/api/city/:id`
  - **Method:** `DELETE`
  - **URL Parameters:**
    - `id` (integer, required): The ID of the city to delete.
  - **Response:**
    - **Success:** 200 OK
      ```json
      {
        "data": {},
        "success": true,
        "message": "City deleted successfully",
        "err": {}
      }
      ```
    - **Error:** 404 Not Found
      ```json
      {
        "data": {},
        "success": false,
        "message": "City not found",
        "err": "City with the given ID does not exist"
      }
      ```

### Flight Endpoints

- **Create Flight**

  - **URL:** `/api/flights`
  - **Method:** `POST`
  - **Body Parameters:**
    - `flightNumber` (string, required): The flight number.
    - `airplaneId` (integer, required): The ID of the airplane.
    - `departureAirportId` (integer, required): The ID of the departure airport.
    - `arrivalAirportId` (integer, required): The ID of the arrival airport.
    - `departureTime` (string, required): The departure time in ISO format.
    - `arrivalTime` (string, required): The arrival time in ISO format.
    - `price` (integer, required): The price of the flight.
  - **Response:**
    - **Success:** 201 Created
      ```json
      {
        "data": {
          /* flight data */
        },
        "success": true,
        "message": "Flight created successfully",
        "err": {}
      }
      ```
    - **Error:** 400 Bad Request
      ```json
      {
        "data": {},
        "success": false,
        "message": "Invalid request body for creating a flight",
        "err": "Missing required fields"
      }
      ```

- **Get Flight**

  - **URL:** `/api/flights/:id`
  - **Method:** `GET`
  - **URL Parameters:**
    - `id` (integer, required): The ID of the flight to retrieve.
  - **Response:**
    - **Success:** 200 OK
      ```json
      {
        "data": {
          /* flight data */
        },
        "success": true,
        "message": "Flight retrieved successfully",
        "err": {}
      }
      ```
    - **Error:** 404 Not Found
      ```json
      {
        "data": {},
        "success": false,
        "message": "Flight not found",
        "err": "Flight with the given ID does not exist"
      }
      ```

- **Update Flight**

  - **URL:** `/api/flights/:id`
  - **Method:** `PATCH`
  - **URL Parameters:**
    - `id`(integer, required): The ID of the flight to update.
  - **Body Parameters:**
    - Any of the flight fields to update.
  - **Response:**
    - **Success:** 200 OK
      ```json
      {
        "data": {
          /* updated flight data */
        },
        "success": true,
        "message": "Flight updated successfully",
        "err": {}
      }
      ```
    - **Error:** 404 Not Found
      ```json
      {
        "data": {},
        "success": false,
        "message": "Flight not found",
        "err": "Flight with the given ID does not exist"
      }
      ```

## Tools and Technologies

- **Node.js:** JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express:** Fast, unopinionated, minimalist web framework for Node.js.
- **Sequelize:** Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **MySQL:** Open-source relational database management system.
- **body-parser:** Node.js body parsing middleware.
- **dotenv:** Module to load environment variables from a .env file.

## Database Design

### Tables

- **City**

  - `id`(integer, primary key, auto-increment)
  - `name` (string, not null, unique)

- **Airport**

  - `id`(integer, primary key, auto-increment)
  - `name` (string, not null)
  - `cityId` (integer, foreign key, references City(id))

- **Airplane**

  - `id`(integer, primary key, auto-increment)
  - `model` (string, not null)
  - `capacity` (integer, not null)

- **Flight**
  - `id`(integer, primary key, auto-increment)
  - `flightNumber`(string, not null, unique)
  - `airplaneId` (integer, foreign key, references Airplane(id))
  - `departureAirportId` (integer, foreign key, references Airport(id))
  - `arrivalAirportId`(integer, foreign key, references Airport(id))
  - `departureTime` (date, not null)
  - `arrivalTime` (date, not null)
  - `price`(integer, not null)
  - `boardingGate`(string)
  - `totalSeats` (integer, not null)

### Associations

- A **City** has many **Airports**.
- An **Airport** belongs to a **City**.
- A **Flight** belongs to an **Airplane**.
- An **Airplane** can have multiple **Flights**.
- An **Airport** can have multiple **Flights**.

### Diagram

```plaintext
City (1) <--> (M) Airport
Airport (1) <--> (M) Flight
Airplane (1) <--> (M) Flight
```

## Acknowledgements

This project was developed as part of the backend course by Sanket Sir. Special thanks to Sanket Sir for his invaluable guidance and support throughout the course.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top right of this page to create a copy of this repository in your GitHub account.

2. **Clone your fork**: Clone your forked repository to your local machine using the following command:

   ```sh
   git clone https://github.com/your-username/flightsAndSearchService.git
   ```

3. **Create a new branch**: Create a new branch for your feature or bugfix:

   ```sh
   git checkout -b feature-or-bugfix-name

   ```

4. **Make your changes**: Make your changes to the codebase.

5. **Commit your changes**: Commit your changes with a descriptive commit message:

   ```sh
   git commit -m "Description of the feature or bugfix"
   ```

6. **Push to your fork**: Push your changes to your forked repository:

   ```sh
   git push origin feature-or-bugfix-name
   ```

7. **Create a Pull Request**: Go to the original repository and create a pull request from your forked repository. Provide a clear description of your changes and why they should be merged.

I will review your pull request and provide feedback. Once approved, your changes will be merged into the main branch.

Thank you for your contributions!
