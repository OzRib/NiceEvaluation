import { Spinner } from 'react-bootstrap';

export default function LoadingPage(){
	return(
		<div className="flexColumn fullscreen AICenter JCCenter">
			Carregando...
			<Spinner animation="border" variant="danger"/>
		</div>
	)
}
