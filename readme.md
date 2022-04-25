## Installation

```shell script
npm install
```

Create an `.env` file at the root of your project with the following.

```dotenv
MONGO_URL=YOUR_MONGO_URL
PORT=5000[YOUR_DESIRED_PORT]
NODE_ENV=YOUR_APP_ENVIRONMENT[production/development]
JWT_SECRET=YOUR_JWT_SECRET_STRING
```

An example file `.env.example` is included.

Your project is ready. Now start the project.

```shell script
npm start
```

Go to `http://localhost:4000`. You should see a default welcome page.

Your API base path is `http://localhost:4000/api`.

First create some accounts to get started with the authentication.

## Authentication

JWT authentication is added in this project. User model is defined in models/User.js.
For Register, Login, Logout use these urls —

```
    [POST] api/auth/register
    [POST] api/auth/login
    [GET] api/auth/logout
```

## Directory Structure of the Project

```
├─ .env
├─ .gitignore
├─ config
│  ├─ config.js
│  ├─ database.js
│  ├─ routes.js
│  └─ server.js
├─ index.js
├─ package.json
├─ system
└─ src
  ├─ controllers
  │  ├─ AuthController.js
  │  ├─ MediaController.js
  │  └─ PostController.js
  ├─ helpers
  ├─ models
  │  ├─ Auth.js
  │  ├─ Media.js
  │  ├─ Post.js
  │  └─ User.js
  ├─ routes
  │  ├─ auth.js
  │  ├─ media.js
  │  └─ post.js
  └─ services
     ├─ AuthService.js
     ├─ MediaService.js
     ├─ PostService.js
     └─ UserService.js
```

## Lets talk about the structure

We have 2 base classes — One for Controller and another for Service.

1. **[Controller.js](system/controllers/Controller.js)**

This base controller have the basic CRUD operations. To create a new controller just extend this base Controller class.

2. **[Service.js](system/services/Service.js)**

This is the base Service class which includes the database operations. If you want to change the default behaviour of the services you can update this file.

## How to Create new CRUD Module?

If you want to create a new Module say Post. Then you’ll have to create 4 basic files. One Controller, one Service, one Model and one route file. And add the new route in routes/index.js with desired url.
There is a “Post” CRUD module included in this project for example.

```
    controllers/PostController.js
    models/Post.js
    services/PostService.js
    routes/post.js
```
