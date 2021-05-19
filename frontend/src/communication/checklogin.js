export default async function checkLogin(){
    const req = await fetch('/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'id=null&senha=nulll'
    })

    const resp = await req.json()

    return(resp)
}