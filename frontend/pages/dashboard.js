import * as React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Sidenav from '../components/sidenav'
import dynamic from 'next/dynamic'
import Menu from '../components/menu'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

const LineIcon = dynamic(
    () => import('react-lineicons'),
    {ssr : false}
)

export async function getServerSideProps ({ req, res }) {
    try {
        const Cookies = require('cookies')
        const cookies = new Cookies(req, res)
        const token = cookies.get('token') || ''
        const jwt = require('jsonwebtoken')
        let isValid
        let decoded
        token !== '' ? (
            await jwt.verify(token, 'megumikato', (err, decode) => {
                decoded = decode
                err ? isValid = false : isValid = true
            })) : token
        return {
            props : {
                token : {
                    token : token,
                    valid : isValid,
                    data : decoded
                }
            }
        }
    } catch (err) {
        console.log (err)
    }
}

export default function Dashboard({ token }) {
    const router = useRouter()
    React.useEffect(() => {
        if(token.token === '' || token.valid === false || token == undefined){
            return router.push('/login')
        }
    }, [])

    return(
        <>
            <div className='flex flex-row bg-purple-50'>
                <div className='flex flex-col w-1/4 min-h-screen'>
                    <Sidenav>
                        <Link href='/'><button className='text-2xl font-bold'>JasaBase.</button></Link>
                        <div className='flex flex-col mt-12'>
                            <div className='bg-purple-400 rounded-md'>
                                <Link href='/dashboard'>
                                    <a>
                                        <Menu>
                                            <i className='mr-4 text-xl'>
                                                <LineIcon name='home'/>
                                            </i>
                                            Dashboard
                                        </Menu>
                                    </a>
                                </Link>
                            </div>
                            <a href='/dashboard/service' className='my-2'>
                                <Menu>
                                    <i className='mr-4 text-xl'>
                                        <LineIcon name='package'/>
                                    </i>
                                    Jasa
                                </Menu>
                            </a>
                            <Link href='/dashboard/setting'>
                                <a>
                                    <Menu>
                                        <i className='mr-4 text-xl'>
                                            <LineIcon name='cog'/>
                                        </i>
                                        Setting
                                    </Menu>
                                </a>
                            </Link>
                        </div>
                    </Sidenav>
                </div>
                <div className='w-3/4 min-h-screen'>
                    <div className='p-8 m-4 bg-white rounded-lg'>
                        <div className='mb-6 text-xl font-bold'>Profile</div>
                        <div className='flex flex-row'>
                            <div>
                                <img src='https://avatars.githubusercontent.com/u/46141275?s=460&u=0fdc83ddbdfb7238d4ca1602231c024e4b721445&v=4'
                                    width='250px' style={{ borderRadius : '50%' }}
                                    className='border-8 border-purple-300'
                                    />
                            </div>
                            <div className='mt-4 ml-12'>
                                <div className='flex flex-row justify-between'>
                                    <div>
                                        <div className='text-3xl font-bold'> Galih Wisnuaji</div>
                                        <div>@nekonako</div>
                                    </div>
                                    <div>
                                        <button className='px-4 py-1 text-white bg-purple-400 rounded-md'>Edit</button>
                                    </div>
                                </div>
                                <div className='mt-8'>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <div className='py-2 overflow-hidden bg-white shadow-md bg-purple-50 rounded-md'>
                                                <i className='p-4 mr-4 text-2xl text-white bg-blue-400 rounded-lg'>
                                                    <LineIcon name='twitter'/>
                                                </i>
                                                <span className='p-4'>
                                                Twitter
                                                </span>
                                            </div>
                                            <div className='py-2 mt-4 overflow-hidden bg-white shadow-md bg-purple-50 rounded-md'>
                                                <i className='p-4 mr-4 text-2xl text-white bg-pink-400 rounded-lg'>
                                                    <LineIcon name='link'/>
                                                </i>
                                                <span className='p-4'>
                                                Website
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='py-2 overflow-hidden bg-white shadow-md bg-purple-50 rounded-md'>
                                                <i className='p-4 mr-4 text-2xl text-white bg-red-400 rounded-lg'>
                                                    <LineIcon name='envelope'/>
                                                </i>
                                                <span className='p-4'>
                                                Email
                                                </span>
                                            </div>
                                            <div className='py-2 mt-4 overflow-hidden bg-white shadow-md bg-purple-50 rounded-md'>
                                                <i className='p-4 mr-4 text-2xl text-white bg-yellow-400 rounded-lg'>
                                                    <LineIcon name='map-marker'/>
                                                </i>
                                                <span className='p-4'>
                                                Location
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Footer/> */}
                </div>
            </div>
            </>
    )
}

