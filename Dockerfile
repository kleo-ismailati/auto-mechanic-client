FROM node:20.10.0-alpine3.18

WORKDIR /usr/src/app

COPY . .

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
