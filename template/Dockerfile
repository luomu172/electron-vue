FROM electronuserland/builder:wine AS builder

WORKDIR /app

#RUN npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/

COPY package.json .

RUN npm install

ADD . .

RUN npm run build:prd

RUN ls -Rlh /app/build

FROM registry.cn-shenzhen.aliyuncs.com/spark-base/base-nginx:stable-alpine-log

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx/conf/nginx.conf /etc/nginx/nginx.conf

ADD nginx/conf/conf.d /etc/nginx/conf.d

COPY --from=builder /app/build /usr/share/nginx/app/download
