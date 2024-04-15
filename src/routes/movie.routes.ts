import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  updateMovie,
} from "../controllers/movie.controllers";
import { checkJwtMiddleware } from "../middlewares/checkJwt_middleware";
import multerCloudinaryConnect from '../utils/multer-cloudinary'

const movieRoutes: Router = Router();

// const upload = multer({dest: 'uploads/'})

movieRoutes.get("/", 
// checkJwtMiddleware, 
getAllMovies);

movieRoutes.post("/:userID", multerCloudinaryConnect.single("image"), createMovie);

movieRoutes.patch("/:movieID", multerCloudinaryConnect.single("image"), updateMovie);

movieRoutes.delete("/:movieID", deleteMovie);

export default movieRoutes;
