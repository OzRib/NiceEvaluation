import React from 'react';
import { Header, ContentBox, AddQuestion, ListThemes } from '../../components';
import { LoadingPage } from '../';
import { checkLogin, userControl } from '../../communication';

export default function ShowQuestions({match:{params}, admin}){
	const reload = new Event('reload')

	return(
		<div className="flexColumn fullscreen bgcPrimary">
		{!loaded && <LoadingPage/>}
		{loaded && 
		<>
			<Header
				admin={admin}
			/>
			{showAdd &&
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
		</>}
		</div>
	)
}
