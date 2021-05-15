import { React, useState } from "react";
import Button from "@material-ui/core/Button";

export function Play(props) {
	return (
		<div>
			<Button 
				id="pitch-button" 
				variant="contained" 
				color="primary" 
				disabled={props.isDisabled}
				onClick={props.handleClick}
			>	
				{props.playStatus ? "Pause" : "Play"}
			</Button>
		</div>
	);
}
