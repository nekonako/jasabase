export default function Input(){
   return(
      <>
         <input type='text' value={username.data}
            className={username.style}
            onChange={usernameChange}
            placeholder='Username'
         />
      </>
   )
}
