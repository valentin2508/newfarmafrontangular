# Etapa 1: Construcción (Build)
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Usamos --legacy-peer-deps para ignorar conflictos de versiones
RUN npm install --legacy-peer-deps

# Copiar el resto del código
COPY . .

# SOLUCIÓN AL ERROR "Unknown argument: inline-fonts":
# Usamos el flag de optimización pero eliminamos el argumento no reconocido.
# Si el error de fuentes persiste, la mejor práctica es desactivar la optimización de fuentes 
# directamente en el archivo angular.json, pero aquí usamos un comando compatible.
RUN npm run build -- --configuration production --optimization=true

# Etapa 2: Servidor Web (Nginx)
FROM nginx:stable-alpine

# Ajuste de ruta para Angular 17+
COPY --from=build /app/dist/NewFarmaProject/browser /usr/share/nginx/html

# Copiamos la configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]