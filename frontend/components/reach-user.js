import dynamic from 'next/dynamic'
const LineIcon = dynamic(
   () => import('react-lineicons'),
   {ssr : false}
)


export default function ReachUser({icon, name, bgcolor}){
   return(
      <>
         <div className='bg-white shadow-md bg-purple-50 overflow-hidden rounded-md'>
            <i className='px-2 bg-purple-400 rounded-md text-white text-xl'>
               <LineIcon name={icon}/>
            </i>
            <span className='p-4'>
               {name}
            </span>
         </div>
      </>
   )
}
