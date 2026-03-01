pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/kanishkagiri/team-workout-attendance-tracker.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'cd backend && npm install'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'cd backend && docker build -t kanishkaac/workout-tracker-backend .'
            }
        }
    }
}