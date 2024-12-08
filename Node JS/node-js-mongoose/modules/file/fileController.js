import fileService from './fileService'

const fileController = {
  uploadSingleFile: async (req) => {
    return await fileService.uploadSingleFile(req?.files?.image)
  },

  uploadMultipleFiles: async (req) => {
    if (!Array.isArray(req?.files?.image)) {
      return await fileService.uploadSingleFile(req?.files?.image)
    }

    return await fileService.uploadMultipleFiles(req?.files?.image)
  }
}

export default fileController
