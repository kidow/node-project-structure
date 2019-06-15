require('dotenv').config()

import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import v1Route from './routes/v1'
// import indexRouter from './routes'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/v1', v1Route)
// app.use('/', indexRouter)

app.use((req, res, next) => next(createError(404)))

app.use((err, req, res, next) => {
  let apiError = err

  if (!err.status) apiError = createError(err)

  res.locals.message = apiError.message
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {}

  res.status(apiError.status).json({ message: apiError.message })

  // res.locals.message = err.message
  // res.locals.error = process.env.NODE_ENV === 'development' ? err : {}

  // res.status(err.status || 500).json(res.locals.error)
})

module.exports = app
