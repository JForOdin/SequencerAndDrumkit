
class Sequencer {
    
    constructor(sequencerSize )
    {
        this.samples = [];
        this.audioSamples = []; //references to our audio samples
        this.playing = false; //state of the sequencer
        this.sequence = new Array(16);
        this.scheduleSequence = [];
        const sequencerDiv = document.querySelector("#sequencer-div");
        this.timeTillNext = 500;
        this.totalLoopTime = sequencerSize*500;
        console.log("Total loop time at 120 bpm: "+this.totalLoopTime);
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
    
   loop = (index, limit, count) => 
    {
        console.log("index"+index);
        if(!this.playing)
            return;
        if (index < count)
        {
            if(this.sequence[index])
            {
                let id = this.sequence[index].sample.id;
                let sample = this.audioSamples[id];
                console.log("playing sample: "+this.sequence[index].sample.sampleName);
                this.playSample(sample,id);
                
            }
            index ++;
            setTimeout(()=>
            {
                this.loop(index, limit, count);
            }, limit)
        }
        else 
        {
           this.loop(0,this.timeTillNext,this.sequence.length);
        }
    }
    startSequencer = () => {
        this.playing = true;
        this.loop(0, 500, 16);
      
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
    }
     playSample(sample,position)
    {
       console.log("playing sample from position "+position); 
        sample.currentTime = 0;
        sample.play();
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