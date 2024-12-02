// import { useEffect, useRef } from 'react'

const Home = () => {
  return <h1>Home</h1>
}

export default Home

// const controllerRef = useRef(null)
// const [data, setData] = useState(null);
// const isMounted = useRef(true);

// useEffect(() => {
//   console.log('mounted')
//   controllerRef.current = new AbortController()
//   ;(async () => {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/users', {
//         signal: controllerRef.current.signal // Pass the signal to the fetch call
//       })

//       const data = await response.json()
// if (isMounted.current) {
//   setData(json)
// }
//       // Handle the data as needed
//     } catch (error) {
//       if (error.name === 'AbortError') {
//         console.log('Previous request was aborted')
//       } else {
//         console.error('Error fetching data:', error)
//       }
//     }
//   })()

//   return () => {
//     console.log('unmounted')
//     if (controllerRef.current) {
//       controllerRef.current.abort()
//     }
//   }
// }, [])
