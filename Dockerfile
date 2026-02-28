# Etapa 1: Construcción (Build)
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --configuration production --optimization=true
FROM nginx:stable-alpine
COPY --from=build /app/dist/NewFarmaProject/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]