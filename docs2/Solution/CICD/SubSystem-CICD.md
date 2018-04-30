# CICD

CICD is a subsystem of caade that is implemented by an existing CI/CD service that is available
today. Examples of CICD systems that can be used are Jenkins, Bamboo, TravisCI, etc...

## Use Cases

* [Test Applicaton](UseCase-Test-Application)
* [Test MicroService](UseCase-Test-MicroService)

![Image](./Solution/CICD/UseCases.png)

## Actors

### Users 

* [Developer](Actor-Developer)

![Image](./Solution/CICD/UserInteraction.png)

### Uses

* [CICD](SubSystem-CICD)
* [Dev Cloud](SubSystem-DevCloud)
* [Local Cloud](SubSystem-LocalCloud)
* [Production Cloud](SubSystem-ProductionCloud)
* [Test Cloud](SubSystem-TestCloud)

## Interface

* CLI - Command Line Interface
* REST-API 
* Portal - Web Portal

## Logical Artifacts

* Agent - Agent running in the different clouds that perform builds for a Project
* Build - Build Stages of a pipeline for a project.
* Pipeline - Pipeline that defineds how a project is built, test, and deployed
* Project - Project that contains the application and microservices
* Stage - Stage of builds defined in the pipeline.

![Image](./Solution/CICD/Logical.png)

## Activities and Flows 

![Image](./Solution/CICD/Process.png)

## Deployment Architecture

![Image](./Solution/CICD/Deployment.png)

## Physical Architecture

![Image](./Solution/CICD/Physical.png)

