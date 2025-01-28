import { fakerVI as faker } from '@faker-js/faker'
import { Router } from 'express'
import modules from '../modules'
const router = Router()

// /* GET home page. */
// router.get('/', async function (req, res, next) {
//   const generateCustomers = (count = 100) =>
//     Array.from({ length: count }, () => ({
//       name: faker.person.fullName(),
//       email: faker.internet.email(),
//       address: {
//         city: faker.location.city(),
//         zip_code: faker.location.zipCode()
//       },
//       phone: faker.helpers.fromRegExp(/0[35789][0-9]{8}/)
//     }))

//   res.json(generateCustomers())
//   // res.render('index', { title: 'Express' })
// })

router.use(modules)

export default router
