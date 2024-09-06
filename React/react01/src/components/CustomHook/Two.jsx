import useWelcome from './useWelcome'

export default function Two() {
  const welcome = useWelcome()

  return <div>Two {welcome}</div>
}
