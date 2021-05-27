export default function Question({questao}){
	const { id, corpo, itens, resposta } = questao

	return(
		<div className="border-transp border-rad20p flexColumn w100p po8 mt1p">
			<h5 className="boldText">Questão Nº {id}</h5>
			<h5>{corpo}</h5>
			{itens ? 
			<p>
				{Object.keys(itens).map(key =>(
				<>
					{key}) {itens[key]}<br/>
				</>
				))}
			</p>:null}
			<p>
				{itens ? 
				<>
					{resposta.item}) {resposta.resposta}
				</> : resposta}
			</p>
		</div>
	)
}
