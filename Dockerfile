FROM node:16.13

COPY . /app
WORKDIR /app

RUN npm config list
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "server"]
