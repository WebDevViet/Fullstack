import aqp from 'api-query-params'
import User from './userModel'
import Group from '../group/groupModel'
import Blog from '../blog/blogModel'

const userService = {
  get: async (queryString) => {
    const { limit, skip, filter, sort, projection, population } = aqp(queryString, {
      skipKey: 'page',
      blacklist: ['deleted', 'deletedAt']
    })

    const users$ = User.find()
      .find(filter)
      .limit(limit)
      .skip((skip - 1) * limit)
      .sort(sort)
      .select({ ...projection, deleted: 0 })
      .populate(population)
      .exec()

    const totalUsers$ = User.countDocuments(filter).exec()

    const [users, totalUsers] = await Promise.all([users$, totalUsers$])
    return { totalUsers, users }
  },
  create: async (userData) => await User.create(userData),
  createBulk: async (usersData) => await User.insertMany(usersData),
  update: async ({ _id, ...userData }) => await User.updateOne({ _id }, userData),
  delete: async (userId) => {
    const deletedUser = await User.deleteById(userId)
    if (deletedUser.matchedCount === 0) {
      throw new Error('User not found')
    }

    const groups = await Group.find({ users: userId })

    await Promise.all([
      Blog.delete({ user: userId }),
      ...groups.map(async (group) => {
        if (group.users.length > 1) {
          await group.updateOne({ $pull: { users: userId } })
          return
        }
        await group.delete()
      })
    ])

    return deletedUser
  },
  restore: async (_id) => {
    const restoredUser = await User.restore({ _id })
    if (restoredUser.matchedCount === 0) {
      throw new Error('User not found')
    }

    await Promise.all([Blog.restore({ user: _id }), Group.restore({ users: _id })])
    return restoredUser
  },
  deleteBulk: async (userIds) => await User.delete({ _id: { $in: userIds } })
}

export default userService
