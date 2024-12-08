import fileService from '../file/fileService'

const customerController = {
  createCustomer: async (req) => {
    if (req.files && Object.keys(req.files).length !== 0) {
      const { response } = await fileService.uploadSingleFile(req?.files?.image)
    }
  }
}

export default customerController
