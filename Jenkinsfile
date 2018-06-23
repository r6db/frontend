pipeline {
    stages{
        stage('Install'){
            steps {
                sh 'yarn'
            }
        }
        stage('Build'){
            steps{
                sh 'yarn build'
                archiveArtifacts artifacts: "build/**/*", fingerprint: true
            }
        }
        stage('Deploy'){
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS'
              }
            }
            steps {
                sh 'echo "this should be a deploy"'
            }
        }
    }
}