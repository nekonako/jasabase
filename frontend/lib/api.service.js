import axios from 'axios'

export default async function getAllService(data){
   try {
      return await axios.get('http://localhost:4000/api/')
         .then(res => {
            res.data
         })
         .catch(err => {
            console.log(err)
         })
   } catch (err) {
      console.log(err)
   }
}
