FROM nginx:alpine
# Copia los archivos compilados (ajusta el nombre de la carpeta)
COPY dist/boticanewfarma /usr/share/nginx/html
# Copia la configuración de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]