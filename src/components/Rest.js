import { React } from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export function Rest(props) {
	return (
		<div className={props.styles.root}>
			<Typography id="discrete-slider-small-steps" gutterBottom>Rest Length</Typography>
			<Slider
				defaultValue={3}
				onChange={props.handleChange} 
				aria-labelledby="discrete-slider-small-steps"
				step={1}
				valueLabelDisplay="off"
				marks={props.noteLengths}
				min={1}
				max={4}
			/>
	</div>
	);
}
