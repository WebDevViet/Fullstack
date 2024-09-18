import { useDebugValue, useState } from 'react'

const heavyTask = (value) => {
  for (let i = 0; i < 1000000000; i++) {
    // handle heavy task
  }

  return value === 'light' ? 'theme is light' : 'theme is dark'
}

export default function useTheme() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // console.log('🚀 ~ toggleTheme ~ theme:', theme === 'light' ? 'theme is light' : 'theme is dark')
  useDebugValue(theme, heavyTask)

  return { theme, toggleTheme }
}

// useDebugValue(theme === 'light' ? 'theme is light' : 'theme is dark')
// useDebugValue(heavyTask(theme) === 'light' ? 'theme is light' : 'theme is dark')
// useDebugValue(theme === 'light' ? 'theme is light' : 'theme is dark', heavyTask)
