# 🐝Mobee Backend🎬

## Table of contents

💻About the project
📚Branches
⚙️Technologies Used
📍Data Types
📝Daily records

## 💻About the project

Welcome to Mobee! This backend API is developed with Node.js and Express.js, offering a robust solution for managing users, movies, and genres through CRUD operations. Leveraging Prisma's ability to handle multiple clients and TypeScript's strong type safety support, our project ensures a reliable experience at all times. Furthermore, our integration with Cloudinary simplifies multimedia content management efficiently. With comprehensive documentation, configuration options via environment variables, and optimized queries, MovieHUB provides cutting-edge technologies and best practices seamlessly integrated and hassle-free.


## 📚Branches

The project has three main branches:

- **mongoose**: Uses Mongoose to connect with MongoDB.
- **prisma**: Uses Prisma to connect with MongoDB.
- **prisma_with_postgres**: Uses Prisma to connect with PostgreSQL.

You can switch between branches to see how the connection with the database is implemented in each of them.

## ⚙️Technologies Used

### Backend Stack

Node.js🚀: Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. It allows developers to use JavaScript for server-side scripting, enabling the development of scalable and high-performance network applications.
Express.js🌐: Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It is designed to make the process of building web applications with Node.js easier and more efficient by providing a simple and intuitive API for handling HTTP requests and responses.
TypeScript📝: TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, adding optional static typing to the language. TypeScript is designed for the development of large-scale applications and transcompiles to plain JavaScript. It aims to make JavaScript development more scalable and maintainable by catching common errors at compile time.

### Database

MongoDB🍃: MongoDB is a cross-platform, document-oriented NoSQL database program. It uses a JSON-like format for storing data, making it flexible and scalable for various types of applications. MongoDB is known for its high performance, scalability, and ease of use, particularly in scenarios where data structures may evolve over time.
Mongoose🏗️: Mongoose is an object data modeling (ODM) library for MongoDB and Node.js. It provides a straightforward schema-based solution to model application data, including built-in type casting, validation, query building, and business logic hooks. Mongoose simplifies interactions with MongoDB, allowing developers to work with data in a more structured and intuitive manner.
Prisma🚀: Prisma is an open-source database toolkit for Node.js and TypeScript applications. It offers a type-safe and auto-generated query builder that enables developers to interact with databases easily. Prisma abstracts away the complexities of database management, providing features such as schema migrations, data modeling, and seamless integration with various databases, including PostgreSQL, MySQL, and SQLite.
PostgreSQL🐘: PostgreSQL is a powerful, open-source relational database management system (RDBMS) known for its robustness, extensibility, and compliance with SQL standards. It supports a wide range of advanced features, including transactions, foreign keys, triggers, and stored procedures. PostgreSQL is highly reliable and suitable for handling complex data requirements in production environments.
Cloudinary☁️: Cloudinary is a cloud-based media management platform that provides a comprehensive solution for storing, managing, and delivering images and videos on the web. It offers features such as image and video manipulation, optimization, responsive delivery, and asset management through a simple API. Cloudinary helps developers streamline the process of handling media assets, improving performance and user experience on their websites or applications.

## 📍Features

* User Management:
Register new users 🗃️
Manage user profiles 🦰
* Movie Management:
CRUD operations for movies 🎞️
Associate movies with user accounts and genres🔗
Upload movie files to Cloudinary ☁️
* Genre Management:
CRUD operations for genres 🔖


## 📝Daily records
    - Day 1: MongoDB + Mongoose. Configuring with dotenv, creating the connection in db.ts, starting the server in index.ts, connecting the routes, creating users and movies models, and the controllers.

    - Day 2: MongoDB + Prisma. Using Prisma Client to connect, creating the Prisma schema instead of the models, and editing the controllers to adapt them to Prisma.

    - Day 3: Prisma + Postgres. Edit both the provider and the models in the schema. Also, update the .env link. Perform the migration and edit the controllers.

    - Day 4: add Movies-Genres relationship in mongoose branch.

    - Day 5: add Movies-Genres relationship in prisma branch.

    - Day 6: add Movies-Genres relationship in prisma_with_postgres branch.
    
    - Day 7-8-9: Cloudinary implementation


## Installation

* Clone the repository:

git clone https://github.com/albams5/movie-hub.git

* Install dependencies:

cd movie-hub npm install

* Set up environment variables:

* Create a .env file based on .env.example and fill in the required values.

* Start the server:

npm run dev

## 📚 API Documentation

1. 🎬 Movies

1.1 Get All Movies
URL: /movie
Method: GET
Description: Retrieves a list of all movies available on the platform.
Response: {
      msg: "All movies",
      data: all movies,
      type: typeof allMovies,
    }

1.2 Add a New Movie
URL: /movie/:userID
Method: POST
Description: Adds a new movie to the platform.
Request Parameters:
userID (string): The ID of the user who creates the new movie.
Request Body:
name: The title of the movie.
image: The poster of the movie.
genre: Genres of the movie.
score: Score of the movie.
Response: {
      msg: "Movie create successfully",
      data: new movie,
    }

1.3 Update Movie
URL: /movie/:movieID
Method: PATCH
Description: Updates an existing movie.
Request Parameters:
movieID (string): The ID of the movie to update.
Request Body:
name: The title of the movie.
genre: Genres of the movie.
score: Score of the movie.
Request path:
image: The poster of the movie.
Response: {
      message: "Movie updated successfully",
      data: updated movie,
    }

1.4 Delete Movie
URL: /user/:movieID
Method: DELETE
Description: Deletes a movie from the platform.
Request Parameters:
movieID: The ID of the movie to delete.
Response: {
    message: "Movie deleted successfully"
  }

1. 👤 Users
2.1 Get All User
URL: /user
Method: GET
Description: Retrieves a list of all users available on the platform.
Response: An array of user objects.

2.2 Add a New User
URL: /user
Method: POST
Description: Adds a new user to the platform.
Request Body:
name (string): The name of the user.
email (string): The email of the user.
password (string): The password of the user.
Response: {
      msg: "All users",
      data: all users
    }

2.3 Update User
URL: /user/:userID
Method: PATCH
Description: Updates an existing user.
Request Parameters:
userID (string): The ID of the user to update.
Request Body: 
name (string): The name of the user.
email (string): The email of the user.
password (string): The password of the user.
Response: {
      msg: "User updated successfully",
      data: user updated,
      type: typeof user updated
    }

2.4 Delete User
URL: /user/:userID
Method: DELETE
Description: Deletes a user from the platform.
Request Parameters:
userID (string): The ID of the user to delete.
Response: {
      message: "User deleted successfully"
    }

1. 🏷️ Genres
3.1 Get All genre
URL: /genre
Method: GET
Description: Retrieves a list of all genres available on the platform.
Response: {
      msg: "All genres",
      data: allGenres,
      type: "array",
    }
3.2 Add a New genre
URL: /genre
Method: POST
Description: Adds a new genre to the platform.
Request Body:
name (string): The name of the genre.
Response: {
      msg: "Genre created successfully.",
      data: new genre,
      type: typeof new genre,
    }
3.3 Update genre
URL: /genre/:genreID
Method: PATCH
Description: Updates an existing genre.
Request Parameters:
genreID (string): The ID of the genre to update.
Request Body: Any fields to update in the genre object.
Response: {
        msg: "Genre updated successfully",
        data: genre updated,
        type: typeof genre updated
    }
3.4 Delete genre
URL: /genre/:genreID
Method: DELETE
Description: Deletes a genre from the platform.
Request Parameters:
genreID (string): The ID of the genre to delete.
Response: {
      message: "Genre deleted successfully"
    }



#Development #NodeJS #ExpressJS #TypeScript #MongoDB #Mongoose #Prisma #PostgreSQL #Cloudinary
