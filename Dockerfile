FROM node:alpine

WORKDIR /app

RUN npm install -g npm@7.17.0 --global pm2

COPY ./package.json ./
RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

USER node

CMD ["pm2-runtime", "npm", "--", "start"]