import React from 'react';
import { ContentBox, GenerateForm } from '../../components';

export default function Generate({match:{params}}){
	const subjectId = params.id
	return(
		<React.Fragment>
			<ContentBox>
				<GenerateForm
					subjectId={subjectId}
				/>
			</ContentBox>
		</React.Fragment>
	)
}
