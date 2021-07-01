import React from 'react';
import { Header, ListQuestions } from '../../components';
import { checkLogin, userControl } from '../../communication';
import { LoadingPage } from '../';

export default function Theme({match:{params}}){
	const { subjId, theme } = params

	return(
		<div className="flexColumn fullscreen bgcPrimary">
			{!loaded && <LoadingPage/>}
			{loaded &&
			<>
				<Header
					admin={admin}
				/>
				<ListQuestions
					subjectId={subjId}
					theme={theme}
				/>
			</>}
		</div>
	)
}
