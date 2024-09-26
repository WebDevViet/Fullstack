/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react'
import StudentList from './StudentList'
import { debounce } from 'lodash'

export default function Highlight() {
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState('')
  const debouncedSetHighlight = useCallback(debounce(setHighlight, 400), [])

  const handleQuery = ({ target: { value } }) => {
    setQuery(value)
    debouncedSetHighlight(value)
  }

  return (
    <div>
      <input type='text' value={query} name='query' onChange={handleQuery} />
      <StudentList query={highlight} />
    </div>
  )
}

/** TH1: debounce with useCallback
   * TODO: delete prop value of input query, add eslint-disable react-hooks/exhaustive-deps 
   const debounceSetQuery =  useCallback(debounce(setQuery, 400), [])

  const handleQuery = ({ target: { value } }) => {
    debounceSetQuery(value)
  }
*/

/** TH2: debounce with useCallback but still has prop value input highlight
   * TODO: add state highlight, add prop value for input query, in map replace query to highlight, add react.memo
   const [highlight, setHighlight] = useState('')
   const debouncedSetHighlight =  useCallback(debounce(setHighlight, 400), [])

  const handleQuery = ({ target: { value } }) => {
    setQuery(value)
    debouncedSetHighlight(value);
  }
*/

/** TH3: debounce with useMemo to comply with eslint rules
   * TODO: delete eslint-disable react-hooks/exhaustive-deps 
  const debouncedSetHighlight = useMemo(() => debounce(setHighlight, 400), [])

  const handleQuery = ({ target: { value } }) => {
    setQuery(value)
    debouncedSetHighlight(value);
  }
*/

/** TH4: useTransition
  const [isPending, startTransition] = useTransition()

  const handleQuery = ({ target: { value } }) => {
    setQuery(value)
    startTransition(() => setHighlight(value));
  }

   useEffect(() => {
    console.log('🚀 ~ useEffect ~ query:', query)
    console.log('🚀 ~ useEffect ~ highlight:', highlight)
  })

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ isPending:', isPending)
  }, [isPending])

*/
