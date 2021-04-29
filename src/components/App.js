import { React, useState, useEffect, useRef } from "react";
import "../style/App.css";

// Component Imports
import { Length } from "./Length";
import { Picker } from "./Picker";
import { Switches } from "./Switches";
import { Title } from "./Title";
import { Play } from "./Play";
import { Headings } from "./Heading";
import { Rest } from "./Rest";
import { Tempo } from "./Tempo";

// UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Logic Imports
import * as Tone from "tone";
import { sampler } from "../script/instruments";
import keys from "../script/keys";
import { generateAllNotes, scales, createScale } from "../script/scales";
import { allNotesInOrder } from "../script/range";
import octaves from "../script/octaves";
import { tupleToAbsoluteTone, tempoIntoSeconds } from "../script/tone";

const GENERATED_LIST_SIZE = 100;

// useStyles
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	currentNote: {
		paddingTop: "10%",
		paddingBottom: "10%",
	},
	button: {
		marginTop: 20,
		marginBottom: 20,
	},
	title: {
		marginBottom: 30,
	},
	slider: {
		width: "33%",
	},
}));

const instrumentsDemo = [
	{
		name: "Piano",
		sound: "",
		range: [],
	},
];

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
	const [tempoInSecs, setTempoInSecs] = useState(tempoIntoSeconds(tempo));
	const [lengthInSecs, setLengthInSecs] = useState(length * tempoInSecs);
	const [restInSecs, setRestInSecs] = useState(rest * tempoInSecs);
	const [total, setTotal] = useState(lengthInSecs + restInSecs);

	// Error Checking on Range Fields
	const rangesInValidOrder = (note1, note2) => {
		// Logic to check to see if range is invalid
		let minRang = tupleToAbsoluteTone(note1);
		let maxRang = tupleToAbsoluteTone(note2);

		return allNotesInOrder.indexOf(maxRang) >= allNotesInOrder.indexOf(minRang);
	};

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
	};

	const [currentNote, setCurrentNote] = useState("wait");

	// Setting Synth State

	const updateCurrentScaleNotes = () => {
		currentScaleNotes = createScale(scale, key);
	};

	// Handle Functions
	const handleInstrumentPickerChange = (event) => {
		setInstrument(event.target.value);
	};
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
			var synth = sampler.toDestination();
			sequencer = new Tone.Sequence(
				(time, note) => {
					synth.triggerAttackRelease(note, lengthInSecs, time);
					setCurrentNote(note);
				},
				randomNoteGenerator(),
				total
			);

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
		<Container maxWidth="md" className={classes.root}>
			<Grid container direction="column" justify="center" alignItems="center" spacing={1}>
				<Grid item className={classes.title} xs={12}>
					<Title text={"Noteworthy.music"} />
				</Grid>
				<Grid item xs={12}>
					<Headings text={"INSTRUMENT"} />
				</Grid>
				<Grid item xs={12}>
					<Picker value={instrument} list={instrumentsDemo} helperText={"Pick an Instrument"} handleChange={handleInstrumentPickerChange} />
				</Grid>
				<Grid item xs={12}>
					<Headings text={"PITCH"} />
				</Grid>
				<Grid container item direction="row" justify="space-evenly" alignItems="center">
					<Grid container item xs={6} direction="column" justify="space-evenly" alignItems="center">
						<Grid item xs={12}>
							<Headings text={"Lower Limit"} />
						</Grid>
						<Grid item xs={6}>
							<Picker value={rangeN1} list={keys} helperText={"Pick a Note"} handleChange={handleRangeN1PickerChange} />
							<Picker value={rangeO1} list={octaves} helperText={"Pick an Octave"} handleChange={handleRangeO1PickerChange} />
						</Grid>
					</Grid>
					<Grid container item xs={6} direction="column" justify="space-evenly" alignItems="center">
						<Grid item xs={12}>
							<Headings text={"Upper Limit"} />
						</Grid>
						<Grid item xs={6}>
							<Picker value={rangeN2} list={keys} helperText={"Pick a Note"} handleChange={handleRangeN2PickerChange} />
							<Picker value={rangeO2} list={octaves} helperText={"Pick an Octave"} handleChange={handleRangeO2PickerChange} />
						</Grid>
					</Grid>
				</Grid>
				<Grid container item direction="row" justify="space-around" alignItems="center">
					<Grid item xs={12}>
						<Headings text={"Scale"} />
						<Picker value={scale} list={scales} helperText={"Pick a Scale"} handleChange={handleScalePickerChange} />
					</Grid>
          <Grid item xs={12}>
            <Headings text={"Key"} />
            <Picker value={key} list={keys} helperText={"Pick a Key"} handleChange={handleKeyPickerChange} />
          </Grid>
				</Grid>
				<Grid container item direction="column" justify="center" alignItems="center" spacing={1}>
					<Headings text={"Note Length"} />
				</Grid>
				<Grid container item direction="column" justify="center" alignItems="center" spacing={0}>
					<Length classes={classes} value={length} handleChange={handleLengthSliderChange} />
					<Headings text={"Note Rest"} />
					<Rest classes={classes} value={rest} handleChange={handleRestSliderChange} />
					<Headings text={"Tempo"} />
					<Tempo classes={classes} value={tempo} handleChange={handleTempoSliderChange} />
					<Grid container className={classes.button} item direction="row" justify="center" alignItems="center" xs={12} spacing={0}>
						<Play handleClick={handleClick} playStatus={playStatus} />
					</Grid>
				</Grid>
				<Grid container item direction="row" justify="center" alignItems="center" xs={12} spacing={0}>
					<Headings text={currentNote} />
				</Grid>
			</Grid>
		</Container>
	);
}
