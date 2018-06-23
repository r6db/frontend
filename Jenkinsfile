pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }

  }
  stages {
    stage('Install') {
      steps {
        sh '''docker build -t registry.r6db.com/frontend .
docker tag registry.r6db.com/frontend "registry.r6db.com/frontend:$BUILD_NUMBER"'''
      }
    }
    stage('Publish') {
      steps {
        sh 'docker push registry.r6db.com/frontend'
      }
    }
  }
}