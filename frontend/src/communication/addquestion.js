export default async function addQuestion(form, items=[], id=''){
	const questao = {
		'corpo': form.corpo.value,
		'resposta': form.resposta.value
	}

	let data = '';
	for(let x in questao){
		data+= x+'='+questao[x]+'&'
	}
	
	data += 'materia='+id+'&'
	
	if(items.length>0){
		data+= 'itens='+JSON.stringify(items)
	}

	console.log(data)

	const req = await fetch('/addQuestion.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: data
	})

	const resp = await req.json()

	return resp
}
