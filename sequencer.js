
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
    
    startSequencer = () => {
       // if(!this.playing)
        {
            this.playing = true;
            console.log("Start sequencer");
            for(let i = 0; i < this.sequence.length; i++)
            {
               // setTimeout(this.playSample(),1000);
                
                if(this.sequence[i])
                {
                   // console.log("Position of sample"+this.sequence[i].sample.position);
                    //   this.playSample(this.sequence[i].position);
                  //  this.playSample(this.sequence[i].position);
                   console.log("Play sample");
                   setTimeout(this.playSample(),1000);
                   //this.playSample();
                }

            }
         /*   for(let i = 0; i < this.audioSamples.length; i++)
            {
                this.audioSamples[i].play();
            } */
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
        console.log("remove element from sequence");
        delete this.sequence[position];
    }
    loadSamples()
    {
        for(let i = 0; i < this.samples.length; i++)
        {
            const sample = document.querySelectorAll(`${this.samples[i]}`);
            this.audioSamples[i] = new Audio();
            this.audioSamples[i].src = `sounds/${this.samples[i]}`+".wav";
            this.audioSamples[i].position = i;
           // console.log("Logging this.audioSamples[i]"+this.audioSamples[i].src);
        }
        
    }
   
    playSample(samplePosition)
    {
        console.log("playing sample : "+this.audioSamples[samplePosition]);
        this.audioSamples[1].currentTime = 0;
        this.audioSamples[1].play();
    }

    printSamples()
    {
        for(let i = 0; i < this.samples.length; i++)
        {
            console.log("This.samples : "   +this.samples[i]);
        }
    }
}