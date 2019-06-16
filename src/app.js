require('dotenv').config()

import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import response from './utils/response'
import v1Route from './routes/v1'
import jwtMiddleware from './middlewares/jwt.middleware'
import { stream } from './configs/winston'

const app = express()

app.use(morgan('combined', { stream }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(jwtMiddleware)
app.use('/v1', v1Route)

app.use((req, res, next) => next(createError(404)))

app.use((err, req, res, next) => {
  let apiError = err

  if (!err.status) apiError = createError(err)

  if (process.env.NODE_ENV === 'test') {
    const errObj = {
      req: {
        headers: req.headers,
        query: req.query,
        body: req.body,
        route: req.route
      },
      error: {
        message: apiError.message,
        stack: apiError.stack,
        status: apiError.status
      },
      user: req.user
    }

    logger.error(`${moment().format('YYYY-MM-DD HH:mm:ss')}`, errObj)
  } else {
    res.locals.message = apiError.message
    res.locals.error = apiError
  }

  return response(
    res,
    {
      message: apiError.message
    },
    apiError.status
  )
})

module.exports = app
