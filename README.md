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


#Database

MongoDB Atlas (Cloud database)

Secure connection using environment variables


#Contributors

Kanishka A C

Thrisha R
