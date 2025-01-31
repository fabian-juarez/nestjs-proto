# Usa la imagen base de Node.js 19.6.1
FROM node:19.6.1-alpine

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN yarn install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila el código TypeScript
RUN yarn build

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main.js"]
