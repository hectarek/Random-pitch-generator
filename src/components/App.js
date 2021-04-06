import { React, useState, useEffect } from 'react';
import "../style/App.css";

// Component Imports 
import { Length } from "./Length";
import { Picker } from "./Picker";
import { Switches } from "./Switches";
import { Title } from "./Title";
import { Play } from "./Play";
import { Headings } from './Heading';
import { Rest } from './Rest';
import { Tempo } from './Tempo';

// UI Imports
import { makeStyles } from '@material-ui/core/styles';

// Logic Imports
import * as Tone from 'tone';
import instruments from '../script/instruments';
import keys from '../script/keys';
import scales from '../script/scales';
import octaves from '../script/octaves';
import {generateAllTonesInRange, randToneFromRange} from '../script/tone';

// Note Lengths

// useStyles 
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const instrumentsDemo = [
	{
		name: "MonoSynth",
		sound: '',
		range: [],
	},
  {
		name: "Synth",
		sound: '',
		range: [],
	},
  {
		name: "MetalSynth",
		sound: '',
		range: [],
	}
]

export default function App() {

  const classes = useStyles();

  // Setting Application State
  const [instrument, setInstrument] = useState("");

  const [rangeN1, setRangeN1] = useState("C");
  const [rangeO1, setRangeO1] = useState(3);
  const [rangeN2, setRangeN2] = useState("C");
  const [rangeO2, setRangeO2] = useState(5);

  const [minRange, setMinRange] = useState("");
  const [maxRange, setMaxRange] = useState("");

  const [scale, setScale] = useState("");
  const [key, setKey] = useState("");

  const [switches, setSwitches] = useState({
    drone: true,
    octaveLimit: true,
  });

  const [length, setLength] = useState();
  const [rest, setRest] = useState();
  const [tempo, setTempo] = useState();

  // Active State

  const [tones, setTones] = useState([]);

  const [play, setPlay] = useState(false);

  // Handle Functions
  const handleInstrumentPickerChange = (event) => {
    setInstrument(event.target.value);
  };

  const handleRangeN1PickerChange = (event) => {
    setRangeN1(event.target.value);
  };

  const handleRangeO1PickerChange = (event) => {
    setRangeO1(event.target.value);
  };

  const handleRangeN2PickerChange = (event) => {
    setRangeN2(event.target.value);
  };

  const handleRangeO2PickerChange = (event) => {
    setRangeO2(event.target.value);
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

  const handleLengthSliderChange = (event, newValue) => {
    setLength(newValue);
  };
  const handleRestSliderChange = (event, newValue) => {
    setRest(newValue);
  };
  const handleTempoSliderChange = (event, newValue) => {
    setTempo(newValue);
  };

  // *********************** ACTIVE STATE LOGIC ***********************

  let synth = instrumentsDemo.sound;

  // Tone Generation
  if(instrumentsDemo.name === "MonoSynth") {
    instrumentsDemo.sound = Tone.MonoSynth().toDestination();
  } else if (instrumentsDemo.name === "Synth") {
    instrumentsDemo.sound = new Tone.Synth().toDestination();
  } else if (instrumentsDemo.name === "MetalSynth") {
    instrumentsDemo.sound = new Tone.MetalSynth().toDestination();
  } else {
    instrumentsDemo.sound = new Tone.MonoSynth().toDestination();
  }
  
  useEffect(() => {

  })

  // *********************** END ACTIVE STATE LOGIC ***********************


  // *********************** PLAY BUTTON LOGIC ***********************

  const handleClick = async () => {

     // Example of input [["E", 2],["A#", 5]];
    let randomNoteRange = generateAllTonesInRange([[rangeN1, rangeO1], [rangeN2, rangeO2]]);
    let randomNote = randToneFromRange([[rangeN1, rangeO1], [rangeN2, rangeO2]]);

    console.log(randomNoteRange);
    console.log(randomNote);

    await Tone.start();
    const now = Tone.now();
    synth.triggerAttackRelease(randomNote, "8n", now);

    if(!play) {
    
      setPlay(true);
    } else {

      setPlay(false);
    }
  };

 // *********************** PLAY BUTTON LOGIC END ***********************

	return (
		<div className="container">
			<Title text={"Random Pitch Generator"}/>
      <Headings text={"INSTRUMENT"}/>
      <div className="range-container">
        <Picker 
          value={instrument}
          list={instrumentsDemo}
          helperText={"Pick an Instrument"}
          handleChange={handleInstrumentPickerChange}
        />
        
      </div>
      <div className="range-container">
        <Headings text={"PITCH"}/>
        <Picker 
          value={rangeN1}
          list={keys}
          helperText={"Pick a Note"}
          handleChange={handleRangeN1PickerChange}
        />
        <Picker 
          value={rangeO1}
          list={octaves}
          helperText={"Pick an Octave"}
          handleChange={handleRangeO1PickerChange}
        />
        <Picker 
          value={rangeN2}
          list={keys}
          helperText={"Pick a Note"}
          handleChange={handleRangeN2PickerChange}
        />
        <Picker 
          value={rangeO2}
          list={octaves}
          helperText={"Pick an Octave"}
          handleChange={handleRangeO2PickerChange}
        />
      </div>
      <div className="range-container">
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
      </div>  
      
      <Headings text={"LENGTH"}/>
      <Length 
        value={length}
        styles={classes}
        handleChange={handleLengthSliderChange}
      />
      <Rest 
        value={rest}
        styles={classes}
        handleChange={handleRestSliderChange}
      />
      <Tempo 
        value={tempo}
        styles={classes}
        handleChange={handleTempoSliderChange}
      />
      <Play 
        handleClick={handleClick}
      />
		</div>
	);
}