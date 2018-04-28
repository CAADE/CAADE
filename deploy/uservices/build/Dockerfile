FROM  jenkins/jenkins:lts

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt

RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt

USER root

RUN apt-get install apt-transport-https ca-certificates curl software-properties-common

RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu artful stable"

RUN apt-get update && apt-get install docker-ce -y

USER jenkins
