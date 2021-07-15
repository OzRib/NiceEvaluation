import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { checkLogin, userControl } from '../../communication';
import { LoadingPage } from '../';
import './admin-choice.css' 
import logo from '../../logo.png';

export default function AdminChoice(){
    const [loaded, setLoaded] = React.useState(false)

    async function onLoad(){
        const actions = {
            'user': function(){
		window.location.href = '/#/home/teacher-page'
            },
            'error': function(){
                window.location.href = '/#/'
            }
        }

	const resp = await checkLogin()
	const action = userControl(resp)
	if(actions[action.action] !== undefined)
	    actions[action.action]()
	else
	    setLoaded(true)
    } 

    React.useEffect(async ()=>{
	await onLoad()
    }, [])
    return(
        <div id="admin-choice">
	    {!loaded && <LoadingPage/>}
	    {loaded && 
	    <div className="flexColumn fullscreen AICenter pt7p">
                <Image className="mediumLogo" src={logo}></Image>
		<Button variant="success" className="choice" href="/#/home/manage-users">Gerenciamento de Usuários</Button>
		<Button variant="success" className="choice" href="/#/home/teacher-page">Página dos Profesores</Button>
	    </div>}
        </div>
    )
}
