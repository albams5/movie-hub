import { Router, Request, Response } from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  updateMovie,
} from "../controllers/movie.controllers";

const movieRoutes: Router = Router();

movieRoutes.get("/", getAllMovies);

movieRoutes.post("/:userID", createMovie);

movieRoutes.patch("/:movieID", updateMovie);

movieRoutes.delete("/:movieID", deleteMovie);

export default movieRoutes;
