import { React } from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export function Rest(props) {
	return (
		<div className={props.classes.slider}>
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
