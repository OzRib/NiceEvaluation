import React from 'react';
import './login.css';
import { Form, Button, Alert } from 'react-bootstrap';

export default function Login(){
    const [show, setShow] = React.useState(false)
    const [error, setError] = React.useState(null)

    async function checkLogged(){
        const req = await fetch('/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=null&senha=null'
        })

        const resp = await req.json()

        if(resp.access === 'granted')
            window.location.href = '/#/home'
    }

    async function tryLogin(login){
        const req = await fetch('/login.php', {
            method: 'POST',
            body: new FormData(login)
        })

        const resp = await req.json()

        return resp
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
        const login = document.forms.login
        const resp = await tryLogin(login)
        if(resp.access === 'granted')
            window.location.href = '/#/home'
        else{
            setError(resp.error)
            showError()
        }
    }

    return(
        <div className="login flexColumn">
            <Form name="login" className="flexColumn" id="login" onSubmit={event => handleSubmit(event)}>
                <Form.Label>
                    <h3 className="whiteText boldText">Nome de Usuário/Email</h3>
                </Form.Label>
                <Form.Control type="text" name="id" id="id"/>
                <Form.Label>
                    <h3 className="whiteText boldText">Senha</h3>
                </Form.Label>
                <Form.Control type="password" name="senha" id="senha"/>
                <Button variant="primary" type="submit">
                    Entrar
                </Button>
                <a href="/#">Esqueci minha senha</a>
            </Form>
            <Alert variant="danger" show={show}>
                {error}
            </Alert>
        </div>
    )
}