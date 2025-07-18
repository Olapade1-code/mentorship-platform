# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Install ts-node globally for running TypeScript directly
RUN npm install -g ts-node typescript

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["npx", "ts-node", "src/server.ts"]