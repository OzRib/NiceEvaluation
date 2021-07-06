import React from 'react';
import './manage-users.css';
import { ContentBox, ListUsers, AddUser, SuccessAlert } from '../../components';

export default function ManageUsers({admin}){
    const [showMessage, setShowMessage] = React.useState(false)
    const [listUsers, setListUsers] = React.useState(true)
    const [message, setMessage] = React.useState(null)

    function reloadUsers(){
	let reload = false

	for(var x=0; x<2; x++){
	    setListUsers(reload)
	    reload = !reload
	}
    }

    function success(message){
	reloadUsers()
	setMessage(message)
	setShowMessage(true)
	setTimeout(()=>{
	    setShowMessage(false)
	}, 3000)
    }

    return(
      <React.Fragment>
	<ContentBox className="flexColumn AICenter">
	  <AddUser onSuccess={
	    message => {
	      success(message)
	    }
	  }/>
	</ContentBox>
	<ContentBox className="flexColumn AICenter">
	  <h6>Usuários:</h6>
	    {listUsers && <ListUsers 
	      onSuccess={
		message => {
		  success(message)
		}	
	      }
    	  />}
	</ContentBox>
	<SuccessAlert
	  show={showMessage}
	>
	  {message}
	</SuccessAlert>
      </React.Fragment>
    )
}
