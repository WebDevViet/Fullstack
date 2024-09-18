import { useTheme } from '../CustomHook'
import './theme.css'

export default function Theme() {
  const { theme, toggleTheme } = useTheme()

  // theme = light | dark
  // toggleTheme = setTheme()

  return (
    <>
      <p className={theme}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat laudantium, nobis enim consectetur cupiditate repellat
        veniam dolores quis tenetur exercitationem quae nihil, architecto laborum cumque atque est et dignissimos possimus.
      </p>

      <button onClick={toggleTheme}>Toggle Theme</button>
    </>
  )
}
