import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
  updateMovie,
} from "../controllers/movie.controllers";
import { checkJwtMiddleware } from "../middlewares/checkJwt_middleware";
import multerCloudinaryConnect from '../utils/multer-cloudinary'

const movieRoutes: Router = Router();

// const upload = multer({dest: 'uploads/'})

movieRoutes.get("/", 
//  checkJwtMiddleware, 
getAllMovies);

movieRoutes.get("/:movieID", getMovie)

movieRoutes.post("/:userID",
checkJwtMiddleware,
multerCloudinaryConnect.single("image"),
createMovie);

movieRoutes.patch("/:movieID",
checkJwtMiddleware,
multerCloudinaryConnect.single("image"), updateMovie);

movieRoutes.delete("/:movieID",
checkJwtMiddleware,
deleteMovie);

export default movieRoutes;
