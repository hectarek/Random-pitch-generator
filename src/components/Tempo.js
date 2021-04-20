import { React } from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export function Tempo(props) {
	return (
		<div className={props.classes.slider}>
			<Slider
				defaultValue={120}
				onChange={props.handleChange}
				aria-labelledby="tempo-markings"
				step={1}
				min={0}
				max={400}
				valueLabelDisplay="auto"
			/>
		</div>
	);
}
