FROM node:16.14-alpine AS build
LABEL Name=tododocker Version=0.0.1
EXPOSE 80

RUN npm i -g npm@8.8

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular app
RUN npm run build --prod

# Expose port 80
EXPOSE 80

# Start the Angular app
CMD [ "npm", "run", "start" ]