import bodyParser from 'body-parser'
import Express, { static as serveStaticFiles } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

import router from './routes/index.js'
import { getMongoURI } from './utils/constants/db.js'
import { getPort } from './utils/constants/port.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const app = Express()

const PORT = getPort()
const MONGO_URI = getMongoURI()

// Parsers
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Serving static files
app.use(serveStaticFiles('public'))

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', `${dirname}/views/pages`)

// Route handling
app.use('/', router)

// Error handling
// Error 500 - Internal Server Error
app.use((error, req, res, next) => {
  console.log(`Internal Server Error: ${error.message}`)
  res.render('500')
})

// 404 page
app.use((req, res) => {
  res.render('404')
})

// Create DB connection and start the server
const main = async () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(`Mongo Connection successful`)
      app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`)
      })
    })
    .catch((e) => {
      console.log(`Something went wrong...`)
    })
}

main().catch(() => {
  console.log('An error occured...')
  process.exit(1)
})
