import express, { Express } from 'express'
import userRoutes from './routes/user.routes';
import movieRoutes from './routes/movie.routes';
import genreRoutes from './routes/genre.routes';
import { checkJwtMiddleware } from './middlewares/checkJwt_middleware';
import cors from 'cors'
import errorHandler from './middlewares/error.middleware';
import { requestRouter } from './routes/requests.routes';
// import fileUpload from 'express-fileupload'
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';



const app: Express = express();


app.use(helmet())
// app.use(express.json())
app.use(json())
app.use(urlencoded({ extended: true }));

app.use(morgan('tiny'))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));


app.use("/user", userRoutes)
app.use("/movie", movieRoutes)
app.use("/genre", genreRoutes)
app.use(errorHandler)

app.use("/public", requestRouter)

// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: './uploads'
// }))

export default app

