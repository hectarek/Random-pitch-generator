import { React } from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export function Length(props) {
	return (
		<div className={props.styles.root}>
			<Typography id="discrete-slider-small-steps" gutterBottom>Note Length</Typography>
			<Slider
				defaultValue={2}
				onChange={props.handleChange} 
				aria-labelledby="discrete-slider-small-steps"
				step={1}
				valueLabelDisplay="auto"
				marks
				min={1}
				max={10}
			/>
	</div>
	);
}
