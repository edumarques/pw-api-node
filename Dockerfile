FROM node

# Create app directory and set permissions
RUN mkdir -p /home/node/pw-api/node_modules && chown -R node:node /home/node/pw-api

# Set working directory
WORKDIR /home/node/pw-api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Switch the user to node (comes set up from the docker hub's image
USER node

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .