var synth = new Tone.FMSynth().toDestination();

let tonalMinRange = ["E", 2];
let tonalMaxRange = ["A#", 5];

const relativeTones = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
let range = [tonalMinRange,tonalMaxRange];
let allTones = generateAllTonesInRange(range);

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