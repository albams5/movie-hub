import { Router, Request, Response } from "express";
import {
  createGenre,
  deleteGenre,
  getAllGenres,
  updateGenre,
} from "../controllers/genre.controllers";

const genreRoutes: Router = Router();

genreRoutes.get("/", getAllGenres);

genreRoutes.post("/", createGenre);

genreRoutes.patch("/:genreID", updateGenre);

genreRoutes.delete("/:genreID", deleteGenre);

export default genreRoutes;
