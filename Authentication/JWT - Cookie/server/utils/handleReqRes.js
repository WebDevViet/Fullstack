import Iron from '@hapi/iron'

const ironKey = process.env.IRON_SECRET_KEY

import { configJWT } from '../config.js'
import { STATUS } from '../constants.js'

const handleReq = () => {}

export const handleReqRes = (controller) => async (req, res) => {
  console.log(req.path)

  try {
    if (req.cookies.token) {
      // khi đã đăng nhập (có token) => giải mã token
      req.cookies.token = await Iron.unseal(req.cookies.token, ironKey, Iron.defaults)

      // check vào db xem có nằm trong blacklist hay ko
      // nếu có => throw 401 - do token đã bị thu hồi
    }

    // req

    const resData = await controller(req, res)

    // res
    if (resData.token) {
      // Mã hoá token
      const tokenSealed = await Iron.seal(resData.token, ironKey, Iron.defaults)

      res.cookie('token', tokenSealed, {
        httpOnly: true,
        maxAge: configJWT.JWT_EXP_REFRESH_TOKEN * 10000,
        sameSite: 'none',
        secure: true
      })
    }
    res.status(resData.status).json(resData.response)
  } catch (err) {
    // write log in db
    console.log('🚀 ~ handleReqRes ~ err:', err)
    if (err.isBoom) {
      // lỗi khi
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    }

    res.status(err.status).json(err.response)
  }
}
