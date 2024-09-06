import { useContext } from 'react'
import { AppContext } from '../App'
import Button from './Button'

export default function Content() {
  const { title } = useContext(AppContext)

  return (
    <div>
      <h1>{title}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas quae commodi ex dignissimos reiciendis tempora nisi
        aspernatur molestiae quis nam nihil, vel repellendus possimus ducimus consequuntur eligendi quasi aperiam explicabo?
      </p>
      <Button>
        <span>Click Me</span>
      </Button>
    </div>
  )
}
