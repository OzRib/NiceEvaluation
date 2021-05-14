export async function checkLogged(){
    const req = await fetch('/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'id=null&senha=nulll'
    })

    const resp = await req.json()

    return(resp.access === 'granted')
}

export async function tryLogin(login){
    const req = await fetch('/login.php', {
        method: 'POST',
        body: new FormData(login)
    })

    const resp = await req.json()

    return resp
}