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

# Expose the backend port
EXPOSE 5000

# Start the server using ts-node from local node_modules
CMD ["npx", "ts-node", "src/server.ts"]