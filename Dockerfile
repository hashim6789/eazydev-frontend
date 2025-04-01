FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]

# FROM node:20.11.1-alpine3.19 AS build

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm install

# ENV PATH /app/node_modules/.bin:$PATH

# COPY . .

# RUN npm run build

# FROM nginx:1.25.4-alpine3.18

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist /var/www/html/

# EXPOSE 3000

# ENTRYPOINT ["nginx","-g","daemon off;"]
