export default function sendForm(url, form){
  return new Promise((resolve, reject)=>{
    //Variable initialization
    let request = ''

    //Mounting the request in url format
    for(const key in form){
      request += key+'='+form[key]+'&'
    }
    
    //Configuring the request
    const req = new XMLHttpRequest()
    req.open('POST', url, true)
    req.responseType = 'json'
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    //When loaded the request...
    req.addEventListener('load', ()=>{
      if(req.status !== 200){
	reject('Erro de comunicação: '+req.statusText)
	return
      }
      const resp = req.response
      if(resp)
	resolve(resp)
      else
	reject('Resposta vazia')
    }, false)

    //When request throw error...
    req.addEventListener('error', ()=>{
      console.log('Erro: ', arguments)
      console.log(req)
      reject('Erro ajax')
    }, false)

    req.send(request)
  })
}
