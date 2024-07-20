pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'seynath/ecomserver' // Change 'username' to your Docker Hub username
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository that contains your Node.js app and Dockerfile
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/seynath/Ecommerce-all.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Retrieve credentials and inject as environment variables
                    withCredentials([
                        string(credentialsId: 'mysql_host', variable: 'MYSQL_HOST'),
                        string(credentialsId: 'mysql_user', variable: 'MYSQL_USER'),
                        string(credentialsId: 'mysql_password', variable: 'MYSQL_PASSWORD'),
                        string(credentialsId: 'mysql_db', variable: 'MYSQL_DB'),
                        string(credentialsId: 'jwt_secret', variable: 'JWT_SECRET'),
                        string(credentialsId: 'port', variable: 'PORT'),
                    ]) {
                        def commitId = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                        dir('server') {
                            sh """
                                docker build --build-arg MYSQL_HOST=${MYSQL_HOST} \
                                             --build-arg MYSQL_USER=${MYSQL_USER} \
                                             --build-arg MYSQL_PASSWORD=${MYSQL_PASSWORD} \
                                             --build-arg MYSQL_DB=${MYSQL_DB} \
                                             --build-arg JWT_SECRET=${JWT_SECRET} \
                                             --build-arg PORT=${PORT} \
                                             -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .
                            """
                        }
                    }
                }
            }
        }

        stage('Publish Docker Image') {
            steps {
                // Log in to Docker Hub
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                }
                // Push the image to Docker Hub
                script {
                    def commitId = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                }
            }
        }
        
        stage('Trigger CD Pipeline') {
            steps {
                // Trigger another job
                build job: 'updatecd', parameters: [string(name: 'DOCKERTAG', value: env.BUILD_NUMBER)]
            }
        }
    }
}
