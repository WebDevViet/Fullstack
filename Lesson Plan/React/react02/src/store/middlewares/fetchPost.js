const fetchPost = () => {
  return async (dispatch, getState) => {
    // call API
    // khi nào có dữ liệu trả về => dispatch để cập nhật state trên store
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    dispatch({
      type: 'post/get',
      payload: data
    })
  }
}

export default fetchPost
