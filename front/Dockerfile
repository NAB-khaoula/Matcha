FROM node:16-alpine
RUN mkdir -p /usr/src/app
RUN npm install -g @angular/cli@13
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["npm", "start"]
