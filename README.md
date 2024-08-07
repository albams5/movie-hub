# 🐝Mobee API - Movie Hub

## Table of contents

💻About the project <br>
📚Branches <br>
⚙️Technologies Used <br>
📍Data Types <br>
📝Daily records <br>

## 💻About the project

Welcome to Mobee project, an application to keep track of the movies you are watching.You are able to perform CRUD(Create, Read, Upadte, Delete) opreations on the different collections.
 This project is a REST API built with Node.js and uses Express as the web framework, along with Mongoose, Prisma, Morgan, and Helmet for various functionalities.


## 📚Branches

The project has three main branches:

- **mongoose**: Uses Mongoose to connect with MongoDB.
- **prisma**: Uses Prisma to connect with MongoDB.
- **prisma_with_postgres**: Uses Prisma to connect with PostgreSQL.
- **next-backend**: Ready to connect with the NextJS frontend project.
You can switch between branches to see how the connection with the database is implemented in each of them.

## ⚙️Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Prisma](https://www.prisma.io/)
- [Morgan](https://github.com/expressjs/morgan)
- [Helmet](https://helmetjs.github.io/)

## 📍Data Types

The Mobee application handles three main collections or entities:

1. **Users**: Represents the users of the application.
2. **Movies**: Represents the movies uploaded by users.
3. **Genres**: Represents the genres of the movies.

## 🖇️Related

Here you can find the frontend of this app.

https://github.com/albams5/mobee-nextjs


## 📝Daily records
    - Day 1: MongoDB + Mongoose. Configuring with dotenv, creating the connection in db.ts, starting the server in index.ts, connecting the routes, creating users and movies models, and the controllers.

    - Day 2: MongoDB + Prisma. Using Prisma Client to connect, creating the Prisma schema instead of the models, and editing the controllers to adapt them to Prisma.

    - Day 3: Prisma + Postgres. Edit both the provider and the models in the schema. Also, update the .env link. Perform the migration and edit the controllers.

    - Day 4: add Movies-Genres relationship in mongoose branch.

    - Day 5: add Movies-Genres relationship in prisma branch.

    - Day 6: add Movies-Genres relationship in prisma_with_postgres branch.



#react #express #typescript #postgres #prisma #cloudinary #backend
