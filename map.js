// ===== PETA LEVEL 3D =====
function nodeModel(i){const g=new THREE.Group(),A=(o,x,y,z,s)=>{o.position.set(x,y,z);o.scale.setScalar(s||1);g.add(o);return o},M=(t,w,h,d,c)=>mk({t,w,h,d,c}),W=(w,h,d,y)=>{const e=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w,h,d)),new THREE.LineBasicMaterial({color:0x7dd3fc}));e.position.y=y;g.add(e)};
 if(i==0){A(M('mobo',3.6,.12,3.2,0x15803d),0,.3,0,.6);A(M('cooler',1.8,.7,1.8,0x334155),-.4,.7,-.35,.4);A(M('ram',.15,.5,2.4,0x16a34a),.5,.6,-.2,.5);A(M('ram',.15,.5,2.4,0x16a34a),.7,.6,-.2,.5)}
 else if(i==1){W(3.2,2,2.6,1.1);A(M('psu',2.4,1.2,1.6,0),0,.7,.2,.8)}
 else if(i==2){W(3.2,2,2.6,1.1);A(M('mobo',3.6,.12,3.2,0x15803d),0,.45,0,.6);A(M('cpu',1,.15,1,0),-.4,.55,-.3,.5)}
 else if(i==3){A(M('gpu',3,.4,1,0xb91c1c),0,.5,.6,.7);A(M('hdd',1.2,.25,1.8,0),0,.4,-.7,.7)}
 else{A(box(2.4,1.5,.12,0x111827,0,0,0),0,1.3,-.3);const s=A(box(2.2,1.3,.02,0x0f766e,0,0,0),0,1.3,-.23);s.material.emissive=new THREE.Color(0x22c55e);A(box(.3,.6,.3,0x334155,0,0,0),0,.6,-.3);A(M('c24',.4,.12,1.2,0xfacc15),.9,.25,.8)}
 return g}
const mapG=new THREE.Group(),mapN=[],MP=[[-7,2.2],[-3.5,-1],[0,1.8],[3.5,-1],[7,2.2]];
MP.forEach((p,i)=>{const g=new THREE.Group(),top=cyl(1.7,.3,0x1e4d6b,0,0,0),rock=new THREE.Mesh(new THREE.ConeGeometry(1.7,1.8,7),new THREE.MeshStandardMaterial({color:0x3b2f2f,roughness:.9}));rock.rotation.x=Math.PI;rock.position.y=-1.05;rock.castShadow=true;
 const ring=new THREE.Mesh(new THREE.TorusGeometry(1.75,.05,8,48),new THREE.MeshBasicMaterial({color:0x38bdf8}));ring.rotation.x=Math.PI/2;ring.position.y=.16;
 const m=nodeModel(i);m.position.y=.2;g.add(top,rock,ring,m);g.position.set(p[0],0,p[1]);mapG.add(g);mapN.push({g,m,p})});
const cv3=new THREE.CatmullRomCurve3(MP.map(p=>new THREE.Vector3(p[0],.2,p[1])));mapG.add(new THREE.Mesh(new THREE.TubeGeometry(cv3,80,.1,8),new THREE.MeshStandardMaterial({color:0xfacc15,emissive:0x7a5c00})));
const dots=[];for(let i=0;i<16;i++){const d=new THREE.Mesh(new THREE.SphereGeometry(.13,8,8),new THREE.MeshBasicMaterial({color:0x67e8f9}));mapG.add(d);dots.push(d)}
const pin=new THREE.Mesh(new THREE.ConeGeometry(.35,.9,12),new THREE.MeshStandardMaterial({color:0xf43f5e,emissive:0x7f1d1d}));pin.rotation.x=Math.PI;mapG.add(pin);
const grid=new THREE.GridHelper(40,40,0x38bdf8,0x1e3a8a);grid.position.y=-2.4;mapG.add(grid);
{const ar=[];for(let i=0;i<300;i++)ar.push((Math.random()-.5)*30,Math.random()*9-2,(Math.random()-.5)*20);const gm=new THREE.BufferGeometry();gm.setAttribute('position',new THREE.Float32BufferAttribute(ar,3));mapG.add(new THREE.Points(gm,new THREE.PointsMaterial({size:.08,color:0xbae6fd})))}
mapG.visible=false;sc.add(mapG);
let hov=-1;function mapHit(){const h=ray.intersectObjects(mapN.map(n=>n.g),true)[0];if(!h)return -1;let o=h.object;while(o.parent&&o.parent!==mapG)o=o.parent;return mapN.findIndex(n=>n.g===o)}
function mapRefresh(p){if(p!=null&&mapN[p])mapN[p].pop=Date.now();mapN.forEach((n,i)=>{const lk=i+1>S.unl;n.g.traverse(o=>{if(o.material){o.material.transparent=true;o.material.opacity=lk?.28:1}})})}
function mapUpd(T){const po=innerWidth<innerHeight;mapG.scale.setScalar(po?.45:1);cam.position.set(Math.sin(T*.25)*1.5,po?9:7.5,po?14:11);cam.lookAt(0,0,.5);cam.updateMatrixWorld();mapG.updateMatrixWorld(true);
 mapN.forEach((n,i)=>{const lk=i+1>S.unl;n.g.position.y=Math.sin(T*1.2+i)*.15;const q=n.pop?Date.now()-n.pop:9999;n.g.scale.setScalar((q<900?1+.5*Math.sin(q/900*Math.PI):1)+(hov==i&&!lk?.1:0));if(!lk)n.m.rotation.y=T*.6+i});
 dots.forEach((d,i)=>d.position.copy(cv3.getPoint((T*.06+i/16)%1)));const t=mapN[Math.min(S.unl,5)-1].p;pin.position.lerp(new THREE.Vector3(t[0],3+Math.sin(T*3)*.25,t[1]),.06);pin.rotation.y=T*2}
