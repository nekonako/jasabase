import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
   return (
      <div className='w-full min-h-screen text-base antialiased text-gray-500 bg-white bg-purple-50'>
         <Component {...pageProps} />
      </div>
   )
}

export default MyApp
