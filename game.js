// ===== LOGIKA GAME: build level, HUD, nyawa, penempatan komponen, skor, hasil akhir =====
let world,items,zones,held=null,sel=null,on=false,fan,rgb,done=false,mon,mctx,mtex;
function build(i){
 if(world){sc.remove(world);disposeGroup(world)}world=new THREE.Group();sc.add(world);items=[];zones=[];on=false;done=false;fan=rgb=null;
 const L=LV[i];world.add(box(L.b[0],.2,L.b[1],L.b[2],0,0,0));if(i==0){world.children[0].material.map=PCB;boardDet(world)}else caseDet(world,i);
 L.dec.forEach(k=>world.add(DEC[k]()));
 const n=L.it.length;trayWin(n);
 L.it.slice().sort((a,b)=>ORD[i].indexOf(K({t:a[0],n:a[1]}))-ORD[i].indexOf(K({t:b[0],n:b[1]}))).forEach((a,j)=>{const d={t:a[0],n:a[1],s:a[2],c:a[3],w:a[4],h:a[5],d:a[6],x:a[7],z:a[8],r:a[9],y:a[10]||0};
  // zona
  const zg=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(d.w,d.h,d.d)),new THREE.LineBasicMaterial({color:0x38bdf8}));
  zg.position.set(d.x,.1+d.y+d.h/2,d.z);world.add(zg);
  if(d.r){const nt=box(.14,.14,.14,0xf97316,d.w/2-.07,d.h/2+.07,-d.d/2+.07);zg.add(nt)}
  const z={t:d.t,k:K(d),x:d.x,z:d.z,g:zg,used:false};zones.push(z);
  // item
  const g=mk(d);
  if(d.r)g.add(box(.14,.14,.14,0xf97316,d.w/2-.07,d.h/2+.07,-d.d/2+.07));
  const it={g,d,k:0,placed:false,home:trayPos(j,n,d),s:Math.min(1,1.35/Math.max(d.w,d.d))};
  g.userData.it=it;if(d.r){it.k=1+Math.floor(Math.random()*3);g.rotation.y=-it.k*Math.PI/2}
  g.position.copy(it.home);g.scale.setScalar(it.s);world.add(g);items.push(it)});
 if(i==4){spin=[];world.traverse(o=>{if(o.userData.sp)spin.push(o)});
  rgb=box(8.6,.06,.1,0x222222,0,.15,3.05);rgb.material.emissive=new THREE.Color(0);world.add(rgb);
  const c=document.createElement('canvas');c.width=320;c.height=200;mctx=c.getContext('2d');mctx.fillStyle='#000';mctx.fillRect(0,0,320,200);mtex=new THREE.CanvasTexture(c);
  mon=new THREE.Mesh(new THREE.PlaneGeometry(4.4,2.75),new THREE.MeshBasicMaterial({map:mtex}));mon.position.set(0,1.6,-4);mon.rotation.x=-.35;world.add(mon)}
}
// ---- level flow
function show(id){['s0','s1','s2'].forEach(k=>$(k).hidden=k!=id);$('hud').hidden=id!=null;$('steps').hidden=id!=null;menu=id=='s0'?1:id=='s1'?2:0;deco.visible=menu==1;mapG.visible=menu==2;fl.visible=menu!=2;if(world)world.visible=!menu;if(finG)finG.visible=false;$('s2').classList.remove('fin');$('pwr').hidden=true}
function hearts(){$('hh').textContent=S.practice?'♾️ Latihan':S.hp>5?'❤️×'+S.hp:'❤️'.repeat(Math.max(0,S.hp))+'🖤'.repeat(Math.max(0,5-S.hp))}
function count(){$('hc').textContent='Komponen: '+items.filter(i=>i.placed).length+'/'+items.length;stepUI()}
function renderMap(pop){mapRefresh(pop)}
function start(i){S.lv=i;S.hp=S.practice?99:S.diff=='mudah'?10:5;if(S.practice)S.unl=5;fly=0;ang=0;S.err=0;S.t0=Date.now();S.tEnd=0;S.paused=false;S.pausedTotal=0;S.pauseStart=0;S.hint=0;$('pz').hidden=true;$('ps').textContent='⏸ Jeda';build(i);show(null);$('hl').textContent='Level '+(i+1)+': '+LV[i].n+(S.practice?' ♾️':'');hearts();count()}
// elapsed = waktu aktif tanpa jeda (untuk HUD & skor)
function elapsed(){return Math.max(0,(S.tEnd||Date.now())-S.t0-S.pausedTotal-(S.paused?Date.now()-S.pauseStart:0))}
function togglePause(){if($('hud').hidden)return;if(S.paused){S.pausedTotal+=Date.now()-S.pauseStart;S.paused=false;$('pz').hidden=true;$('ps').textContent='⏸ Jeda'}else{S.paused=true;S.pauseStart=Date.now();if(held){home(held);held=null;sel=null}$('hi').hidden=true;$('pz').hidden=false;$('ps').textContent='▶ Lanjut'}}
function msg(t,c){const m=$('msg');m.textContent=t;m.style.background=c||'var(--bad)';m.style.display='block';clearTimeout(msg.t);msg.t=setTimeout(()=>m.style.display='none',1800)}
function err(t,it){if(S.practice){beep(120,.4,'sawtooth');msg(t+' (Latihan: tidak mengurangi nyawa)');home(it);return}S.hp--;S.err++;beep(120,.4,'sawtooth');msg(t);hearts();home(it);if(S.hp<=0){beep(80,.8,'sawtooth');$('rc').innerHTML='<h2>💥 Level Gagal</h2><p>HP habis. Ulangi level ini.</p><button id="ok">Ulangi Level</button>';show('s2');$('ok').onclick=()=>start(S.lv)}}
function home(it){it.g.position.copy(it.home);it.g.scale.setScalar(it.s)}
const K=d=>d.t=='sekrup'&&/GPU/.test(d.n)?'bsek':d.t;
function trayPos(j,n,d){const po=innerWidth<innerHeight,s=Math.min(1,1.35/Math.max(d.w,d.d)),y=.12+d.h*s/2,c=po?5:3,col=j%c,row=j/c|0,rows=Math.ceil(n/c);return po?new THREE.Vector3((col-(c-1)/2)*1.75,y,4.6+row*1.75):new THREE.Vector3(7.3+col*1.75,y,(row-(rows-1)/2)*1.75)}
function trayWin(n){const po=innerWidth<innerHeight,c=po?5:3,rows=Math.ceil(n/c),W=c*1.75+.5,Dp=rows*1.75+.5,x=po?0:9.05,z=po?4.6+(rows-1)*.875:0;
 const p=box(W,.1,Dp,0x1e3a5f,x,.07,z);world.add(p);const e=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(W,.1,Dp)),new THREE.LineBasicMaterial({color:0x38bdf8}));e.position.copy(p.position);world.add(e);
 const l=mkLab('BAKI KOMPONEN');l.position.set(x,1.1,z-Dp/2-.3);world.add(l)}
let curK='',lab;
function mkLab(s){const c=document.createElement('canvas');c.width=512;c.height=96;const x=c.getContext('2d');x.fillStyle='#fde047';x.fillRect(4,4,504,70);x.fillStyle='#111';x.font='bold 34px system-ui';x.textAlign='center';x.fillText(s.slice(0,26),256,52);x.beginPath();x.moveTo(236,74);x.lineTo(276,74);x.lineTo(256,94);x.fill();const m=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));m.scale.set(3.6,.68,1);return m}
function stepUI(){const gs=[];items.forEach(it=>{const k=K(it.d),l=gs[gs.length-1];if(l&&l.k==k){l.n++;l.p+=it.placed?1:0}else gs.push({k,t:it.d.n,n:1,p:it.placed?1:0})});
 const c=gs.find(g=>g.p<g.n);curK=c?c.k:'';
 $('steps').innerHTML='<b>Urutan Perakitan</b>'+gs.map((g,i)=>'<div class="st '+(g.p==g.n?'ok':g===c?'cur':'')+'">'+(g.p==g.n?'✔':g===c?'▶':'○')+' '+(i+1)+'. '+g.t+(g.n>1?' ('+g.p+'/'+g.n+')':'')+'</div>').join('');
 const free=S.diff=='mudah'||S.practice;zones.forEach(z=>z.g.visible=!z.used&&(free||z.k==curK));if(lab)world.remove(lab);lab=null;
 const z=zones.find(z=>!z.used&&z.k==curK);if(z&&c){lab=mkLab(c.t);lab.position.set(z.x,1.7,z.z);world.add(lab)}}
function place(it,z){it.placed=true;z.used=true;it.g.scale.setScalar(1);it.g.position.set(z.x,.1+it.d.y+it.d.h/2,z.z);it.g.rotation.y=0;z.g.visible=false;beep(900,.12);setTimeout(()=>beep(1300,.08),90);count();sel=null;
 if(items.every(i=>i.placed)){S.lv==4?($('pwr').hidden=false,msg('Semua kabel terpasang! Tekan POWER ON','var(--ok)')):setTimeout(finish,500)}}
function calc(){const t=Math.round(elapsed()/1000),par=LV[S.lv].par*.75,raw=Math.max(0,50+S.hp*8+Math.round(10*Math.max(0,1-t/par))-(S.hint||0)*2);
 S.res[S.lv]={level:S.lv+1,score:Math.max(0,Math.round(raw/5)),time_sec:t,errors_made:S.err,hp_remaining:S.hp,hints_used:S.hint||0};return S.res[S.lv]}
function finish(){const r=calc();beep(660,.15);setTimeout(()=>beep(990,.3),150);
 if(S.lv<4){S.unl=Math.max(S.unl,S.lv+2);const qz=QUIZ[S.lv];$('rc').innerHTML='<h2>Level '+(S.lv+1)+' Selesai!</h2><p>Skor: <b>'+r.score+'/20</b> · Waktu '+r.time_sec+' dtk · Kesalahan '+r.errors_made+'</p><p>🔓 Level '+(S.lv+2)+' terbuka!</p><div id="qz"><p><b>Kuis:</b> '+esc(qz.q)+'</p>'+qz.a.map((a,i)=>'<button class="qz" data-i="'+i+'" style="display:block;width:100%;margin:4px 0">'+esc(a)+'</button>').join('')+'</div><div id="qzR"></div>';show('s2');document.querySelectorAll('.qz').forEach(b=>b.onclick=()=>{const ok=+b.dataset.i==qz.c;r.quiz_correct=ok?1:0;$('qzR').innerHTML='<p>'+(ok?'✅ Benar!':'❌ Belum tepat — jawaban benar: '+esc(qz.a[qz.c]))+'</p><button id="ok">Kembali ke Peta</button>';$('ok').onclick=()=>{renderMap(S.lv+1);show('s1')}})}
 else final()}
function final(){const tot=S.res.reduce((a,r)=>a+r.score,0),tt=S.res.reduce((a,r)=>a+r.time_sec,0),te=S.res.reduce((a,r)=>a+r.errors_made,0);
 const p={student_id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),student_name:S.name,student_class:S.cls,timestamp:new Date().toISOString(),overall_score:tot,total_time_seconds:tt,difficulty:S.diff,practice:!!S.practice,level_breakdown:S.res};
 const j=JSON.stringify(p,null,1);try{const a=JSON.parse(localStorage.getItem('gamarpc_logs')||'[]');a.push(p);localStorage.setItem('gamarpc_logs',JSON.stringify(a))}catch(e){}
 $('rc').innerHTML='<h2>🏆 Rekapitulasi Akhir</h2><p><b>'+esc(S.name)+'</b> ('+esc(S.cls)+')</p><p>Skor total: <b>'+tot+'/100</b><br>Waktu: '+tt+' dtk · Total kesalahan: '+te+'</p><table>'+S.res.map(r=>'<tr><td>Level '+r.level+'</td><td>'+r.score+'/20</td><td>'+r.time_sec+'s</td><td>err '+r.errors_made+'</td></tr>').join('')+'</table><button id="cp">Salin Data JSON</button> <button id="ex">⬇ Unduh CSV</button> <button id="ag">Main Lagi</button>';
 show('s2');buildFin();menu=3;finG.visible=true;if(world)world.visible=false;$('s2').classList.add('fin');$('cp').onclick=()=>{try{navigator.clipboard.writeText(j);$('cp').textContent='Tersalin ✔'}catch(e){}};$('ex').onclick=()=>{const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';const rows=[['student_id','student_name','student_class','timestamp','level','score','time_sec','errors_made','hp_remaining','hints_used'],...S.res.map(r=>[p.student_id,S.name,S.cls,p.timestamp,r.level,r.score,r.time_sec,r.errors_made,r.hp_remaining,r.hints_used||0]),[],['TOTAL','', '', '', tot+'/100', tt+'s', te+'','']];const csv=rows.map(r=>r.map(q).join(',')).join('\r\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv'}));a.download='gamarpc-'+(S.name||'siswa').replace(/[^\w-]+/g,'_')+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000);$('ex').textContent='Terunduh ✔'};$('ag').onclick=()=>{S.unl=1;S.res=[];renderMap();show('s1')}}
$('pwr').onclick=()=>{$('pwr').hidden=true;on=true;S.tEnd=Date.now();beep(300,.5,'sine');const L=['BIOS v1.0 - GamAR-PC','CPU : OK','RAM : OK 16GB','GPU : OK','Storage: SATA SSD detected','POST selesai tanpa error','Booting OS...'];mctx.fillStyle='#001a33';mctx.fillRect(0,0,320,200);mctx.fillStyle='#4ade80';mctx.font='14px monospace';L.forEach((s,i)=>mctx.fillText(s,12,28+i*24));mtex.needsUpdate=true;setTimeout(finish,4000)};
$('ps').onclick=togglePause;$('pzOk').onclick=togglePause;
$('rst').onclick=()=>start(S.lv);
$('qt').onclick=()=>{S.paused=false;S.pausedTotal=0;$('pz').hidden=true;$('hi').hidden=true;renderMap();show('s1')};
$('hn').onclick=()=>{if(S.paused||!curK)return;const z=zones.find(z=>!z.used&&z.k==curK);if(!z)return;S.hint=(S.hint||0)+1;z.hintUntil=Date.now()+2500;const c=items.find(it=>K(it.d)==curK&&!it.placed);msg('💡 '+(c?c.d.n:'Perhatikan zona hijau')+' (-2 skor)','var(--ok)')};
