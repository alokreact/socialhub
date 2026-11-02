#!/bin/bash
# Run this ONCE on your EC2 instance to install Docker

sudo apt update -y
sudo apt install -y docker.io docker-compose-plugin

sudo systemctl enable docker
sudo systemctl start docker

# Allow current user to run docker without sudo
sudo usermod -aG docker $USER
newgrp docker

echo "Docker installed successfully"
docker --version
docker compose version
