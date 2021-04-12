import { React } from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export function Tempo(props) {
	return (
		<div className={props.styles.root}>
			<Typography id="tempo-markings" gutterBottom>Tempo</Typography>
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
