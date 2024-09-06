const searchElement = document.querySelector('#search')

const search = (e) => {
  console.log(e.target.value)
}

const throttle = (cb, delay) => {
  let lastCall = 0
  return (...args) => {
    const now = Date.now()
    console.log(now - lastCall)

    if (now - lastCall < delay) return
    lastCall = now
    cb(...args)
  }
}

if (searchElement) {
  searchElement.addEventListener('input', throttle(search, 5000))
}

console.log(new Date('1970-01-01').getTime())
console.log(Date.now())
