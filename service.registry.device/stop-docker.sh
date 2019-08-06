#!/bin/bash
# Stopping and removing existing images

docker stop $(docker ps -aq)
docker rm $(docker ps -aq)