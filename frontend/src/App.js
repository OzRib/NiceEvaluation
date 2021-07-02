import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, HashRouter } from 'react-router-dom';
import { Login, AdminChoice } from './pages';
import { LoggedRoutes } from './routes';

function App() {
	return (
	<HashRouter>
		<Route exact path='/' component={Login}/>
		<Route exact path='/admin-choice' component={AdminChoice}/>
		<Route path='/home'>
			<LoggedRoutes/>
		</Route>
	</HashRouter>
	);
}

export default App;
