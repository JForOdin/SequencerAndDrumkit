var currentSample = "bass";
var playing = false; //determines the state of the sequencer
const selectSample =  (sample) =>{
    console.log("Selecting sample: "+sample.currentTarget.sample);
    currentSample = sample.currentTarget.sample;
}
const clickSequencer = (position) =>{
  //  console.log("Sequencer position: "+position.currentTarget.position);
    if(!position.currentTarget.loaded)
    {
        position.currentTarget.style.backgroundColor = "yellowgreen";
        console.log("arming position "+position.currentTarget.position+" with sample "+currentSample)
        position.currentTarget.loaded = true;
    }
    else
    {
        position.currentTarget.style.backgroundColor = "darkgray";
        position.currentTarget.loaded = false;
    } 
} 
const samples = []; //array to hold samples
const sequencerSize = 16; //how many beats the sequencer has
var bassKick = "bass"; //text strings for now
var hiHat = "hihat";
var snare = "snare";
var openHiHat = "openhihat";
samples.push(bassKick);
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
    individualSampleDiv.className = "sample";
    individualSampleDiv.addEventListener("click",selectSample,false);
    sampleDiv.appendChild(individualSampleDiv);
}

const sequencer = new Sequencer(16);
for(let i = 0; i < samples.length; i++)
{
    sequencer.addSample(samples[i]);
}
sequencer.printSamples();
const playButton = document.querySelector("#play-button");
const stopButton = document.querySelector("#stop-button");
playButton.addEventListener("click",sequencer.startSequencer);
stopButton.addEventListener("click",sequencer.stopSequencer);