
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
    async schedule(sample,position) {
        let triggerTime = position*this.timeTillNext;
        console.log(sample,triggerTime);
        let mySchedule = setInterval(this.playSample,this.totalLoopTime+triggerTime,sample,position);
        return mySchedule;
    }
    startSequencer = () => {
        for(let i = 0; i < this.sequence.length; i++)
            {
                if(this.sequence[i])
                {
                    var scheduled =  this.schedule(this.audioSamples[this.sequence[i].sample.id],i);
                    this.scheduleSequence.push(scheduled);
                }
            }

     /*   if(!this.playing)
        {
            this.playing = true;
            console.log("Start sequencer");
            for(let i = 0; i < this.sequence.length; i++)
            {
                if(this.sequence[i])
                {

                    //setTimeout(this.playSample,2000,this.audioSamples[this.sequence[i].sample.id]);
                  //  this.playSample(this.audioSamples[this.sequence[i].sample.id]);
                  //  setInterval(this.playSample,this.totalLoopTime,this.audioSamples[this.sequence[i].sample.id]);
                   // this.schedule(this.audioSamples[this.sequence[i].sample.id],i)
                   
                   var scheduled =  this.schedule(this.audioSamples[this.sequence[i].sample.id],i);
                   this.scheduleSequence.push(scheduled);
                }
            }
          }*/
    }
    
    stopSequencer = () => {
     //   if(this.playing)
        {
            this.playing = false;
            console.log("Stop sequencer");
           // clearInterval(this.loop(0));
           for(let s of this.scheduleSequence)
           {
               clearInterval(s);
           }
           this.scheduleSequence = [];
        }
    }
    addSample(sample,samplePosition)
    {
        this.samples.push({sample,samplePosition});
    }
    addToSequence(position,sample)
    {
        this.sequence[position] = {position,sample};
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
    }
     playSample(sample,position)
    {
       console.log("playing sample from position "+position); 
        //this.audioSamples[0].play();
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