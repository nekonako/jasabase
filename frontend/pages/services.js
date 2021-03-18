import * as React from 'react'
import axios from 'axios'
import decode from 'jwt-decode'

const apiUrl = 'http://localhost:4000';

axios.interceptors.request.use(
   config => {
      const { origin } = new URL(config.url)
      const allowedOrigins = [apiUrl]
      const token = localStorage.getItem('token')
      if(allowedOrigins.includes(origin)) {
         config.headers.authorization = `Bearer ${token}`
      }
      return config
   },
   error => {
      return Promise.reject(error)
   }
)

function Services () {
   const [error, setError] = React.useState('')
   const [service, setService] = React.useState({
      nama : '',
      keterangan : '',
      harga : '',
      alamat : '',
      userId : null
   })


   React.useEffect(() => {
      const token = localStorage.getItem('token')
      const decoded = decode(token)
      setService({...service, userId : decoded.id })
   }, [])

   const serviceChange = {
      nama : (event) => {
         const value = event.target.value
         setService({...service, nama : value})
      },
      keterangan : (event) => {
         const value = event.target.value
         setService({...service, keterangan : value})
      },
      harga : (event) => {
         const value = event.target.value
         setService({...service, harga : value})
      },
      alamat : (event) => {
         const value = event.target.value
         setService({...service, alamat : value})
      }
   }

   const submit = (event) => {
      event.preventDefault()
      if (service.nama && service.keterangan && service.harga && service.alamat && service.userId !== ''){
         axios.post(`http://localhost:4000/api/users/nako/services`, {
            nama : service.nama,
            alamat : service.alamat,
            harga : service.harga,
            keterangan : service.keterangan,
            userId : service.userId
         })
            .then(res=> {
               setError(res.data.message)
            })
            .catch(err => {
               console.log(err)
            })
      } else {
         setError('Data harus disisi semua')
      }
   }

   return(
      <>
         <form>
            <label>
               Nama
               <input
                  type='text' value={service.nama}
                  onChange={serviceChange.nama}
                  className='p-4 border border-gray-200'
               />
            </label>
            <br/>
            <label>
               keterangam
               <input
                  type='text' value={service.keterangan}
                  onChange={serviceChange.keterangan}
                  className='p-4 border border-gray-200'
               />
            </label>
            <br/>
            <label>
               harga
               <input
                  type='number' value={service.harga}
                  onChange={serviceChange.harga}
                  className='p-4 border border-gray-200'
               />
            </label>
            <br/>
            <label>
               alamat
               <input
                  type='text' value={service.alamat}
                  onChange={serviceChange.alamat}
                  className='p-4 border border-gray-200'
               />
            </label>
            <br/>
            {error}
            <br/>
            <button onClick={submit}>submt</button>
         </form>
         <br/>
         <br/>
         <button>token</button>
      </>
   )
}

export default Services

