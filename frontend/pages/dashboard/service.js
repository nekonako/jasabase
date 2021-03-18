import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Sidenav from '../../components/sidenav'
import Dynamic from 'next/dynamic'
import Wilayah from '../../lib/data/wilayah.js'
import Menu from '../../components/menu'
import Link from 'next/link'
import Axios from 'axios'
import { useRouter } from 'next/router'
import * as React from 'react'

const LineIcon = Dynamic(
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

export default function Service({ token }) {
    console.log(token)
    const router = useRouter()

    React.useEffect(() => {
        if(token.token === '' || token.valid === false || token == undefined){
            return router.push('/login')
        }
    }, [])

    const [prov, setProv] = React.useState('')
    const [kab,setKab] = React.useState('')

    const provinsi = Object.keys(Wilayah)
    const [kabupaten, setKabupaten] = React.useState([])

    const provChange = (event) => {
        const value = event.target.value
        setProv(value)
        if(event) {
            setKabupaten(Wilayah[value])
            console.log(kabupaten)
        }
    }

    const kabChange = (event) => {
        const value = event.target.value
        setKab(value)
    }

    const [sukses, setSukses] = React.useState(false)
    const [error, setError] = React.useState('')
    const [service, setService] = React.useState({
        nama : '',
        harga : null,
        keterangan : '',
        tipe : 'online'
    })

    const namaChange = (event) => {
        const value = event.target.value
        setService({...service, nama : value})
    }
    const hargaChange = (event) => {
        const value = event.target.value
        setService({...service, harga : value})
    }
    const keteranganChange = (event) => {
        const value = event.target.value
        setService({...service, keterangan : value})
    }
    const tipeChange = (event) => {
        const value = event.target.value
        setService({...service, tipe : value})
    }

    const handleSubmit = () => {
        event.preventDefault()
        Axios.post('http://localhost:4000/api/users/service', {
            nama : service.nama,
            alamat : prov + ',' + kab,
            harga : service.harga,
            keterangan : service.keterangan,
            tipe : service.tipe,
            userId : token.data.id
        }, { headers : {
                authorization : token.token
            }})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <>
            <div className='flex flex-row bg-purple-50'>
                <div className='flex flex-col w-1/4 min-h-screen bg-purple-500'>
                    <Sidenav>
                        <Link href='/'><button className='text-2xl font-bold'>JasaBase.</button></Link>
                        <div className='flex flex-col mt-12'>
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
                            <div className='my-2 bg-purple-400 rounded-md'>
                                <Link href='/dashboard/service'>
                                    <a>
                                        <Menu>
                                            <i className='mr-4 text-xl'>
                                                <LineIcon name='package'/>
                                            </i>
                                            Jasa
                                        </Menu>
                                    </a>
                                </Link>
                            </div>
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
                    <div className='flex flex-col p-12 px-12 m-8 mx-24 bg-white rounded-lg'>
                        <div className='text-2xl'>Form pasang jasa</div>
                        <input type='text' value={service.nama}
                            className='p-3 my-2 mt-6 mb-8 border border-gray-300'
                            onChange={namaChange}
                            placeholder='Nama jasa'
                            />
                        <input type='text' value={service.harga}
                            className='p-3 my-2 mb-8 border border-gray-300'
                            onChange={hargaChange}
                            placeholder='Harga'
                            />
                        <div>
                            <div className='mb-2'>Tempat</div>
                            <select className='p-2 mr-2 bg-purple-100 border border-gray-300 appearance-none'
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
                            <select className='p-2 mr-4 bg-purple-100 border border-gray-300 appearance-none'
                                onChange={kabChange}>
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
                        <div className='mt-6'>
                            <textarea value={service.keterangan}
                                className='w-full p-3 border border-gray-300'
                                onChange={keteranganChange}
                                placeholder='Deskripsi jasa'
                                rows='10'
                                />
                        </div>
                        <div className='inline-block mt-6'>
                            <div className='mb-2'>Tipe jasa</div>
                            <select onChange={tipeChange} defaultValue='Online' className='p-2 bg-purple-100 border border-gray-300 appearance-none'>
                                <option>Online</option>
                                <option>Home service</option>
                                <option>Lainya</option>
                            </select>
                        </div>
                        <div className='text-right'>
                            <div className='inline-block'>
                                <button className='p-3 text-white bg-purple-500 rounded-md' onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}
