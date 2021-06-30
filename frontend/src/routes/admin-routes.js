import React from 'react';
import { Route } from 'react-router-dom';
import { Header } from '../components';
import { LoadingPage, ManageUsers } from '../pages';

export default function AdminRoutes({admin}){
	if(!admin)
		window.location.href = '/#/home/teacher-page'
	return(
	<React.Fragment>
		{admin &&
		<React.Fragment>
			<Route exact path='/home/manage-users' component={ManageUsers}/>
		</React.Fragment>}
	</React.Fragment>
	)
}
