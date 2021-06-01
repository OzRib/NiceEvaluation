import { Spinner } from 'react-bootstrap';

export default function LoadingPage(){
	return(
		<div className="flexColumn fullscreen AICenter JCCenter">
			<b>Carregando...</b>
			<Spinner animation="border" variant="danger"/>
		</div>
	)
}
