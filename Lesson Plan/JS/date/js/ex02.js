const targetDate = `2024-09-31 09:30:30`
const target = new Date(targetDate)
const daysEl = document.querySelector('.countdown .days .number')
const hoursEl = document.querySelector('.countdown .hours .number')
const minutesEl = document.querySelector('.countdown .minutes .number')
const secondsEl = document.querySelector('.countdown .seconds .number')
const handleCountdown = () => {
  const today = new Date()
  let seconds = (target.getTime() - today.getTime()) / 1000
  if (seconds <= 0) return
  const days = Math.floor(seconds / 86400)
  seconds = seconds - days * 86400
  const hours = Math.floor(seconds / 3600)
  seconds = seconds - hours * 3600
  const minutes = Math.floor(seconds / 60)
  seconds = Math.floor(seconds - minutes * 60)
  daysEl.innerText = days < 10 ? '0' + days : days
  hoursEl.innerText = hours < 10 ? '0' + hours : hours
  minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes
  secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds
}
handleCountdown()
setInterval(handleCountdown, 1000)
