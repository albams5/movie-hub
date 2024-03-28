import { Request, Response } from "express";
import prisma from "../db/client";

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const allMovies = await prisma.movie.findMany({
      include:{
        genre: true
      }
    });
    res.status(201).send(allMovies);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createMovie = async (req: Request, res: Response) => {
  const { name, image, score, genre } = req.body;
  const { userID } = req.params;
  try {
    const newMovie = await prisma.movie.create({
      data:{ name, image, score, genre, user: {connect: {id:userID}} }
    });
    res.status(201).send(newMovie);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateMovie = async(req: Request, res: Response) => {
  const {name, image, score, genre} = req.body
  const {movieID} = req.params
  try{
    const movieUpdated = await prisma.movie.update({
      where: {id:movieID},
      data:{name, image, score, genre}
    })
    res.status(201).send(movieUpdated)

  }catch(error){
    res.status(400).send(error)
  }
};

export const deleteMovie = async(req: Request, res: Response) => {
  const {movieID} = req.params
    try{
        const movieDeleted = await prisma.movie.delete({
          where:{id:movieID}
        })
        res.status(201).send(movieDeleted)
    }catch(error){
        res.status(400).send(error)
    }
};
