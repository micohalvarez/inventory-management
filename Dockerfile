FROM node:14-alpine

WORKDIR /app

# 1. Install Python and Build Tools (make, g++)
RUN apk add --no-cache python3 make g++

RUN npm install -g npm@7.17.0 --global pm2

COPY ./package.json ./package-lock.json ./
RUN npm ci --production --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

USER node

CMD ["pm2-runtime", "npm", "--", "start"]
