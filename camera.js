// ===== KAMERA: orbit, zoom, mode menu/peta/final =====
let ang=0,zoom=1,fly=1,orb=null,menu=true;
function camUpd(){const T=Date.now()/1000;
 if(menu==3){finUpd(T);return}if(menu==2){mapUpd(T);return}if(menu){const a=T*.18;cam.position.set(Math.sin(a)*10,4.5+Math.sin(T*.5),Math.cos(a)*10);cam.lookAt(0,.8,0);deco.children.forEach((o,i)=>{if(o.userData.y!=null){o.rotation.y+=.012;o.position.y=o.userData.y+Math.sin(T*1.3+i)*.3}});return}
 fly=Math.min(1,fly+.018);const e=1-Math.pow(1-fly,3),po=innerWidth<innerHeight,tx=po?0:2.4,hh=po?15:10.5,dd=(po?12:9)-1,k=zoom*(1.8-.8*e);
 cam.position.set(tx+Math.sin(ang)*dd*k+Math.sin(T*.4)*.12,hh*k,1+Math.cos(ang)*dd*k);cam.lookAt(tx,0,po?3:1)}
