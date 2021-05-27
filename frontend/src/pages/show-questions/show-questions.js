import { Header, ContentBox, AddQuestion, ListThemes } from '../../components';

export default function ShowQuestions({match:{params}}){
	return(
		<div className="flexColumn fullscreen bgcPrimary">
			<Header/>
			<ContentBox>
				<AddQuestion
					subjectId={params.id}
				/>
			</ContentBox>
			<ListThemes
				subjectId={params.id}
			/>
		</div>
	)
}
