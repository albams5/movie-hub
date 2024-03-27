import dotenv from 'dotenv'

type TConfig = {
    [key:string]: EnvironmentConfig
}

type EnvironmentConfig = {
    app: AppConfig,
    db: DBConfig
}

type AppConfig = {
    PORT: string | number
}

type DBConfig = {
    URI: string
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
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 8081
        },
        db: {
            URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mobee"
        }
    }
}

export default CONFIG[ENV]