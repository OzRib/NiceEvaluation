export default async function tryLogin(login){
    const req = await fetch('/login.php', {
        method: 'POST',
        body: new FormData(login)
    })

    const resp = await req.json()

    return resp
}