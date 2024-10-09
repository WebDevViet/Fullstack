import { useMutation } from '@tanstack/react-query'
import * as Req from '../services/user'

const Mutation = () => {
  const postData = async (data) => {
    const res = await Req.createUser({ data })
    return res.data
  }

  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: (resData) => {
      console.log('🚀 ~ QueryClient ~ resData:', resData)
      // resData = postData => res.data
      // queryClient.setQueryData(['nameQuery', queryId], resData)
    }
  })

  const handleMutation = () => {
    mutation.mutate({ name: 'John', email: 'john@mail', status: 'active' })
  }

  return (
    <div>
      <h1>Use Mutation</h1>

      <form>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' />
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />
        <label htmlFor='status'>Status Active</label>
        <input type='checkbox' name='status' id='status' />
        <button onClick={handleMutation}>Create User</button>
      </form>
    </div>
  )
}

export default Mutation
