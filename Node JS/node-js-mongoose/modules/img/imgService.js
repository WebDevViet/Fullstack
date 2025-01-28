import { customAlphabet } from 'nanoid'
import path from 'node:path'
import { STATUS } from '../../constants'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789')

const imgService = {
  async uploadImg(fileObj) {
    const newFileName = nanoid() + path.extname(fileObj.name)
    const uploadPath = path.join(process.cwd(), 'public/images/uploads', newFileName)

    try {
      await fileObj.mv(uploadPath)
      return {
        status: STATUS.OK,
        response: {
          message: 'File uploaded successfully',
          originalName: fileObj.name,
          filename: newFileName,
          location: `${process.env.BASE_URL}/images/uploads/${newFileName}`
        }
      }
    } catch (error) {
      throw error
    }
  },

  async uploadListImg(files) {
    const uploadDir = path.join(process.cwd(), 'public/images/uploads')
    const filenames = files.map((file) => nanoid() + path.extname(file.name))
    const uploadPaths = filenames.map((filename) => path.join(uploadDir, filename))

    try {
      await Promise.all(files.map((file, index) => file.mv(uploadPaths[index])))
      return {
        status: STATUS.OK,
        response: {
          message: 'Files uploaded successfully',
          imgs: files.map((file, index) => {
            return {
              originalName: file.name,
              filename: filenames[index],
              location: `${process.env.BASE_URL}/images/uploads/${filenames[index]}`
            }
          })
        }
      }
    } catch (error) {
      throw error
    }
  }
}

export default imgService
