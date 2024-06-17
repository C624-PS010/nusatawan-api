# NUSATAWAN API

Backend REST API for Nusatawan project

## TABLE OF CONTENTS

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running App](#run-app)
- [API Reference](#api-reference)
  - [Base URL](#base-url)
  - [Auth](#auth)
  - [Users](#users)
  - [Categories](#categories)
  - [Articles](#articles)
  - [Rating](#rating)
  - [Comments](#comments)
  - [Campaigns](#campaign)
  - [Images](#images)
- [About Us](#about-us)
  - [Developers](#developers)
  - [Tech Stack](#tech-stack)

## GETTING STARTED

### Installation

Install all the necessary packages using NPM.

```bash
  npm install
```

### Environment Variables

Assign value to all the necessary variable to environment variable, look at the reference in `.env.dev`

`PORT`  
`DATABASE_URL`  
`JWT_SECRET`  
`JWT_ADMIN_SECRET`  
`SUPABASE_PROJECT_URL`  
`SUPABASE_ANON_KEY`

### Database and Storage Setup

This project uses MySQL as a database, make sure that your MySQL service has been running.

We also uses supabase for storing images files, you have to also make sure to store all the necessary database and supabase environment variables first.

After storing all the necessary database and the supabase information, do the migration and seeding using Prisma.

```bash
  npm run migrate
  npm run seed
```

or

```bash
  npm run populate-db
```

Then generate the prisma client so you can use prisma's query engine inside your code

```bash
  npm run postinstall
```

### Run App

After all the setup has completed, you can start the application.

```bash
  npm run start
```

or

```bash
  npm run dev
```

## API REFERENCE

### Base URL

`https://nusatawan-api.vercel.app`

### Auth

#### Register

Endpoint : `/auth/register`  
Method : `POST`

Request body (JSON):

    username: string
    email: string
    password: string
    phone: string

Response (JSON):

    error: false,
    message: "user has been successfully registered",
    data: { id, username, email, password, phone, isAdmin }
    token: { userToken }

#### Login

Endpoint : `/auth/login`  
Method : `POST`

Request body (JSON):

    email: string
    password: string

Response (JSON):

    error: false,
    message: "user1 has been successfully logged in",
    data: { id, username, email, password, phone, isAdmin }
    token: { userToken, adminToken }

### Users

#### Get all Users

Endpoint : `/users?isAdmin=boolean`  
Method : `GET`

Request (cookies) : `user-token` `admin-token`

Response (JSON):

    error: false,
    message: "Success",
    data: [
        { id, username, email, password, phone, isAdmin },
        { id, username, email, password, phone, isAdmin },
    ]

#### Get user by ID

Endpoint : `/users/:id`  
Method : `GET`

Request Headers :

    auth-user: `Bearer token`
    auth-admin: `Bearer token`

Response (JSON):

    error: false,
    message: "Success",
    data: { id, username, email, password, phone, isAdmin }

#### Change user role

Endpoint : `/users/role/:id`  
Method : `PATCH`

Request Headers :

    auth-user: `Bearer token`
    auth-admin: `Bearer token`

Request body (JSON):

    isAdmin: boolean

Response (JSON):

    error: false,
    message: "User role has been successfully updated",
    data: { id, username, email, password, phone, isAdmin }

#### Delete User

Endpoint : `/users/:id`  
Method : `DELETE`

Request Headers :

    auth-user: `Bearer token`
    auth-admin: `Bearer token`

Request body (JSON):

    isAdmin: boolean

Response (JSON):

    error: false,
    message: "User has been successfully removed",
    data: { id, username, email, password, phone, isAdmin }

### Categories

#### Get All categories

Endpoint : `/categories`  
Method : `GET`

Response (JSON):

    error: false,
    message: "Success",
    data: [
        { name, image },
        { name, image }
    ]

#### Get category by name

Endpoint : `/category/:name`  
Method : `GET`

Response (JSON):

    error: false,
    message: "Success",
    data: { name, image }

### Articles

#### Get All Articles

Endpoint : `/articles?search=string&filter=string`  
Method : `GET`

Response (JSON):

    error: false,
    message: "Success",
    data: {
        id, title, content, image, location, createdAt,  categoryName, userId,
        cetegory: { name, image }
    }

#### Get article by ID

Endpoint : `/articles/:id`  
Method : `GET`

Response (JSON):

    error: false,
    message: "Success",
    data: {
        id, title, content, image, location, createdAt,  categoryName, userId,
        cetegory: { name, image }
        user: { id, username, email, phone }
        comments: []
    }

#### Add Article

Endpoint : `/articles`  
Method : `POST`

Request Headers :

    auth-user: `Bearer token`

Request body (form-data):

    title: string
    content: string
    image: image(png/jpg/jpeg)
    location: string
    categoryName: string
    userId: string

Response (JSON):

    error: false,
    message: "Article added successfully",
    data: {
        id, title, content, image, location, createdAt,  categoryName, userId
    }

#### Delete Article

Endpoint : `/articles/:id`  
Method : `DELETE`

Request Headers :

    auth-user: `Bearer token`
    auth-admin: `Bearer token`

Response (form-data):

    error: false,
    message: "Article deleted successfully",
    data: {
        id, title, content, image, location, createdAt,  categoryName, userId,
        cetegory: { name, image }
        user: { id, username, email, phone }
        comments: []
    }

### Comments

#### Get All Comments by Article ID

Endpoint : `/articles/:id/comments`  
Method : `GET`

Response (JSON):

    error: false,
    message: "Success",
    data: { id, body, userId, articleId, createdAt, user }

#### Add comment

Endpoint : `/articles/:id/comments`  
Method : `POST`

Request Headers :

    auth-user: `Bearer token`

Request body (JSON):

    comment: string
    userId: string

Response (JSON):

    error: false,
    message: "Successfully added comment",
    data: { id, body, userId, articleId, createdAt }

#### Delete comment

Endpoint : `/articles/:articleId/comments/:commentId`  
Method : `DELETE`

Request Headers :

    auth-user: `Bearer token`
    auth-admin: `Bearer token`

Request body (JSON):

    comment: string
    userId: string

Response (JSON):

    error: false,
    message: "Successfully deleted comment",
    data: { id, body, userId, articleId, createdAt }

### Rating

#### Get All Ratings by Article ID

Endpoint : `/ratings/:id`  
Method : `GET`

Response (JSON):

    error: false,
    message: "Success get all ratings by article id",
    data: { id, rating, userId, articleId }

#### Get Average Ratings by Article ID

Endpoint : `/ratings/:id/average`  
Method : `GET`

Response (JSON):

    error: false,
    message: "Success get average rating by article id",
    data: { _avg }

#### Get Average Rating by Article ID

Endpoint : `/ratings/:id/average`  
Method : `GET`

Response (JSON):

    error: false,
    message: "Success",
    data: { _avg }

#### Get Total Rating by Article ID

Endpoint : `/ratings/:id/total`  
Method : `GET`

Response (JSON):

    error: false,
    message: "Success get total user rating by article id",
    data: total

#### Add rating

Endpoint : `/ratings/:id`  
Method : `POST`

Request Headers :

    auth-user: `Bearer token`

Request Body (JSON):

    rating: number
    userId: string

Response (JSON):

    error: false,
    message: "Successfully added rating",
    data: { id, rating, userId, articleId }

### Campaign

#### Get All Campaigns

Endpoint : `/campaigns`  
Method : `GET`

Response (JSON):

    error: false,
    message: "Success",
    data: [
        {
            id, title, content, image, createdAt,
            user: id, username
        },
        {
            id, title, content, image, createdAt,
            user: id, username
        }
    ]

#### Get Campaign by ID

Endpoint : `/campaigns/:id`  
Method : `GET`

Response (JSON):

    error: false,
    message: "Success",
    data: {
        id, title, content, image, createdAt,
        user: id, username
    }

#### Add Campaign

Endpoint : `/campaigns`  
Method : `POST`

Request Headers :

    auth-user: `Bearer token`

Request body (form-data):

    title: string
    content: string
    image: image.jpg/jpeg/png
    userId: string

Response (JSON):

    error: false,
    message: "Campaign added successfully",
    data: {
        id, title, content, image, createdAt, userId
    }

#### Delete Campaign

Endpoint : `/campaigns`  
Method : `DELETE`

Request Headers :

    auth-user: `Bearer token`
    auth-admin: `Bearer token`

Response (JSON):

    error: false,
    message: "Campaign deleted successfully",
    data: {
        id, title, content, image, createdAt, userId
    }

### Images

#### Get article's image

Endpoint : `/image/articles/:file`  
Method : `GET`
Response: image/png

#### Get campaign's image

Endpoint : `/image/campaigns/:file`  
Method : `GET`
Response: image/png

#### Get category's image

Endpoint : `/image/categories/:file`  
Method : `GET`
Response: image/png

## ABOUT US

### Developers

- F2886YB202 – Adriansyah  
  [![Github](https://img.shields.io/badge/github-black?logo=github&logoColor=white)](https://github.com/Sekonso)
  [![linkedin](https://img.shields.io/badge/instagram-purple?logo=instagram&logoColor=white)](https://www.instagram.com/ancaadri9)
  [![linkedin](https://img.shields.io/badge/linkedin-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adriansyah-anca-197270214)

- F1976YB116 – Aufaa Husniati  
  [![Github](https://img.shields.io/badge/github-black?logo=github&logoColor=white)](https://github.com/aufaahusniati)
  [![linkedin](https://img.shields.io/badge/instagram-purple?logo=instagram&logoColor=white)](https://www.instagram.com/aufaahsnt)
  [![linkedin](https://img.shields.io/badge/linkedin-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aufaahusniati)

- F1976YB116 – Rizky  
  [![Github](https://img.shields.io/badge/github-black?logo=github&logoColor=white)](https://github.com/Aerossky)
  [![linkedin](https://img.shields.io/badge/instagram-purple?logo=instagram&logoColor=white)](https://www.instagram.com/risky_goh)
  [![linkedin](https://img.shields.io/badge/linkedin-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/risky-aerossky)

### Tech Stack

[![express](https://img.shields.io/badge/express-1B222E?style=for-the-badge&logo=express&logoColor=white)](https://www.npmjs.com/package/express)
[![mysql](https://img.shields.io/badge/mysql-1B222E?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![prisma](https://img.shields.io/badge/prisma-1B222E?style=for-the-badge&logo=prisma&logoColor=white`)](https://www.prisma.io/)
[![jsonwebtoken](https://img.shields.io/badge/jwt-1B222E?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://www.npmjs.com/package/jsonwebtoken)
[![zod](https://img.shields.io/badge/zod-1B222E?style=for-the-badge&logo=zod&logoColor=white)](https://www.npmjs.com/package/zod)
[![eslint](https://img.shields.io/badge/eslint-1B222E?style=for-the-badge&logo=eslint&logoColor=white)](https://www.npmjs.com/package/eslint)
[![prettier](https://img.shields.io/badge/prettier-1B222E?style=for-the-badge&logo=prettier&logoColor=white)](https://www.npmjs.com/package/prettier)
[![postman](https://img.shields.io/badge/postman-1B222E?style=for-the-badge&logo=postman&logoColor=white)](https://www.npmjs.com/package/postman)

### Repositories

- [Front-End](https://github.com/C624-PS010/nusatawan-front-end)
- [Back-End](https://github.com/C624-PS010/nusatawan-api)
