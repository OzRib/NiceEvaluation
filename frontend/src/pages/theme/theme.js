import React from 'react';
import { Header, ListQuestions } from '../../components';
import { checkLogin, userControl } from '../../communication';
import { LoadingPage } from '../';

export default function Theme({match:{params}}){
	const { subjId, theme } = params

	return(
		<React.Fragment>
			<ListQuestions
				subjectId={subjId}
				theme={theme}
			/>
		</React.Fragment>
	)
}
