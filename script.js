// Tone logic 

let tonalMinRange = ["E", 2];
let tonalMaxRange = ["A#", 5];

const pitchButton = document.getElementById("pitch-button");
const rangeMinBox = document.getElementById('range-min');
const rangeMaxBox = document.getElementById('range-max');

rangeMinBox.options[rangeMinBox.options.length] = new Option('none', 'none', true, true);
rangeMaxBox.options[rangeMinBox.options.length] = new Option('none', 'none', true, true);

var synth = new Tone.FMSynth().toDestination();

const relativeTones = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
let range = [tonalMinRange,tonalMaxRange];
const allTones = generateAllTonesInRange(range);

console.log(allTones);

// fill option boxed with range.
allTones.forEach((tone) => {
	let toneString = tone[0]+tone[1];
	console.log(toneString);
	rangeMinBox.options[rangeMinBox.options.length] = new Option(toneString, toneString);
	rangeMaxBox.options[rangeMinBox.options.length] = new Option(toneString, toneString);
}) 

// change the range to what the user selects.
rangeMinBox.addEventListener('change', () => {
	console.log(rangeMinBox.value);
	const newTonalMin = [];
	if (rangeMinBox.value.length === 2) {
		newTonalMin.push(rangeMinBox.value[0]);
		newTonalMin.push(rangeMinBox.value[1]);
		tonalMinRange = newTonalMin;
	} else {
		newTonalMin.push(rangeMinBox.value[0]+rangeMinBox.value[1]);
		newTonalMin.push(rangeMinBox.value[2]);
		tonalMinRange = newTonalMin;
	}
})

// NEED TO FIX: the range used in the random note gen is not being updated
//   when the change happens. Because of this the range is the default one. 

rangeMaxBox.addEventListener('change', () => {
	console.log(rangeMaxBox.value);
	const newTonalMax = [];
	if (rangeMinBox.value.length === 2) {
		newTonalMax.push(rangeMinBox.value[0]);
		newTonalMax.push(rangeMinBox.value[1]);
		tonalMaxRange = newTonalMax;
	} else {
		newTonalMax.push(rangeMinBox.value[0]+rangeMinBox.value[1]);
		newTonalMax.push(rangeMinBox.value[2]);
		tonalMaxRange = newTonalMax;
	}
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

//this function is called right before the scheduled time
function triggerSynth(noteGenerator) {
	//the time is the sample-accurate time of the event
	return (time) => synth.triggerAttackRelease(noteGenerator(), 0.5, time);
}

Tone.Transport.loopEnd = "1m";
Tone.Transport.loop = true;

//schedule a few notes
Tone.Transport.schedule(
	triggerSynth(() => randToneFromRange(range)),0);

// Click the button for a random note.
pitchButton.addEventListener("click", async () => {
	await Tone.start();
	const now = Tone.now();
	console.log(range);
	synth.triggerAttackRelease(randToneFromRange(range), "8n", now);
});

