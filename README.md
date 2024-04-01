# User Authentication Demo

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/codepath/auth-express-react-prisma
   ```

2. **Navigate to the project directory:**

   ```bash
   cd auth-express-react-prisma
   ```

3. **Install dependencies:**

   For the server:

   ```bash
   cd server
   npm install
   ```

   For the client:

   ```bash
   cd client
   npm install
   ```

### Setting Up the Environment

1. **Update the `.env` file in the server directory:**

   You can use the `.env.example` file as a template. Fill in your database connection details and other environment variables as required.

2. **Database Setup:**

   Create a PostgreSQL database and note the connection details for use in the `.env` file.

### Running Migrations

To create the necessary tables in your database, run the migrations:

```bash
npx prisma migrate dev
```

### Seeding the Database

To populate your database with initial data, you can use the seed script:

```bash
node seed.js
```

### Starting the Application

1. **Start the server:**

   ```bash
   node server.js
   ```

   The server will run on [http://localhost:3000](http://localhost:3000) by default.

2. **Start the client:**

   In a separate terminal, navigate to the client directory and run:

   ```bash
   npm start
   ```

   The client will run on [http://localhost:3001](http://localhost:3001) by default.
