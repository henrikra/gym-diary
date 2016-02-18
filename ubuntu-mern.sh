#!/bin/bash

# Update repositories
apt-get update

# Git
apt-get install git -y

# Node.js
curl -sL https://deb.nodesource.com/setup_5.x | bash -
apt-get install -y nodejs

# MongoDB
apt-get install mongodb -y
