import aqp from 'api-query-params'
import User from '../user/userModel'
import Group from './groupModel'

const groupService = {
  get: async (queryString) => {
    const { limit, skip, filter, sort, projection, population } = aqp(queryString, {
      skipKey: 'page'
    })

    const groups$ = Group.find()
      .limit(limit)
      .skip((skip - 1) * limit)
      .find(filter)
      .sort(sort)
      .select({ ...projection, deleted: 0 })
      .populate(population)
      .exec()

    const totalGroups$ = Group.countDocuments(filter).exec()

    const [groups, totalGroups] = await Promise.all([groups$, totalGroups$])
    return { totalGroups, groups }
  },
  create: async ({ groupData, userId }) => {
    const group = new Group({ ...groupData, users: [userId] })
    const user = await User.findByIdAndUpdate(userId, { $push: { groups: group._id } }, { new: true }).exec()

    if (!user) {
      throw new Error('User not found')
    }
    await group.save()
    return group
  },

  addUser: async ({ userId, groupId }) => {
    const group = await Group.findById(groupId)
    if (!group) {
      throw new Error('Group not found')
    }

    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    if (group.users.includes(userId)) {
      throw new Error('User already in group')
    }

    group.users.push(userId)
    user.groups.push(groupId)

    await Promise.all([group.save(), user.save()])
    return group
  },
  removeUser: async ({ userId, groupId }) => {
    const group = await Group.findById(groupId)
    if (!group) {
      throw new Error('Group not found')
    }

    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    if (!group.users.includes(userId)) {
      throw new Error('User not in group')
    }

    group.users.pull(userId)
    user.groups.pull(groupId)

    await Promise.all([group.save(), user.save()])
    return group
  }
}

export default groupService
