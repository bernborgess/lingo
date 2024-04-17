#!/bin/bash

# Make nvm available
source $NVM_DIR/nvm.sh
if ! type nvm > /dev/null 2>&1; then
    echo "nvm is not available. Please install nvm."
    exit 1
fi

# Fail the script on any error
set -e

# Define the path to the workspace
WORKSPACE_PATH="/workspaces/lingo"

# Navigate to the workspace
cd $WORKSPACE_PATH

# Check if .node-version file exists
if [ ! -f ".node-version" ]; then
  echo ".node-version file not found!"
  exit 1
fi

# Read the node version from the file
NODE_VERSION=$(cat .node-version)

# Install and use the specified node version
nvm install $NODE_VERSION
nvm use $NODE_VERSION

# Navigate to the server directory and install dependencies
cd "${WORKSPACE_PATH}/server"
if [ -d "$(pwd)" ]; then
  npm install
else
  echo "Server directory not found!"
  exit 1
fi

# Navigate to the client directory and install dependencies
cd "${WORKSPACE_PATH}/client"
if [ -d "$(pwd)" ]; then
  npm install
else
  echo "Client directory not found!"
  exit 1
fi

echo "Setup completed successfully!"
