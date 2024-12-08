import path from 'node:path'
import { STATUS } from '../../constants'
import { addTimestampFile, addTimestampFiles } from '../../utils/editFile'

const fileService = {
  async uploadSingleFile(fileObj) {
    const fileHasTimestamp = addTimestampFile(fileObj.name)
    const uploadPath = path.join(process.cwd(), 'public/images/uploads', fileHasTimestamp)

    try {
      await fileObj.mv(uploadPath)
      return {
        status: STATUS.OK,
        response: {
          message: 'Upload file successfully',
          location: `${process.env.BASE_URL}/images/uploads/${fileHasTimestamp}`
        }
      }
    } catch (error) {
      throw {
        status: STATUS.INTERNAL_SERVER_ERROR,
        response: {
          message: 'Upload file failed'
        },
        error
      }
    }
  },

  async uploadMultipleFiles(files) {
    const filesHasTimestamp = addTimestampFiles(files)
    const uploadPath = path.join(process.cwd(), 'public/images/uploads')
    const listUploadPaths = filesHasTimestamp.map((fileName) => path.join(uploadPath, fileName))
    try {
      await Promise.all(files.map((file, index) => file.mv(listUploadPaths[index])))
      return {
        status: STATUS.OK,
        response: {
          message: 'Upload files successfully',
          locations: filesHasTimestamp.map((fileName) => `${process.env.BASE_URL}/images/uploads/${fileName}`)
        }
      }
    } catch (error) {
      throw {
        status: STATUS.INTERNAL_SERVER_ERROR,
        response: {
          message: 'Upload files failed'
        },
        error
      }
    }
  }
}

export default fileService
