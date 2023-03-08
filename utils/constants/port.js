import { PORT } from './environment'

export const getPort = () => {
  if (!PORT) {
    throw new Error(`No valid Database connection string found`)
  }

  return PORT
}
