import React from 'react';
import './subject.css';
import { Header, Choice } from '../../components';

export default function Subject({match:{params}}){
	return(
		<React.Fragment>
			<Choice 
				subjectId={params.id}	
			/>
		</React.Fragment>
	)
}
