# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Install ts-node and typescript globally
RUN npm install -g ts-node typescript

# Expose the port your app will run on
EXPOSE 3002

# Command to run the app
CMD ["ts-node", "src/index.ts"]