class Sequencer {
    
    constructor(sequencerSize )
    {
        this.samples = [];
        this.playing = false;
        const sequencerDiv = document.querySelector("#sequencer-div");
        //setup two sections of divs for sequencer.. two rows stacked vertically

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
    }
    startSequencer = () => {
        if(!this.playing)
        {
            this.playing = true;
            console.log("Start sequencer");
        }
    }
    stopSequencer = () => {
        if(this.playing)
        {
            this.playing = false;
            console.log("Stop sequencer");
        }
    }
    addSample(sample)
    {
        this.samples.push(sample);
    }
    printSamples()
    {
        for(let i = 0; i < this.samples.length; i++)
        {
            console.log(this.samples[i]);
        }
    }
}