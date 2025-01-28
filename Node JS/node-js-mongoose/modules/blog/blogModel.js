import mongoose from 'mongoose'
import MongooseDelete from 'mongoose-delete'

const Schema = mongoose.Schema

const BlogSchema = new Schema({
  title: String,
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'user' }
})

const Blog = mongoose.model(
  'blog',
  BlogSchema.plugin(MongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    indexFields: ['deleted']
  })
)

export default Blog
