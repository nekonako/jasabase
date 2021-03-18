import axios from 'axios'

export default async function register(username, password, email){
   try {
      await axios.post('http://localhost:4000/api/daftar', {
         username : username,
         password : password,
         email : email
      })
         .then(res => {
            return res
         })
         .catch(err => {
            return err
         })
   } catch(err) {
      return err
   }
}
