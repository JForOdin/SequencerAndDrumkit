var currentSample = "bass";
var playing = false; //determines the state of the sequencer
const selectSample =  (sample) =>{
    console.log("Selecting sample: "+sample.currentTarget.sample);
    currentSample = sample.currentTarget.sample;
}
const startSequencer = () => {
    if(!playing)
    {
        playing = true;
        console.log("Start sequencer");
    }
}
const stopSequencer = () => {
    if(playing)
    {
        playing = false;
        console.log("Stop sequencer");
    }

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
console.log(samples);
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
//setup two sections of divs for sequencer.. two rows stacked vertically
const sequencerDiv = document.querySelector("#sequencer-div");
for(let i = 0; i < sequencerSize/2;i++)
{
    let individualSequencerDiv =document.createElement("div");
    individualSequencerDiv.style.backgroundColor = "darkgray";
    individualSequencerDiv.style.width = "40px";
    individualSequencerDiv.style.height = "40px";
    individualSequencerDiv.className ="box";
    individualSequencerDiv.position = i;
    individualSequencerDiv.addEventListener("click",clickSequencer,false);
    sequencerDiv.appendChild(individualSequencerDiv);

}
const sequencerDivTwo = document.querySelector("#sequencer-div-two");
for(let i = sequencerSize/2; i < sequencerSize; i++)
{
    let individualSequencerDiv = document.createElement("div");
    individualSequencerDiv.style.backgroundColor = "darkgray";
    individualSequencerDiv.style.width = "40px";
    individualSequencerDiv.style.height = "40px";
    individualSequencerDiv.className ="box";
    individualSequencerDiv.position = i;
    individualSequencerDiv.addEventListener("click",clickSequencer,false);
    sequencerDivTwo.appendChild(individualSequencerDiv);
}
const playButton = document.querySelector("#play-button");
const stopButton = document.querySelector("#stop-button");
playButton.addEventListener("click",startSequencer);
stopButton.addEventListener("click",stopSequencer);
while(playing)
{
    console.log("Playing");
}