
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . ./

# Run app
CMD [ "npm", "run", "start" ]