import React from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';

export default function GenerateTheme({
	name, 
	children,
	value,
	max,
	onChange
}){

	return(
	<tr>
		<td>
			<FormLabel
				htmlFor={name}
			>
				{children}
			</FormLabel>
			:&nbsp;
		</td>
		<td>
			<FormControl
				type="number"
				min={0}
				name={name}
				id={name}
				className="wauto"
				value={value || 0}
				max={max}
				onChange={event => {
					onChange(event)
				}}
			/>
		</td>
		<td>
			&nbsp; Max: {max}
		</td>
	</tr>
	)
}
