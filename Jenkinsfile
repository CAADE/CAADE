pipeline {
  agent {
    label 'node'
  }
  stages {
    stage('Build Docs') {
      steps {
        sh 'npm run-script design'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run-script build'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run-script deploy'
        sh 'npm '
      }
    }
  }
}
