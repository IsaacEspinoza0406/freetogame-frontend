# Usar imagen de Node.js
FROM node:20-alpine

# Crear y definir directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación para producción.
RUN npm run build

# Exponer el puerto
EXPOSE 5000

# Iniciar la aplicación
CMD ["npm", "start"]