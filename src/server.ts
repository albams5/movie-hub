import express, { Express } from 'express'
import userRoutes from './routes/user.routes';
import movieRoutes from './routes/movie.routes';
import genreRoutes from './routes/genre.routes';

const app: Express = express();
const morgan = require('morgan')
const helmet = require('helmet')

app.use(helmet())
app.use(express.json()) 
app.use(morgan('tiny'))


app.use("/user", userRoutes)
app.use("/movie", movieRoutes)
app.use("/genre", genreRoutes)

export default app