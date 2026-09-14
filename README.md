
# Secure Backend API with Authentication and CRUD Operations with PostgreSQL DB

This project was created to learn and gain hands-on experience with Node.js, Express, JWT-based authentication, and modern backend development practices. It provides a secure REST API with user authentication and authorization, allowing users to register, log in, and access protected resources.

The application includes complete CRUD functionality for managing movies, along with a personalized watchlist system where users can track movies they plan to watch, are currently watching, have completed, or have dropped. Users can also rate movies and add optional notes to their watchlist entries.

The project incorporates modern backend development practices, including password hashing with bcryptjs, JWT authentication middleware, request validation using Zod, and centralized error handling. Postgres is used as the backend database. The application is designed as a practical end-to-end project for learning how to build secure, structured, and maintainable backend APIs.

## Prerequisites

- **NodeJS**: Version 18 or higher
- **Postres Database**: PostgreSQL 18 or higher

## Tech Stack

- **NodeJS**: JavaScript runtime for server-side development
- **Express.js**: Fast, minimalist web framework for Node.js
- **PostgreSQL**: Postgres Database
- **Prisma**: Prisma for Prosgres
- **Zod**: TypeScript-first schema validation library
- **bcryptjs**: TypeScript-first schema validation library
- **dotenv**: Environment variable management
- **Docker**: For deployment - Dockerfile is provided for creating the dockmer image
- **docker-compose**: Sample file for creating the container.

## Setup

1. **Clone Repository:**
   ```bash
   git clone https://github.com/yourusername/backend-pgdb.git
   cd backend-pgdb
   
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variable in the .env file:**
   ```bash
   DATABASE_URL="postgres://USER:password@DBSERVER:DBPORT/DBNAME"

   Note: The .env file should be under backend-pgdb/ folder.
   ```
4. **Migrate ther Required DB schema:**
   ```bash
   npx prisma migrate reset ## if you already created tables and wanted to overwrite them
   npx prisma migrate dev --name intital_setup
   npx prisma generate

   ```   
5. **Start the server:**
   ```bash
   npm run dev
   ```
6. **Docker containerization:**
 ```bash
   - This is required only for deploying the application on a docker host.
   - Refer included Dockerfile for creating the docker image
     To build the image:
         Goto the application folder
         docker build -t movie-api:1.0 .     
   - Sample Docker compose file is also included
     To start the container:
     docker compose up -d 

```
7. **If WSL (Windows Subsystem for Linux) is used for docker:**
 ```bash
   - Open the Firewall and allow port forwarging, so other container can be accessed from the netwok
   - Sampe port forwarding command using Powershell:
     netsh interface portproxy add v4tov4 listenport=8080 listenaddress=0.0.0.0 connectport=8080 connectaddress=172.20.141.18
     Note: 172.20.141.18 is the Linux ip (docker host ip)
   - Sample Firewall Rule:
     netsh advfirewall firewall add rule name="WSL 8080" protocol=TCP dir=in localport=8080 action=allow
``` 

## API Usage Examples

### User Registration
```bash
curl http://localhost:8080/register/ 

POST 
{
  "name": "name",
  "email": "email.emal.com",
  "password": "plainpassword"
}
```
### User Login
```bash
curl http://localhost:8080/login/ 

POST 
{
  "email": "email.emal.com",
  "password": "plainpassword"
}
```
### Get movie details
```bash
curl http://localhost:8080/movies/
```

### Add movie - Post method
```bash
curl http://localhost:8080/movies

POST
    {
        title: "The Last Horizon",
        overview: "A stranded astronaut races against time to reconnect with Earth before a mysterious cosmic event.",
        release_year: 2024,
        genres: ["TSci-Fi", "TAdventure", "TDrama"],
        runtime: 128,
        posterUrl: "https://test.com/posters/the-last-horizon.jpg"
    }

curl http://localhost:8080/movies/bulk -- To add multiple movies

{
  "movies": [
    {
        title: "The Last Horizon",
        overview: "A stranded astronaut races against time to reconnect with Earth before a mysterious cosmic event.",
        release_year: 2024,
        genres: ["TSci-Fi", "TAdventure", "TDrama"],
        runtime: 128,
        posterUrl: "https://test.com/posters/the-last-horizon.jpg"
    }
,
    {
        title: "Midnight Protocol",
        overview: "A cybersecurity analyst discovers a secret government program hidden inside a global network.",
        release_year: 2023,
        genres: ["Thriller", "Action"],
        runtime: 116,
        posterUrl: "https://example.com/posters/midnight-protocol.jpg",
        createdBy: creatorId
    }
  ]
}
```

### Add Movie to the watch list
Need to login first.

```bash
curl http://localhost:8080/watchlist
{
  "movieId": "df2c3a4d-ce33-4c1b-aa80-d54c897a9690",
  "statusId": 1,
  "rating": 5
}

### Update Movie to the watch list
Need to login first.

```bash
curl http://localhost:8080/watchlist
{
  "movieId": "df2c3a4d-ce33-4c1b-aa80-d54c897a9690",
  "statusId": 1,
  "rating": 5
}

### Delete a movie from the watch list
Need to login first.

```bash
curl http://localhost:8080/watchlist/<movieid>

```
