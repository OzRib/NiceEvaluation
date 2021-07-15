import React from 'react';
import './login.css';
import logo from '../../logo.png';
import { Form, Button, Alert, Image } from 'react-bootstrap';
import { tryLogin, checkLogin, userControl } from '../../communication';
import { LoadingPage } from '../';

export default function Login(){
    const [loaded, setLoaded] = React.useState(false)
    const [show, setShow] = React.useState(false)
    const [error, setError] = React.useState(null)

    async function onLoad(){
        const actions = {
            'admin': function(){
		window.location.href = '/#/admin-choice'
            },
            'user': function(){
		window.location.href = '/#/home/teacher-page'
            }
        }

        const resp = await checkLogin()
        const action = userControl(resp)
        if(actions[action.action] !== undefined)
            actions[action.action]()
	else
	    setLoaded(true)
    }

    function showError(){
        const seconds3 = 3000

        setShow(true)
        setTimeout(()=>{
            setShow(false)
        }, seconds3)
    }

    async function handleSubmit(event){
        event.preventDefault()
        const actions = {
            'admin' : function(){
		window.location.href = '/#/admin-choice'
            },
            'user': function(){
		window.location.href = '/#/home/teacher-page'
            },
            'error': function(error){
                setError(error)
                showError()
            }
        }

        const login = document.forms.login
        const resp = await tryLogin(login)

        const action = userControl(resp)
        if(action.action !== undefined)
            actions[action.action](action.error)
    }

    React.useEffect(async ()=>{
	await onLoad()
    })

    return(
        <div id="login">
	    {!loaded && <LoadingPage/>}
	    {loaded &&
	    <div className="flexColumn AICenter fullscreen pt7p">
		<Image className="mediumLogo" src={logo}></Image>
		<Form name="login" className="flexColumn AICenter" id="login" onSubmit={event => handleSubmit(event)}>
		    <Form.Label className="label" htmlFor="id">
			<div className="whiteText boldText f1o5">Nome de Usuário ou Email</div>
		    </Form.Label>
		    <Form.Control type="text" name="id" id="id" placeholder="Insira seu nome de usuário ou Email"/>
		    <Form.Label className="label" htmlFor="senha">
			<div className="whiteText boldText f1o5">Senha</div>
		    </Form.Label>
		    <Form.Control type="password" name="senha" id="senha" placeholder="Insira sua senha"/>
		    <Button variant="success" type="submit" id="submit">
			Entrar
		    </Button>
		    <a href="/#" class="newLink boldText">Esqueci minha senha</a>
		</Form>
		<Alert variant="danger" show={show}>
		    {error}
		</Alert>
	    </div>}
        </div>
    )
}
