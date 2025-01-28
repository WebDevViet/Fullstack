import mongoose from 'mongoose'
import MongooseDelete from 'mongoose-delete'
const Schema = mongoose.Schema

import { AddressSchema } from './subModels/addressModel'

// validate/shape data
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100
    },
    phone: {
      type: String,
      match: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/ // regex sync Joi
    },
    email: {
      required: true,
      type: String,
      match:
        /(([^<>()\[\]\\.,;:\s+@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gm
    },
    image: {
      type: String, // lưu đường dẫn
      trim: true
    },
    address: AddressSchema, // nhúng schema - max 100
    blogs: [{ type: Schema.Types.ObjectId, ref: 'blog' }], // max 1000
    groups: [{ type: Schema.Types.ObjectId, ref: 'group' }]
  },
  { timestamps: true }
)

// kết nối schema với document ở DB
const User = mongoose.model(
  'user',
  UserSchema.plugin(MongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    indexFields: ['deleted']
  })
)

export default User
