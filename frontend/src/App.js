import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Login, AdminChoice, ManageUsers, TeacherPage } from './pages';

function App() {
  return (
    <div className="flexColumn">
      <HashRouter>
	<Route exact path='/' component={Login}/>
	<Route exact path='/admin-choice' component={AdminChoice}/>
	<Route exact path='/manage-users' component={ManageUsers}/
	<Route exact path='/teacher-page' component={TeacherPage}/>
      </HashRouter>
    </div>
  );
}

export default App;
