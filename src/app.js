require('dotenv').config()

import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import response from './utils/response'
import v1Route from './routes/v1'
import jwtMiddleware from './middlewares/jwt.middleware'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(jwtMiddleware)
app.use('/v1', v1Route)

app.use((req, res, next) => next(createError(404)))

app.use((err, req, res, next) => {
  let apiError = err

  if (!err.status) apiError = createError(err)

  res.locals.message = apiError.message
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {}

  return response(
    res,
    {
      message: apiError.message
    },
    apiError.status
  )
})

module.exports = app
