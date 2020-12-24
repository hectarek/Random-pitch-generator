import { React } from "react";
import Typography from "@material-ui/core/Typography";

export function Title(props) {
	return (
		<Typography variant="h3" component="h3">
			{props.text}
		</Typography>
	);
}
