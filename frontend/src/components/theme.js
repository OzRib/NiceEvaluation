export default function Theme({children, questions, href}){
	
	function handleClick(link){
		if(link)
			window.location.href = link
	}

	return(
		<div
			className="border-transp border-rad20p flexColumn w100p po8 mt1p focus bgcWhite"
			onClick={()=>{
				handleClick(href)
			}}
		>
			<h4>{children}</h4>
			<div 
				className="w100p flexColumn AIFlexEnd"
			>
				<h6 className="text-muted">
					{questions} {questions===1? 'questão': 'questões'}
				</h6>
			</div>
		</div>
	)
}
