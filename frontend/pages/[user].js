import { useRouter } from 'next/router'
import axios from 'axios'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Layout from '../components/layout'
import Header from '../components/header'
import CardService from '../components/card.service'
import Link from 'next/link'
import ReachUser from '../components/reach-user'

const User = ({ user }) => {
   const router = useRouter()
   if (router.isFallback) {
      return <div>Loading...</div>
   }
   const username = user.username
   return(
      <>
         <Navbar/>
         <Header/>
         <Layout>
            <div className='flex flex-row mt-12'>
               <div className='z-0 mr-4 w-1/3 ml-4 bg-white rounded-lg'>
                  <div className='sticky flex flex-col items-center justify-center min-h-screen px-8 top-0'>
                     {user.avatar === '' ? (
                        <>
                           <img src='https://avatars.githubusercontent.com/u/46141275?s=460&u=0fdc83ddbdfb7238d4ca1602231c024e4b721445&v=4'
                              width='250px'
                              style={{ borderRadius : '50%' }}
                              className='border-8 border-purple-300'/>
                        </>
                     ) : (
                        <>
                           <img src={user.avatar} width='250px' />
                        </>
                     )}
                     <div className='font-bold text-3xl mt-4'>{user.username}</div>
                           </div>
               </div>
               <div className='w-2/3'>
                  {user.services.map((service) => {
                     return (
                        <div key={service.id}>
                           <Link href={'/'+ username + '/' + service.id}>
                              <a>
                                 <CardService
                                    nama={service.nama}
                                    user={username}
                                    keterangan={service.keterangan.slice(0, 20)}
                                    harga={service.harga}
                                    tipe={service.tipe}
                                    alamat={service.alamat}
                                 />
                              </a>
                           </Link>
                        </div>
                     )
                  })}
               </div>
            </div>
         </Layout>
         <Footer/>
      </>
   )
}

export async function getStaticPaths(){
   return { paths: [], fallback: true };
}

export async function getStaticProps({params}){
   try {
      const res = await axios.get('http://localhost:4000/api/' + params.user)
      const user = res.data
      return  { props : { user, revalidate : 1 }}
   } catch (err) {
      console.log(err)
      return { notFound : true }
   }
}

export default User
