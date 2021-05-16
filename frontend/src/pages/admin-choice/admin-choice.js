import { Button, Image } from 'react-bootstrap';
import './admin-choice.css' 
import logo from '../../logo.png';

export default function AdminChoice(){
    return(
        <div className="admin-choice flexColumn AICenter fullscreen">
            <Image className="mediumLogo" src={logo}></Image>
            <Button variant="success" className="choice" href="/#/user-manage">Gerenciamento de Usuários</Button>
            <Button variant="success" className="choice">Página dos Profesores</Button>
        </div>
    )
}