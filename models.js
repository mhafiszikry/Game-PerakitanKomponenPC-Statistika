// ===== MODEL 3D KOMPONEN — detail stylized-educational =====
// Helper: mat = material per jenis, lbl = label teks, chip = IC, pins = grid pin, fanM, boardDet, mk
function mat(c, rough, metal, emis){const m=new THREE.MeshStandardMaterial({color:c, roughness: (rough!=null?rough:0.6), metalness: (metal!=null?metal:0.2)}); if(emis!=null){m.emissive=new THREE.Color(emis); m.emissiveIntensity=0.35;} return m;}
function mb(w,h,d,c,rough,metal,x,y,z,emis){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d), mat(c,rough,metal,emis)); m.position.set(x||0,y||0,z||0); m.castShadow=m.receiveShadow=true; return m;}
function mcyl(r,h,c,rough,metal,x,y,z,seg){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,seg||20), mat(c,rough,metal)); m.position.set(x||0,y||0,z||0); m.castShadow=m.receiveShadow=true; return m;}
function lbl(txt,w,bg,fg,x,y,z,fs){
  const cnv=document.createElement('canvas'); cnv.width=512; cnv.height=128;
  const ctx=cnv.getContext('2d');
  ctx.fillStyle=bg; ctx.fillRect(0,0,512,128);
  ctx.strokeStyle=fg; ctx.lineWidth=4; ctx.strokeRect(4,4,504,120);
  ctx.fillStyle=fg; ctx.font='700 '+(fs||44)+'px system-ui,sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(txt.slice(0,26),256,68);
  const tex=new THREE.CanvasTexture(cnv); tex.anisotropy=4; tex.colorSpace=THREE.SRGBColorSpace;
  const hgt=w*0.25;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,hgt), new THREE.MeshStandardMaterial({map:tex, roughness:0.55, metalness:0.05, polygonOffset:true, polygonOffsetFactor:-1}));
  m.rotation.x=-Math.PI/2; m.rotation.z=0; m.position.set(x||0,y||0.001,z||0); m.receiveShadow=true; return m;
}
function chip(w,h,d,c,x,y,z){return mb(w,h,d,c,0.5,0.3,x,y,z);}
function pins(n,area,c,x,y,z){
  const g=new THREE.Group(); const step=area/Math.max(1,n);
  for(let i=0;i<n;i++) for(let j=0;j<n;j++){
    const p=mcyl(0.015,0.04,c||0xfacc15,0.3,0.9, -area/2 + step*(i+0.5), 0, -area/2 + step*(j+0.5), 6);
    p.position.y=0; g.add(p);
  }
  g.position.set(x,y,z); return g;
}
const cyl=(r,h,c,x,y,z)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,24),new THREE.MeshStandardMaterial({color:c,roughness:.35,metalness:.6}));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;return m};
const P=(g,x,y,z)=>{g.position.set(x,y,z);return g};let spin=[];
function fanM(x,y,z,r){
  const g=new THREE.Group(),b=new THREE.Group();
  g.add(mb(r*2,0.05,r*2,0x0f172a,0.8,0.1,0,0,0));
  b.userData.sp=1;
  // ring kipas
  const ring=new THREE.Mesh(new THREE.TorusGeometry(r*0.92,0.025,8,40), new THREE.MeshStandardMaterial({color:0x1e293b,roughness:0.6, metalness:0.3}));
  ring.rotation.x=Math.PI/2; ring.position.y=0.04; g.add(ring);
  for(let i=0;i<7;i++){
    const a=i*0.8976, k=mb(r*0.75,0.03,0.14,0x64748b,0.5,0.2, Math.cos(a)*r*0.45,0.05,Math.sin(a)*r*0.45);
    k.rotation.y=-a-0.35; k.castShadow=false; b.add(k);
  }
  b.add(mcyl(r*0.28,0.09,0x1e293b,0.5,0.3,0,0.06,0));
  b.add(mcyl(r*0.12,0.10,0x38bdf8,0.4,0.2,0,0.06,0));
  g.add(b); g.position.set(x,y,z); return g;
}
function heatsink(w,h,D,y){
  const g=new THREE.Group();
  g.add(mb(w,0.08,D,0xb45309,0.35,0.85,0,y,0)); // base tembaga
  for(let i=0;i<13;i++) g.add(mb(0.035,h-0.18,D*0.92,0xcbd5e1,0.35,0.85, (i-6)*w*0.075, y+(h-0.18)/2-0.02, 0));
  // heatpipe tembaga 4x
  for(let i=0;i<4;i++){
    const hp=mcyl(0.045,h-0.05,0xd97706,0.3,0.9, (i-1.5)*w*0.22, y+(h-0.05)/2, 0, 12);
    hp.castShadow=true; g.add(hp);
  }
  return g;
}
function boardDet(w){
  const B=(a,b,e,k,x,y,z)=>w.add(chip(a,b,e,k,x,y,z));
  // socket CPU
  B(1.5,.04,1.5,0x111827,-1.5,.12,-.8);
  B(1.2,.02,1.2,0xb8860b,-1.5,.14,-.8);
  w.add(pins(6,0.9,0xfacc15,-1.5,0.16,-0.8));
  w.add(lbl('CPU',0.7,'#111827','#fde047',-1.5,0.17,0.02));
  // slot RAM 4x dengan latch
  for(let i=0;i<4;i++){
    B(0.12,0.14,2.6,0x1f2937, 0.5+i*0.35, 0.17, -0.8);
    B(0.03,0.08,0.9,0xf1f5f9, 0.5+i*0.35-0.09, 0.20, -0.8); // latch
  }
  w.add(lbl('DIMM 1-4',0.9,'#0f172a','#7dd3fc',1.4,0.16,-2.2));
  // PCIe x16
  B(2.4,.08,0.14,0x111827,-0.1,0.14,0.95);
  B(2.2,.09,0.05,0x22c55e,-0.1,0.15,0.95);
  w.add(lbl('PCIe x16',1.1,'#0f172a','#22c55e',-0.1,0.17,1.15));
  // M.2 slot
  B(0.6,.05,1.9,0x1f2937,-0.2,0.12,1.6);
  B(0.5,.06,0.9,0x38bdf8,-0.2,0.13,1.6);
  w.add(lbl('M.2',0.5,'#0f172a','#ffffff',-0.2,0.16,2.55));
  // header ATX 24 & 8
  B(0.5,.10,.2,0xf1f5f9,-3.2,.15,-2.3);
  w.add(lbl('ATX 24',0.6,'#f1f5f9','#111827',-3.2,0.21,-2.7));
  // header CPU_FAN
  B(0.5,.4,.18,0x111827,-3.4,.30,-.6);
  B(0.5,.08,0.18,0xfacc15,-3.4,.53,-.6);
  w.add(lbl('CPU_FAN',0.6,'#111827','#facc15',-3.4,0.55,-0.95));
  // SATA & USB header
  B(1,.2,1,0x475569,2.8,.2,1.5);
  w.add(lbl('SATA',0.70,'#475569','#ffffff',2.8,0.32,1.9));
  B(0.3,.14,1.2,0xf1f5f9,3.5,.17,-0.8);
  w.add(lbl('USB 3.0',0.6,'#f1f5f9','#111827',3.5,0.25,-1.5));
  // chipset
  B(0.7,.10,0.7,0x334155,1.2,.15,-0.8);
  B(0.5,.02,0.5,0x94a3b8,1.2,.21,-0.8);
  w.add(lbl('CHIPSET',0.6,'#334155','#cbd5e1',1.2,0.23,-0.25));
  // trace highlight
  for(let i=0;i<6;i++) B(1.2,.005,0.03,0xb8860b, -2.5+i*0.9, 0.115, -2.2+(i%2)*0.6);
}
function conn(w,h,k,color,x,y,z){
  const g=new THREE.Group();
  g.add(mb(w,h,k,color,0.75,0.05, x,y,z));
  const nw=Math.max(2,Math.round(w/0.12));
  for(let i=0;i<nw;i++) g.add(mb(0.04,h*0.5,0.04,0xfacc15,0.3,0.9, x-(w/2)+(w*(i+0.5)/nw), y, z+k/2));
  return g;
}
function cableD(d,color){
  const g=new THREE.Group();
  const k=Math.min(d.d*0.5,0.4);
  g.add(conn(d.w,d.h,k,color,0,0,d.d/2-k/2));
  if(d.d>k+0.1){
    const r=mcyl(Math.min(0.09,d.h*0.8), d.d-k, color, 0.85, 0.0, 0,0,-k/2, 12);
    r.rotation.x=Math.PI/2; g.add(r);
    // sleeve rings
    for(let i=0;i<3;i++){
      const s=new THREE.Mesh(new THREE.TorusGeometry(Math.min(0.09,d.h*0.8),0.012,6,18), new THREE.MeshStandardMaterial({color:0x0f172a,roughness:0.9}));
      s.position.set(0,0,-k/2 - (d.d-k)*0.2 - i*(d.d-k)*0.25); g.add(s);
    }
  }
  return g;
}
function mk(d){
  const g=new THREE.Group(), A=o=>g.add(o), w=d.w, h=d.h, D=d.d, t=d.t, c=d.c;

  if(t=='cpu'){
    // substrat hijau + IHS silver + segitiga + label + pin
    A(mb(w,0.04,D,0x15803d,0.9,0.1,0,-h/2+0.02,0));
    A(mb(w*0.85,h-0.04,D*0.85,0xcbd5e1,0.35,0.85,0,0.02,0));
    const tri=mb(0.12,0.02,0.12,0xfacc15,0.4,0.2, w*0.28, 0.07, -D*0.28);
    tri.rotation.y=Math.PI/4; A(tri);
    A(lbl('CORE i5-12400',w*0.75,'#cbd5e1','#111827',0,0.075,0.05,26));
    A(lbl('INTEL LGA 1700',w*0.6,'#475569','#ffffff',0,0.075,-0.28,22));
    const pg=pins(5,Math.min(w,D)*0.7,0xd4a017,0,-h/2-0.01,0); A(pg);
  }
  else if(t=='pasta'){
    A(mcyl(0.30,h,c,0.9,0.0,0,0,0,16));
    A(mcyl(0.18,h*0.5,0xf1f5f9,0.9,0.0,0,0.03,0,12));
    const tip=mcyl(0.06,h*1.2,0xe5e7eb,0.9,0.0,0,0.05,0,10); tip.scale.set(1,1,1); A(tip);
    A(lbl('PASTA',0.55,'#f1f5f9','#111827',0,0.035,0,22));
  }
  else if(t=='cooler'){
    const hs=heatsink(w,h,D,-h/2+0.04); A(hs);
    A(fanM(0,h/2-0.02,0,w*0.42));
    A(lbl('COOLING',w*0.65,'#111827','#7dd3fc',0,h/2+0.02,-D*0.28,20));
    // klem metal
    for(const s of[-1,1]) A(mb(0.08,0.05,D*0.9,0x64748b,0.4,0.8, s*w*0.42, h/2-0.25, 0));
  }
  else if(t=='ram'){
    // PCB hitam + heatsink silver + chip + label + notch
    A(mb(w,h,D,0x111827,0.8,0.2,0,0,0));
    for(let i=0;i<4;i++) A(chip(w*0.80,0.05,0.32,0x1e293b,0,0.02,-D*0.32 + i*0.45));
    A(mb(w*0.92,0.04,D*0.85,0x94a3b8,0.35,0.85,0,h/2+0.01,0));
    A(mb(w*0.92,0.04,D*0.85,0x64748b,0.35,0.85,0,-h/2-0.01,0));
    A(mb(w*0.4,0.02,D*0.95,0xfacc15,0.5,0.5,0,-h/2+0.03,0)); // notch emas
    A(lbl('DDR4 8GB 3200',w*1.8,'#f8fafc','#111827',0,h/2+0.04,0,18));
  }
  else if(t=='m2'){
    A(mb(w,h,D,0x0f172a,0.85,0.15,0,0,0));
    for(let i=0;i<3;i++) A(chip(0.36,0.04,0.30,0x1e293b,0,h/2+0.02,-D/2+0.35+i*0.55));
    A(chip(0.28,0.06,0.28,0x334155,0,h/2+0.02,D*0.2));
    A(mb(w,h+0.01,0.14,0xfacc15,0.4,0.7,0,0,D/2-0.07)); // connector emas
    A(lbl('M.2 NVMe 500GB',w*1.7,'#f8fafc','#0f172a',0,h/2+0.05,0,16));
  }
  else if(t=='sekrup'){
    const head=mcyl(0.10,0.05,c,0.3,0.9,0,0.02,0,16); A(head);
    A(mcyl(0.04,0.06,0x9ca3af,0.3,0.9,0,-0.03,0,8));
    A(mb(0.14,0.015,0.03,0x1e293b,0.5,0.3,0,0.05,0)); // slot Phillips
    A(mb(0.03,0.015,0.14,0x1e293b,0.5,0.3,0,0.05,0));
    for(let i=0;i<3;i++) A(mcyl(0.045,0.01,0x9ca3af,0.4,0.7,0,-0.05+i*0.02,0,8));
  }
  else if(t=='psu'){
    A(mb(w,h,D,0x111827,0.7,0.3,0,0,0));
    A(mb(w*0.98,0.04,D*0.98,0x1f2937,0.7,0.3,0,-h/2+0.02,0));
    A(fanM(0,h/2+0.01,0,0.62));
    for(const r of[0.28,0.48]){
      const q=new THREE.Mesh(new THREE.TorusGeometry(r,0.015,6,32), new THREE.MeshStandardMaterial({color:0x94a3b8,roughness:0.4, metalness:0.7}));
      q.rotation.x=Math.PI/2; q.position.y=h/2+0.06; A(q);
    }
    A(lbl('450W 80+ BRONZE',0.9,'#fbbf24','#111827',0,h/2+0.04,-0.4,18));
    A(mb(0.6,0.02,0.4,0x0b1220,0.7,0.2,0.85,h/2+0.01,0.45));
  }
  else if(t=='io'){
    A(mb(w,h,D,0x9ca3af,0.35,0.85,0,0,0));
    A(mb(w*0.9,h*0.6,0.02,0x1f2937,0.7,0.2,0,0,D/2+0.01));
    for(let i=0;i<4;i++){
      const col=[0x2563eb,0x111827,0xf97316,0x22c55e][i%4];
      A(mb(0.22,0.16,0.03,col,0.6,0.2,(i-1.5)*0.36,0,D/2+0.015));
    }
    A(lbl('I/O',0.4,'#f8fafc','#111827',0,0.18,0,16));
  }
  else if(t=='hdd'){
    A(mb(w,h,D,0x111827,0.7,0.3,0,0,0));
    A(mb(w*0.85,h*0.5,D*0.55,0x94a3b8,0.35,0.85,0,0.02,-0.15));
    A(mcyl(0.22,0.05,0xcbd5e1,0.35,0.85,-0.25,h/2+0.01,-0.15,24));
    A(mb(0.70,h*0.5,0.15,0x111827,0.6,0.2,0,-0.02,D/2+0.05));
    A(lbl('WD BLUE 1TB',0.18,'#f8fafc','#2563eb',0,h/2+0.02,0.45,16));
  }
  else if(t=='gpu'){
    A(mb(w,h,D,0x111827,0.6,0.4,0,0,0));
    // RGB strip cyan emissive
    const strip=mb(w,0.03,0.14,0x38bdf8,0.5,0.1,0,h/2+0.01,-D/2+0.12,0x38bdf8); strip.material.emissive=new THREE.Color(0x38bdf8); strip.material.emissiveIntensity=0.6; A(strip);
    const strip2=mb(w*0.5,0.03,0.10,0xf472b6,0.5,0.1,w*0.20,h/2+0.01,-D/2+0.28,0xf472b6); strip2.material.emissive=new THREE.Color(0xf472b6); A(strip2);
    A(fanM(-0.75,h/2+0.02,0,0.38));
    A(fanM(0.75,h/2+0.02,0,0.38));
    A(mb(1.5,0.04,0.08,0xfacc15,0.4,0.7,-0.3,-h/2,D/2));
    A(mb(0.5,0.04,D*0.9,0x64748b,0.4,0.8,-w/2-0.05,-h/2+0.02,0));
    // backplate + brand
    A(mb(w*0.9,0.03,D*0.9,0x334155,0.4,0.7,0,-h/2-0.01,0));
    A(lbl('GEFORCE RTX',0.9,'#111827','#ffffff',0,h/2+0.04,0.15,18));
    // VRM chip + VRAM
    for(let i=0;i<3;i++) A(chip(0.35,0.04,0.30,0x1e293b, -w/2+0.35, 0.05, -D/2+0.35+i*0.35));
  }
  else if(t=='mobo'){
    const b0=mb(w,h,D,c,0.9,0.1,0,0,0); b0.material.map=PCB; A(b0);
    const y=h/2+0.02;
    // socket CPU + pins + label
    A(mb(1.0,0.06,1.0,0x111827,0.7,0.2,-0.7,y,-0.7));
    A(mb(0.8,0.04,0.8,0x475569,0.4,0.7,-0.7,y+0.02,-0.7));
    const sp=pins(5,0.7,0xfacc15,-0.7,y+0.05,-0.7); A(sp);
    A(lbl('LGA 1700',0.7,'#111827','#fde047',-0.7,y+0.06,0.1,14));
    // slot RAM
    for(let i=0;i<4;i++){
      A(mb(0.10,0.10,1.5,0x1f2937,0.7,0.2,0.6+i*0.18,y+0.03,-0.6));
      A(mb(0.04,0.06,0.6,0x64748b,0.7,0.3,0.6+i*0.18-0.06,y+0.07,-0.6));
    }
    A(lbl('DIMM',0.6,'#0f172a','#7dd3fc',1.1,y+0.06,-1.5,12));
    // PCIe x16
    A(mb(2.4,0.08,0.14,0x111827,0.7,0.2,-0.1,y+0.02,0.95));
    A(mb(2.0,0.09,0.05,0x22c55e,0.7,0.2,-0.1,y+0.03,0.95));
    A(lbl('PCIEx16',1.0,'#0f172a','#22c55e',-0.1,y+0.07,1.15,12));
    // M.2
    A(mb(0.5,0.06,1.5,0x1f2937,0.7,0.2,0.5,y+0.03,1.5));
    A(mb(0.45,0.07,0.8,0x38bdf8,0.5,0.3,0.5,y+0.03,1.5));
    // chipset + heatsink
    A(mb(0.5,0.10,0.5,0x334155,0.4,0.7,0.5,y+0.03,0.4));
    A(mb(0.4,0.04,0.4,0x64748b,0.35,0.85,0.5,y+0.09,0.4));
    A(lbl('CHIPSET',0.6,'#334155','#cbd5e1',0.5,y+0.10,0.95,12));
    // PCIe kecil + USB
    A(mb(0.25,0.09,1.0,0x111827,0.7,0.2,1.6,y+0.03,-0.4));
    A(mb(0.4,0.08,0.5,0x2563eb,0.6,0.2,-1.5,y+0.03,-0.3));
    // trace highlight
    for(let i=0;i<4;i++) A(mb(0.8,0.005,0.03,0xb8860b,0.5,0.5,-1.0+i*0.7,y+0.005,-1.2));
  }
  else if(t=='tuas'){
    const r=mcyl(0.04,D,c,0.35,0.85,0,0,0,12); r.rotation.x=Math.PI/2; A(r);
    A(mb(0.20,0.06,0.06,c,0.35,0.85,0.10,0,-D/2));
    A(mcyl(0.07,0.08,0x64748b,0.4,0.8,0,0,-D/2,12));
    A(mcyl(0.07,0.08,0x64748b,0.4,0.8,0,0,D/2,12));
  }
  else if(t=='brkt'){
    for(const s of[-1,1]){
      A(mb(w,h,0.20,c,0.35,0.85,0,0,s*(D/2-0.1)));
      A(mb(0.20,h,D-0.4,c,0.35,0.85,s*(w/2-0.1),0,0));
      A(mcyl(0.08,0.06,0xfacc15,0.3,0.9,s*(w/2-0.1),h/2+0.02,s*(D/2-0.1),12));
    }
    A(mb(w*0.9,0.02,D*0.9,c,0.35,0.85,0,0,0));
    A(lbl('BRACKET',w*0.50,'#64748b','#f8fafc',0,0.04,0,16));
  }
  else if(/^(c24|c8|pcie|satap|satad|usb3|usb2|hda|cfan)$/.test(t)){
    const colormap={
      c24:0xfacc15, c8:0xf97316, pcie:0xef4444, satap:0x84cc16, satad:0xef4444,
      usb3:0x2563eb, usb2:0x64748b, hda:0x22d3ee, cfan:0xf1f5f9
    };
    const color=colormap[t]||c;
    const cg=cableD({w:w,h:h,d:D},color); A(cg);
    const labelMap={c24:'ATX 24',c8:'CPU 8',pcie:'PCIe 6+2',satap:'SATA PWR',satad:'SATA DATA',usb3:'USB 3.0',usb2:'USB 2.0',hda:'HD AUDIO',cfan:'CPU FAN'};
    if(labelMap[t]) A(lbl(labelMap[t], Math.max(w*1.2,0.6), color, '#111827', 0, h/2+0.03, D*0.25, 14));
  }
  else if(/^(pw|rs|pl|hl)$/.test(t)){
    const colormap={pw:0x3b82f6, rs:0xa855f7, pl:0x22c55e, hl:0xeab308};
    const color=colormap[t]||c;
    A(mb(w,h,D,0x111827,0.8,0.1,0,0,0));
    A(mb(w*0.7,h*0.6,D*0.7,color,0.6,0.2,0,0.01,0, color));
    const lg=lbl({pw:'POWER',rs:'RESET',pl:'PWR LED',hl:'HDD LED'}[t]||t, Math.max(w*2.2,0.5), '#f8fafc','#111827',0,h/2+0.02,0,14);
    A(lg);
    for(let i=0;i<2;i++) A(mcyl(0.03,0.04,0xfacc15,0.3,0.9,(i-0.5)*0.12,h/2+0.02,D/2,8));
  }
  else if(t=='zip'){
    A(mb(w,h,D,0xf8fafc,0.9,0.0,0,0,0));
    const ring=new THREE.Mesh(new THREE.TorusGeometry(0.10,0.025,8,24), new THREE.MeshStandardMaterial({color:0xe2e8f0,roughness:0.9}));
    ring.rotation.x=Math.PI/2; ring.position.set(0.12,0,0); A(ring);
    A(mb(0.12,0.06,0.04,0x0f172a,0.7,0.2,0.26,0,0));
  }
  else{
    A(mb(w,h,D,c,0.6,0.2,0,0,0));
  }
  return g;
}
const DEC={
  psu:()=>P(mk({t:'psu',w:2.4,h:1.2,d:1.6,c:0x111827}),-2.5,.7,1.8),
  mo:()=>P(mk({t:'mobo',w:3.6,h:.12,d:3.2,c:0x14532d}),.6,.16,-.6),
  hd:()=>P(mk({t:'hdd',w:1.2,h:.25,d:1.8,c:0x475569}),3.5,.225,-1.8),
  gp:()=>P(mk({t:'gpu',w:3,h:.4,d:1,c:0xb91c1c}),.6,.42,.5)
};
