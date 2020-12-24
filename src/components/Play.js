import { React } from "react";
import Button from "@material-ui/core/Button";

export function Play() {
	return (
		<div className="container-box">
			<Button id="pitch-button" variant="contained" color="primary">
				Random Pitch
			</Button>
		</div>
	);
}
