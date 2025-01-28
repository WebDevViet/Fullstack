import cookieParser from 'cookie-parser'
import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import path from 'path'

import indexRouter from './routes/index'
import fileUpload from 'express-fileupload'
import omitEmpty from 'omit-empty'

const app = express()

// config file upload
app.use(
  fileUpload({
    limits: { fileSize: 1024 * 1024 * 5 }, // giới hạn kích thước file là 5MB
    abortOnLimit: true,
    limitHandler: (req, res) => {
      res.status(400).json({ message: 'File size too large' })
    },
    useTempFiles: true,
    tempFileDir: '/tmp/'
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const removeEmptyProperties = (req, res, next) => {
  req.body = omitEmpty(req.body)
  req.params = omitEmpty(req.params)
  req.query = omitEmpty(req.query)
  next()
}

app.use(removeEmptyProperties)

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler api

app.use((err, req, res, next) => {
  // Send error response
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  })
})

// error handler views
// app.use(function (err, req, res, next) {
//   console.log('🚀 ~ err:', err)
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })

export default app
