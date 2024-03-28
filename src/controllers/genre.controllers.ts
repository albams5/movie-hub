import { Request, Response } from "express"
import GenreModel from '../models/genre.model'
import MovieModel from "../models/movie.model"
import prisma from "../db/client"

export const getAllGenres = async(req:Request, res: Response) => {
    try{
        const allGenres = await prisma.genre.findMany({})
        res.status(200).send(allGenres)
    }catch(error){
        res.status(400).send(error)
    }
}
export const createGenre = async(req:Request, res: Response) => {
    const {name} = req.body
    const {movieID} = req.params
    try{
        const newGenre = await prisma.genre.create({
            data: {name, movie: {connect: {id:movieID}}}
        })
        res.status(201).send(newGenre)
    }catch(error){
        res.status(400).send(error)
    }
}

export const updateGenre = async(req:Request, res: Response) => {
    const {name} = req.body
    const {genreID} = req.params
    try{
        const genreUpdated = await prisma.genre.update({
            where: {id:genreID},
            data: {name}
        })
        res.status(201).send(genreUpdated)

    }catch(error){
        res.status(400).send(error)
    }
}

export const deleteGenre = async(req:Request, res: Response) => {
    const {genreID} = req.params
    try{
        const genreDeleted = await prisma.genre.delete({
            where: {id:genreID}
        })
        res.status(201).send(genreDeleted)
    }catch(error){
        res.status(400).send(error)
    }
}