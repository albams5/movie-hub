import { Request, Response } from "express";
import prisma from "../db/client";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        movies: {
          include: {
            genre: true,
          },
        },
      },
    });
    res.status(200).send({
      msg: "All users",
      data: allUsers,
      type: "array",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ message: "The fields name, email and password are required" });
  }

  try {
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    res.status(201).send({
      msg: "User created successfully",
      data: newUser,
      type: typeof newUser,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userID = parseInt(req.params.userID);

  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ message: "The fields name, email and password are required" });
  }

  try {
    const userUpdated = await prisma.user.update({
      where: { id: userID },
      data: { name, email, password },
    });
    res.status(201).send({
      msg: "User updated successfully",
      data: userUpdated,
      type: typeof userUpdated
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userID = parseInt(req.params.userID);

  if (!userID) {
    return res.status(400).send({
      message: "The field userID is required",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
      include: {
        movies: {
          include: {
            genre: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const genreOnMoviesToDelete = user.movies.flatMap((movie) =>
      movie.genre.map((genre) => ({
        movieID: movie.id,
        genreID: genre.genreID,
      }))
    );

    await prisma.genreOnMovies.deleteMany({
      where: {
        OR: genreOnMoviesToDelete,
      },
    });

    const deletedMovies = await prisma.movie.deleteMany({
      where: {
        userID: userID,
      },
    });

    const deletedUser = await prisma.user.delete({
      where: {
        id: userID,
      },
    });

    res.status(200).send({
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
