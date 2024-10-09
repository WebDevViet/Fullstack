import axios from 'axios'

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API + '/users'
})

const getUserList = (opts = {}) => {
  return instanceAxios.get('', opts)
}

const getUserDetail = ({ id, ...opts }) => {
  return instanceAxios.get(`${id}`, { ...opts })
}

const deleteUser = (id) => {
  return instanceAxios.delete(`${id}`)
}

const updateUser = ({ id, data, ...opts }) => {
  return instanceAxios.patch(`${id}`, data, { ...opts })
}

const createUser = ({ data, ...opts }) => {
  return instanceAxios.post('', data, { ...opts })
}

export { getUserList, getUserDetail, deleteUser, updateUser, createUser }

// --------------cancel request------------------ Cách 1

// const CancelToken = axios.CancelToken
// const source = CancelToken.source()

// req
//   .get('', {
//     cancelToken: source.token
//   })
//   .then(function (response) {
//     console.log('🚀 ~ response:', response)
//   })
//   .catch(function (thrown) {
//     if (axios.isCancel(thrown)) {
//       console.log('Request đã được bãi bỏ', thrown.message)
//     } else {
//       // xử trí lỗi
//     }
//   })

// axios.post('/user/12345', {
//   name: 'tên mới'
// }, {
//   cancelToken: source.token
// })

//// bãi bỏ request (tham số message là tùy chọn)
// source.cancel('Thao tác đã được người dùng bãi bỏ.')

// --------------cancel request------------------ Cách 2

// const controller = new AbortController()

// req
//   .get('', {
//     signal: controller.signal
//   })
//   .then(function (response) {
//     console.log('🚀 ~ response:', response)
//     //...
//   })
//   .catch(function (thrown) {
//     if (axios.isCancel(thrown)) {
//       console.log('Request đã được bãi bỏ', thrown.message)
//     } else {
//       // xử trí lỗi
//     }
//   })
// // cancel the request
// controller.abort('Request')
