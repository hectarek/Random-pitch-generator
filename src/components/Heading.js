import { React } from "react";
import Typography from "@material-ui/core/Typography";

export function Headings(props) {
	return (
		<Typography color="primary" variant="body1" component="body1">
			{props.text}
		</Typography>
	);
}
