import { Request, Response } from "express";
import UserModel from "../models/user.model";
import MovieModel from "../models/movie.model";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await UserModel.find({}).populate("movies");
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await UserModel.create({ name, email, password });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateUser = async(req: Request, res: Response) => {
    const {name, email, password}= req.body
    const {userID} = req.params

    try{
        const userUpdated = await UserModel.findByIdAndUpdate({_id:userID},{name, email, password},{new:true})
        res.status(201).send(userUpdated)
    }catch(error){
        res.status(400).send(error)
    }
};

export const deleteUser = async(req: Request, res: Response) => {
    const {userID} = req.params
    try{
        const userDeleted = await UserModel.findByIdAndDelete({_id:userID})
        const userMoviesID = await userDeleted?.movies
        console.log("usermovies", userMoviesID)
        await MovieModel.deleteMany({_id: {$in: userMoviesID}})
        res.status(201).send(userDeleted)
    }catch(error){
        res.status(400).send(error)
    }
};
