# Stage 1: Build the application
FROM node:alpine AS builder

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Stage 2: Run the application
FROM node:alpine

WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app .

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["node", "index.js"]