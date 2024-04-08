import { Request, Response } from "express";
import prisma from "../db/client";

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const allMovies = await prisma.movie.findMany({
      include: {
        genre: true,
      },
    });
    res.status(201).send({
      msg: "All movies",
      data: allMovies,
      type: typeof allMovies
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createMovie = async (req: Request, res: Response) => {
  const { name, image, score, genre } = req.body;
  const { userID } = req.params;

  if (!name || !image || !score || !genre) {
    return res.status(400).send({
      message: "The fields name, image, score and genre are required",
    });
  }

  if (!userID) {
    return res.status(400).send({
      message: "The field userID is required",
    });
  }

  try {
    const newMovie = await prisma.$transaction(async (prisma) => {
      const movie = await prisma.movie.create({
        data: { name, image, score, userID },
      });
      if (genre && genre.length > 0) {
        const createGenre = genre.map((genreID: number) => ({
          movieID: movie.id,
          genreID: genre.id,
        }));
        await prisma.movieGenre.createMany({
          data: createGenre,
        });
      }
      return prisma.movie.findUnique({
        where: {
          id: movie.id,
        },
        include: {
          genre: true,
        },
      });
    });
    res.status(201).send({
      msg: "Movie created successfully",
      data: newMovie,
      type: typeof newMovie,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  const { name, image, score, genre } = req.body;
  const { movieID } = req.params;

  if (!movieID) {
    return res.status(400).send({
      message: "The field movieID is required",
    });
  }

  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieID,
      },
      include: {
        genre: true,
      },
    });

    if (!movie) {
      return res.status(404).send({
        message: "Movie not found",
      });
    }

    const updatedMovie = await prisma.$transaction(async (prisma) => {
      const updatedMovie = await prisma.movie.update({
        where: {
          id: movieID,
        },
        data: {
          name: name,
          image: image,
          score: score,
        },
      });

      if (genre && genre.length > 0) {
        await prisma.movieGenre.deleteMany({
          where: {
            movieID: movieID,
          },
        });

        const createGenre = genre.map((genreID: number) => ({
          movieID: movieID,
          genreID: genreID,
        }));

        await prisma.movieGenre.createMany({
          data: createGenre,
        });
      }
      return prisma.movie.findUnique({
        where: {
          id: movieID,
        },
        include: {
          genre: true,
        },
      });
    });
    res.status(200).send({
      message: "Movie updated successfully",
      data: updatedMovie,
      type: typeof updatedMovie,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { movieID } = req.params;

  if (!movieID) {
    return res.status(400).send({
      message: "The field movieID is required",
    });
  }

  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieID,
      },
      include: {
        genre: true,
      },
    });

    if (!movie) {
      return res.status(400).send({
        message: "Movie not found",
      });
    }

    const deletedMovie = await prisma.$transaction(async (prisma) => {
      await prisma.movieGenre.deleteMany({
        where: {
          movieID: movieID,
        },
      });

      const deletedMovie = await prisma.movie.delete({
        where: {
          id: movieID,
        },
      });

      return prisma.movie.findUnique({
        where: {
          id: movieID,
        },
        include: {
          genre: true,
        },
      });
    });
    res.status(201).send({
      message: "Movie deleted successfully",
      data: deletedMovie,
      type: typeof deletedMovie,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
