import { useEffect, useState } from 'react'

const UploadImage = () => {
  const [status, setStatus] = useState('idle')
  const [img, setImg] = useState({})

  const handleChangeImg = ({ target: { files } }) => {
    const urlBlob = URL.createObjectURL(files[0])
    setImg({ urlBlob, file: files[0] })
  }

  const sendFile = async () => {
    try {
      setStatus('pending')
      // const formData = new FormData()
      // formData.append('image', img.file)
      // const res = await fetch('https://jsonplaceholder.typicode.com/photos', {
      //   method: 'POST',
      //   body: formData
      // })
      // return res.json()

      const res = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve('https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msG11.img')
          } else {
            reject(new Error('failed to upload'))
          }
          setStatus('idle')
        }, 2000)
      })

      return res
    } catch (error) {
      alert(error.message)
    } finally {
      setStatus('idle')
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const typeImgs = ['image/jpeg', 'image/png', 'image/jpg']

    if (typeImgs.includes(img?.file?.type)) {
      const urlUploaded = await sendFile()
      urlUploaded ? setImg({ urlUploaded }) : setImg({ ...img, urlUploaded })
    } else {
      alert('File is not an image')
    }
  }

  useEffect(() => {
    return () => URL.revokeObjectURL(img.urlBlob)
  }, [img.urlBlob])

  return (
    <div className='w-75 mx-auto py-3'>
      <h1>Upload Image</h1>
      <form onSubmit={handleUpload}>
        <input onChange={handleChangeImg} type='file' name='image' />
        <button onClick={handleUpload} disabled={status === 'pending'}>
          {status === 'pending' ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {img.urlUploaded && (
        <>
          <hr />
          <p className='text-success'>Uploaded image successfully</p>
          <a href={img.urlUploaded} target='_blank' rel='noreferrer'>
            <button>View Image</button>
          </a>
        </>
      )}

      {img.urlBlob && (
        <>
          <hr />
          <figure>
            <img src={img.urlBlob} alt={img.file.name} width={200} />
          </figure>
        </>
      )}
    </div>
  )
}

export default UploadImage
