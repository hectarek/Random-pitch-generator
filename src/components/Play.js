import { React } from "react";
import Button from "@material-ui/core/Button";

export function Play(props) {
	return (
		<div className="container-box">
			<Button id="pitch-button" variant="contained" color="primary" onClick={props.handleClick}>
				{props.playStatus ? "Pause" : "Play"}
			</Button>
		</div>
	);
}
