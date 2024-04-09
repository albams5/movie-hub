import { Request, Response } from "express"
import GenreModel from '../models/genre.model'

export const getAllGenres = async(req:Request, res: Response) => {
    try{
        const allGenres = await GenreModel.find({})
        res.status(200).send({
            msg: "All genres",
            data: allGenres,
            type: typeof allGenres
        })
    }catch(error){
        res.status(400).send(error)
    }
}
export const createGenre = async(req:Request, res: Response) => {
    const {name} = req.body
    try{
        const newGenre = await GenreModel.create({name})

        res.status(201).send({
            msg: "New genre created successfully",
            data: newGenre,
            type: typeof newGenre
        })
    }catch(error){
        res.status(400).send(error)
    }
}

export const updateGenre = async(req:Request, res: Response) => {
    const {name} = req.body
    const {genreID} = req.params
    try{
        const genreUpdated = await GenreModel.findByIdAndUpdate({_id:genreID}, {name}, {new:true})
        res.status(200).send({
            msg: "Genre updated successfully",
            data: genreUpdated,
            type: typeof genreUpdated
        })

    }catch(error){
        res.status(400).send(error)
    }
}

export const deleteGenre = async(req:Request, res: Response) => {
    const {genreID} = req.params
    try{
        const genreDeleted = await GenreModel.findByIdAndDelete({_id:genreID})
        res.status(200).send({
            msg: "Genre deleted successfully",
            data: genreDeleted,
            type: typeof genreDeleted
        })
    }catch(error){
        res.status(400).send(error)
    }
}