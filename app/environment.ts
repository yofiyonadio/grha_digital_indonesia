import { config } from 'dotenv'
import { Utils } from './registry'

config()

export const DB_USER = process.env.DB_USER

export const DB_HOST = process.env.DB_HOST

export const DB_NAME = process.env.DB_NAME

export const DB_PASSWORD = process.env.DB_PASSWORD

export const DB_PORT = Utils.toNumber(process.env.DB_PORT)

export const DB_MIGRATE = process.env.DB_MIGRATE

export const DB_MIGRATE_CLEAN = process.env.DB_MIGRATE_CLEAN

export const APP_PORT = process.env.APP_PORT

export const APP_API_URL = process.env.APP_API_URL

export const JWT_SECRET = process.env.JWT_SECRET as string

export const APP_ORIGIN = process.env.APP_ORIGIN