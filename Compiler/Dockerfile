# Base image with Node.js
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies including nodemon
RUN npm install

# Copy rest of the project files (including .env)
COPY . .

# Install system compilers for C++, Java, Python
RUN apt-get update && apt-get install -y \
    g++ \
    openjdk-17-jdk \
    python3 \
    time \
    && apt-get clean

# Set environment variable for production or development
ENV NODE_ENV=development

# Expose the port the server listens on
EXPOSE 3000

# Start the application using nodemon
CMD ["npm", "run", "dev"]