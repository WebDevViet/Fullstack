import cookieParser from 'cookie-parser'
import express from 'express'
import { expressJoiValidations } from 'express-joi-validations'
import logger from 'morgan'
import path from 'path'

import apiRoutes from './api/apiRoutes.ts'
import { errorHandler, notFound } from './core/middlewares/appMiddlewares.ts'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(expressJoiValidations({ throwErrors: true }))

// Transform response keys to camelCase

app.use('/api', apiRoutes)

// catch 404 and forward to error handler
app.use(notFound)

// error handler
app.use(errorHandler)

export default app
