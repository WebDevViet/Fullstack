import mongoose from 'mongoose'
import { TOKEN_TYPE } from '../constants.js'

const blackListTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true
    },
    type: {
      type: String,
      enum: [TOKEN_TYPE.ACCESS_TOKEN, TOKEN_TYPE.REFRESH_TOKEN],
      required: true
    }
  },
  { timestamps: true }
)

const BlackListToken = mongoose.model('black_list_token', blackListTokenSchema)

export default BlackListToken
