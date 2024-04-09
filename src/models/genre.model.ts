import {Schema, model} from 'mongoose'

interface IGenreModel {
    name: String,
    createAt?: Date,
    updateAt?: Date
}

const genreSchema = new Schema<IGenreModel> ({
    name:{
        type: String,
        required: true,
        movies: [
            {
                type: Schema.Types.ObjectId,
                ref: "Movie"
            }
        ]
    }
},{timestamps: true})

const GenreModel = model<IGenreModel>("Genre", genreSchema)

export default GenreModel