/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react'
import { debounce } from 'lodash'
import students from '../../assets/db.json'

export default function HighLight() {
  const [query, setQuery] = useState('')
  const debouncedSetQuery = useCallback(debounce(setQuery, 400), [])

  const handleQuery = ({ target: { value } }) => {
    debouncedSetQuery(value)
  }

  return (
    <div>
      <input type='text' name='query' onChange={handleQuery} />
      <div>
        {students.map((student) => {
          const index = student.fullName.toLowerCase().indexOf(query.toLowerCase())
          if (index === -1) return <p key={student.id}>{student.fullName}</p>

          return (
            <p key={student.id}>
              {student.fullName.slice(0, index)}
              <span style={{ backgroundColor: 'yellow' }}>{student.fullName.slice(index, index + query.length)}</span>
              {student.fullName.slice(index + query.length)}
            </p>
          )
        })}
      </div>
    </div>
  )
}

/** TH1: debounce with useCallback
   * TODO: delete prop value of input highlight, add eslint-disable react-hooks/exhaustive-deps 
   const debouncedSetQuery =  useCallback(debounce(setQuery, 400), [])

  const handleQuery = ({ target: { value } }) => {
    debouncedSetQuery(value)
  }
*/

/** TH2: debounce with useCallback but still has prop value input highlight
   * TODO: add state highlight, add prop value for input highlight, in map replace query to highlight
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
