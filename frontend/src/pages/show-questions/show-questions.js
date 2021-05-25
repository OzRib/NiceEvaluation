import { Header, ContentBox } from '../../components';

export default function ShowQuestions({match:{params}}){
	return(
		<div className="flexColumn fullscreen bgcPrimary">
			<Header/>
			<ContentBox>
			</ContentBox>
		</div>
	)
}
