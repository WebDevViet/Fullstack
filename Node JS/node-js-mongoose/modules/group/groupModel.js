import mongoose from 'mongoose'
import MongooseDelete from 'mongoose-delete'

const Schema = mongoose.Schema

const GroupSchema = new Schema({
  name: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

const Group = mongoose.model(
  'group',
  GroupSchema.plugin(MongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    indexFields: ['deleted']
  })
)

export default Group
