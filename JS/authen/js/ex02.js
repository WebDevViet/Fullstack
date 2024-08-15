// export const reqMultilple = () => {
//   let accessToken = 'abc123'
//   let isExp = false
//   let refreshTokenPromise = null
//   const refreshToken = () => {
//     // call API
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(`New Token: ${Math.random()}`)
//       }, 1000)
//     })
//   }

//   const requestApi = async (path) => {
//     if (path === '/courses') {
//       // Giả vờ khi call tới api '/courses' thì accessToken hết hạn
//       isExp = true
//     }

//     if (isExp) {
//       if (!refreshTokenPromise) {
//         console.log(path)
//         refreshTokenPromise = refreshToken()
//       }
//       const newToken = await refreshTokenPromise
//       accessToken = newToken
//     }

//     console.log(`Call API ${path}: ${accessToken}`)
//   }

//   requestApi('/profile')
//   requestApi('/courses')
//   requestApi('/posts')
//   requestApi('/products')
// }

// Promise.all
// Promise.race
// Promise.any
// Promise.allSettled

/**
 * /courses
 * await refreshTokenPromise = refreshToken()
 *
 * /posts
 * await refreshTokenPromise
 *
 * /products
 *  await refreshTokenPromise
 */

// export const reqMultilple = () => {
//   const a = () => 1

//   const result = a()

//   const b = result
//   const c = result
//   console.log(result)
//   console.log(b)
//   console.log(c)
// }
