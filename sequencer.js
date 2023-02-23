function createDiv(parentDiv,position) { //returns a div to be used for sequencer
    let div;
    div = document.createElement("div");
    div.style.backgroundColor = "darkgray";
    div.style.width = "40px";
    div.style.height = "40px";
    div.className ="box";
    div.position = position;
    div.addEventListener("click",clickSequencer,false);
    return div;
}
class Sequencer {
    constructor(sequencerSize)
    {
        this.samples = [];
        this.audioSamples = [];
        this.playing = false; //state of the sequencer
        this.sequence = new Array(sequencerSize);
        this.timeTillNext = 500;
        const kickDiv = document.querySelector("#kick-div");
        const snareDiv = document.querySelector("#snare-div");
        const oHiHatDiv = document.querySelector("#ohihat-div");
        const cHiHatDiv = document.querySelector("#chihat-div");
        let individualKickDiv;
        let individualSnareDiv;
        let individualOHatDiv;
        let individualCHatDiv;
        for(let i = 0; i < sequencerSize; i++)
        {
            individualKickDiv = createDiv(kickDiv,i);
            kickDiv.appendChild(individualKickDiv);
            individualSnareDiv = createDiv(snareDiv,i);
            snareDiv.appendChild(individualSnareDiv);
            individualOHatDiv = createDiv(oHiHatDiv,i)
            oHiHatDiv.appendChild(individualOHatDiv);
            individualCHatDiv = createDiv(cHiHatDiv,i);
            cHiHatDiv.appendChild(individualCHatDiv);
        }
    }
    addToSequence(position,sample)
    {
        this.sequence[position] = {position,sample};
        console.log(sample);
    }
    addSample(sample,samplePosition)
    {
        this.samples.push({sample,samplePosition});
        
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
                //need to change the bg color of the active div
               // let activeDiv = document.querySelector("individualKickDiv")
               // div.style.backgroundColor = "green";
                
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
        this.loop(0, 500, 8);
      
    }
    
    stopSequencer = () => {
        if(this.playing)
        {
            this.playing = false;
            console.log("Stop sequencer");
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
            console.log("Sample name: "+this.samples[i].sample.sampleName);
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
}
