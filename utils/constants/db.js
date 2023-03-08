import { MONGO_URI } from './environment'

export const getMongoURI = () => {
  if (!MONGO_URI) {
    throw new Error(`No valid Database connection string found`)
  }

  return MONGO_URI
}
