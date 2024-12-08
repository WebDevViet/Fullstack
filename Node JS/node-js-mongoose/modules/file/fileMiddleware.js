import { STATUS } from '../../constants'

const fileMiddleware = (req, res, next) => {
  const uploadedFiles = req.files?.image

  if (!uploadedFiles) {
    return res.status(STATUS.BAD_REQUEST).json({ message: 'No files were uploaded.' })
  }

  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp']

  const isFileArray = Array.isArray(uploadedFiles)
  const filesArray = isFileArray ? uploadedFiles : [uploadedFiles]
  const validFiles = filesArray.every((file) => validTypes.includes(file.mimetype))

  if (!validFiles) {
    return res.status(STATUS.BAD_REQUEST).json({ message: 'Invalid file type' })
  }

  next()
}

export default fileMiddleware
