import React from 'react';
import User from './user';
import { Spinner } from 'react-bootstrap';

export default function ListUsers(){
	const [loaded, setLoaded] = React.useState(false)
	const [data, setData] = React.useState([])

	async function loadData(){
		const req = await fetch('/getUsers.php')
		const resp = await req.json()
		if(resp instanceof Array){
			setData(resp)
			return true
		}else{
			return false
		}
	}

	React.useEffect(async ()=>{
		const loaded = await loadData()
		setLoaded(loaded)
	}, [])
	return(
		<>
			{!loaded && <Spinner animation="border" variant="danger"/>}	
			{loaded && (
				<>
					{data.map((obj, key)=>(
						<User usuario={obj} key={key}/>
					))}
				</>
			)}
		</>
	)
}
