export default function sendRequest(url){
  return new Promise((resolve, reject)=>{
    const req = new XMLHttpRequest()
    req.open('GET', url, true)
    req.responseType = 'json'

    req.addEventListener('load', ()=>{
      if(req.status !== 200){
	reject('Erro de comunicação'+req.statusText)
	return
      }
      const resp = req.response
      if(resp)
	resolve(resp)
      else
	reject('Resposta vazia')
    }, false)
    
    req.addEventListener('error', ()=>{
      console.log('Error', arguments)
      console.log(req)
      reject('Erro ajax')
    })
	    req.send(null)
  })
}
