### Setup Instructions

Option 1: Run with Docker (Recommended)
1. Rename .env.example to .env.
2. Update the variables in .env with your specific values:
        MONGO_URI: Your MongoDB connection URI (default: mongodb://mongo_service:27017/TaskSorting for Docker).
        PORT: The port you want the app to run on (default: 5002 for Docker).
        JWT_SECRET: A secret key for JWT authentication.
3. Build and start the Docker containers: "docker-compose up --build"
4. Access the application:
        Frontend: http://localhost:3000
        Backend: http://localhost:5002


Option 2: Run Locally
1. Rename .env.example to .env.
2. Update the variables in .env with your specific values:
        MONGO_URI: Your MongoDB connection URI (e.g., mongodb://localhost:27018/TaskSorting for local MongoDB).
        PORT: The port you want the app to run on.
        JWT_SECRET: A secret key for JWT authentication.
3. Navigate to the project directory and install dependencies: "npm install"
4. Start the application concurrently: "npm start"