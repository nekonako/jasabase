import * as React from 'react'
import Layout from './layout'
import dynamic from 'next/dynamic'
import Wilayah from '../lib/data/wilayah.js'

const LineIcon = dynamic(
   () => import('react-lineicons'),
   {ssr : false}
)


export default function Header(){
   const [prov, setProv] = React.useState('')
   const [kab,setKab] = React.useState('')
   const provinsi = Object.keys(Wilayah)
   const [kabupaten, setKabupaten] = React.useState([])

   const place = (event) => {
      const value = event.target.value
      setProv(value)
      if(event){
      }
   }

   const provChange = (event) => {
      const value = event.target.value
      setProv(value)
      if(event) {
         setKabupaten(Wilayah[value])
         console.log(kabupaten)
      }
   }

   return(
      <>
         <div className='w-full text-white pb-36 bg-gradient-to-t from-purple-600 to-purple-400 pt-36'>
            <Layout>
               <div className='mb-8'>
                  <div className='text-3xl font-bold'>Portal pencari jasa di seluruh indonesia</div>
                  <div className='pt-2'>Temukan jasa <b>apapaun</b> yang kamu inginkan di sini</div>
               </div>
            </Layout>
         </div>
         <Layout>
            <div className='p-6 mx-48 -mt-24 text-center bg-white rounded-lg shadow-lg'>
               <input type='text' className='w-full p-4 border border-purple-200 rounded-lg ' placeholder='Cari jasa yang kamu inginkan'/>
               <div className='flex flex-row justify-between m-4'>

                  <div>
                     <select className='p-2 mr-2 bg-purple-100 appearance-none rounded-md'
                        onChange={provChange}
                     >
                        <option value=''>Provinsi...</option>
                        {provinsi.map((item) => {
                           return(
                              <>
                                 <option>{item}</option>
                              </>
                           )
                        })}
                     </select>
                     <select className='p-2 mr-4 bg-purple-100 appearance-none rounded-md'>
                        <option value=''>Kota...</option>
                        {kabupaten != null ? kabupaten.map((item) => {
                           return(
                              <>
                                 <option>{item.slice(0,15)}</option>
                              </>
                           )
                        }) : (
                           <option value=''>Kota...</option>
                        )}
                     </select>
                  </div>
                  <div>
                     <button className='px-4 py-2 text-white bg-purple-500 rounded-lg'>
                        <LineIcon name='search' /> Cari</button>
                  </div>
               </div>
            </div>
         </Layout>
      </>
   )
}
