FROM node:20-alpine

WORKDIR /app

# Set environment variables
ENV MYSQL_HOST="ecom.mysql.database.azure.com"
ENV MYSQL_USER="seynath"
ENV MYSQL_PASSWORD="Lonath1234#"
ENV MYSQL_DB="ecomnew"


COPY package*.json ./
RUN npm install

EXPOSE 5001

COPY . .

CMD ["node", "index.js"]
