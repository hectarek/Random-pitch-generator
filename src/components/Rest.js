import { React } from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export function Rest(props) {
	return (
		<div className={props.styles.root}>
			<Typography id="discrete-slider-small-steps" gutterBottom>Rest Length</Typography>
			<Slider
				defaultValue={3}
				aria-labelledby="discrete-slider-small-steps"
				step={1}
				marks
				min={0}
				max={10}
				valueLabelDisplay="auto"
			/>
	</div>
	);
}
