FROM mcr.microsoft.com/devcontainers/base:ubuntu24.04

# Install system dependencies as root user
USER root

# Update package list
RUN apt-get update && apt-get upgrade -y


# Install Tauri OS dependencies
# https://tauri.app/start/prerequisites/#linux
RUN apt-get install -y libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev


# Change to the vscode user to install Rust and Node.js in the user's home directory
USER vscode
WORKDIR /home/vscode


# Install Rust (and Cargo) using rustup
# https://tauri.app/start/prerequisites/#rust
RUN curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh -s -- -y


# Install Node.js and npm using nvm
# https://tauri.app/start/prerequisites/#nodejs
# https://nodejs.org/en/download
# Download and install nvm and then use nvm to install Node.js version 24:
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
ENV NVM_DIR=/home/vscode/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install 24
