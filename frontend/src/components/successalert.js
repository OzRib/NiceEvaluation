import { Overlay, Alert } from 'react-bootstrap';

export default function SuccessAlert({show, children}){
	return(
		<Overlay
			show={show}
			placement="bottom"
		>
			{({placement, arrowProps, show: _show, popper, ...props})=>(
			<Alert
				variant="success"
				{...props}
				show={show}
				style={{
					position: 'absolute',
					left: '50%',
					marginRight: '-50%',
					transform: 'translate(-50%, -50%)',
					bottom: '17%'
				}}
			>
				{children}
			</Alert>)}
		</Overlay>
	)
}
