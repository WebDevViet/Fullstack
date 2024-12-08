import { Router } from 'express'
import responseHandler from './responseHandler.js'

class CustomRouter {
  constructor() {
    this.router = Router()
  }

  // Tự động áp dụng resHandler cho tất cả các method
  applyHandler(method, path, middlewares, controller) {
    if (controller) {
      this.router[method](path, ...middlewares, responseHandler(controller))
    } else {
      this.router[method](path, ...middlewares)
    }
  }

  get(path, ...handlers) {
    const [middlewares, controller] = this.extractMiddlewaresAndController(handlers)
    this.applyHandler('get', path, middlewares, controller)
  }

  post(path, ...handlers) {
    const [middlewares, controller] = this.extractMiddlewaresAndController(handlers)
    this.applyHandler('post', path, middlewares, controller)
  }

  put(path, ...handlers) {
    const [middlewares, controller] = this.extractMiddlewaresAndController(handlers)
    this.applyHandler('put', path, middlewares, controller)
  }

  patch(path, ...handlers) {
    const [middlewares, controller] = this.extractMiddlewaresAndController(handlers)
    this.applyHandler('patch', path, middlewares, controller)
  }

  delete(path, ...handlers) {
    const [middlewares, controller] = this.extractMiddlewaresAndController(handlers)
    this.applyHandler('delete', path, middlewares, controller)
  }

  use(...args) {
    this.router.use(...args) // Không tự động bọc resHandler cho `use`
  }

  // Helper để tách middleware và controller
  extractMiddlewaresAndController(handlers) {
    const middlewares = handlers.slice(0, -1)
    const controller = handlers[handlers.length - 1]
    return [middlewares, controller]
  }

  // Xuất router
  export() {
    return this.router
  }
}

export default CustomRouter
