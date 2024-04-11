import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  updateMovie,
} from "../controllers/movie.controllers";
import { checkJwtMiddleware } from "../middlewares/checkJwt_middleware";
import multer from 'multer'

const movieRoutes: Router = Router();

const upload = multer({dest: 'uploads/'})

movieRoutes.get("/", checkJwtMiddleware, getAllMovies);

movieRoutes.post("/:userID", upload.single("image"), createMovie);

movieRoutes.patch("/:movieID", updateMovie);

movieRoutes.delete("/:movieID", deleteMovie);

export default movieRoutes;
