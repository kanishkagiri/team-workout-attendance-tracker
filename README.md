#Team Workout & Attendance Tracker

#Project Overview

Team Workout & Attendance Tracker is a full-stack web application that allows:

Managing team members

Managing training sessions

Marking attendance

Generating reports

#Tech Stack
Frontend

React.js

Axios

CSS

Backend

Node.js

Express.js

MongoDB Atlas

DevOps

GitHub Actions (CI/CD)

Docker

DockerHub

AWS EC2

#Project Structure
team-workout-attendance-tracker
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── Dockerfile
│
├── frontend
│   ├── src
│   ├── components
│   ├── Dockerfile
│
├── .github/workflows
│   └── ci.yml
│
└── README.md
#Features
#Member Management

Add member

Edit member

Delete member

View members

#Session Management

Create session

View sessions

Delete sessions

#Attendance Management

Mark attendance per session

View attendance records

#Reports

Generate attendance reports

#CI/CD Pipeline (GitHub Actions)

The repository uses GitHub Actions for Continuous Integration.

Pipeline Stages:

Clone Repository

Install Dependencies

Build Backend

Build Frontend

Build Docker Images

Push Images to DockerHub

Workflow file location:

.github/workflows/ci.yml

#Docker

The application is containerized using Docker.

Backend Docker Build
docker build -t kanishkaac/workout-tracker-backend ./backend
Frontend Docker Build
docker build -t kanishkaac/workout-tracker-frontend ./frontend

#DockerHub Images

Public DockerHub Repositories:

kanishkaac/workout-tracker-backend

kanishkaac/workout-tracker-frontend

#AWS Deployment (EC2)

The backend is deployed on an Ubuntu EC2 instance.

Run Backend Container on EC2
docker run -d -p 4000:4000 \
-e MONGO_URI="mongodb+srv://kanishka:kanishka@cluster0.xntmwyk.mongodb.net/workout_attendance_tracker" \
-e PORT=4000 \
kanishkaac/workout-tracker-backend

Access API:

http://16.171.27.183:4000/:4000
#Database

MongoDB Atlas (Cloud database)

Secure connection using environment variables

#Environment Variables

Backend requires:

MONGO_URI=mongodb+srv://kanishka:kanishka@cluster0.xntmwyk.mongodb.net/workout_attendance_tracker
PORT=4000


#Contributors

Kanishka A C

Thrisha R
