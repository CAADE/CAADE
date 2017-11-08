#!/bin/sh
set -e

LABELS="${LABELS:-node}"
EXECUTORS="${EXECUTORS:-3}"
FSROOT="${FSROOT:-/tmp/jenkins}"

mkdir -p $FSROOT
java -jar swarm-client.jar -labels=$LABELS -executors=$EXECUTORS -fsroot=/tmp/jenkins -name=docker-$(hostname) $(sed -e "s/\r//" /run/secrets/jenkins)
