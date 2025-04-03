# # Step 1: Build React App
# FROM node:18-alpine AS build
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install --frozen-lockfile
# COPY . .
# RUN npm run build

# # Step 2: Serve with Nginx
# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Step 1: Build React App
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./

# Optimize npm install: Use --frozen-lockfile (for Yarn) or --ci (for npm)
RUN npm ci  # Ensures a clean, reproducible install

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Ensure that build output exists
RUN ls -l /app/dist


# # Step 2: Serve with Nginx
# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# RUN ls -l /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
