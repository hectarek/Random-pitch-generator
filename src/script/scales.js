// SCALES

// Basic elements of a scale:

// scale: {
//     name: "",
//     notesInC: [],
//     pattern: [],
//     canLimitOctave: false
// }

const relativeTones = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

export const createScale = (scale, startingNote) => {

	let note = startingNote.toUpperCase();
	let noteIndex = relativeTones.indexOf(note);
	let scaleToReturn = [];
	let whichScale = scales.find(scal => scal.name === scale);
	whichScale.pattern.forEach(num => {
		scaleToReturn.push(relativeTones[(noteIndex + num) % relativeTones.length])
	});

	return scaleToReturn;
}

export const generateAllNotes = (scale, key) => {

	let returnArr = [];
	let arr = createScale(scale, key);
	for (let i=0; i<9;i++) {
		arr.forEach(note => returnArr.push(note+i))
	}
	return returnArr;
}

export const scales = [
	{
		name: "Chromatic",
		notesInC: [],
		pattern: [0,1,2,3,4,5,6,7,8,9,10,11,12],
		canLimitOctave: false,
	},
	{
		name: "Major",
		notesInC: [],
		pattern: [0,2,4,5,7,9,11,12],
		canLimitOctave: false,
	},
	{
		name: "Natural Minor",
		notesInC: [],
		pattern: [0,2,3,5,7,8,10,12],
		canLimitOctave: false,
	},
	{
		name: "Harmonic Minor",
		notesInC: [],
		pattern: [0,2,3,5,7,8,11,12],
		canLimitOctave: false,
	},
	{
		name: "Major Pentatonic",
		notesInC: [],
		pattern: [0,2,4,7,9,12],
		canLimitOctave: false,
	},
	{
		name: "Minor Pentatonic",
		notesInC: [],
		pattern: [0,3,5,7,10,12],
		canLimitOctave: false,
	},
	{
		name: "Blues Scale",
		notesInC: [],
		pattern: [0,3,5,6,7,10,12],
		canLimitOctave: false,
	},
	{
		name: "Major Bebop",
		notesInC: [],
		pattern: [0,2,4,5,7,8,9,11,12],
		canLimitOctave: false,
	},
	{
		name: "Dominant Bebop",
		notesInC: [],
		pattern: [0,2,4,5,7,9,10,11,12],
		canLimitOctave: false,
	},
	{
		name: "Altered Dominant Scale",
		notesInC: [],
		pattern: [0,1,3,4,6,8,10,12],
		canLimitOctave: false,
	},
	{
		name: "Ionian",
		notesInC: [],
		pattern: [0,2,4,5,7,9,11,12],
		canLimitOctave: false,
	},
	{
		name: "Dorian",
		notesInC: [],
		pattern: [0,2,3,5,7,9,10,12],
		canLimitOctave: false,
	},
	{
		name: "Phrygian",
		notesInC: [],
		pattern: [0,1,3,5,7,8,10,12],
		canLimitOctave: false,
	},
	{
		name: "Lydian",
		notesInC: [],
		pattern: [0,2,4,6,7,9,11,12],
		canLimitOctave: false,
	},
	{
		name: "Mixolydian",
		notesInC: [],
		pattern: [0,2,4,5,7,9,10,12],
		canLimitOctave: false,
	},
	{
		name: "Aeolian",
		notesInC: [],
		pattern: [0,2,3,5,7,8,10,12],
		canLimitOctave: false,
	},
	{
		name: "Locrian",
		notesInC: [],
		pattern: [0,1,3,5,6,8,10,12],
		canLimitOctave: false,
	},
	{
		name: "Whole Tone",
		notesInC: [],
		pattern: [0,2,4,6,8,10,12],
		canLimitOctave: false,
	}
];

export default {generateAllNotes, createScale, scales};