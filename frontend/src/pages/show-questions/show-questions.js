import React from 'react';
import { Header, ContentBox, AddQuestion, ListThemes } from '../../components';
import { LoadingPage } from '../';
import { checkLogin, userControl } from '../../communication';

export default function ShowQuestions({match:{params}, admin}){
	const reload = new Event('reload')

	return( 
		<React.Fragment>
			{admin &&
			<ContentBox className="flexColumn AICenter">
				<AddQuestion
					subjectId={params.id}
					onClose={async ()=>{
						document.dispatchEvent(reload)
					}}
				/>
			</ContentBox>}
			<ListThemes
				subjectId={params.id}
			/>
		</React.Fragment>
	)
}
