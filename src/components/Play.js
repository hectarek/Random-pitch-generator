import { React, useState } from "react";
import Button from "@material-ui/core/Button";

export function Play(props) {
	const [playStatus, setPlayStatus] = useState(false);
	const handleClick = () => {
		setPlayStatus(!playStatus);
		props.handleClick(playStatus);
	}
	
	return (
		<div>
			<Button 
				id="pitch-button" 
				variant="contained" 
				color="primary" 
				onClick={handleClick}>
					
				{playStatus ? "Pause" : "Play"}
			</Button>
		</div>
	);
}
