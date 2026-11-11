// ===== DEKORASI: rangka casing & komponen melayang di latar menu =====
function caseDet(w,i){const B=(a,b,e,k,x,y,z)=>{const m=box(a,b,e,k,x,y,z);w.add(m);return m};
 B(9.4,2.4,.25,0x151b26,0,1.2,-3.12);B(.25,2.4,6.4,0x151b26,-4.62,1.2,0);B(.25,2.4,6.4,0x151b26,4.62,1.2,0);B(9.4,.45,.25,0x151b26,0,.22,3.12);
 B(9.4,.08,.3,0x64748b,0,2.42,-3.12);B(.3,.08,6.4,0x64748b,-4.62,2.42,0);B(.3,.08,6.4,0x64748b,4.62,2.42,0);
 for(let k=0;k<6;k++){B(.03,.5,.5,0x05070b,4.48,1.3,-2.2+k*.9);B(.03,.5,.5,0x05070b,-4.48,1.3,-2.2+k*.9)}
 B(2,.5,.05,0x05070b,-1.6,.5,-2.99);B(1.8,1.8,.1,0x0b1220,3.3,1.4,-3.0);const f=fanM(3.3,1.4,-2.92,.75);f.rotation.x=Math.PI/2;w.add(f);
 const s=B(8.8,.04,.04,0x22d3ee,0,2.2,-2.98);s.material.emissive=new THREE.Color(0x22d3ee);
 for(const x of[-4.2,4.2])for(const z of[-2.7,2.7])w.add(cyl(.3,.15,0x0b1220,x,-.17,z));
 if(i>=2)[[-1,-2],[2.2,-2],[-1,.8],[2.2,.8],[.6,-2],[.6,.8]].forEach(p=>w.add(cyl(.09,.14,0xd4a017,p[0],.17,p[1])))}
const DD=[['gpu',3,.4,1,0xb91c1c],['cooler',1.8,.7,1.8,0x334155],['psu',2.4,1.2,1.6,0],['mobo',3.6,.12,3.2,0x15803d],['cpu',1,.15,1,0],['ram',.15,.5,2.4,0x16a34a],['m2',.5,.06,1.8,0x7c3aed],['hdd',1.2,.25,1.8,0],['c24',.4,.12,1.2,0xfacc15],['pcie',.8,.12,.4,0xef4444]];
const deco=new THREE.Group();DD.forEach((a,i)=>{const g=mk({t:a[0],w:a[1],h:a[2],d:a[3],c:a[4]}),an=i/DD.length*6.283;g.scale.setScalar(1.3);g.position.set(Math.cos(an)*5,1+(i%3)*.9,Math.sin(an)*5);g.userData.y=g.position.y;g.rotation.set(.5,an,.3);deco.add(g)});
{const ar=[];for(let i=0;i<240;i++)ar.push((Math.random()-.5)*26,Math.random()*8,(Math.random()-.5)*26);const gm=new THREE.BufferGeometry();gm.setAttribute('position',new THREE.Float32BufferAttribute(ar,3));deco.add(new THREE.Points(gm,new THREE.PointsMaterial({size:.07,color:0x7dd3fc})))}
sc.add(deco);
