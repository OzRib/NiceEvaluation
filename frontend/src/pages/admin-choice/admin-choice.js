import { Button, Image } from 'react-bootstrap';
import './admin-choice.css' 
import logo from '../../logo.png';

export default function AdminChoice(){

    async function onLoad(){
        const actions = {
            'user': function(){
                window.location.href = '/#/teacher-page'
            },
            'error': function(){
                window.location.href = '/#/'
            }
        }
    } 

    onLoad()
    return(
        <div className="admin-choice flexColumn AICenter fullscreen">
            <Image className="mediumLogo" src={logo}></Image>
            <Button variant="success" className="choice" href="/#/manage-users">Gerenciamento de Usuários</Button>
            <Button variant="success" className="choice" href="/#/teacher-page">Página dos Profesores</Button>
        </div>
    )
}