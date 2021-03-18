export default function Modal({ children }){
    return(
        <>
            <div className='flex items-center justify-center min-w-full min-h-screen bg-purple-100 bg-opacity-25'>
                <div className='m-4 p-6 bg-white rounded-lg shadow-md place-content-center'>
                    { children }
                </div>
            </div>
            </>
    )
}
