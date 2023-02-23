/// First set a few globals //// 

//var playing = false; //determines whether sequencer should be playing or not
const audioSamples = []; //I will create a sample object that will wrap all of the audio files
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
const sequencer = new Sequencer(8);
const playButton = document.querySelector("#play-button");
playButton.addEventListener("click",sequencer.startSequencer,false);
const stopButton = document.querySelector("#stop-button");
stopButton.addEventListener("click",sequencer.stopSequencer,false);