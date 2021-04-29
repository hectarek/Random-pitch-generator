import { React } from "react";
import Typography from "@material-ui/core/Typography";

export function Headings(props) {
	return (
		<Typography variant="h5" component="h5">
			{props.text}
		</Typography>
	);
}
