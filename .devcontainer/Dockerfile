# .devcontainer/Dockerfile
FROM mcr.microsoft.com/devcontainers/javascript-node:20-bullseye

# Extra OS packages – watchman keeps Metro happy on Linux
RUN apt-get update \
 && apt-get install -y --no-install-recommends watchman jq sqlite3 \
 && rm -rf /var/lib/apt/lists/*

# Global CLIs
RUN npm i -g expo-cli eas-cli prisma

# Very small quality-of-life tweaks
ENV TZ=Etc/UTC
RUN echo "alias ll='ls -alF --color=auto'" >> /home/node/.bashrc
