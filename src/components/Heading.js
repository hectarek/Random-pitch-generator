import { React } from "react";
import Typography from "@material-ui/core/Typography";

export function Headings(props) {
	return (
		<Typography variant="h6" component="h6">
			{props.text}
		</Typography>
	);
}
