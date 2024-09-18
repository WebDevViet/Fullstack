import randomColor from '../../HOC/randomColor'

const Lorem = randomColor(() => {
  // logic heavy or many
  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae non, suscipit obcaecati eligendi soluta perspiciatis
      asperiores voluptates velit expedita magni rem corporis sint veritatis dolorum, architecto doloribus odio alias placeat.
    </p>
  )
})

export default Lorem
