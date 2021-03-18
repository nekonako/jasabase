import * as React from 'react'
import register from '../lib/api.user'
import { useRouter } from 'next/router'
import axios from 'axios'
import Modal from '../components/modal'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function Daftar() {
   const router = useRouter()
   const [sukses, setSukses] = React.useState(false)
   const [error, setError] = React.useState('')
   const [email, setEmail] = React.useState({
      style : 'border-purple-200 border p-3 my-2 rounded-lg',
      error : '',
      data : ''
   })
   const [username, setUsername] = React.useState({
      style : 'border-purple-200 border p-3 my-2 rounded-lg',
      error : '',
      data : ''
   })
   const [password, setPassword] = React.useState({
      style : 'border-purple-200 border p-3 my-2 rounded-lg mb-8',
      error : '',
      data : ''
   })

   const emailChange = (event) => {
      const value = event.target.value
      let regex = value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      setEmail({
         ...email,
         data : event.target.value,
         error : '',
         style : 'border-purple-200 border p-3 my-2 rounded-lg'
      })
      if(!regex){
         setEmail({
            ...email,
            data : event.target.value,
            error : 'Email tidak valid',
            style : 'border-pink-600 border p-3 my-2'
         })
         return
      }
      if(event){
         axios.post('http://localhost:4000/api/check-email', {
            email : value,
         })
            .then(res => {
               console.log(res)
               setEmail({
                  ...email,
                  error : '',
                  data : value,
                  style : 'border-purple-200 border p-3 my-2 rounded-lg'
               })
            })
            .catch(err => {
               console.log(err)
        setEmail({
                  ...email,
                  error : err.response.data.message,
                  data : value,
                  style : 'border-pink-600 border p-3 my-2'
               })
            })
      }
   }

   const usernameChange = (event) => {
      const value = event.target.value
      if(username.data.length === 0) {
         setUsername({
            ...username,
            error : 'Username tidak boleh kosong',
            data : value,
            style : 'border-pink-600 border p-3 my-2'
         })
      }
      if(event){
         axios.post('http://localhost:4000/api/check-username', {
            username : value,
         })
            .then(res => {
               setUsername({
                  ...username,
                  error : '',
                  data : value,
                  style : 'border-purple-200 border p-3 my-2 rounded-lg'
               })
            })
            .catch(err => {
               setUsername({
                  ...username,
                  error : err.response.data.message,
                  data : value,
                  style : 'border-pink-600 border p-3 my-2'
               })
            })
      }
   }

   const passwordChange = (event) => {
      setPassword({
         ...password,
         data : event.target.value,
         error : '',
         style : 'border-purple-200 border p-3 my-2 rounded-lg'
      })
      if(password.data.length < 7) {
         setPassword({
            ...password,
            error : 'Password minimal 8 karakter',
            data : event.target.value,
            style : 'border-pink-600 border p-3 my-2'
         })
      }
   }

   const submit = (event) => {
      event.preventDefault()
      if (email.data && username.data && password.data !== ''){
         axios.post('http://localhost:4000/api/daftar', {
            username : username.data,
            email : email.data,
            password : password.data
         })
            .then(res => {
               if(res.status === 201) {
                  React.useEffect(() => {
                     router.push('/')
                  }, [])
                  setSukses(true)
               }
            })
            .catch(err => {
               setError('Maaf terjadi kesalahan')
            })
      } else if (email.data === '') {
         setError('Form tidak boleh kosong')
         setEmail({
            ...email,
            style : 'border-pink-600 border p-3 my-2'
         })
      } else if( username.data === '' ) {
         setUsername({
            ...username,
            style : 'border-pink-600 border p-3 my-2'
         })
      } else if( password.data === '' ) {
         setPassword({
            ...password,
            style : 'border-pink-600 border p-3 my-2'
         })
      }
   }

   return(
      <>
         {sukses === false  ? (
            <>
               <Navbar/>
               <br/>
               <Modal>
                  <div className='flex justify-center text-2xl font-bold text-purple-500'>
                     JasaBase.</div>
                  <form className='flex flex-col py-12 mx-8'>

                     <span className='text-pink-600'>{email.error}</span>
                     <input type='text' value={email.data} onChange={emailChange}
                        className={email.style}
                        placeholder='Email'
                     />

                     <span className='text-pink-600'>{username.error}</span>
                     <input type='text' value={username.data} onChange={usernameChange}
                        className={username.style}
                        placeholder='Username'
                     />

                     <span className='text-pink-600'>{password.error}</span>
                     <input type='password' value={password.data} onChange={passwordChange}
                        className={password.style}
                        placeholder='Password'
                     />

                     <span className='mb-2 text-pink-600 '>{error}</span>
                     <button onClick={submit}
                        className='p-3 font-bold text-white bg-gradient-to-r from-purple-500 to-purple-400 rounded-md'>
                        Daftar
                     </button>
                  </form>
               </Modal>
               <Footer/>
            </>
         ) : (
            <>
               <Modal>
                  <div className='p-4 text-purple-500 bg-purple-200 rounded-md'> Berhasil.. </div>
               </Modal>
            </>
         )}
      </>
   )
}
