# Image Based on node 6
FROM node:6

# directory where the app will be placed in the container 
RUN  mkdir -p /usr/src/app/

# change directory so that ou commands run inside the directory

WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app


#install dependencies 

RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

#Expose the port 

EXPOSE 4200

#Serve the app

CMD [ "npm","start" ]


