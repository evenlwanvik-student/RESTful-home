#!/bin/bash
# Stopping and removing existing images

sudo docker stop $(sudo docker ps -aq)
sudo docker rm $(sudo docker ps -aq)