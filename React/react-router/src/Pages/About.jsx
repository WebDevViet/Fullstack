const About = () => {
  const fibonacci = (n) => {
    if (n < 2) {
      return n
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
  }
  return (
    <>
      <h1>About</h1>
      <p>{fibonacci(40)}</p>
    </>
  )
}

export default About
