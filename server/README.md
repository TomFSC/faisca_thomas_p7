# Server

Install dependencies
Create a DataBase on MongoDB

## Environement Variables

Create a .env file in server folder with:

SERVER_PORT = "your server port"
MONGODB_URL= "complete database URL with Database name, username and password"
BCRYPT_SALT_ROUND= "salt number for bcrypt hash"
ACCESS_TOKEN_SECRET= "your secret encoding key for jwt"

### Server start

Run the server with command: `npm start`
