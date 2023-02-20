//var currentSample = "kick";
var playing = false; //determines the state of the sequencer
var currentVelocity = 3;
const selectSample =  (sample) =>{
    console.log("Selecting sample: "+sample.currentTarget.sample);
    currentSample = sample.currentTarget.sample;
}
const setCurrentVelocity = (velocity) => {
    console.log("Velocity: "+velocity.currentTarget.velocity);
    currentVelocity = velocity.currentTarget.velocity;
}
const clickSequencer = (position) =>{
    if(!position.currentTarget.loaded)
    {
        if(currentVelocity==3)
        {
            position.currentTarget.style.backgroundColor = "salmon";
        }
        else if(currentVelocity==2)
        {
            position.currentTarget.style.backgroundColor = "darkkhaki";
        }
        else
        {
            position.currentTarget.style.backgroundColor = "yellowgreen";
        }
        console.log("arming position "+position.currentTarget.position+" with sample "+currentSample)
        position.currentTarget.loaded = true;
        
        sequencer.addToSequence(position.currentTarget.position,currentSample);
    }
    else
    {
        position.currentTarget.style.backgroundColor = "darkgray";
        position.currentTarget.loaded = false;
        sequencer.removeFromSequence(position.currentTarget.position);
    } 
} 
const samples = []; //array to hold samples
const sequencerSize = 16; //how many beats the sequencer has
var kick = "kick"; //text strings for now
//var kick = { id:"0",sampleName:"kick"};
var hiHat = "chihat";
var snare = "snare";
var openHiHat = "ohihat";
samples.push(kick);
samples.push(hiHat);
samples.push(snare);
samples.push(openHiHat);
const sampleDiv = document.querySelector("#sample-div"); //select our sample div
for(let i = 0; i < samples.length; i++)
{   // for all the samples in our array, 
    //load them into a div on the left side of index.html
    let individualSampleDiv = document.createElement("div");
    individualSampleDiv.textContent = "."+samples[i];
    individualSampleDiv.sample = samples[i];
    individualSampleDiv.style.border = "5px solid darkgreen";
    individualSampleDiv.className = "sample";
    individualSampleDiv.addEventListener("click",selectSample,false);
    sampleDiv.appendChild(individualSampleDiv);
}

const sequencer = new Sequencer(16);
for(let i = 0; i < samples.length; i++)
{
    sequencer.addSample(samples[i]);
}
var currentSample = samples[0];
sequencer.printSamples();
const playButton = document.querySelector("#play-button");
const stopButton = document.querySelector("#stop-button");
const clearButton = document.querySelector("#clear-button");
playButton.addEventListener("click",sequencer.startSequencer);
stopButton.addEventListener("click",sequencer.stopSequencer);
clearButton.addEventListener("click",sequencer.clear);
//Setup velocity buttons . Three values represent volume of samples
const velocityWeak = document.querySelector("#weak");
const velocityMedium = document.querySelector("#medium");
const VelocityStrong = document.querySelector("#strong");
velocityWeak.addEventListener("click",setCurrentVelocity,false);
velocityWeak.velocity = 1;
velocityMedium.addEventListener("click",setCurrentVelocity,false);
velocityMedium.velocity = 2;
VelocityStrong.addEventListener("click",setCurrentVelocity,false);
VelocityStrong.velocity = 3;

sequencer.loadSamples();
