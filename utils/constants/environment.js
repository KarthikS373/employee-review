import dotenv from 'dotenv'

dotenv.config()

export const { PORT } = process.env
export const { MONGO_URI } = process.env
export const { SESSION_KEY } = process.env
