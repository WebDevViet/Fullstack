// hàm xử lý middleware
const fetchPost = (value) => {
  // value được lấy từ component truyền vào
  console.log('🚀 ~ fetchPost ~ value:', value)

  // trả về 1 action là 1 function
  return async (dispatch, getState) => {
    // call API
    // khi nào có dữ liệu trả về => dispatch để cập nhật state trên store
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await res.json()
      dispatch({
        type: 'post/get',
        payload: data
      })
    } catch (error) {
      dispatch({
        type: 'post/error',
        payload: error.message
      })
    } finally {
      dispatch({
        type: 'post/offloading'
      })
    }
  }
}

export default fetchPost
