import mongoose from 'mongoose'
import MongooseDelete from 'mongoose-delete'

const Schema = mongoose.Schema

export const AddressSchema = new Schema({
  zip_code: String,
  city: String
})

const Address = mongoose.model(
  'address',
  AddressSchema.plugin(MongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    indexFields: ['deleted']
  })
)

export default Address
