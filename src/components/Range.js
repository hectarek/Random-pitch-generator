import { React } from "react";
import Slider from "@material-ui/core/Slider";
import Typography from '@material-ui/core/Typography';

export function Range(props) {
	return (
		<div className={props.styles.root}>
			<Typography id="range-slider" gutterBottom>Range</Typography>
			<Slider 
				value={props.value} 
				onChange={props.handleChange} 
				valueLabelDisplay="auto" 
				aria-labelledby="range-slider" 
			/>
		</div>
	);
}
