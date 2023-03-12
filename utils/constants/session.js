import { SESSION_KEY } from './environment.js'

export const getSessionKey = () => {
  if (!SESSION_KEY) {
    throw new Error(`No valid Session Key string found`)
  }

  return SESSION_KEY
}
