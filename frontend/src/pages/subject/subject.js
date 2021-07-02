import React from 'react';
import './subject.css';
import { Header, Choice } from '../../components';
import { checkLogin, userControl } from '../../communication';
import { LoadingPage} from '../';

export default function Subject({match:{params}}){
	return(
		<React.Fragment>
			<Choice 
				subjectId={params.id}	
			/>
		</React.Fragment>
	)
}
