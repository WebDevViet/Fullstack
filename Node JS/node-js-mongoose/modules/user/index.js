import { Router } from 'express'
import userMiddleware from './userMiddleware'
import userController from './userController'
import Joi from 'joi'

const router = Router()

router.get('/users', userController.get)

router.post('/users', userMiddleware.create, userController.create)
router.post('/users/bulk', userMiddleware.createBulk, userController.createBulk)

router.patch('/users/:userId', userMiddleware.update, userController.update)

router.delete('/users/bulk', userMiddleware.deleteBulk, userController.deleteBulk)
router.delete('/users/:userId/restore', userMiddleware.restore, userController.restore)
router.delete('/users/:userId/:abc/:xyz', userMiddleware.delete, userController.delete)

const schema = Joi.object({
  password: Joi.string().min(3).max(15).required().label('Password'),
  confirmPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' })
})

const demoValidation = async (req, res) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    res.json('success')
  } catch (error) {
    res.status(422).json({ message: error.message })
  }
}

router.post('/demo', demoValidation)

export default router

/** Add user
 * Method: POST
 * Path: /users
 * Header: { Authentication: "Bearer <accessToken>" }
 * Body: UserSchema
 */

// Validate => File + MongoDB => done express
// business logic + SQL (code in express)
