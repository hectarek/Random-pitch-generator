// Tone logic 

const pitchButton = document.getElementById("pitch-button");
const rangeMinBox = document.getElementById('range-min');
const rangeMaxBox = document.getElementById('range-max');
const sustainBox = document.getElementById('sustain');

sustainBox.options[sustainBox.options.length] = new Option('Whole Note', '1n', true, true);
sustainBox.options[sustainBox.options.length] = new Option('Half Note', '2n');
sustainBox.options[sustainBox.options.length] = new Option('Quarter Note', '4n');
sustainBox.options[sustainBox.options.length] = new Option('Eighth Note', '8n');

let sustainValue = sustainBox.value;

rangeMinBox.options[rangeMinBox.options.length] = new Option('none', 'none', true, true);
rangeMaxBox.options[rangeMinBox.options.length] = new Option('none', 'none', true, true);

var synth = new Tone.FMSynth().toDestination();

let tonalMinRange = ["E", 2];
let tonalMaxRange = ["A#", 5];

const relativeTones = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
let range = [tonalMinRange,tonalMaxRange];
let allTones = generateAllTonesInRange(range);


// fill option boxed with range.
allTones.forEach((tone) => {
	let toneString = tone[0]+tone[1];
	rangeMinBox.options[rangeMinBox.options.length] = new Option(toneString, toneString);
	rangeMaxBox.options[rangeMinBox.options.length] = new Option(toneString, toneString);
}) 

// change the min range to what the user selects.
rangeMinBox.addEventListener('change', () => {
	console.log(rangeMinBox.value);
	const newTonalMin = [];
	if (rangeMinBox.value.length === 2) {
		newTonalMin.push(rangeMinBox.value[0]);
		newTonalMin.push(parseInt(rangeMinBox.value[1]));
	} else {
		newTonalMin.push(rangeMinBox.value[0]+rangeMinBox.value[1]);
		newTonalMin.push(parseInt(rangeMinBox.value[2]));
	}
	tonalMinRange = newTonalMin;
})

// change the max range to what the user selects.
rangeMaxBox.addEventListener('change', () => {
	console.log(rangeMaxBox.value);
	const newTonalMax = [];
	if (rangeMaxBox.value.length === 2) {
		newTonalMax.push(rangeMaxBox.value[0]);
		newTonalMax.push(parseInt(rangeMaxBox.value[1]));
	} else {
		newTonalMax.push(rangeMaxBox.value[0]+rangeMaxBox.value[1]);
		newTonalMax.push(parseInt(rangeMaxBox.value[2]));
	}
	tonalMaxRange = newTonalMax;
})

// change the sustain value on change
sustainBox.addEventListener("change", () => {
	sustainValue = sustainBox.value;
})

function generateAllTonesInRange(rng) {
	const minTone = rng[0];
	const maxTone = rng[1];

	const startRelativeIndex = relativeTones.findIndex((f) => f == minTone[0]);
	const finalRelativeIndex = relativeTones.findIndex((f) => f == maxTone[0]);
	const startOctaveIndex = minTone[1];
	const finalOctaveIndex = maxTone[1];

	const allTones = [];
	let octaveCursor = startOctaveIndex;
	let relativeCursor = startRelativeIndex;

	while (tupleToAbsoluteTone([relativeCursor, octaveCursor]) != tupleToAbsoluteTone([finalRelativeIndex + 1, finalOctaveIndex])) {

		allTones.push([relativeTones[relativeCursor], octaveCursor]);

		relativeCursor = relativeCursor + 1;

		if (relativeCursor >= relativeTones.length) {
			relativeCursor = 0;
			octaveCursor = octaveCursor + 1;
		}
	}
	return allTones;
}

function randToneFromRange(rng) {
	const allTones = generateAllTonesInRange(rng);
	return tupleToAbsoluteTone(allTones[Math.floor(Math.random() * allTones.length)]);
}

function tupleToAbsoluteTone(tuple) {
	return `${tuple[0]}${tuple[1]}`;
}

// THIS FUNCTION NEEDS WORK
function validateRange() {
	try {
		if (tonalMinRange == 'none' || tonalMaxRange == 'none') {
			console.log('Select range');
		} else if (tonalMinRange[1] > tonalMaxRange[1]){
			console.log('error');
		} else {
			return range = [tonalMinRange,tonalMaxRange];
		}
	} catch (error) {
		console.log(error); 
	}
}

// //this function is called right before the scheduled time
// function triggerSynth(noteGenerator) {
// 	//the time is the sample-accurate time of the event
// 	return (time) => synth.triggerAttackRelease(noteGenerator(), 0.5, time);
// }

// Tone.Transport.loopEnd = "1m";
// Tone.Transport.loop = true;

// //schedule a few notes
// Tone.Transport.schedule(triggerSynth(() => randToneFromRange(range)),0);

// Click the button for a random note.
pitchButton.addEventListener("click", async () => {
	await Tone.start();
	const now = Tone.now();
	validateRange();
	console.log(sustainValue);
	synth.triggerAttackRelease(randToneFromRange(range), sustainValue, now + 0.2);
});

