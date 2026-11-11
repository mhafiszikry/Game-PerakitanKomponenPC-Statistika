// ===== MAIN: layar awal (nama/kelas), timer HUD, loop render =====
// ---- UI awal
function chk(){$('st').disabled=!($('nm').value.trim().length>1&&$('cl').value.trim().length>0)}
$('nm').oninput=$('cl').oninput=chk;
$('st').onclick=()=>{S.name=$('nm').value.trim();S.cls=$('cl').value.trim();S.diff=$('df').value;S.practice=$('pr').checked;if(S.practice)S.unl=5;renderMap();show('s1')};
// PWA: daftarkan service worker hanya di http(s) (tidak jalan di file://) — game tetap jalan tanpa PWA
if('serviceWorker' in navigator&&location.protocol.startsWith('http')){addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
setInterval(()=>{if(!$('hud').hidden&&!on&&!done&&typeof elapsed==='function')$('ht').textContent='⏱ '+Math.round(elapsed()/1000)+'s'},500);
$('hw').onclick=()=>{$('tut').hidden=false};$('tutOk').onclick=()=>{$('tut').hidden=true};
(function loop(){requestAnimationFrame(loop);if(on){spin.forEach(f=>f.rotation.y+=.35);rgb.material.emissive.setHSL((Date.now()/1000)%1,1,.5)}if(held)held.g.rotation.y=-held.k*Math.PI/2;else if(zones)zones.forEach(z=>{if(z.g.visible){if(z.hintUntil&&Date.now()<z.hintUntil)z.g.material.color.setHex(0x22ff88);else z.g.material.color.setHSL(.15,1,.5+.2*Math.sin(Date.now()/180))}});camUpd();R.render(sc,cam)})();
