import './subject.css'
import { Header, Choice } from '../../components'

export default function Subject({match:{params}}){
	console.log(params)
	return(
		<div  id="subject" className="flexColumn fullscreen">
			<Header/>
			<Choice 
				subjectId={params.id}	
			/>
		</div>
	)
}
