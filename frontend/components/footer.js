import dynamic from 'next/dynamic'
import Link from 'next/link'

const LineIcon = dynamic(
    () => import('react-lineicons'),
    {ssr : false}
)

export default function Footer() {
    return(
        <div>
            <div className='w-full py-8 text-center bg-white'>
                <p className='pb-3'>Follow kami</p>
                <i className='px-1 text-2xl text-white bg-blue-500 rounded-md'><LineIcon name='facebook' /></i>
                <i className='px-1 mx-4 text-2xl text-white bg-blue-400 rounded-md'><LineIcon name='twitter' /></i>
                <i className='px-1 text-2xl text-white bg-gradient-to-tr from-pink-600 to-pink-400 rounded-md'><LineIcon name='instagram' /></i>
                <p className='pt-8'>
                    <Link href='#'><a className='px-4'>Privacy Policy</a></Link>
                    <Link href='#'><a className='px-4'>About</a></Link>
                    <Link href='#'><a className='px-4'>Blog</a></Link>
                    <Link href='#'><a className='px-4'>Kontak</a></Link>
                    <Link href='#'><a className='px-4'>Pasang jasa</a></Link>
                </p>
                <p className='pt-4 text-sm'>
                © 2020 JasaBase - All Rights Reserved.
                </p>
            </div>
        </div>
    )
}
