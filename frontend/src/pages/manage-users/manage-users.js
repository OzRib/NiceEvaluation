import React from 'react';
import './manage-users.css';
import { checkLogin, userControl } from '../../communication';
import { ContentBox, ListUsers, AdminHeader, AddUser, SuccessAlert } from '../../components';
import { LoadingPage } from '../';

export default function ManageUsers(){
    const [loaded, setLoaded] = React.useState(false)
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

    async function onLoad(){
        const actions = {
            'user': function(){
                window.location.href = '/#/teacher-page'
            },
            'error': function(){
                window.location.href = '/#/'
            }
        }

        const resp = await checkLogin()
        const action = userControl(resp)
        if(actions[action.action] !== undefined)
            actions[action.action]()
	setLoaded(true)
    }

    React.useEffect(async ()=>{
	await onLoad()
    }, [])
    
    return(
        <div id="manage-users" className="flexColumn fullscreen">
	    {!loaded && <LoadingPage/>}
	    {loaded && 
	    <>
		<AdminHeader/>	
		<ContentBox className="flexColumn">
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
	    </>}            
       </div>
    )
}
