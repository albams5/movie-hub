import dotenv from 'dotenv'

type TConfig = {
    [key:string]: EnvironmentConfig
}

type EnvironmentConfig = {
    app: AppConfig,
    db: DBConfig,
    auth0: auth0Config
}

type AppConfig = {
    PORT: string | number
}

type DBConfig = {
    URI: string
}

type auth0Config = {
    client_origin: string | undefined,
    audience: string | undefined,
    issuer: string | undefined
}

if(process.env.NODE_ENV === 'production'){
    dotenv.config({path: '.env.production'})
} else {
    dotenv.config({path: '.env.development'})
}

const ENV = process.env.NODE_ENV ?? 'development'

const CONFIG:TConfig = {
    development: {
        app: {
            PORT: process.env.PORT || 4001
        },
        db: {
            URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mobee"
        },
        auth0: {
            client_origin: process.env.APP_ORIGIN,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: process.env.AUTH0_ISSUER
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 8081
        },
        db: {
            URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mobee"
        },
        auth0: {
            client_origin: process.env.APP_ORIGIN,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: process.env.AUTH0_ISSUER
        }
    }
}

export const CLOUDINARY_CLOUD_NAME = process.env['CLOUDINARY_CLOUD_NAME']
export const CLOUDINARY_API_KEY = process.env['CLOUDINARY_API_KEY']
export const CLOUDINARY_API_SECRET = process.env['CLOUDINARY_API_SECRET']

export default CONFIG[ENV]