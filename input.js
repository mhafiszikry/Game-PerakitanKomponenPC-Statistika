// ===== INPUT: mouse/touch, drag komponen, rotasi (R), zoom =====
// ---- input
const ray=new THREE.Raycaster(),mv=new THREE.Vector2(),pl=new THREE.Plane(new THREE.Vector3(0,1,0),-.9),pt=new THREE.Vector3();
function aim(e){mv.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);ray.setFromCamera(mv,cam)}
function pick(){const h=ray.intersectObjects(items.map(i=>i.g),true)[0];if(!h)return null;let o=h.object;while(o&&!o.userData.it)o=o.parent;return o&&o.userData.it}
const cv=$('c');
cv.addEventListener('pointerdown',e=>{if(S.paused)return;if(menu==2){aim(e);const i=mapHit();if(i>=0){if(i+1>S.unl){beep(150,.2,'sawtooth');msg('Level terkunci! Selesaikan level sebelumnya')}else start(i)}return}if(menu==3)return;if(!items)return;aim(e);const it=pick();if(it&&!it.placed){held=sel=it;it.g.scale.setScalar(1);cv.setPointerCapture(e.pointerId);beep(500,.05)}else{orb=e.clientX;cv.setPointerCapture(e.pointerId)}});
cv.addEventListener('pointermove',e=>{if(menu==2){aim(e);hov=mapHit();cv.style.cursor=hov>=0?'pointer':'';return}if(menu==3)return;if(orb!=null){ang=Math.max(-.9,Math.min(.9,ang+(e.clientX-orb)*.006));orb=e.clientX;return}aim(e);const tp=$('tip');
 if(held){if(ray.ray.intersectPlane(pl,pt))held.g.position.set(pt.x,.9,pt.z);zones.forEach(z=>{const m=!z.used&&z.t==held.d.t&&Math.hypot(pt.x-z.x,pt.z-z.z)<tol();z.g.material.color.set(m?0x22ff88:0x38bdf8)});tp.style.display='none';const hi=$('hi');hi.hidden=false;hi.innerHTML='<b>'+esc(held.d.n)+'</b><br>'+esc(held.d.s);return}
 const it=items&&items.length?pick():null;if(it){tp.innerHTML='<b>'+it.d.n+'</b><br>'+it.d.s;tp.style.left=e.clientX+14+'px';tp.style.top=e.clientY+14+'px';tp.style.display='block'}else tp.style.display='none'});
cv.addEventListener('wheel',e=>{zoom=Math.max(.6,Math.min(1.4,zoom+e.deltaY*.001))});cv.addEventListener('pointerup',()=>{orb=null;if(!held)return;const it=held;held=null;$('hi').hidden=true;zones.forEach(z=>z.g.material.color.set(0x38bdf8));const p=it.g.position;let best=null,bd=9,any=null,ad=9;if(S.diff!='mudah'&&!S.practice&&K(it.d)!=curK){err('Urutan salah! Kerjakan dulu langkah bertanda ▶',it);return}
 zones.forEach(z=>{if(z.used)return;const d=Math.hypot(p.x-z.x,p.z-z.z);if(d<tol()){if(z.t==it.d.t&&d<bd){best=z;bd=d}if(d<ad){any=z;ad=d}}});
 if(best){if(it.d.r&&it.k%4!=0)err('Orientasi salah! Putar dengan tombol ⟳ Putar / tekan R',it);else place(it,best)}else if(any)err('Zona salah untuk '+it.d.n,it);else home(it)});
function rot(){if(S.paused||$('hud').hidden)return;if(menu)return;const it=held||sel;if(!it||it.placed)return;it.k=((it.k||0)+1)%4;it.g.rotation.y=-it.k*Math.PI/2;beep(400,.05)}
addEventListener('keydown',e=>{if(e.key=='r'||e.key=='R')rot()});
(() => {const rb=$('rb');if(!rb)return;let t=0;const go=e=>{const n=Date.now();if(n-t<300)return;t=n;e.preventDefault();rot()};rb.addEventListener('pointerdown',go);rb.addEventListener('click',e=>{if(Date.now()-t>=300)rot()})})();
