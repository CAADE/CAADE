FROM nickjer/docker-sphinx

MAINTAINER Darren Pulsipher <darren@pulsipher.org>

ENV HOME /home
ENV _JAVA_OPTIONS -Duser.home=${HOME}

WORKDIR /doc

CMD sphinx-build -a -q -b singlehtml . _build_html
