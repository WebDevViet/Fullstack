import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: String,
    email: String,
    address: String,
    image: String,
    description: String
  },
  { timestamps: true }
)

const Customer = mongoose.model('customer', customerSchema)

export default Customer
