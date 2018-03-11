FROM docker:18.03-rc
MAINTAINER Darren Pulsipher <darren@pulsipher.org>

RUN apk --update add openjdk8-jre git fontconfig ttf-dejavu ttf-freefont graphviz

RUN apk --update add nodejs dbus

RUN npm install -g github-wikito-converter

RUN apk add qt5-qtbase-dev \
            wkhtmltopdf \
            --no-cache \
            --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ \
            --allow-untrusted

COPY entrypoint.sh /

RUN chmod +x /entrypoint.sh  \
    && sed -i -e 's/\r$//' /entrypoint.sh

