# Science-101

### Clone repository
```
$ git clone https://github.com/bariss48/science101.git
```
### then you must create a 'config' folder in backend directory.
```
$ mkdir config ( /backend )
```
### and you must create a 'config.env' file inside 'config' folder.
```
$ touch config.env ( /backend/config )
```
#### after all , you must create a envoriment variables inside the 'config.env' file.
```
PORT = 4000
NODE_ENV = PRODUCTION
FRONTEND_URL = "http://localhost:3000"

DB_CONNECTION_STRING = ""
JWT_SECRET = 
JWT_EXPIRES_TIME = 
COOKIE_EXPIRES_TIME = 

CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 

STRIPE_API_KEY =
STRIPE_SECRET_KEY = 

SMTP_HOST =
SMTP_PORT = 
SMTP_EMAIL =
SMTP_PASSWORD = 
SMTP_FROM_EMAIL = 
SMTP_FROM_NAME = 
```
### then you can back to 'root' (project downloaded directory) and install dependencies
```
$ npm install
```

### After all that , your backend side will be start on '4000' port on your machine.
```
$ localhost:4000
```
### You can test all API's in development mode.
