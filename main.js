/// First set a few globals //// 

const audioSamples = []; //I will create a sample object that will wrap all of the audio files
let globalVolume = 1.0;
const loadSamples = () => {
  var kick = {name: "kick", audio: new Audio()};
  kick.audio.src = "sounds/kick.wav";
  audioSamples.push(kick);
  var snare = {name: "snare", audio: new Audio()};
  snare.audio.src = "sounds/snare.wav";
  audioSamples.push(snare);
  var chihat = {name: "chihat", audio: new Audio()};
  chihat.audio.src = "sounds/chihat.wav";
  audioSamples.push(chihat);
  var ohihat = {name: "ohihat", audio: new Audio()};
  ohihat.audio.src = "sounds/ohihat.wav";
  audioSamples.push(ohihat);
 /* var smalltom = {name: "smalltom", audio: new Audio()};
  smalltom.audio.src = "sounds/ohihat.wav";
  audioSamples.push(smalltom);
  var largetom = {name: "largetom", audio: new Audio()};
  largetom.audio.src = "sounds/ohihat.wav";
  audioSamples.push(largetom); */
}
loadSamples();
const sequencer = new Sequencer(16);

const playButton = document.querySelector("#play-button");
playButton.addEventListener("click",sequencer.startSequencer,false);
const stopButton = document.querySelector("#stop-button");
stopButton.addEventListener("click",sequencer.stopSequencer,false);
var bpmText = document.querySelector("#bpm-div"); //BPM text at top left of page
bpmText.textContent = "BPM 120";
const bpmSlider = document.querySelector("#bpm-slider"); 
const bpmValue = document.querySelector("#bpm-value"); //BPM text for settings on left of page
bpmValue.textContent = 120;
bpmSlider.addEventListener("input", (event) => {
    bpmValue.textContent = event.target.value
    sequencer.bpm = event.target.value;
    bpmText.textContent =  "BPM "+event.target.value;
    sequencer.bpm = event.target.value;
    sequencer.changeTempo(sequencer.bpm);
  });
 // var volumeText = document.querySelector("#volume-div");
const volumeSlider = document.querySelector("#volume-slider");
const volumeValue = document.querySelector("#volume-value");
volumeValue.textContent = 100;
volumeSlider.addEventListener("input", (event) => {
  volumeValue.textContent = event.target.value;
  sequencer.setVolume(event.target.value/100);
});
const clearProjectButton = document.querySelector("#clear-button");
clearProjectButton.addEventListener("click",sequencer.clearSequencer,false);

const resolutionButton = document.querySelector("#resolution");
resolutionButton.addEventListener("input", (event) => {
    sequencer.changeResolution(event.target.value);
});