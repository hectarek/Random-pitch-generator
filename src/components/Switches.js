import { React } from "react";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

export function Switches(props) {
	return (
		<div className="container-box tad-margin">
            <Typography id="range-slider" gutterBottom>{props.text}</Typography>
            <Switch 
                checked={props.checked} 
                onChange={props.handleChange} 
                color="primary" 
                name="checkedB" 
                inputProps={{ "aria-label": "primary checkbox" }}
            />
		</div>
	);
}
