import React from 'react';
import './subject.css';
import { Header, Choice } from '../../components';
import { checkLogin, userControl } from '../../communication';
import { LoadingPage} from '../';

export default function Subject({match:{params}}){
	return(
		<div  id="subject" className="flexColumn fullscreen">
			{!loaded && <LoadingPage/>}
			{loaded &&
			<>
				<Header
					admin={admin}
				/>
				<Choice 
					subjectId={params.id}	
				/>
			</>}
		</div>
	)
}
