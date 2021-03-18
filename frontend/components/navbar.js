import Layout from './layout'
import Link from 'next/link'
import * as React from 'react'

export default function Navbar({ hasLogin, username }) {
        return(
        <>
            <div className='fixed z-10 w-full p-4 bg-white md:p-5 shadow-sm'>
                <Layout>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='text-3xl font-extrabold text-purple-500'>
                            <Link href='/'>
                            JasaBase.
                            </Link>
                        </div>
                        <div className='flex flex-row'>
                            {hasLogin ? (
                            <>
                                <div> {username} </div>
                                </>
                            ) : (
                            <>
                                <button className='px-4 py-2 mr-4 text-white rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 bg-gra'>
                                    <Link href='/login'>Login</Link></button>
                                <button className='px-4 py-2 text-white bg-gradient-to-r from-pink-500 to-pink-400 rounded-md'>
                                    <Link href='daftar'>Daftar</Link></button>
                                </>
                            )}
                        </div>
                    </div>
                </Layout>
            </div>
            </>
    )
}
