import { Router } from "express";
import {
  createGenre,
  deleteGenre,
  getAllGenres,
  getGenre,
  updateGenre,
} from "../controllers/genre.controllers";

const genreRoutes: Router = Router();

genreRoutes.get("/", getAllGenres);

genreRoutes.get("/:genreID", getGenre)

genreRoutes.post("/", createGenre);

genreRoutes.patch("/:genreID", updateGenre);

genreRoutes.delete("/:genreID", deleteGenre);

export default genreRoutes;
