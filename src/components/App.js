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
import {generateAllNotes, scales} from '../script/scales';
import {allNotesInOrder, rangeForSlider} from '../script/range';
import octaves from '../script/octaves';
import {randToneFromRange, tupleToAbsoluteTone, tempoIntoSeconds} from '../script/tone';

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

  const errorCheckRange = () => {
    // Logic to check to see if range is overlapping and fix
    let minRang = tupleToAbsoluteTone([rangeN1, rangeO1]);
    let maxRang = tupleToAbsoluteTone([rangeN2, rangeO2]);
     
    if (allNotesInOrder.indexOf(minRang) > allNotesInOrder.indexOf(maxRang)) {
      setRangeN2(rangeN1);
      setRangeO2(rangeO1);
      setRangeN1(prevRangeN2.current);
      setRangeO1(prevRangeO2.current);
    }
    console.log("This ", allNotesInOrder.indexOf(minRang), "should be shorter than");
    console.log("this ", allNotesInOrder.indexOf(maxRang));

  }

  // Generating Note Array for Sequencer
  const generateRandomNoteArray = () => {
    let placeHolder = [];
    for (let i=0; i<100; i++) {
      placeHolder.push(randToneFromRange([[rangeN1, rangeO1], [rangeN2, rangeO2]]));
    }
    let filter = generateAllNotes(scale, key);
    let arr = placeHolder.filter(note => filter.includes(note));
    return arr;
  }
  
  const [currentNote, setCurrentNote] = useState("wait")
  const [notes, setNotes] = useState(generateRandomNoteArray())

   // Setting Synth State
  //  const [synth, setSynth] = useState(new Tone.Synth().toDestination());

   const [synth, setSynth] = useState(sampler.toDestination());

  //  const [synthSettings, setSynthSettings] = useState({
  //   Synth: {
  //     oscillator: { type: "sine" },
  //   }
  // });

  // Setting State for Sequencer
   const [sequencer, setSequencer] = useState(new Tone.Sequence((time, note) => {
     synth.triggerAttackRelease(note, lengthInSecs, time)
     setCurrentNote(note);
   }, notes, total));

   const generateNewSequencer = () => {
    setNotes(generateRandomNoteArray());
    setSequencer(new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, lengthInSecs, time)
      setCurrentNote(note);
    }, notes, total))
   }
 
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

  // Resetting the notes range of notes
  useEffect(() => {
    prevRangeN1.current = rangeN1;
    errorCheckRange();
    setNotes(generateRandomNoteArray());
  }, [rangeN1])

  useEffect(() => {
    prevRangeO1.current = rangeO1;
    errorCheckRange();
    setNotes(generateRandomNoteArray());
  }, [rangeO1])

  useEffect(() => {
    prevRangeN2.current = rangeN2;
    errorCheckRange();
    setNotes(generateRandomNoteArray());
  }, [rangeN2])

  useEffect(() => {
    prevRangeO2.current = rangeO2;
    errorCheckRange();
    setNotes(generateRandomNoteArray());
  }, [rangeO2])

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
      generateNewSequencer();
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