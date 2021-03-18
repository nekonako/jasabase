import axios from 'axios'

export default async function getAllService(){
   const res = await axios.get('http://localhost:4000/api/')
   return res.data
}

export default async function Register()
