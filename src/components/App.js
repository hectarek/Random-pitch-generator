import { React, useState, useEffect } from 'react';

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
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';

// Logic Imports
import * as Tone from 'tone';
import { sampler } from '../script/instruments';
import keys from '../script/keys';
import { generateAllNotes, scales, createScale } from '../script/scales';
import { allNotesInOrder } from '../script/range';
import octaves from '../script/octaves';
import { tupleToAbsoluteTone, tempoIntoSeconds } from '../script/tone';

const GENERATED_LIST_SIZE = 100;

// useStyles 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  instPicker: {
    margin: theme.spacing(1),
    minWidth: "140px"
  },
  pickers: {
    margin: theme.spacing(1),
    minWidth: "110px"
  },
  slider: {
    width: "100%",
  },
}));

const instrumentsDemo = [
  {
    name: "Piano",
    sound: "",
    range: [],
  }
]

var sequencer = null;
var drone = null;
var metronome = null;
var currentScaleNotes = null;

export default function App() {
  const classes = useStyles();

  // Setting State of Input Field Values
  const [instrument, setInstrument] = useState("Piano");

  const [rangeN1, setRangeN1] = useState("C");
  const [rangeO1, setRangeO1] = useState(3);
  const [rangeN2, setRangeN2] = useState("C");
  const [rangeO2, setRangeO2] = useState(5);

  const [scale, setScale] = useState("Chromatic");
  const [key, setKey] = useState("C");

  const [switches, setSwitches] = useState({
    drone: false,
    metronome: false,
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
    for (let i = minIndex; i <= maxIndex; i++) {
      let note = allNotesInOrder[i];
      if (allNotesInScale.includes(note)) {
        validNotes.push(note);
      }
    }

    let returnList = [];
    for (let i = 0; i < GENERATED_LIST_SIZE; i++) {
      returnList.push(validNotes[Math.floor(Math.random() * validNotes.length)]);
    }

    return returnList;
  }

  // Setting Synth State

  const updateCurrentScaleNotes = () => {
    currentScaleNotes = createScale(scale, key);
  }

  // Handle Functions
  const handleInstrumentPickerChange = (event) => { setInstrument(event.target.value); };
  const handleRangeN1PickerChange = (event) => {
    if (rangesInValidOrder([event.target.value, rangeO1], [rangeN2, rangeO2])) {
      setRangeN1(event.target.value);
    } else {

    }
  };
  const handleRangeO1PickerChange = (event) => {
    if (rangesInValidOrder([rangeN1, event.target.value], [rangeN2, rangeO2])) {
      setRangeO1(event.target.value);
    } else {

    }
  };
  const handleRangeN2PickerChange = (event) => {
    if (rangesInValidOrder([rangeN1, rangeO1], [event.target.value, rangeO2])) {
      setRangeN2(event.target.value);
    } else {

    }
  };
  const handleRangeO2PickerChange = (event) => {
    if (rangesInValidOrder([rangeN1, rangeO1], [rangeN2, event.target.value])) {
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
  const handleSwitchesChange = (event) => { setSwitches({ ...switches, [event.target.name]: event.target.checked }); };
  const handleLengthSliderChange = (event, newValue) => { setLength(newValue); };
  const handleRestSliderChange = (event, newValue) => { setRest(newValue); };
  const handleTempoSliderChange = (event, newValue) => { setTempo(newValue); };

  // *********************** INITIAL STATE LOGIC ***********************

  // Recalculating Tempo and Length Logic
  useEffect(() => {
    setTempoInSecs(tempoIntoSeconds(tempo));
  }, [tempo]);

  useEffect(() => {
    setLengthInSecs(length * tempoInSecs);
    setRestInSecs(rest * tempoInSecs);
  }, [length, rest, tempo]);

  useEffect(() => {
    setTotal(lengthInSecs + restInSecs);
  }, [lengthInSecs, restInSecs]);

  // *********************** END INITIAL STATE LOGIC ***********************


  // *********************** PLAY BUTTON LOGIC ***********************

  const handleClick = async () => {
    await Tone.start();

    if (!playStatus) {
      let synthA = sampler.toDestination();
      sequencer = new Tone.Sequence((time, note) => {
        synthA.triggerAttackRelease(note, lengthInSecs, time)
      }, randomNoteGenerator(), total).start(0);

      // if (switches.drone) {
      //   let synthB = new Tone.Synth().toDestination();
      //   drone = new Tone.Loop(time => {
      //     synthB.triggerAttackRelease("C3", time, time);
      //   }, tempoInSecs).start(0);
      // }

      if (switches.metronome) {
        let synthC = new Tone.PluckSynth().toDestination();
        metronome = new Tone.Loop(time => {
          synthC.triggerAttackRelease("C4", 0.05, time);
        }, tempoInSecs).start(0);
      }

      // When you click "PLAY"
      setPlayStatus(true);
      sequencer.start();
      // if (switches.drone) {
      //   drone.start();
      // }
      if (switches.metronome) {
        metronome.start();
      }
      Tone.Transport.start("+0.001");
      return;
    } else {
      // When you click "PAUSE"
      setPlayStatus(false);
      Tone.Transport.stop();
      sequencer.stop();
      sequencer.clear();
      // if (switches.drone) {
      //   drone.stop();
      // }
      if (switches.metronome) {
        metronome.stop();
      }

      return;
    }
  };

  // *********************** PLAY BUTTON LOGIC END ***********************

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
        <Grid item xs={0} sm={12}>
          <Title text={"Noteworthyapp.net"} />
        </Grid>
        <Grid container item xs={12} direction="column" justify="center" alignItems="center">
          <Headings text={"Instruments"} />
          <Picker classes={classes.instPicker} value={instrument} list={instrumentsDemo} id={"intrument-id"} label={"Pick an Instrument"} labelIDs={"instrument-id-label"} handleChange={handleInstrumentPickerChange} />
        </Grid>
        <Grid container item xs={12} md={9} direction="row" justify="space-evenly" alignItems="center">
          <Grid container item xs={6} direction="column" justify="space-evenly" alignItems="center">
            <Grid item xs={12}>
              <Headings text={"Lower Limit"} />
            </Grid>
            <Grid container item xs={12} direction="row" justify="space-evenly" alignItems="center">
              <Picker classes={classes.pickers} id={"note1-id"} value={rangeN1} list={keys} label={"Pick a Note"} labelIDs={"note1-id-label"} handleChange={handleRangeN1PickerChange} />
              <Picker classes={classes.pickers} id={"octave1-id"} value={rangeO1} list={octaves} label={"Pick an Octave"} labelIDs={"octave1-id-label"} handleChange={handleRangeO1PickerChange} />
            </Grid>
          </Grid>
          <Grid container item xs={6} direction="column" justify="space-evenly" alignItems="center">
            <Grid item xs={12}>
              <Headings text={"Upper Limit"} />
            </Grid>
            <Grid container item xs={12} direction="row" justify="space-evenly" alignItems="center">
              <Picker classes={classes.pickers} id={"note2-id"} value={rangeN2} list={keys} label={"Pick a Note"} labelIDs={"note2-id-label"} handleChange={handleRangeN2PickerChange} />
              <Picker classes={classes.pickers} id={"octave2-id"} value={rangeO2} list={octaves} label={"Pick an Octave"} labelIDs={"octave2-id-label"} handleChange={handleRangeO2PickerChange} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={8} direction="row" justify="space-evenly" alignItems="center">
          <Grid container item xs={6} direction="column" justify="space-around" alignItems="center">
            <Headings text={"Scale"} />
            <Picker classes={classes.pickers} id={"scale-id"} value={scale} list={scales} label={"Pick a Scale"} labelIDs={"scale-id-label"} handleChange={handleScalePickerChange} />
          </Grid>
          <Grid container item xs={6} direction="column" justify="space-around" alignItems="center">
            <Headings text={"Key"} />
            <Picker classes={classes.pickers} id={"key-id"} value={key} list={keys} label={"Pick a Key"} labelIDs={"key-id-label"} handleChange={handleKeyPickerChange} />
          </Grid>
        </Grid>
        <Grid container item xs={12} direction="row" justify="space-evenly" alignItems="center">
          <Switches check={switches} nameA={"drone"} nameB={"metronome"} labelA={"Drone"} labelB={"Metronome"} handleChange={handleSwitchesChange} />
        </Grid>
        <Grid container item direction="column" justify="center" alignItems="center" spacing={0}>
          <Grid container item xs={10} sm={8} md={6}>
            <Grid item xs={4}>
              <Headings text={"Note Length"} />
            </Grid>
            <Grid container item xs={8}>
              <Length classes={classes} value={length} handleChange={handleLengthSliderChange} />
            </Grid>
          </Grid>
          <Grid container item xs={10} sm={8} md={6}>
            <Grid item xs={4}>
              <Headings text={"Note Rest"} />
            </Grid>
            <Grid container item xs={8}>
              <Rest classes={classes} value={rest} handleChange={handleRestSliderChange} />
            </Grid>
          </Grid>
          <Grid container item xs={10} sm={8} md={6}>
            <Grid item xs={4}>
              <Headings text={"Tempo"} />
            </Grid>
            <Grid container item xs={8}>
              <Tempo classes={classes} value={tempo} handleChange={handleTempoSliderChange} />
            </Grid>
          </Grid>
          <Grid container item direction="row" justify="center" alignItems="center" xs={12} spacing={0}>
            <Play handleClick={handleClick} playStatus={playStatus} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}