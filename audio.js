// ---- audio
let ac;function beep(f,d,ty){try{ac=ac||new AudioContext();const o=ac.createOscillator(),g=ac.createGain();o.type=ty||'square';o.frequency.value=f;g.gain.value=.08;o.connect(g);g.connect(ac.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+d);o.stop(ac.currentTime+d)}catch(e){}}
let mus=null,mute=false;
function tone(f,t,d,ty,v){const o=ac.createOscillator(),g=ac.createGain();o.type=ty;o.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+d)}
function music(){if(mus)return;const N=[0,3,7,10,12,10,7,3],Bs=[0,0,5,5,7,7,3,3];let st=0;mus=setInterval(()=>{if(mute||!ac||ac.state!='running')return;const t=ac.currentTime,f=196*Math.pow(2,(N[st%8]+Bs[(st>>3)%8])/12);tone(f,t,.22,'triangle',.05);tone(f*2,t+.105,.12,'sine',.02);if(st%4==0){tone(f/2,t,.6,'sine',.07);tone(70,t,.15,'sine',.12)}st++},210)}
addEventListener('pointerdown',()=>{try{ac=ac||new AudioContext();ac.resume();music()}catch(e){}},{once:true});
$('mt').onclick=()=>{mute=!mute;$('mt').textContent=mute?'🔇':'🔊'};
