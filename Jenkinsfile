pipeline{
    agent any;
    
    tools {
        nodejs 'node-11.9.0';
    }
    
    stages {
        /*stage('Checkout SCM') {
            steps {
                sh "echo ${env.GIT_COMMIT}"
                sh "echo ${env.BUILD_ID}"
                git 'https://github.com/suparnb/blog-backend.git'
            }
        }*/
    
        stage('Build') {
            steps {
                script {
                    sh 'npm install';
                    sh 'npm build';
                }
            }
        }
        
        /*stage('Test') {
            steps {
                script {
                    npm test;
                }
            }
        }*/
        
        stage('Build and Save image') {
            steps {
                script {
                    def blogBackendImage = docker.build("suparnb/blog-backend:${env.BUILD_ID}");
                    
                    withDockerRegistry(credentialsId: 'docker-auth') {
                        blogBackendImage.push();
                    }
                }
            }
        }
    }
}
