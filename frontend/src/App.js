import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, HashRouter } from 'react-router-dom';
import { 
	Login, 
	AdminChoice, 
	ManageUsers, 
	TeacherPage, 
	Subject,
	Generate,
	ShowQuestions,
	Theme
} from './pages';

function App() {
  return (
    <div className="flexColumn">
      <HashRouter>
	<Route exact path='/' component={Login}/>
	<Route exact path='/admin-choice' component={AdminChoice}/>
	<Route exact path='/manage-users' component={ManageUsers}/>
	<Route exact path='/teacher-page' component={TeacherPage}/>
	<Route exact path='/subject/:id' component={Subject}/>
	<Route exact path='/subject/:id/generate' component={Generate}/>
	<Route exact path='/subject/:id/show-questions' component={ShowQuestions}/>
	<Route exact path='/subject/:subjId/theme/:theme' component={Theme}/>
      </HashRouter>
    </div>
  );
}

export default App;
