export default function GetToken({ token }) {
    return (
    <>
      { token }
    </>
    )
}

export function getServerSideProps({req ,res}) {
    const Cookies = require('cookies')
    const cookies = new Cookies(req, res)
    const token = cookies.get('token') || ''
    console.log(token)
    return {
      props : {
         token : token
      }
    }
}
