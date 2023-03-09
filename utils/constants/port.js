import { PORT } from './environment.js'

export const getPort = () => {
  if (!PORT) {
    throw new Error(`No valid Database connection string found`)
  }

  return PORT
}
