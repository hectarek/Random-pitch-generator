import { React, useState, useEffect, useRef } from 'react';
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
import {sampler} from '../script/instruments';
import keys from '../script/keys';
import {relativeTones, generateAllNotes, scales, createScale} from '../script/scales';
import {allNotesInOrder, rangeForSlider} from '../script/range';
import octaves from '../script/octaves';
import {randToneFromRange, tupleToAbsoluteTone, tempoIntoSeconds} from '../script/tone';

const GENERATED_LIST_SIZE = 100;

// useStyles 
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const instrumentsDemo = [
  {
		name: "Piano",
		sound: "",
		range: [],
	}
]

var sequencer = null;
var currentScaleNotes = null;

export default function App() {
  const classes = useStyles();

  // Setting State of Input Field Values
  const [instrument, setInstrument] = useState("Piano");

  const [rangeN1, setRangeN1] = useState("C");
  const [rangeO1, setRangeO1] = useState(3);
  const [rangeN2, setRangeN2] = useState("C");
  const [rangeO2, setRangeO2] = useState(5);

  //Previous Values of range
  const prevRangeN1 = useRef("C");
  const prevRangeO1 = useRef(3);
  const prevRangeN2 = useRef("C");
  const prevRangeO2 = useRef(5);

  const [scale, setScale] = useState("Chromatic");
  const [key, setKey] = useState("C");

  const [switches, setSwitches] = useState({
    drone: false,
    octaveLimit: false,
  });

  const [length, setLength] = useState(2);
  const [rest, setRest] = useState(2);
  const [tempo, setTempo] = useState(120);
  const [playStatus, setPlayStatus] = useState(false);

  // Setting State of Calculated Values
  const [tempoInSecs, setTempoInSecs] = useState(tempoIntoSeconds(tempo))
  const [lengthInSecs, setLengthInSecs] = useState(length * tempoInSecs);
  const [restInSecs, setRestInSecs] = useState(rest * tempoInSecs);
  const [total, setTotal] = useState(lengthInSecs + restInSecs);

  // Error Checking on Range Fields
  const rangesInValidOrder = (note1, note2) => {
    // Logic to check to see if range is invalid
    let minRang = tupleToAbsoluteTone(note1);
    let maxRang = tupleToAbsoluteTone(note2);
     
    return (allNotesInOrder.indexOf(maxRang) >= allNotesInOrder.indexOf(minRang));
  }

  // Generating Note Array for Sequencer
  const randomNoteGenerator = () => {
    // The index in allNotes of the min and max range notes
    let minIndex = allNotesInOrder.indexOf(tupleToAbsoluteTone([rangeN1, rangeO1]));
    let maxIndex = allNotesInOrder.indexOf(tupleToAbsoluteTone([rangeN2, rangeO2]));

    let validNotes = [];
    let allNotesInScale = generateAllNotes(scale, key);
    for(let i = minIndex; i <= maxIndex; i++) {
      let note = allNotesInOrder[i];
      if(allNotesInScale.includes(note)) {
        validNotes.push(note);
      }
    }

    let returnList = [];
    for(let i = 0; i < GENERATED_LIST_SIZE; i++) {
      returnList.push(validNotes[Math.floor(Math.random() * validNotes.length)]);
    }

    return returnList;
  }

  const [currentNote, setCurrentNote] = useState("wait")

   // Setting Synth State
  //  const [synth, setSynth] = useState(new Tone.Synth().toDestination());

  //  const [synthSettings, setSynthSettings] = useState({
  //   Synth: {
  //     oscillator: { type: "sine" },
  //   }
  // });
 
  const updateCurrentScaleNotes = () => {
    currentScaleNotes = createScale(scale, key);
  }

  // Handle Functions
  const handleInstrumentPickerChange = (event) => {setInstrument(event.target.value);};
  const handleRangeN1PickerChange = (event) => {
    if(rangesInValidOrder([event.target.value, rangeO1], [rangeN2, rangeO2])) {
      setRangeN1(event.target.value);
    } else {

    }
  };
  const handleRangeO1PickerChange = (event) => {
    if(rangesInValidOrder([rangeN1, event.target.value], [rangeN2, rangeO2])) {
      setRangeO1(event.target.value);
    } else {
      
    }
  };
  const handleRangeN2PickerChange = (event) => {
    if(rangesInValidOrder([rangeN1, rangeO1], [event.target.value, rangeO2])) {
      setRangeN2(event.target.value);
    } else {
      
    }
  };
  const handleRangeO2PickerChange = (event) => {
    if(rangesInValidOrder([rangeN1, rangeO1], [rangeN2, event.target.value])) {
      setRangeO2(event.target.value);
    } else {
      
    }
  };
  const handleScalePickerChange = (event) => {
    setScale(event.target.value);
    updateCurrentScaleNotes();
  };
  const handleKeyPickerChange = (event) => {
    setKey(event.target.value);
    updateCurrentScaleNotes();
  };
  const handleSwitchesChange = (event) => {setSwitches({ ...switches, [event.target.name]: event.target.checked });};
  const handleLengthSliderChange = (event, newValue) => {setLength(newValue);};
  const handleRestSliderChange = (event, newValue) => {setRest(newValue);};
  const handleTempoSliderChange = (event, newValue) => {setTempo(newValue);};

  // *********************** INITIAL STATE LOGIC ***********************

  // Recalculating Tempo and Length Logic
  useEffect(() => { 
    setTempoInSecs(tempoIntoSeconds(tempo));
  }, [tempo]);

  useEffect(() => {
    setLengthInSecs(length * tempoInSecs);
    setRestInSecs(rest * tempoInSecs);
  },[length, rest, tempo]);

  useEffect(() => {
    setTotal(lengthInSecs + restInSecs);
  }, [lengthInSecs, restInSecs]);

  // *********************** END INITIAL STATE LOGIC ***********************


  // *********************** PLAY BUTTON LOGIC ***********************

  const handleClick = async () => {
    await Tone.start();

    if(!playStatus) {
      var synth = sampler.toDestination();
      sequencer = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, lengthInSecs, time)
        setCurrentNote(note);
      }, randomNoteGenerator(), total);

      // When you click "PLAY"
      setPlayStatus(true);
      sequencer.start();
      Tone.Transport.start("+0.25");
      return;
    } else {
      // When you click "PAUSE"
      setPlayStatus(false);
      Tone.Transport.stop();
      sequencer.stop();
      sequencer.clear();
      
      return;
    }
  };

 // *********************** PLAY BUTTON LOGIC END ***********************

	return (
		<div className="container">
			<Title text={"Noteworthy.music"}/>
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

          <div>
            <h1>{currentNote}</h1>
          </div>
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