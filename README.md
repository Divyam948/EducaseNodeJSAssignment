# School Management API

This project is a simple backend service that stores school details and returns schools sorted by distance from a user's location.

## What this project does

It has two APIs:

- `POST /addSchool` adds a new school to the MySQL database.
- `GET /listSchools` returns all schools sorted from nearest to farthest.

## How it works in easy language

When someone sends school details, the server first checks whether the data is valid.
If the data is correct, it saves the school in MySQL.

When someone asks for nearby schools, the server:

1. Takes the user's latitude and longitude.
2. Reads all schools from the database.
3. Calculates how far each school is from the user.
4. Sorts the schools so the nearest one comes first.

## Project structure

```text
.
|-- database/
|   `-- schema.sql
|-- postman/
|   `-- School-Management-API.postman_collection.json
|-- src/
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |   `-- schoolController.js
|   |-- routes/
|   |   `-- schoolRoutes.js
|   |-- utils/
|   |   `-- distance.js
|   |-- validators/
|   |   `-- schoolValidator.js
|   |-- app.js
|   `-- server.js
|-- .env.example
`-- package.json
```

## Setup steps

1. Create a MySQL database.
2. Run the SQL in `database/schema.sql`.
3. Copy `.env.example` to `.env` and update your database credentials.
4. Install dependencies:

```bash
npm install
```

5. Start the server:

```bash
npm run dev
```

Or:

```bash
npm start
```

## Environment variables

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
```

## API details

### 1. Add School

- Method: `POST`
- Endpoint: `/addSchool`

Example request body:

```json
{
  "name": "Fertilizer Public School",
  "address": "Kribhco Shyam Nagar, Piprola, Jalalabad Road, Shahjahanpur, Uttar Pradesh",
  "latitude": 27.883743,
  "longitude": 79.91225
}
```

Example success response:

```json
{
  "success": true,
  "message": "School added successfully.",
  "data": {
    "id": 1,
    "name": "Fertilizer Public School",
    "address": "Kribhco Shyam Nagar, Piprola, Jalalabad Road, Shahjahanpur, Uttar Pradesh",
    "latitude": 27.883743,
    "longitude": 79.91225
  }
}
```

### 2. List Schools

- Method: `GET`
- Endpoint: `/listSchools`

Example request:

```text
/listSchools?latitude=27.883743&longitude=79.91225
```

Example success response:

```json
{
  "success": true,
  "message": "Schools fetched successfully.",
  "userLocation": {
    "latitude": 27.883743,
    "longitude": 79.91225
  },
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "Fertilizer Public School",
      "address": "Kribhco Shyam Nagar, Piprola, Jalalabad Road, Shahjahanpur, Uttar Pradesh",
      "latitude": 27.883743,
      "longitude": 79.91225,
      "distanceInKm": 0
    }
  ]
}
```

## Validation rules

- `name` must not be empty.
- `address` must not be empty.
- `latitude` must be between `-90` and `90`.
- `longitude` must be between `-180` and `180`.

## Postman

Import `postman/School-Management-API.postman_collection.json` into Postman.
It already includes:

- example request for adding a school
- example request for listing schools
- variables for `baseUrl`, `userLatitude`, and `userLongitude`

## Deployment ideas

You can deploy this on services like Railway, Render, or a VPS with Node.js and MySQL support.
If you want, I can also prepare deployment files for one of those platforms next.
