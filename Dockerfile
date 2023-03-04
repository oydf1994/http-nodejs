FROM node:18
WORKDIR /app
COPY . /app
RUN npm config set registry "https://registry.npm.taobao.org/"

RUN npm install

EXPOSE 3000

CMD npm start