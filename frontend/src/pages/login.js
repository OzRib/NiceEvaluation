import './login.css'
import { Form, Button } from 'react-bootstrap';

export default function Login(){      
    return(
        <div className="login flexColumn">
            <Form name="login" className="flexColumn">
                <Form.Label>
                    <h3 className="whiteText boldText">Nome de Usuário/Email</h3>
                </Form.Label>
                <Form.Control type="text" name="id" id="id"/>
                <Form.Label>
                    <h3 className="whiteText boldText">Senha</h3>
                </Form.Label>
                <Form.Control type="password" name="senha" id="senha"/>
                <Button variant="primary">
                    Entrar
                </Button>
                <a href="/#">Esqueci minha senha</a>
            </Form>
        </div>
    )
}