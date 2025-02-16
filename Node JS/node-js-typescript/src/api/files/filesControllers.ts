import type { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS } from '~/global/constants/httpStatus.ts'
import filesServices from './filesServices.ts'

const filesControllers = {
  uploadImage: async (req: Request, res: Response) => {
    const data = await filesServices.uploadImage(req)

    res.status(HTTP_STATUS.SUCCESS.CREATED).json({ data, message: 'Upload image successfully' })
  }
}

export default filesControllers
