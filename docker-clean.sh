#!/usr/bin/env bash

# Remove dangling docker images
docker rmi $(docker images -q -f dangling=true)
