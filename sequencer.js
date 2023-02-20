
class Sequencer {
    
    constructor(sequencerSize )
    {
        this.samples = [];
        this.audioSamples = []; //references to our audio samples
        this.playing = false; //state of the sequencer
        this.sequence = new Array(16);
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
    flashPosition = (position) => {
       // console.log(position.currentTarget.position);
    }
    getSampleIndex = (sampleName) => {
        for(let i = 0; i < this.audioSamples.length; i++)
        {
           // if(sampleName==this.audioSamples[i])
        }
    }
    startSequencer = () => {
       // if(!this.playing)
        {
            this.playing = true;
            console.log("Start sequencer");
            for(let i = 0; i < this.sequence.length; i++)
            {
                if(this.sequence[i])
                {

                    setTimeout(this.playSample,2000,this.audioSamples[this.sequence[i].sample.id]);
                }

            }
        }
    }
    stopSequencer = () => {
        if(this.playing)
        {
            this.playing = false;
            console.log("Stop sequencer");
        }
    }
    addSample(sample,samplePosition)
    {
        this.samples.push({sample,samplePosition});
    }
    addToSequence(position,sample)
    {
        this.sequence[position] = {position,sample};
      //  console.log("Sample Position"+this.sample.position);
      //  console.log("add to sequence Pos: "+position+" Sample: "+sample);
        for(let i = 0; i < this.sequence.length; i++)
        {
            console.log(this.sequence[i]);
        } 
    }
    removeFromSequence(position)
    {
        delete this.sequence[position];
    }
    loadSamples()
    {
        console.log("Load samples: ");
        for(let i = 0; i < this.samples.length; i++)
        {
            
            const sample = document.querySelectorAll(`${this.samples[i].sample.sampleName}`);
            let sampleName = this.samples[i].sample.sampleName;
            console.log("Sample name"+this.samples[i].sample.sampleName);
            this.audioSamples[i] = new Audio();
            this.audioSamples[i].src = `sounds/${sampleName}`+".wav";
            this.audioSamples[i].position = i;
        }
     /*   for(let i = 0; i < this.samples.length; i++)
        {
            const sample = document.querySelectorAll(`${this.samples[i]}`);
            this.audioSamples[i] = new Audio();
            this.audioSamples[i].src = `sounds/${this.samples[i]}`+".wav";
            this.audioSamples[i].position = i;
           // console.log("Logging this.audioSamples[i]"+this.audioSamples[i].src);
        } */
        
    }
    playSample(sample)
    {
     //   console.log("playing sample : "+this.audioSamples[samplePosition]);
       console.log("playing sample"); 
      //  this.audioSamples[1].currentTime = 0;
        //this.audioSamples[0].play();
        sample.play();
      //this.audioSample.play();
    }
    printSamples()
    {
        for(let i = 0; i < this.samples.length; i++)
        {
            console.log("This.samples : "   +this.samples[i]);
        }
    }
    clear()
    {
        for(let i = 0; i < this.sequence.length; i++)
        {
            if(this.sequence[i])
            delete this.sequence[i];

        }
    }
}