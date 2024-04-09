import { Request, Response } from "express";
import MovieModel from "../models/movie.model";
import UserModel from "../models/user.model";
import GenreModel from "../models/genre.model"

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const allMovies = await MovieModel.find({}).populate("genre");
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
  try {
    const newMovie = await MovieModel.create({ name, image, score, genre });
    await UserModel.findByIdAndUpdate(
        { _id: userID },
        { $push: {movies: newMovie._id}}
        );
    
    await GenreModel.updateMany({'_id': newMovie.genre }, {$push: {movies: newMovie._id}})
    res.status(201).send({
      msg: "Movie created successfully",
      data: newMovie,
      type: typeof newMovie
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateMovie = async(req: Request, res: Response) => {
  const {name, image, score, genre} = req.body
  const {movieID} = req.params
 
  try{
    const movieUpdated = await MovieModel.findByIdAndUpdate({_id:movieID},{name, image, score, genre},{new:true})
    res.status(200).send({
      msg: "Movie updated successfully",
      data: movieUpdated,
      type: typeof movieUpdated
    })

  }catch(error){
    res.status(400).send(error)
  }
};

export const deleteMovie = async(req: Request, res: Response) => {
  const {movieID} = req.params
    try{
        const movieDeleted = await MovieModel.findByIdAndDelete({_id:movieID})
        await GenreModel.updateMany({'_id': movieDeleted?.genre}, {$pull: {movies: movieDeleted?._id}})
        res.status(200).send({
          msg: "Movie deleted successfully",
          data: movieDeleted,
          type: typeof movieDeleted
        })
    }catch(error){
        res.status(400).send(error)
    }
};
