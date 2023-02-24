
class Sequencer
{
    constructor(sequencerLength)
    {
        /// Define 4 divs for each of our sample rows //
        const kickDiv = document.querySelector("#kick-div");
        const snareDiv = document.querySelector("#snare-div");
        const oHatDiv = document.querySelector("#ohihat-div");
        const cHatDiv = document.querySelector("#chihat-div");
        ////// Put the row divs into an array for later
        this.rowDivs = [];
        this.rowDivs.push(kickDiv);
        this.rowDivs.push(snareDiv);
        this.rowDivs.push(cHatDiv);
        this.rowDivs.push(oHatDiv);
        this.sequencerLength = sequencerLength;
        this.bpm = 120;
        this.beatTime = 500/2; //duration of each beat 500 ms
        ///////// Our intial play state should be false
        this.playing = false;
        /// Total samples set to a constant of 4
        this.numOfSamples = 4;
        this.sequencerUI = Array.from(Array(this.numOfSamples), () => new Array(sequencerLength));
        let sampleDiv;
        let currentID = 0; // how we keep track of each single sample div
        for(let i = 0; i < this.numOfSamples; i++) //for each of our rows
        {
            for(let j = 0; j < sequencerLength; j++) ///each column div
            {
                sampleDiv = this.createDiv(this.rowDivs[i],j,i,currentID);
                this.rowDivs[i].appendChild(sampleDiv);
                this.sequencerUI[i][j] = {sample: i,position:j,armed:false,id:currentID};
                currentID++;
            }
        }
    }
    lerp = (a, b, t) => {

        return a + (b-a) * t;
    }
    changeTempo = (tempo) => {
       this.beatTime = (this.lerp(1500,0,tempo/180)+333)/2; //interpolate between 40 bpm and 180
        //console.log(this.beatTime);
    }
    addToSequence = (position) => 
    {
        if(this.sequencerUI[position.row][position.column].armed)
        {
            this.sequencerUI[position.row][position.column].armed = false;
            let divInMind = document.getElementById(`${this.sequencerUI[position.row][position.column].id}`);
            divInMind.style.backgroundColor = "darkGray";
            divInMind.armed = "false";
        }
        else
        {
            this.sequencerUI[position.row][position.column].armed = true;
            let divInMind = document.getElementById(`${this.sequencerUI[position.row][position.column].id}`);
            divInMind.style.backgroundColor = "lightGreen";
            divInMind.armed = "true";

        }
    }
    clearSequencer = () =>
    {
        for(let i = 0; i < this.numOfSamples; i++) //for each of our rows
        {
            for(let j = 0; j < this.sequencerLength; j++) ///each column div
            {
                this.sequencerUI[i][j].armed = false;
            }
        }
        for(let i = 0; i < this.sequencerLength*this.numOfSamples; i++)
        {
            let currentDiv = document.getElementById(i);
            currentDiv.armed = "false";
            currentDiv.style.backgroundColor = "darkgray";

        }

    }
    
    createDiv(parentDiv,column,row,currentID) 
    { //returns a div to be used for sequencer
        let div;
        div = document.createElement("div");
        div.style.backgroundColor = "darkgray";
        div.style.width = "40px";
        div.style.height = "40px";
        div.className ="box";
        div.id = currentID;
        div.armed = false;
        div.position = {row,column};
        div.addEventListener("click", this.addToSequence.bind(null,div.position),false);
        return div;
    }
    loop = (index, limit, count) => 
    {
        console.log("index"+index);
        if(!this.playing)
            return;
        if (index < count)
        {
            for(let i = 0; i < this.sequencerLength*this.numOfSamples;i++)
            {
                let currentDiv = document.getElementById(i);
                if(currentDiv.armed=="true")
                    currentDiv.style.backgroundColor = "lightGreen";
                else
                    currentDiv.style.backgroundColor = "darkGray";
            }
            for(let i = 0; i < this.numOfSamples; i++)
            {
                let currentDiv = document.getElementById(`${this.sequencerUI[i][index].id}`);
                currentDiv.style.backgroundColor = "skyBlue";
                if(this.sequencerUI[i][index].armed)
                {
                    console.log(this.sequencerUI[i][index].sample);
                    this.playSample(this.sequencerUI[i][index].sample);

                }
            }
            index ++;
            setTimeout(()=>
            {
                this.loop(index, this.beatTime, count);
            }, this.beatTime)
        }
        else 
        {
           this.loop(0,this.beatTime,this.sequencerLength);
        }
    }
    startSequencer = () => {
        if(this.playing)
            return;
        this.playing = true;
        this.loop(0, this.beatTime, this.sequencerLength);
      
    }
    stopSequencer = () => {
        if(this.playing)
        {
            this.playing = false;
            console.log("Stop sequencer");
        }
        for(let i = 0; i < this.sequencerLength*this.numOfSamples;i++)
        {
            let currentDiv = document.getElementById(i);
            if(currentDiv.armed == "true")
            {
                currentDiv.style.backgroundColor = "lightGreen";
            }
            else
            {
                currentDiv.style.backgroundColor = "darkGray";
            }
        }
    }

    playSample(sample)
    {
        console.log("playing sample from position "+sample); 
        audioSamples[sample].audio.currentTime = 0;
        audioSamples[sample].audio.play();
    }

};