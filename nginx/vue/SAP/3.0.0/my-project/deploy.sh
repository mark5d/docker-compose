#!/bin/bash

npm install && npm run build

if [ $? -eq "0" ] 
then 
    docker-compose -f docker/docker-compose.yml up -d
fi
