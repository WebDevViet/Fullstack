const apiUrl = `https://api.escuelajs.co/api/v1/files/upload`
const btn = document.querySelector('button')
const input = document.querySelector('input')

btn.addEventListener('click', async () => {
  try {
    const imgObj = input.files[0]
    const formData = new FormData()
    formData.append('file', imgObj)
    const res = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      throw new Error('Something went wrong')
    }

    const data = await res.json()
    console.log(data)
  } catch (error) {
    console.log(error.message)
  }
})
