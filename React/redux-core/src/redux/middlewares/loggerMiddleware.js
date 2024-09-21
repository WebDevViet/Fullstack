const loggerMiddleware = (store) => {
  return (next) => {
    return (action) => {
      // console.log('🚀 action:', action) // action = {type, payload}
      // console.log('🚀 store:', store) // store = {dispatch, getState}

      next(action)
      /**
       * TH1: next để sang middleware tiếp theo
       * TH2: next để tiếp lên store, chuyển action từ dispatch ở component lên store
       */
    }
  }
}

export default loggerMiddleware

// component dispatch -> middlewares (middleware 1 -> middleware 2, ....) -> store
// middleware(store) => (next) => (action) => {}  -----> currying()()()
