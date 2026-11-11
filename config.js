// ===== CONFIG: state global & helper =====
// $ = shortcut getElementById, S = state game (level terbuka, hasil, HP, error, waktu).
const $=i=>document.getElementById(i),S={unl:1,res:[],lv:0,hp:5,err:0,t0:0,ids:null,name:'',cls:'',tEnd:0,paused:false,pausedTotal:0,pauseStart:0,hint:0,diff:'sulit',practice:false};
// tol = toleransi presisi berdasarkan kesulitan (mudah longgar, sulit ketat)
function tol(){return S.diff=='mudah'?1.2:S.diff=='normal'?0.9:0.75}
// esc = escape HTML untuk input siswa (nama/kelas) sebelum masuk innerHTML
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// disposeGroup = bersihkan geometry/material lama agar tidak leak saat build ulang
function disposeGroup(g){if(!g)return;g.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose())}})}
// Warna sekrup/tanda (cadangan)
const SC=[0x94a3b8,0xfbbf24];
