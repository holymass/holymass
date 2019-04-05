FROM node:10.11

COPY . /app
WORKDIR /app

RUN npm config list
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "server"]
