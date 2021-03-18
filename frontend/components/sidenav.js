export default function Sidenav({ children }) {
   return(
      <>
         <div className='z-0 min-h-screen text-white bg-purple-500'>
            <div className='sticky top-0 p-8'>
               { children }
            </div>
            </div>
      </>
   )
}
