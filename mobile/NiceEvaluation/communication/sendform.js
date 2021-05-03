export default function sendForm(url, form){
  return new Promise((resolve, reject)=>{
    let request = ''
    for(const key in form){
      request += key+'='+form[key]+'&'
    }
    const req = new XMLHttpRequest()
    req.open('POST', url, true)
    req.responseType = 'json'

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

    req.addEventListener('error', ()=>{
      console.log('Erro: ', arguments)
      console.log(req)
      reject('Erro ajax')
    }, false)
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    req.send(request)
  })
}
