
pipeline{
    agent any
    
    environment {
        def BUILDVERSION = sh(script: "echo `date +%s`", returnStdout: true).trim()
		docker_image = "ninaryan2024/electrical${BUILDVERSION}"
		docker_container = "electrical-container-${BUILDVERSION}"
	}
	
	
    stages{
        stage('Build dockerfile'){
            steps{
                sh 'docker build -f C://nodeJSProject//electrical//Dockerfile C://nodeJSProject//electrical// -t $docker_image'
            }
        }
        
        stage('Push to docker hub') {
			steps {
				sh 'docker push $docker_image:latest'
			}
		}
		
		stage('Pull image from docker hub'){
		    steps {
		        sh 'docker pull $docker_image:latest'
		    }
		}
		
		stage('Build and run docker container'){
		    steps {
		        sh 'docker run --name $docker_container -p 270:5900 -d $docker_image'
		    }
		}
    }
}