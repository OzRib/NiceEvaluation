export default function Question({questao, position}){
	const { id, corpo, itens, resposta } = questao

	return(
		<div className="border-transp border-rad20p flexColumn w100p po8 mt1p">
			<h5 className="boldText">Questão Nº {position}</h5>
			<h6
				className="text-muted"
			>
				Id da questão: {id}
			</h6>
			<h5>{corpo}</h5>
			{itens ? 
			<p>
				{Object.keys(itens).map(key =>(
				<>
					{key}) {itens[key]}<br/>
				</>
				))}
			</p>:null}
			<b>Resposta:</b>
			<p>
				{resposta}
			</p>
		</div>
	)
}
