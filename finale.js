// ===== ADEGAN FINAL (PC menyala, meja & monitor) =====
let finG,fCtx,fTex,kbCtx,kbTex,rgbm=[],spin2=[],fcnt=0,fpl;
function buildFin(){if(finG){sc.remove(finG);disposeGroup(finG)}finG=new THREE.Group();const inn=new THREE.Group(),L=LV[4];
 inn.add(box(9,.2,6,0x1f2937,0,0,0));caseDet(inn,4);L.dec.forEach(k=>inn.add(DEC[k]()));
 inn.add(P(mk({t:'cooler',w:1.8,h:.7,d:1.8,c:0x334155}),-.1,.57,-1.3));
 [1.47,1.81].forEach(x=>inn.add(P(mk({t:'ram',w:.15,h:.5,d:1.4,c:0x16a34a}),x,.47,-1.2)));
 L.it.forEach(a=>inn.add(P(mk({t:a[0],w:a[4],h:a[5],d:a[6],c:a[3]}),a[7],.1+(a[10]||0)+a[5]/2,a[8])));
 const gl=new THREE.Mesh(new THREE.BoxGeometry(9.4,.05,6.4),new THREE.MeshStandardMaterial({color:0x9ad8ff,transparent:true,opacity:.14,roughness:.05,metalness:.9}));gl.position.y=2.5;inn.add(gl);
 inn.rotation.x=Math.PI/2;const tw=new THREE.Group();tw.add(inn);tw.rotation.z=Math.PI/2;tw.scale.setScalar(.6);tw.position.set(-2.6,2.9,0);finG.add(tw);
 spin2=[];rgbm=[];finG.traverse(o=>{if(o.userData.sp)spin2.push(o);if(o.material&&o.material.emissive&&o.material.emissive.getHex()>0)rgbm.push(o.material)});
 const dk=box(9,.25,3.4,0x6b4423,4.5,3,0);dk.material.map=WOOD;finG.add(dk);[[-4,-1.4],[4,-1.4],[-4,1.4],[4,1.4]].forEach(p=>finG.add(box(.25,2.9,.25,0x3b2a1a,4.5+p[0],1.5,p[1])));
 const mc=document.createElement('canvas');mc.width=512;mc.height=300;fCtx=mc.getContext('2d');fTex=new THREE.CanvasTexture(mc);
 finG.add(box(4.6,2.8,.15,0x0b0f1a,4.8,4.6,-.7));const s2=new THREE.Mesh(new THREE.PlaneGeometry(4.3,2.5),new THREE.MeshBasicMaterial({map:fTex}));s2.position.set(4.8,4.6,-.61);finG.add(s2);
 finG.add(box(.35,1,.3,0x1f2937,4.8,3.6,-.8));finG.add(box(1.8,.08,1,0x1f2937,4.8,3.17,-.7));
 finG.add(box(3.2,.12,1.1,0x0f172a,4.4,3.19,.7));const kc=document.createElement('canvas');kc.width=256;kc.height=90;kbCtx=kc.getContext('2d');kbTex=new THREE.CanvasTexture(kc);
 const kp=new THREE.Mesh(new THREE.PlaneGeometry(3.1,1),new THREE.MeshBasicMaterial({map:kbTex}));kp.rotation.x=-Math.PI/2;kp.position.set(4.4,3.26,.7);finG.add(kp);finG.add(box(.5,.16,.8,0x1f2937,6.5,3.21,.7));
 fpl=new THREE.PointLight(0x22d3ee,1.4,14);fpl.position.set(-2.6,3,3);finG.add(fpl);sc.add(finG)}
function finDraw(T,h){const x=fCtx;const g=x.createLinearGradient(0,0,512,300);g.addColorStop(0,'#1e3a8a');g.addColorStop(1,'#7c3aed');x.fillStyle=g;x.fillRect(0,0,512,300);
 x.fillStyle='#f8fafce6';x.fillRect(40,30,270,180);x.fillStyle='#0f172a';x.font='bold 16px system-ui';x.fillText('Diagnostik Sistem PC',54,56);x.font='13px system-ui';['CPU : OK','RAM : 16 GB OK','GPU : OK','Penyimpanan : SSD OK','POST : Berhasil'].forEach((s,i)=>x.fillText(s,54,84+i*20));
 x.strokeStyle='#16a34a';x.lineWidth=2;x.beginPath();for(let i=0;i<40;i++){const y=200-Math.abs(Math.sin(T*3+i*.4))*40-8;i?x.lineTo(54+i*6,y):x.moveTo(54,y)}x.stroke();
 x.fillStyle='#0009';x.fillRect(0,272,512,28);x.fillStyle='#fff';x.font='14px system-ui';x.fillText('GamAR-OS',12,291);x.fillText(new Date().toLocaleTimeString().slice(0,5),458,291);fTex.needsUpdate=true;
 const k=kbCtx;k.fillStyle='#0b1220';k.fillRect(0,0,256,90);for(let r=0;r<5;r++)for(let c=0;c<14;c++){k.fillStyle='hsl('+((h*360+c*14+r*25)%360)+',90%,55%)';k.fillRect(c*18+2,r*17+3,15,14)}kbTex.needsUpdate=true}
function finUpd(T){const a=Math.sin(T*.2)*.9,h=(T*.15)%1;cam.position.set(2.5+Math.sin(a)*13,5.5+Math.sin(T*.3),Math.cos(a)*13);cam.lookAt(2.2,3.2,0);
 spin2.forEach(f=>f.rotation.y+=.3);rgbm.forEach((m,i)=>m.emissive.setHSL((h+i*.04)%1,1,.5));fpl.color.setHSL(h,1,.5);if(++fcnt%3==0)finDraw(T,h)}
