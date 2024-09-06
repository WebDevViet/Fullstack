import USD from './usd'
import VND from './vnd'

export default function Money() {
  return (
    <div className='w-75 mx-auto py-3'>
      <h1>Money</h1>
      <VND />
      <hr />
      <USD />
    </div>
  )
}
