import { useRouter } from 'next/router'
import axios from 'axios'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Layout from '../../components/layout'
import Header from '../../components/header'
import CardService from '../../components/card.service'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const LineIcon = dynamic(
   () => import('react-lineicons'),
   {ssr : false}
)


const Service = ({ service, otherServiceUser, otherServices }) => {
   const router = useRouter()
   if (router.isFallback) {
      return <div>Loading...</div>
   }
   console.log(otherServices)
   const user = service.user
   return(
      <>
         <Navbar/>
         <Header/>
         <Layout>
            <div className='w-full my-12 overflow-hidden bg-white rounded-lg'>
               <div className='w-full grid grid-cols-5'>
                  <div className='col-span-3'>
                     {service.image == null ?(
                        <>
                           <img src='/assets/img/cover.png'
                              width='100%'/>
                        </>
                     ) : (
                        <>
                           <img src={service.image}
                              widyh='100%' />
                        </>
                     )}
                  </div>
                  <div className='w-full p-12 col-span-2 bg-gradient-to-r from-purple-100 to-white'>
                     <div className='text-2xl font-bold'>{service.nama}</div>
                     <div>by : {user.username}</div>
                     <div className='inline-block pt-12'>
                        <div className='py-2 bg-white rounded-md'>
                           <i className='px-4 py-2 text-white bg-gradient-to-r from-pink-500 to-pink-400 rounded-md'>
                              <LineIcon name='package' /></i><span className='px-4'>{service.tipe}</span>
                        </div>
                        <div className='py-2 my-3 bg-white rounded-md'>
                           <i className='px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-purple-400 rounded-md'>
                              <LineIcon name='coin' /></i><span className='px-4'>{service.harga}</span>
                        </div>
                        <div className='py-2 bg-white rounded-md'>
                           <i className='px-4 py-2 text-white bg-gradient-to-tr from-blue-500 to-blue-400 rounded-md'>
                              <LineIcon name='map-marker' /></i><span className='px-4'>{service.alamat}</span>
                        </div>

                        <br/>
                     </div>
                  </div>
               </div>
               <div className='p-12'>
                  <div className='pb-2 text-2xl font-bold border-b'>
                     Deskripsi
                  </div>
                  <div className='py-4'>
                     {service.keterangan}
                  </div>
                  <div className='px-12 pt-8'>
                     <div className='mb-4 text-2xl font-bold'>Jasa {user.username} lainya</div>
                     {otherServiceUser.services.map((item) =>{
                        return(
                           <>
                              <div key={service.id}>
                                 <Link href={'/service/' + service.id}>
                                    <a>
                                       <CardService
                                          nama={service.nama}
                                          user={service.user.username}
                                          keterangan={service.keterangan.slice(0, 20)}
                                          harga={service.harga}
                                          tipe={service.tipe}
                                          alamat={service.alamat}
                                       />
                                    </a>
                                 </Link>
                              </div>
                           </>
                        )
                     })}
                  </div>
                  <div className='px-12 pt-8'>
                     <div class='font-bold text-2xl mb-4'>Jasa lainya</div>
                     {otherServices.map((service) => {
                        return (
                           <div key={service.id}>
                              <Link href={'/service/' + service.id}>
                                 <a>
                                    <CardService
                                       nama={service.nama}
                                       user={service.user.username}
                                       keterangan={service.keterangan.slice(0, 20)}
                                       harga={service.harga}
                                       tipe={service.tipe}
                                       alamat={service.alamat}
                                    />
                                 </a>
                              </Link>
                           </div>
                        )
                     }).slice(0, 5)}
                  </div>
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
      const res = await axios.get('http://localhost:4000/api/services/' + params.id)
      const service = res.data.service
      const resOtherServiceUser = await axios.get('http://localhost:4000/api/users/' + service.user.username )
      const otherServiceUser = resOtherServiceUser.data
      const resOtherServices = await axios.get('http://localhost:4000/api/services')
      const otherServices = resOtherServices.data
      console.log(otherServiceUser)
      return  { props : { service, otherServiceUser, otherServices, revalidate : 1 }}
   } catch (err) {
      console.log(err)
      return { notFound : true }
   }
}

export default Service
