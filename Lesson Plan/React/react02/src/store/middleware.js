export const middleware = (store) => {
  /** trong store sẽ có 2 hàm:
   * getState => trả về toàn bộ state của store
   * dispatch => dispatch lên reducer
   */
  return (action) => {
    if (typeof action === 'function') {
      action(store.dispatch, store.getState)
    }
  }
}

// middleware: state, dispatch, action, ////next_redux
