// PERSONALIZE THIS PAGE
const birthdayName = "M.S.L.HARIKA"; // Change this name.
document.querySelectorAll(".person-name").forEach(el => el.textContent = birthdayName);
document.title = `Happy Birthday, ${birthdayName}! ♡`;

const intro = document.getElementById("intro");
const experience = document.getElementById("experience");
const countEl = document.getElementById("count");
const progress = document.getElementById("progressBar");
let opened = false, introTimer;
function openExperience(){
  if(opened) return;
  opened = true; clearInterval(introTimer);
  intro.classList.add("fade-away");
  setTimeout(()=>{intro.classList.add("hidden");experience.classList.remove("hidden");showPage(0);burstConfetti(75);},450);
}
let count = 5;
introTimer = setInterval(()=>{
  count--; countEl.textContent = count > 0 ? count : "♡";
  progress.style.width = `${(6-count)*20}%`;
  if(count <= 0){clearInterval(introTimer);setTimeout(openExperience,350);}
},900);
document.getElementById("skipIntro").addEventListener("click",openExperience);

const pages = [...document.querySelectorAll(".page")];
const indicator = document.getElementById("pageIndicator");
let currentPage = 0;
function showPage(index){
  currentPage = Math.max(0,Math.min(index,pages.length-1));
  pages.forEach((p,i)=>p.classList.toggle("page-active",i===currentPage));
  indicator.textContent = `${String(currentPage+1).padStart(2,"0")} / ${String(pages.length).padStart(2,"0")}`;
  window.scrollTo({top:0,behavior:"smooth"});
  if(currentPage===0) burstConfetti(45);
}
document.querySelectorAll(".next-page").forEach(btn=>btn.addEventListener("click",()=>showPage(currentPage+1)));
document.getElementById("toLetter").addEventListener("click",()=>showPage(8));
document.getElementById("replay").addEventListener("click",()=>{experience.classList.add("hidden");intro.classList.remove("hidden","fade-away");count=5;countEl.textContent="5";progress.style.width="0";opened=false;introTimer=setInterval(()=>{count--;countEl.textContent=count>0?count:"♡";progress.style.width=`${(6-count)*20}%`;if(count<=0){clearInterval(introTimer);setTimeout(openExperience,350)}},900);});
function burstConfetti(amount=55){
 const layer=document.getElementById("confettiLayer");
 const colors=["#f3b6c8","#e58aa5","#f8d5df","#d9b5c3","#f6c9a7","#e9c9d4"];
 for(let i=0;i<amount;i++){const bit=document.createElement("i");bit.className="confetti-piece";bit.style.left=Math.random()*100+"%";bit.style.background=colors[Math.floor(Math.random()*colors.length)];bit.style.setProperty("--duration",(3+Math.random()*3)+"s");bit.style.setProperty("--rotation",Math.random()*360+"deg");bit.style.setProperty("--drift",(Math.random()*240-120)+"px");bit.style.animationDelay=(Math.random()*.6)+"s";layer.appendChild(bit);setTimeout(()=>bit.remove(),7000);}
}
// Gallery carousel with arrows, swipe, and dots.
const track=document.getElementById("galleryTrack"), cards=[...track.children], dots=[...document.querySelectorAll("#galleryDots button")];
let galleryIndex=0;
function moveGallery(i){galleryIndex=(i+cards.length)%cards.length;cards[galleryIndex].scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});dots.forEach((d,n)=>d.classList.toggle("active",n===galleryIndex));}
document.getElementById("galleryPrev").addEventListener("click",()=>moveGallery(galleryIndex-1));
document.getElementById("galleryNext").addEventListener("click",()=>moveGallery(galleryIndex+1));
dots.forEach((d,i)=>d.addEventListener("click",()=>moveGallery(i)));
track.addEventListener("scroll",()=>{let best=0,dist=Infinity;cards.forEach((c,i)=>{const d=Math.abs(c.getBoundingClientRect().left-track.getBoundingClientRect().left);if(d<dist){dist=d;best=i;}});galleryIndex=best;dots.forEach((d,i)=>d.classList.toggle("active",i===best));},{passive:true});

// Candle interaction.
const candles=[...document.querySelectorAll(".candle")], cakeStatus=document.getElementById("cakeStatus");
function updateCandles(){const left=candles.filter(c=>!c.classList.contains("out")).length;if(left===0){cakeStatus.textContent="All out. Your wish is safe. 💗";burstConfetti(65);setTimeout(()=>showPage(6),1300);}else cakeStatus.textContent=`${left} candle${left===1?"":"s"} left — keep your wish close. ♥`;}
candles.forEach(c=>c.addEventListener("click",()=>{if(!c.classList.contains("out")){c.classList.add("out");updateCandles();}}));

// Optional microphone blow detection. Requires HTTPS or localhost and permission.
let audioStream=null,audioContext=null,rafId=null;
const micButton=document.getElementById("micBlow"),stopMic=document.getElementById("stopMic"),micNote=document.getElementById("micNote");
async function stopListening(){if(rafId)cancelAnimationFrame(rafId);if(audioStream)audioStream.getTracks().forEach(t=>t.stop());if(audioContext)await audioContext.close().catch(()=>{});audioStream=null;audioContext=null;micButton.classList.remove("hidden");stopMic.classList.add("hidden");}
micButton.addEventListener("click",async()=>{
 try{
  audioStream=await navigator.mediaDevices.getUserMedia({audio:true});
  audioContext=new (window.AudioContext||window.webkitAudioContext)();
  const source=audioContext.createMediaStreamSource(audioStream), analyser=audioContext.createAnalyser();analyser.fftSize=512;source.connect(analyser);
  const data=new Uint8Array(analyser.frequencyBinCount);micButton.classList.add("hidden");stopMic.classList.remove("hidden");micNote.textContent="Listening... gently blow toward your microphone.";
  let hits=0;
  const listen=()=>{analyser.getByteFrequencyData(data);let total=0;for(let i=0;i<data.length;i++)total+=data[i];const level=total/data.length;if(level>34)hits++;else hits=Math.max(0,hits-1);if(hits>8){candles.forEach(c=>c.classList.add("out"));updateCandles();stopListening();micNote.textContent="A wish sent with a little breath. ✨";return;}rafId=requestAnimationFrame(listen);};listen();
 }catch(e){micNote.textContent="Microphone permission wasn't available. Tap the candles instead.";}
});
stopMic.addEventListener("click",stopListening);

// Drag knife across the cake, with a tap alternative.
const knife=document.getElementById("knife"),cutCake=document.getElementById("cutCake"),cutStatus=document.getElementById("cutStatus"),cutScene=document.getElementById("cutScene");
let dragging=false,startX=0;
function finishCut(){if(cutCake.classList.contains("sliced"))return;cutCake.classList.add("sliced");knife.style.transform="translate(30px,75px) rotate(28deg)";cutStatus.textContent="CAKE CUT. YOUR WISH IS ON ITS WAY. ♥";burstConfetti(90);setTimeout(()=>showPage(7),1800);}
knife.addEventListener("pointerdown",e=>{dragging=true;startX=e.clientX;knife.setPointerCapture(e.pointerId);});
knife.addEventListener("pointermove",e=>{if(!dragging)return;const dx=e.clientX-startX;knife.style.transform=`translate(${Math.max(-30,Math.min(55,dx))}px,${Math.max(0,Math.min(95,dx*.8))}px) rotate(28deg)`;if(Math.abs(dx)>70)finishCut();});
knife.addEventListener("pointerup",()=>{dragging=false;});
knife.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();finishCut();}});
document.getElementById("cutFallback").addEventListener("click",finishCut);

// Tiny synthesized two-note chime toggle; no autoplay or external music file.
let soundOn=false,ctx=null;
document.getElementById("soundToggle").addEventListener("click",async e=>{
 soundOn=!soundOn;e.currentTarget.textContent=soundOn?"♪":"♫";
 if(soundOn){try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();[523.25,659.25].forEach((freq,i)=>{const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type="sine";osc.frequency.value=freq;gain.gain.setValueAtTime(.0001,ctx.currentTime+i*.18);gain.gain.exponentialRampToValueAtTime(.035,ctx.currentTime+i*.18+.03);gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+i*.18+.55);osc.connect(gain);gain.connect(ctx.destination);osc.start(ctx.currentTime+i*.18);osc.stop(ctx.currentTime+i*.18+.6);});}catch(e){}}
});
