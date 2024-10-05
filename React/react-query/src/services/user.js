import axios from 'axios'
const serverAPI = import.meta.env.VITE_SERVER_API + '/users'

const req = axios.create({
  baseURL: serverAPI
})

const getUserList = async () => {
  return req.get()
}

const getUserDetail = async (idPost) => {
  return req.get(`${idPost}`)
}

const deleteUser = async (idPost) => {
  return req.delete(`${idPost}`)
}

const updateUser = async (idPost, data) => {
  return req.patch(`${idPost}`, data)
}

export { getUserList, getUserDetail, deleteUser, updateUser }
