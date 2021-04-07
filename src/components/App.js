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
import {generateAllTonesInRange, randToneFromRange, tempoIntoSeconds} from '../script/tone';

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
		sound: new Tone.MonoSynth().toDestination(),
		range: [],
	},
  {
		name: "Synth",
		sound: new Tone.Synth().toDestination(),
		range: [],
	},
  {
		name: "MetalSynth",
		sound: new Tone.MonoSynth().toDestination(),
		range: [],
	}
]

export default function App() {

  const classes = useStyles();

  // Setting Application State
  const [instrument, setInstrument] = useState("Synth");

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

  const [playStatus, setPlayStatus] = useState(false);

  // Handle Functions
  const handleInstrumentPickerChange = (event) => {setInstrument(event.target.value);};
  const handleRangeN1PickerChange = (event) => {setRangeN1(event.target.value);};
  const handleRangeO1PickerChange = (event) => {setRangeO1(event.target.value);};
  const handleRangeN2PickerChange = (event) => {setRangeN2(event.target.value);};
  const handleRangeO2PickerChange = (event) => {setRangeO2(event.target.value);};
  const handleScalePickerChange = (event) => {setScale(event.target.value);};
  const handleKeyPickerChange = (event) => {setKey(event.target.value);};
  const handleSwitchesChange = (event) => {setSwitches({ ...switches, [event.target.name]: event.target.checked });};
  const handleLengthSliderChange = (event, newValue) => {setLength(newValue);};
  const handleRestSliderChange = (event, newValue) => {setRest(newValue);};
  const handleTempoSliderChange = (event, newValue) => {setTempo(newValue);};

  // *********************** INITIAL STATE LOGIC ***********************

  let synth;

  // Determining which sound is chosen
  if(instrument === instrumentsDemo[0].name["MonoSynth"]) {
    synth = instrumentsDemo[0].sound;
  } else if (instrument === instrumentsDemo[1].name["Synth"]) {
    synth = instrumentsDemo[1].sound;
  } else if (instrument === instrumentsDemo[2].name["MetalSynth"]) {
    synth = instrumentsDemo[2].sound;
  } else {
    synth = instrumentsDemo[1].sound;
  }
  
  // Example of input [["E", 2],["A#", 5]];
  let randomNoteRange = generateAllTonesInRange([[rangeN1, rangeO1], [rangeN2, rangeO2]]);
  let randomNote = randToneFromRange([[rangeN1, rangeO1], [rangeN2, rangeO2]]);
  let timeInSeconds = tempoIntoSeconds(tempo);

  // Tone.Transport.timeSignature = 4;
  // Tone.Transport.bpm.value = tempo;

  const loopA = new Tone.Loop(time => {
    synth.triggerAttackRelease(randomNote, "4n", time);
  }, "1n").start('8n');

  loopA.loop = true;
  loopA.loopEnd = "1m";
  
  useEffect(() => {

  })

  // *********************** END INITIAL STATE LOGIC ***********************


  // *********************** PLAY BUTTON LOGIC ***********************

  const handleClick = async () => {

    console.log(randomNoteRange);
    console.log(randomNote);
  
    if(!playStatus) {
      await Tone.Transport.start();
      setPlayStatus(true);
    } else {
      await Tone.Transport.stop();
      setPlayStatus(false);
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
        playStatus={playStatus}
      />
		</div>
	);
}