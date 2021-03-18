import * as React from 'react'
import dynamic from 'next/dynamic'

const LineIcon = dynamic(
    () => import('react-lineicons'),
    {ssr : false}
)


export default function CardService( { nama, alamat, harga, tipe, user, keterangan } ) {

    return(
        <>
            <div className='flex flex-row mb-4 overflow-hidden bg-white border border-gray-200 rounded-lg'>
                <div>
                    <img src='/assets/img/cover.png' width='250px' />
                </div>
                <div className='p-4 ml-4'>
                    <div className='text-xl font-bold'>{nama}</div>
                    <div className='text-sm text-gray-500'><LineIcon name='user'/> {user}</div>
                    <div>{keterangan.slice(0,10)}</div>
                    <div className='mt-1'><i><LineIcon name='map-marker'/></i> {alamat}</div>
                    <div className='flex flex-row mt-1'>
                        <div><i><LineIcon name='package'/></i> {tipe}</div>
                        <div className='mx-12'><i><LineIcon name='coin'/></i> {harga}</div> 
                    </div>
                </div>
            </div>
        </>
    )
}
