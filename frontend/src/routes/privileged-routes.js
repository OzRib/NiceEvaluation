import React from 'react';
import { Route } from 'react-router-dom';
import { ShowQuestions } from '../pages';

export default function PrivilegedRoutes({admin}){
	return(
	<React.Fragment>
		<Route 
			exact path='/home/subject/:id/show-questions'
			render={props =>(
				<ShowQuestions
					{...props}
					admin={admin}
				/>)
			}
		/>
	</React.Fragment>
	)
}
