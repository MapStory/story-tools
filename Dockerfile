FROM node:6-alpine
MAINTAINER Tyler Battle <tbattle@boundlessgeo.com>

RUN apk add --no-cache git
RUN npm install -g bower gulp-cli

WORKDIR /usr/src/app

COPY . .

RUN set -ex \
    && npm install \
    && bower install --allow-root \
    && gulp

CMD set -ex \
    && npm install \
    && bower install --allow-root \
    && gulp
