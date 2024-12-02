import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as Req from '../services/user'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

const Mutation = () => {
  const queryClient = useQueryClient()

  const postData = async (data) => {
    const res = await Req.createUser({ data })
    return res.data
  }

  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: (resData) => {
      console.log('🚀 ~ QueryClient ~ resData:', resData)
      // resData = pres.data from postData
      queryClient.setQueryData(['user', resData.id], resData)
    }
  })

  const handleMutation = (e) => {
    e.preventDefault()
    const { email, name, status } = Object.fromEntries(new FormData(e.target))
    console.log('🚀 ~ handleMutation ~ status:', status)
    console.log('🚀 ~ handleMutation ~ name:', name)
    console.log('🚀 ~ handleMutation ~ email:', email)

    mutation.mutate({ name, email, status: status ? 'active' : 'inactive' })
  }

  return (
    <div>
      <h1>Use Mutation</h1>

      <form onSubmit={handleMutation} className='w-25 mt-5 mx-auto'>
        {/* <FormGroup>
          <Label for='name'>Name</Label>
          <Input id='name' name='name' type='text' />
        </FormGroup>
        <FormGroup>
          <Label for='email'>Email</Label>
          <Input id='email' name='email' type='email' />
        </FormGroup>
        <FormGroup check>
          <Input name='status' type='checkbox' defaultValue='active' />
          <Label check>Status</Label>
        </FormGroup> */}
        {/* <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' />
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />
        <label htmlFor='status'>Status Active</label>
        <input type='checkbox' name='status' id='status' /> */}
        <Button color='success'>Create User</Button>
      </form>
    </div>
  )
}

export default Mutation
