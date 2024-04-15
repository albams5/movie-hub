import dotenv from 'dotenv'

type TConfig = {
    [key:string]: EnvironmentConfig
}

type EnvironmentConfig = {
    app: AppConfig;
    db: DBConfig;
    auth0: Auth0Config;
    cloudinary: CloudinaryConfig;
}

type AppConfig = {
    PORT: string | number
}

type DBConfig = {
    URI: string
}

type Auth0Config = {
    client_origin: string | undefined,
    audience: string | undefined,
    issuer: string | undefined
}

type CloudinaryConfig = {
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
}

if(process.env.NODE_ENV === 'production'){
    dotenv.config({path: '.env.production'})
} else {
    dotenv.config({path: '.env.development'})
}

const ENV = process.env.NODE_ENV ?? 'development'
const {
    PORT,
    MONGODB_URI,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env

// console.log({CLOUDINARY_CLOUD_NAME})
// console.log({CLOUDINARY_API_KEY})
// console.log({CLOUDINARY_API_SECRET})



const CONFIG:TConfig = {
    development: {
        app: {
            PORT: PORT || 4001
        },
        db: {
            URI: MONGODB_URI || "mongodb://127.0.0.1:27017/mobee"
        },
        auth0: {
            client_origin: process.env.APP_ORIGIN,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: process.env.AUTH0_ISSUER
        },
        cloudinary: {
            CLOUD_NAME: CLOUDINARY_CLOUD_NAME || "cloud_name",
            API_KEY: CLOUDINARY_API_KEY || "api_key",
            API_SECRET: CLOUDINARY_API_SECRET || "api_secret"
        }
    },
    production: {
        app: {
            PORT: PORT || 8081
        },
        db: {
            URI: MONGODB_URI || "mongodb://127.0.0.1:27017/mobee"
        },
        auth0: {
            client_origin: process.env.APP_ORIGIN,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: process.env.AUTH0_ISSUER
        },
        cloudinary: {
            CLOUD_NAME: CLOUDINARY_CLOUD_NAME || "cloud_name",
            API_KEY: CLOUDINARY_API_KEY || "api_key",
            API_SECRET: CLOUDINARY_API_SECRET || "api_secret"
        }
    }
}

// export const CLOUDINARY_CLOUD_NAME = process.env['CLOUDINARY_CLOUD_NAME']
// export const CLOUDINARY_API_KEY = process.env['CLOUDINARY_API_KEY']
// export const CLOUDINARY_API_SECRET = process.env['CLOUDINARY_API_SECRET']

export default CONFIG[ENV]