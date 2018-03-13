FROM node:9-alpine
LABEL maintainer="Tyler Battle <tbattle@boundlessgeo.com>"

RUN set -ex; \
    apk add --no-cache \
        git \
        yarn \
        ;

RUN yarn global add \
        gulp-cli \
        ;

WORKDIR /usr/src/app

COPY . .

RUN set -ex; \
    yarn install; \
    gulp build;

CMD set -ex; \
    yarn install; \
    gulp build;
