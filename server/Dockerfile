FROM node:18-alpine

WORKDIR /

COPY ["package.json" ,"package-lock.json" ,"./"]

RUN npm install --production

COPY . .

CMD [ "node","app.js"]
