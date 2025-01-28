```javascript
import { fakerVI as faker } from '@faker-js/faker'

const generateCustomers = (count = 100) =>
  Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    address: {
      city: faker.location.city(),
      zip_code: faker.location.zipCode()
    },
    phone: faker.helpers.fromRegExp(/0[35789][0-9]{8}/)
  }))

console.log(generateCustomers())
// res.json(generateCustomers())
```
