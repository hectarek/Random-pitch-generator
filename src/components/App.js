import { React, useState } from 'react';
import "../style/App.css";

// Component Imports 
import { Length } from "./Length";
import { Picker } from "./Picker";
import { Range } from "./Range";
import { Switches } from "./Switches";
import { Title } from "./Title";
import { Play } from "./Play";
import { Headings } from './Heading';
import { Rest } from './Rest';
import { Tempo } from './Tempo';

// UI Imports
import { makeStyles } from '@material-ui/core/styles';

// Logic Imports
import instruments from '../script/instruments';
import keys from '../script/keys';
import scales from '../script/scales';

// Note Lengths

const noteLengths = [{
    value: 1,
    label: 'Eighth',
  },
  {
    value: 2,
    label: 'Quarter',
  },
  {
    value: 3,
    label: 'Half',
  },
  {
    value: 4,
    label: 'Whole',
  }];

// useStyles 
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function App() {

  const classes = useStyles();

  // Setting Application State
  const [instrument, setInstrument] = useState("");
  const [scale, setScale] = useState("");
  const [key, setKey] = useState("");

  const [switches, setSwitches] = useState({
    drone: true,
    octaveLimit: true,
  });

  const [range, setRange] = useState([37, 61]);
  const [length, setLength] = useState();
  const [rest, setRest] = useState();
  const [tempo, setTempo] = useState();

  // Handle Functions
  const handleInstrumentPickerChange = (event) => {
    setInstrument(event.target.value);
  };
  const handleScalePickerChange = (event) => {
    setScale(event.target.value);
  };
  const handleKeyPickerChange = (event) => {
    setKey(event.target.value);
  };

  const handleSwitchesChange = (event) => {
    setSwitches({ ...switches, [event.target.name]: event.target.checked });
  };

  const handleRangeSliderChange = (event, newValue) => {
    setRange(newValue);
  };
  const handleLengthSliderChange = (event, newValue) => {
    setLength(newValue);
  };
  const handleRestSliderChange = (event, newValue) => {
    setRest(newValue);
  };
  const handleTempoSliderChange = (event, newValue) => {
    setTempo(newValue);
  };
  
	return (
		<div className="container">
			<Title text={"Random Pitch Generator"}/>
      <Headings text={"INSTRUMENT"}/>
      <div className="range-container">
        <Picker 
          value={instrument}
          list={instruments}
          helperText={"Pick an Instrument"}
          handleChange={handleInstrumentPickerChange}
        />
        <Picker 
          value={scale}
          list={scales}
          helperText={"Pick an Scale"}
          handleChange={handleScalePickerChange}
        />
        <Picker 
          value={key}
          list={keys}
          helperText={"Pick an Key"}
          handleChange={handleKeyPickerChange}
        />
      </div>
      <div className="range-container">
        <Switches 
          text={"Drone?"}
          handleChange={handleSwitchesChange}
          check={switches.drone}
          name={"drone"}
          />
          <Switches 
          text={"Limit Octave?"}
          handleChange={handleSwitchesChange}
          check={switches.octaveLimit}
          name={"octaveLimit"}
          />
      </div>  
      <Headings text={"PITCH"}/>
      <Range 
        value={range}
        styles={classes}
        handleChange={handleRangeSliderChange}
      />
      <Headings text={"LENGTH"}/>
      <Length 
        value={length}
        styles={classes}
        noteLengths={noteLengths}
        handleChange={handleLengthSliderChange}
      />
      <Rest 
        value={rest}
        styles={classes}
        noteLengths={noteLengths}
        handleChange={handleRestSliderChange}
      />
      <Tempo 
        value={tempo}
        styles={classes}
        handleChange={handleTempoSliderChange}
      />
      <Play />
		</div>
	);
}