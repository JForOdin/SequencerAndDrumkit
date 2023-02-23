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
            position.currentTarget.style.backgroundColor = "deepSkyBlue";
        }
        else if(currentVelocity==2)
        {
            position.currentTarget.style.backgroundColor = "lightskyblue";
        }
        else
        {
            position.currentTarget.style.backgroundColor = "darkcyan";
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
var kick = { id:"0",sampleName:"kick"};
var hiHat = {id:"1",sampleName:"chihat"};
var snare = {id:"2",sampleName:"snare"};
var openHiHat = {id:"3",sampleName:"ohihat"};
samples.push(kick);
samples.push(hiHat);
samples.push(snare);
samples.push(openHiHat);
const sampleDiv = document.querySelector("#sample-div"); //select our sample div
for(let i = 0; i < samples.length; i++)
{   // for all the samples in our array, 
    //load them into a div on the left side of index.html
    let individualSampleDiv = document.createElement("div");
    individualSampleDiv.textContent = "."+samples[i].sampleName;
    individualSampleDiv.sample = samples[i];
    individualSampleDiv.style.border = "5px solid skyBlue";
    individualSampleDiv.className = "sample";
    individualSampleDiv.addEventListener("click",selectSample,false);
    sampleDiv.appendChild(individualSampleDiv);
}
const sequencerSize = 8; //how many beats the sequencer has
const sequencer = new Sequencer(sequencerSize);
for(let i = 0; i < samples.length; i++)
{
    sequencer.addSample(samples[i],i);
}
var currentSample = samples[0]; //set to kick drum
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
