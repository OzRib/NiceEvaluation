import { Badge } from 'react-bootstrap';

export default function ThemeBadge({variant, children, onDelete}){
	return(
		<h4
			className="mh1p"	
		>
			<Badge
				variant={variant}
				style={{
					font: 'inheriy'
				}}
			>
				{children}{' '}
				<span
					className="boldText"
					onClick={()=>{
						onDelete()
					}}
				>
					×
				</span>
			</Badge>
		</h4>
	)
}
