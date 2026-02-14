#!/bin/bash
set -e


echo "cargo version: $(cargo --version)"
echo "node version: $(node -v)"
echo "npm version: $(npm -v)"

echo "Installing npm dependencies..."
cd clock-overlay
npm install

echo "Setup complete! Run 'npm run tauri dev' to start development."
