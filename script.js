var synth = new Tone.FMSynth().toMaster();

const relativeTones = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
const range = [["E", 2],["A#", 5],];

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

//start/stop the transport
document.querySelector("tone-play-toggle").addEventListener("change", (e) => Tone.Transport.toggle());
