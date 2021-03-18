import Head from 'next/head'
import CardService from '../components/card.service'
import Link from 'next/link'
import Navbar from '../components/navbar'
import Layout from '../components/layout'
import Header from '../components/header'
import Footer from '../components/footer'
import jwtDecode from 'jwt-decode'
import * as React from 'react'

export default function Home({ services, token }){

    const [user, setUser] = React.useState('')
    React.useEffect(() => {
        if(token != '') {
            const userData = jwtDecode(token)
            setUser(userData)
        }
    }, [])

    return (
        <>
            {token === '' ? <Navbar hasLogin={false}/> : <Navbar hasLogin={true} username={user.username} />}
            <Header/>
            <Layout>
                <div className='flex flex-row mt-12'>
                    <div className='w-2/3'>
                        {services.map((service) => {
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
                        })}
                    </div>
                    <div className='z-0 w-1/3 ml-4 bg-white rounded-lg'>
                        <div className='sticky flex flex-col min-h-screen px-8 pt-4 top-24'>
                            <div className='text-xl font-bold'>Mau pasang jasa ?</div>
                            <div className='text-purple-500'>
                                <Link href='/daftar'>Sini daftar dulu gan.
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            <Footer/>
            </>
    )
}

export async function getServerSideProps({req, res}){
   const axios = require('axios')
    const Cookies = require('cookies')
    const cookies = new Cookies(req, res)
    const token = cookies.get('token') || ''
    console.log(token)

    let data = null
    await axios.get('http://localhost:4000/api/services')
        .then(res => {
            data = res.data
        })
        .catch(err => {
            console.log(err)
        })
    return {
        props : {
            services : data,
            token : token
        }
    }
}
