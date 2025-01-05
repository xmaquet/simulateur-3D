# Étape 1 : Construire l'application React
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Utiliser un serveur statique pour servir l'application
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Configuration Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
