import React from 'react';
import { Header, ContentBox, GenerateForm } from '../../components';
import { checkLogin, userControl } from '../../communication';
import { LoadingPage } from '../';

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
