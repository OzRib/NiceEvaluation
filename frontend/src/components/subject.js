export default function Subject({materia, id}){
	return(
		<div 
			className="flexRow border-transp w100p border-rad20p po8 mt1p focus bgcwhite"
			onClick={()=>{
				window.location.href = '/#/subject/'+id
			}}
		>
			<div className="flexColumn w100p">
				<h5
					className="boldText"
				>
					{materia.nome}
				</h5>
				<p className="text-muted">
					{materia.descricao}
				</p>
			</div>
			<div className="w100p flexColumn AIFlexEnd JCFlexEnd text-muted">
				{materia.questoes === 0? 'Sem': materia.questoes} {materia.questoes === 1 ? 'questão': 'questões'}
			</div>
		</div>
	)
}
