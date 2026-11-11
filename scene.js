// ===== SCENE THREE.JS: renderer, kamera, cahaya, lantai kayu, tekstur PCB, helper box =====
// ---- three
const R=new THREE.WebGLRenderer({canvas:$('c'),antialias:true}),sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,1,.1,100);
R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.1;R.outputEncoding=THREE.sRGBEncoding;
sc.background=new THREE.Color(0x0b1220);sc.fog=new THREE.Fog(0x0b1220,24,42);
{const e=new THREE.Scene();e.background=new THREE.Color(0x222a38);[[0,12,0,10,.2,10,3],[-12,4,0,.2,6,10,2],[10,3,6,.2,5,8,2]].forEach(a=>{const m=new THREE.Mesh(new THREE.BoxGeometry(a[3],a[4],a[5]),new THREE.MeshBasicMaterial({color:new THREE.Color(1,1,1).multiplyScalar(a[6])}));m.position.set(a[0],a[1],a[2]);e.add(m)});sc.environment=new THREE.PMREMGenerator(R).fromScene(e,.04).texture}
const dl=new THREE.DirectionalLight(0xfff1dd,1.1);dl.position.set(5,11,6);dl.castShadow=true;dl.shadow.mapSize.set(2048,2048);Object.assign(dl.shadow.camera,{left:-9,right:9,top:9,bottom:-9,near:1,far:30});dl.shadow.bias=-.0005;sc.add(dl,new THREE.HemisphereLight(0xbfdcff,0x222233,.35));
const wc=document.createElement('canvas');wc.width=wc.height=256;const wx=wc.getContext('2d');for(let i=0;i<16;i++){wx.fillStyle='hsl(28,'+(35+Math.random()*10)+'%,'+(20+Math.random()*8)+'%)';wx.fillRect(0,i*16,256,16);wx.fillStyle='#0004';wx.fillRect(0,i*16,256,1)}
const WOOD=new THREE.CanvasTexture(wc);WOOD.wrapS=WOOD.wrapT=THREE.RepeatWrapping;WOOD.repeat.set(6,6);
const fl=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.MeshStandardMaterial({map:WOOD,roughness:.7,metalness:0}));fl.rotation.x=-Math.PI/2;fl.position.y=-.11;fl.receiveShadow=true;sc.add(fl);
const pc=document.createElement('canvas');pc.width=pc.height=128;const px=pc.getContext('2d');px.fillStyle='#fff';px.fillRect(0,0,128,128);px.strokeStyle='#8fb08f';px.lineWidth=1.5;for(let i=0;i<30;i++){px.beginPath();const x=Math.random()*128,y=Math.random()*128;px.moveTo(x,y);px.lineTo(x+(Math.random()-.5)*60,y);px.lineTo(x+(Math.random()-.5)*60,y+(Math.random()-.5)*60);px.stroke();px.fillStyle='#b8860b';px.fillRect(x-1,y-1,3,3)}
const PCB=new THREE.CanvasTexture(pc);PCB.wrapS=PCB.wrapT=THREE.RepeatWrapping;PCB.repeat.set(2,2);
function fit(){R.setSize(innerWidth,innerHeight);R.setPixelRatio(Math.min(devicePixelRatio,2));cam.aspect=innerWidth/innerHeight;cam.position.set(0,innerWidth<innerHeight?15:10.5,innerWidth<innerHeight?12:9);cam.lookAt(0,0,1);cam.updateProjectionMatrix()}
addEventListener('resize',fit);fit();
const box=(w,h,d,c,x,y,z)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:c,roughness:.45,metalness:.35}));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;return m};
