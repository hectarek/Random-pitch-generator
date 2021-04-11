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
import { connectSignal } from 'tone';

// Note Lengths

// useStyles 
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const instrumentsDemo = [
  {
		name: "Synth",
		sound: "",
		range: [],
	},
  {
		name: "MetalSynth",
		sound: "",
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

  const [scale, setScale] = useState("");
  const [key, setKey] = useState("");

  const [switches, setSwitches] = useState({
    drone: true,
    octaveLimit: true,
  });

  const [length, setLength] = useState(2);
  const [rest, setRest] = useState(2);
  const [tempo, setTempo] = useState(60);

  // Synth State

  const [synth, setSynth] = useState(new Tone.Synth().toDestination());
  const [synthSettings, setSynthSettings] = useState({
    Synth: {
      oscillator: { type: "sine" },
    }
  });



  // Active State
  
  const [index, setIndex] = useState(0);
  const [note, setNote] = useState("C4")
  const [notes, setNotes] = useState(["C4", "E4", "G4"])

  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState(0);

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

  // Example of input [["E", 2],["A#", 5]];
  let randomNoteRange = generateAllTonesInRange([[rangeN1, rangeO1], [rangeN2, rangeO2]]);
  let randomNote = randToneFromRange([[rangeN1, rangeO1], [rangeN2, rangeO2]]);
  let timeInSeconds = tempoIntoSeconds(tempo);
  let lengthOfToneSustain = Math.floor(timeInSeconds * length);
  let totalTime = Math.floor((timeInSeconds * rest) + lengthOfToneSustain);

  // synth.oscillator.type = "sine";
  // const gain = new Tone.Gain(0.1);
  // gain.toDestination();

  const generateRandomNoteArray = () => {
    let placeHolder = [];
    for (let i=0; i<100; i++) {
      placeHolder.push(randToneFromRange([[rangeN1, rangeO1], [rangeN2, rangeO2]]));
    }
    setNotes(placeHolder);
  }

  const playLoop = (time) => {
    setTime(time + Tone.Transport.now());

    setInterval(() => {
      setTime(time + 1); 
      synth.triggerAttack(note, time);
      synth.triggerRelease(time + 0.1);
    }, 1000);
  }

  // Initalize only
  useEffect(() => {

    // Set inital time for repeater
    setTime(Tone.now());
    // Gerenate Entire array of random pitches
    generateRandomNoteArray();
    // What note is it at the time when index changes
    setNote(notes[index % notes.length]);

    playLoop(time);

    // Tone.Transport.scheduleRepeat(ticker => {
    //   setTime(ticker);
    //   synth.triggerAttack(note, ticker);
    //   synth.triggerRelease(ticker + 0.1);
    // }, 1);
  }, [])

  useEffect(() => {
    setIndex(index + 1);
    setNote(notes[index % notes.length]);
    console.log(note)
  }, [time])

  useEffect(() => {
    Tone.Transport.bpm.value = tempo;
  },[tempo])


  // *********************** END INITIAL STATE LOGIC ***********************


  // *********************** PLAY BUTTON LOGIC ***********************

  const handleClick = async () => {
    if(!playStatus) {
      setPlayStatus(true);
      await Tone.start();
      await Tone.Transport.start();
    } else {
      await Tone.Transport.stop();
      // await synth.dispose();
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