import { React } from "react";
import Slider from '@material-ui/core/Slider';

export function MultiNote(props) {
	return (
		<div className={props.classes.slider}>
			<Slider
				defaultValue={2}
				onChange={props.handleChange}
				aria-labelledby="discrete-slider-small-steps"
				step={1}
				valueLabelDisplay="auto"
				marks
				min={0}
				max={10}
			/>
		</div>
	);
}
