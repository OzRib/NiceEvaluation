import { Button } from 'react-bootstrap';

export default function Options({links}){
	const flexDirections = ['AIFlexEnd', 'AIFlexStart']
	const childrens = ['Prova', 'Gabarito']
	const downloads = ['prova.pdf', 'gabarito.pdf']

	return(
	<div className="w100p flexRow">
		{Array(2).fill().map((trash, key)=>(
		<div
			className={"w100p flexColumn mh1p "+flexDirections[key]}
		>
			<Button
				as='a'
				href={links[key]}
				download={downloads[key]}
			>
				Salvar {childrens[key]}
			</Button>
		</div>
		))}
	</div>
	)
}
