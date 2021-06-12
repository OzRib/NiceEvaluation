import { Header, ContentBox, GenerateForm } from '../../components';

export default function Generate({match:{params}}){
	const subjectId = params.id

	return(
	<div className="flexColumn fullscreen bgcPrimary">
		<Header/>
		<ContentBox>
			<GenerateForm
				subjectId={subjectId}
			/>
		</ContentBox>
	</div>
	)
}
