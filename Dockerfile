FROM node:14.16.1-alpine
RUN apk add g++ make python
RUN npm install npm@6.14.12
RUN rm -rf /usr/local/lib/node_modules/npm
RUN mv node_modules/npm /usr/local/lib/node_modules/npm

WORKDIR /app

RUN npm install --global pm2

COPY ./package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

USER node

CMD ["pm2-runtime", "npm", "--", "start"]