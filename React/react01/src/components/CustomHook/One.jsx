import useWelcome from './useWelcome'

export default function One() {
  const welcome = useWelcome()

  return <div>One {welcome}</div>
}
