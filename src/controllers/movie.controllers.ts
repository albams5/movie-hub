import { Request, Response } from "express";
import prisma from "../db/client";
import { deleteImageFromCloudinary, getPublicId, uploadImageToCloudinary } from "../utils/cloudinary";

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
      type: typeof allMovies,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getMovie = async (req: Request, res: Response) => {
  const movieID = parseInt(req.params.movieID);
  try {
    const uniqueMovie = await prisma.movie.findUnique({
      where: {
        id: movieID,
      },
      include: {
        genre: true
      }
  });
    res.status(200).send({
      msg: "Selected genre",
      data: uniqueMovie,
      type: "array",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createMovie = async (req: Request, res: Response) => {
  let { name, score, genre, sinopsis } = req.body;
  const scoreToNumber = parseInt(score);
  score = scoreToNumber;
  const userID = parseInt(req.params.userID);
  const image = req.file?.path;

  if (!name || !image || !score || !genre || !sinopsis) {
    return res.status(400).send({
      message: "The fields name, image, score, sinopsis and genre are required",
    });
  }

  if (!userID) {
    return res.status(400).send({
      message: "The field userID is required",
    });
  }

  const imageUploadedToCloudinary = await uploadImageToCloudinary(image);

  try {
    const newMovie = await prisma.$transaction(async (prisma) => {
      const movie = await prisma.movie.create({
        data: {
          name,
          image: imageUploadedToCloudinary,
          score,
          userID,
          sinopsis
        },
      });

      if (genre && genre.length) {
        const genreArray = genre.split(',').map(Number);
        const createGenre = genreArray.map((genreID: number) => ({
          movieID: movie.id,
          genreID: genreID,
        }));
        await prisma.genreOnMovies.createMany({
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
      msg: "Movie create successfully",
      data: newMovie,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  let { name, score, genre, sinopsis } = req.body;
  const scoreToNumber = parseInt(score);
  score = scoreToNumber;

  const image = req.file?.path;
  const movieID = parseInt(req.params.movieID);

  if (!movieID) {
    return res.status(400).send({
      message: "The field movieID is required",
    });
  }

  const imageUploadedToCloudinary = await uploadImageToCloudinary(image);

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
          name,
          image: imageUploadedToCloudinary,
          score,
          sinopsis
        },
      });
      if (genre && genre.length > 0) {
        const genreArray = genre.split(',').map(Number);
        await prisma.genreOnMovies.deleteMany({
          where: {
            movieID: movieID,
          },
        });

        const createGenre = genreArray.map((genreID: number) => ({
          movieID: movie.id,
          genreID: genreID,
        }));

        await prisma.genreOnMovies.createMany({
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

    res.status(200).send({
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const movieID = parseInt(req.params.movieID);

  if (!movieID) {
    return res.status(400).send({
      message: "The field movieID is required",
    });
  }
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieID
      },
      include: {
        genre: true
      }
    });

    if (!movie) {
      return res.status(404).send({
        message: "Movie not found"
      });
    }


  await deleteImageFromCloudinary(getPublicId(movie?.image))

  const deletedMovie = await prisma.$transaction(async (prisma) => {
    await prisma.genreOnMovies.deleteMany({
      where: {
        movieID: movieID
      }
    });
    const deletedMovie = await prisma.movie.delete({
      where: {
        id: movieID
      }
    });
    return prisma.movie.findUnique({
      where: {
        id: movieID
      },
      include: {
        genre: true
      }
    });
  });

  res.status(200).send({
    message: "Movie deleted successfully",
    data: deletedMovie
  });
} catch (error) {
  res.status(400).send(error);
}
};
