#!/bin/sh -x
set -e

EXECUTORS="${EXECUTORS:-3}"
FSROOT="${FSROOT:-/tmp/jenkins-node}"
IS_MASTER_NODE=`docker node ls | grep Leader | wc -l`
if [ $IS_MASTER_NODE -gt 0 ]
then
  LABELS="${LABELS:-docker-master}"
else
  LABELS="${LABELS:-node}"
fi

mkdir -p $FSROOT
java -jar swarm-client.jar -labels=$LABELS -executors=$EXECUTORS -fsroot=$FSROOT -name=docker-$(hostname) $(sed -e "s/\r//" /run/secrets/jenkins)
