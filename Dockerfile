# Usa una imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de configuración y dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Compilar el proyecto TypeScript
RUN npm run build

# Exponer el puerto de la aplicación
EXPOSE 3000

# Establecer la zona horaria del servidor en UTC (opcional)
ENV TZ=Etc/UTC

# Ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
