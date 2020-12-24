import { React } from "react";
import Slider from "@material-ui/core/Slider";
import Typography from '@material-ui/core/Typography';
import rangeForSlider from '../script/range';

export function Range(props) {
	return (
		<div className={props.styles.root}>
			<Typography id="range-slider" gutterBottom>Range</Typography>
			<Slider 
				value={props.value} 
				onChange={props.handleChange} 
				valueLabelDisplay="auto" 
				valueLabelFormat={val => rangeForSlider.get(val).name}
				min={1}
				step={1}
				max={108}
				aria-labelledby="range-slider" 
			/>
		</div>
	);
}
