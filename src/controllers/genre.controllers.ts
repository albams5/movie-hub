import { Request, Response } from "express";
import prisma from "../db/client";

export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const allGenres = await prisma.genre.findMany({});
    res.status(200).send({
      msg: "All genres",
      data: allGenres,
      type: "array",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
export const createGenre = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: "The field name is required" });
  }

  try {
    const newGenre = await prisma.genre.create({
      data: { name },
    });
    res.status(201).send({
      msg: "Genre created successfully.",
      data: newGenre,
      type: typeof newGenre,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  const { name } = req.body;
  const genreID = parseInt(req.params.genreID);

  if (!name) {
    return res.status(400).send({ message: "The field name is required" });
  }

  try {
    const genreUpdated = await prisma.genre.update({
      where: { id: genreID },
      data: { name },
    });
    res.status(201).send({
        msg: "Genre updated successfully",
        data: genreUpdated,
        type: typeof genreUpdated
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  const genreID = parseInt(req.params.genreID);

  if (!genreID) {
    return res.status(400).send({
      message: "The field genreID is required",
    });
  }

  try {
    const genre = await prisma.genre.findUnique({
      where: {
        id: genreID,
      },
    });

    if (!genre) {
      return res.status(404).send({
        message: "Genre not found",
      });
    }

    const deletedGenre = await prisma.$transaction(async (prisma) => {
      await prisma.genreOnMovies.deleteMany({
        where: {
          genreID: genreID,
        },
      });

      const deletedGenre = await prisma.genre.delete({
        where: {
          id: genreID,
        },
      });

      return prisma.genre.findUnique({
        where: {
          id: genreID,
        },
      });
    });

    res.status(200).send({
      message: "Genre deleted successfully",
      data: deletedGenre,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
