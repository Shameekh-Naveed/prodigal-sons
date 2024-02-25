# Use the official Node.js  18 Alpine image as the base image
FROM node:18-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application source code to the working directory
COPY . .

RUN npm run build

# Define the command to start the application
CMD ["npm", "run", "dev"]
