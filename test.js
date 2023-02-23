var snd1  = new Audio();
var src1  = document.createElement("source");
src1.type = "audio/mpeg";
src1.src  = "sounds/ohihat.wav";
snd1.appendChild(src1);
snd1.volume = 0.2;
var snd2  = new Audio();
var src2  = document.createElement("source");
//src2.type = "audio/mpeg";
src2.src  = "sounds/kick.wav";
snd2.appendChild(src2);

//snd1.play(); snd2.play(); // Now both will play at the same time