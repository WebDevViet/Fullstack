import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: String
  },
  { timestamps: true }
)

const Product = mongoose.model('product', productSchema)

export default Product
