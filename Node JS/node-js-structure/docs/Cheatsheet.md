# Các cú pháp hay dùng trong express

## Cookie

_SET_

```javascript
res.cookie('name', 'value', { maxAge: 900000, httpOnly: true })
```

_GET_

```javascript
req.cookies.name
```

_DELETE_

```javascript
res.clearCookie('name')
```

```javascript
res.cookie('name',, { maxAge: 0, httpOnly: true })
```

### Express signed cookies

Thêm sign cho cookie và phát hiện cookie đó có được sửa đổi bởi người dùng hay không

_app.js_

```javascript
const cookieParser = require('cookie-parser')

app.use(cookieParser(process.env.COOKIE_SECRET))
```

_SET_

```javascript
res.cookie('name', 'value', { signed: true })
```

_GET_

```javascript
req.signedCookies.name
```

## Router

```javascript
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {})
router.post('/', (req, res) => {})
router.patch('/', (req, res) => {})
router.delete('/', (req, res) => {})

module.export = router
```

```javascript
const express = require('express')
const router = express.Router()

router.use('/', [require('./v1'), require('./v2')])

module.export = router
```

## Cookie session

```bash
npm install cookie-session
```

_SET_

```javascript
req.session.key = value
```

_GET_

```javascript
req.session.key
```

_DELETE_

```javascript
delete req.session.key
```

## Session flash

```bash
npm install connect-flash
```

_SET_

```javascript
req.flash('key', value)
```

_GET_

```javascript
req.flash('key')
```
