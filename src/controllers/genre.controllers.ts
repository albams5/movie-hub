import { Request, Response } from "express"
import GenreModel from '../models/genre.model'
import MovieModel from "../models/movie.model"

export const getAllGenres = async(req:Request, res: Response) => {
    try{
        const allGenres = await GenreModel.find({})
        res.status(200).send(allGenres)
    }catch(error){
        res.status(400).send(error)
    }
}
export const createGenre = async(req:Request, res: Response) => {
    const {name} = req.body
    const {movieID} = req.params
    try{
        const newGenre = await GenreModel.create({name})
        await MovieModel.findByIdAndUpdate(
            {_id: movieID},
            {$push: {genre: newGenre._id}}
        )
        res.status(201).send(newGenre)
    }catch(error){
        res.status(400).send(error)
    }
}

export const updateGenre = async(req:Request, res: Response) => {
    const {name} = req.body
    const genreID = req.params
    try{
        const genreUpdated = await GenreModel.findByIdAndUpdate({_id:genreID}, {name}, {new:true})
        res.status(201).send(genreUpdated)

    }catch(error){
        res.status(400).send(error)
    }
}

export const deleteGenre = async(req:Request, res: Response) => {
    const {genreID} = req.params
    try{
        const genreDeleted = await GenreModel.findByIdAndDelete({_id:genreID})
        res.status(201).send(genreDeleted)
    }catch(error){
        res.status(400).send(error)
    }
}