import express, { Express } from 'express'
import userRoutes from './routes/user.routes';
import movieRoutes from './routes/movie.routes';
import genreRoutes from './routes/genre.routes';
import cors from 'cors'
import errorHandler from './middlewares/error.middleware';
import { requestRouter } from './routes/requests.routes';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';



const app: Express = express();


app.use(helmet())
app.use(json())
app.use(urlencoded({ extended: true }));

app.use(morgan('tiny'))

app.use(cors({
  }));


app.use("/user", userRoutes)
app.use("/movie", movieRoutes)
app.use("/genre", genreRoutes)
app.use(errorHandler)

app.use("/public", requestRouter)


export default app

