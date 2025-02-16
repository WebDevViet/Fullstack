import type { Request, Response } from 'express'
import formidable from 'formidable'

const mediasControllers = {
  uploadImage: (req: Request, res: Response) => {
    const form = formidable({
      uploadDir: './public/images/uploads',
      maxFiles: 1,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024 // 5mb
    })

    form.parse(req, (err, fields, files) => {
      if (err) throw err

      return res.status(200).json({ fields, files })
    })
  }
}

export default mediasControllers
