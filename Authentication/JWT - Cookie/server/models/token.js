import mongoose from 'mongoose'
import { TOKEN_TYPE } from '../constants.js'

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: [TOKEN_TYPE.ACCESS_TOKEN, TOKEN_TYPE.REFRESH_TOKEN],
      required: true
    }
  },
  { timestamps: true }
)

const Token = mongoose.model('token', tokenSchema)

export default Token
