#!/bin/bash
set -e


echo "Installed versions:"
echo "  rustc : $(rustc --version)"
echo "  cargo : $(cargo --version)"
echo "  node  : $(node -v)"
echo "  npm   : $(npm -v)"
echo ""

echo "Installing npm dependencies..."
cd app
npm install

yellow="\033[1;33m"
reset="\033[0m"
echo -e "${yellow}The devcontainer timezone is currently set to $(cat /etc/timezone).${reset}"
echo "To set the timezone for the devcontainer based on your local timezone, run the following command: sudo dpkg-reconfigure tzdata"

echo "Run 'npm run tauri dev' to start development."
