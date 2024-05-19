# Base image
FROM node:18

# Install necessary networking tools
RUN apt-get update && apt-get install -y iputils-ping netcat-openbsd dnsutils

# Create app directory
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
