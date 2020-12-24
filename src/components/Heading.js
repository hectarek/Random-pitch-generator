import { React } from "react";
import Typography from "@material-ui/core/Typography";

export function Headings(props) {
	return (
		<Typography variant="h4" component="h4">
			{props.text}
		</Typography>
	);
}
