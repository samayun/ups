# FROM node:18.17.1-alpine
# WORKDIR /app
# COPY . .
# RUN npm install -g pnpm && \
#     pnpm install && \
#     pnpm build && \
#     pnpm store prune
# ENV PORT 3000
# CMD pnpm start
FROM node:18-alpine

# Set a working directory
WORKDIR /app

# Copy the application code
COPY . .

# Install pnpm globally, install dependencies, build the application, and clean up
RUN npm install -g pnpm && \
    pnpm install && \
    pnpm build && \
    pnpm store prune

# Set the environment variable for the port
ENV PORT 3000

# Allocate more memory to Node.js to avoid heap memory issues
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Command to start the application
CMD ["pnpm", "start"]
