pipeline {
  agent {
    label 'node'
  }
  environment {
          CAADE_REGISTRY = 'node0:5000'
  }
  stages {
    stage('Build Docs') {
    agent {
        docker { image 'madajaju/caade-doc-node-agent' }
      }
      steps {
        sh 'git submodule update --init --recursive'
        sh 'ls -latr'
        sh 'npm run-script design'
        sh 'npm run-script build-doc'
        sh 'cd docs && git add . && git commit -m "Update Documents"'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run-script build'
        sh 'npm run-script publish'
      }
    }
    stage('Test') {
      agent {
        label 'docker-master'
      }
      steps {
        sh 'npm run-script deploy-test'
        sh 'npm run-script test'
        sh 'npm run-script teardown-test'
      }
      post {
        always {
          junit "report.xml"
        }
      }
    }
    stage('Production') {
      steps {
        sh 'npm run-script deploy-prod'
      }
    }
  }
}
