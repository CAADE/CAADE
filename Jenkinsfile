pipeline {
  agent {
    label 'node'
  }
  environment {
          CAADE_REGISTRY = '172.16.0.100:5000'
  }
  stages {
    stage('Build Docs') {
      steps {
        sh 'git submodule update --init --recursive'
        sh 'npm run-script build-doc'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run-script build'
        sh 'npm run-script deploy-apps'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run-script deploy-test'
        sh 'npm run-script test'
      }
    }
    stage('Production') {
      steps {
        sh 'npm run-script deploy-prod'
      }
    }
  }
}
