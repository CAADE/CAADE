pipeline {
  agent {
    label 'node'
  }
  stages {
    stage('Build Docs') {
      agent {
        label 'dev'
      }
      steps {
        sh 'git submodule update --init --recursive'
        sh 'npm run-script build-doc'
      }
    }
    stage('Build') {
      agent {
        label 'dev'
      }
      steps {
        sh 'npm run-script build'
        sh 'npm run-script deploy-apps'
      }
    }
    stage('Test') {
      agent {
        label 'dev'
      }
      steps {
        sh 'npm run-script deploy-test'
        sh 'npm run-script test'
      }
    }
    stage('Production') {
      agent {
        label 'prod'
      }
      steps {
        sh 'npm run-script deploy-prod'
      }
    }
  }
}
