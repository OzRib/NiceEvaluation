import { ProgressBar } from 'react-bootstrap';

export default function LoadingEvaluation({configs, loaded}){
	const { computable, percent } = configs
	const now = computable? percent: 100
	const label = computable? `${percent}%`: undefined

	return(
	<div className="w100p">
		<center>
			<h5>
				{loaded? 'Baixado':'Baixando prova...'}
			</h5>
			<ProgressBar
				animated={!computable}
				label={label}
				now={now}
			/>
		</center>
	</div>
	)
}
