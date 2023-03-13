import bodyParser from 'body-parser'
import mongoStore from 'connect-mongo'
import Express, { static as serveStaticFiles } from 'express'
import session from 'express-session'
import flash from 'modern-flash'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

import adminAuth from './middlewares/adminAuth.js'
import adminRouter from './routes/admin.js'
import employeeRouter from './routes/employee.js'
import router from './routes/index.js'
import { getMongoURI } from './utils/constants/db.js'
import { getPort } from './utils/constants/port.js'
import { getSessionKey } from './utils/constants/session.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const app = Express()

const PORT = getPort()
const MONGO_URI = getMongoURI()
const SESSION_KEY = getSessionKey()

// Admin Account
// admin@gmail.com
// password : 123567

// Mongo DB Session
const sessionStorage = mongoStore.create({
  mongoUrl: MONGO_URI,
  collection: session,
  ttl: 60 * 60,
  autoRemove: 'native',
})

// Parsers
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Serving static files
app.use(serveStaticFiles('public'))

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', `${dirname}/views/pages`)

// Session Creation
// app.set('trust proxy', 1)
app.use(
  session({
    secret: SESSION_KEY,
    resave: false,
    name: 'Employee Session',
    saveUninitialized: false,
    cookie: { maxAge: 100000 * 60 * 30 * 60 },
    store: sessionStorage,
  })
)

// Flash
app.use(flash())

// Route handling

app.use('/', router)
app.use('/admin', adminAuth, adminRouter)
app.use('/employee', employeeRouter)

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
