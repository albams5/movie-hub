import {Schema, model} from 'mongoose'

interface IMovieModel {
    name: String,
    image: String,
    score: Number,
    genre?: string[],
    createAt?: Date,
    updateAt?: Date
}

const movieSchema = new Schema<IMovieModel> ({
    name:{
        type: String,
        unique: true,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    genre: [{
        type: Schema.Types.ObjectId, ref:"Genre"
    }]
},{timestamps: true})

const MovieModel = model<IMovieModel>("Movie", movieSchema)

export default MovieModel