# YouTube Backend Clone
This project is a backend for a YouTube-like application, developed using Node.js, Express.js, WebSocket, and MongoDB. The backend handles user authentication,
video uploads, and real-time comments.

# Features
## User Authentication: 
Secure user registration and login using JWT.
## Video Uploads:
Users can upload videos with titles and descriptions.
## Real-Time Comments: 
Users can post and view real-time comments on videos using WebSocket.
## Database Integration:
MongoDB is used for storing user, video, and comment data.

## Installation
### Clone the repository
https://github.com/BrijeshPatra/Youtube-backend

npm install

### Run the Application
npm start

#Development
npm install --save-dev nodemon

## API ENDPOINTS

### Authentication
POST  /api/auth/register: Register a new user.
POST /api/auth/login: Login a user and return a JWT token.

### Videos
POST /api/videos/upload: Upload a new video (protected route).
GET /api/videos: Get a list of videos.

### Comments
Real-time comments are handled through WebSocket.


