import aqp from 'api-query-params'
import User from '../user/userModel'
import Blog from './blogModel'

const blogService = {
  get: async (queryString) => {
    const { limit, skip, filter, sort, projection, population } = aqp(queryString, {
      skipKey: 'page'
    })

    const blogs$ = Blog.find()
      .limit(limit)
      .skip((skip - 1) * limit)
      .find(filter)
      .sort(sort)
      .select({ ...projection, deleted: 0 })
      .populate(population)
      .exec()

    const totalBlogs$ = Blog.countDocuments(filter).exec()

    const [blogs, totalBlogs] = await Promise.all([blogs$, totalBlogs$])
    return { totalBlogs, blogs }
  },
  create: async ({ blogData, userId }) => {
    const blog = new Blog({ ...blogData, user: userId })
    const user = await User.findByIdAndUpdate(userId, { $push: { blogs: blog._id } })

    if (!user) {
      throw new Error('User not found')
    }
    await blog.save()
    return blog
  },
  createBulk: async ({ userId, blogData }) => {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }
    const blogs = await Blog.insertMany(blogData.map((blog) => ({ ...blog, user: userId })))
    user.blogs.push(...blogs.map((blog) => blog._id))
    await user.save()
    return blogs
  },
  update: async ({ blogId, userId, blogData }) => await Blog.updateOne({ _id: blogId, user: userId }, blogData),
  delete: async ({ blogId, userId }) => {
    await User.findByIdAndUpdate(userId, { $pull: { blogs: blogId } })
    return await Blog.delete({ _id: blogId, user: userId })
  },
  deleteBulk: async ({ blogIds, userId }) => {
    await User.findByIdAndUpdate(userId, { $pull: { blogs: { $in: blogIds } } })
    return await Blog.delete({ _id: { $in: blogIds } })
  }
}

export default blogService
