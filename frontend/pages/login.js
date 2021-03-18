import * as React from 'react'
import axios from 'axios'
import Modal from '../components/modal'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { useRouter } from 'next/router'


function Login() {
    const router = useRouter()

    const [sukses, setSukses] = React.useState(false)
    const [error, setError] = React.useState('')
    const [username, setUsername] = React.useState({
        data : '',
        style : 'border-purple-200 border p-3 rounded-lg mb-8'
    })
    const [password, setPassword] = React.useState({
        data : '',
        style : 'border-purple-200 border p-3 mb-4 rounded-lg'
    })

    const usernameChange = (event) => {
        const value = event.target.value
        setUsername({...username, data : value})
    }

    const passwordChange = (event) => {
        const value = event.target.value
        setPassword({...password, data : value})
    }

    const submit = (event) => {
        event.preventDefault()
        if (username.data && password.data !== ''){
            axios.post('http://localhost:4000/api/login', {
                username : username.data,
                password : password.data
            }, { withCredentials : true })
                .then(res => {
                    router.push('/dashboard')
                })
                .catch(err => {
                    console.log(err)
                    setError('Username atau password salah')
                })
        } else if( username.data === '' ) {
            setUsername({
                ...username,
                style : 'border-pink-600 border p-3'
            })
            setError('Username harus diisi')
        } else if( password.data === '' ) {
            setPassword({
                ...password,
                style : 'border-pink-600 border p-3 mb-4'
            })
            setError('Password harus diisi')
        }
    }
    return(
        <>
            <Navbar />
            <Modal>
                <div className='flex justify-center text-2xl font-bold text-purple-500'>
                JasaBase.</div>
                <form className='flex flex-col py-12 mx-8'>
                    <input type='text' value={username.data}
                        className={username.style}
                        onChange={usernameChange}
                        placeholder='Username'
                        />
                    <input type='password'  value={password.data}
                        className={password.style}
                        onChange={passwordChange}
                        placeholder='Password'
                        />
                    <span className='mt-4 mb-2 text-pink-600'>{error}</span>
                    <button onClick={submit}
                        className='p-3 font-bold text-white bg-gradient-to-r from-purple-500 to-purple-400 rounded-md'
                    >Login</button>
                </form>
            </Modal>
            <Footer/>
            </>
    )
}

export default Login
