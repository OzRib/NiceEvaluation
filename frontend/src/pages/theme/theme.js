import React from 'react';
import { ListQuestions } from '../../components';

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
