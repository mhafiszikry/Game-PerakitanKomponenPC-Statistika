// ===== DATA LEVEL =====
// Format item: [tipe, nama, deskripsi, warna, lebar, tinggi, dalam, x, z, perluRotasi, yOffset]
// par = target waktu (detik), b = ukuran papan [lebar, dalam, warna], dec = komponen dekorasi dari level sebelumnya
const LV=[
{n:'Persiapan Motherboard',ic:'🧩',par:150,b:[8,6,0x14532d],dec:[],it:[
['tuas','Tuas Soket CPU','Mengunci CPU di soket LGA/PGA agar kontak pin kuat.',0xcbd5e1,.15,.1,1.2,-2.5,-.8,0],
['cpu','CPU Prosesor','Otak komputer; segitiga di sudut harus sejajar dengan soket.',0x94a3b8,1,.15,1,-1.5,-.8,1],
['pasta','Pasta Termal','Mengisi celah mikro agar panas CPU berpindah ke heatsink.',0xe5e7eb,.7,.04,.7,-1.5,-.8,0,.15],
['cooler','Heatsink & Kipas','Membuang panas CPU ke udara.',0x334155,1.8,.7,1.8,-1.5,-.8,1,.19],
['brkt','Bracket Cooler (backplate)','Penyangga cooler di belakang motherboard agar baut menekan merata.',0x64748b,2.2,.05,2.2,-1.5,-.8,0],
['cfan','Kabel Kipas CPU_FAN','Sumber daya kipas cooler; colok ke header CPU_FAN.',0x111827,.5,.12,.6,-3.2,-2.3,0],
['ram','RAM DDR4 (Slot 2)','Memori sementara. Pakai slot 2 dan 4 untuk dual-channel; cocokkan takik, tekan sampai klik.',0x16a34a,.15,.5,2.4,.85,-.8,1],
['ram','RAM DDR4 (Slot 4)','Memori kedua untuk dual-channel; takik harus sejajar dengan sekat slot.',0x16a34a,.15,.5,2.4,1.55,-.8,1],
['m2','SSD M.2 NVMe','Penyimpanan cepat langsung ke slot M.2.',0x8b5cf6,.5,.06,1.8,-.2,1.6,1],
['sekrup','Sekrup M.2','Mengunci SSD M.2 agar tidak terangkat.',0xfbbf24,.2,.1,.2,-.2,2.6,0,.06]]},
{n:'Casing & PSU',ic:'🔌',par:90,b:[9,6,0x1f2937],dec:[],it:[
['psu','Power Supply (PSU)','Mengubah AC menjadi DC; kipas menghadap ventilasi.',0x111827,2.4,1.2,1.6,-2.5,1.8,1],
['sekrup','Sekrup PSU','Mengikat PSU ke rangka casing.',0xfbbf24,.2,.1,.2,-4.1,1.2,0],
['sekrup','Sekrup PSU','Mengikat PSU ke rangka casing.',0xfbbf24,.2,.1,.2,-4.1,2.4,0],
['sekrup','Sekrup PSU','Mengikat PSU ke rangka casing.',0xfbbf24,.2,.1,.2,-.9,1.2,0],
['sekrup','Sekrup PSU','Mengikat PSU ke rangka casing.',0xfbbf24,.2,.1,.2,-.9,2.4,0]]},
{n:'Pemasangan Motherboard',ic:'🔩',par:120,b:[9,6,0x1f2937],dec:['psu'],it:[
['io','I/O Shield','Pelindung panel port belakang motherboard.',0xcbd5e1,1.6,.3,.12,-1.6,-2.8,1],
['mobo','Motherboard (rakitan Level 1)','Papan utama penghubung semua komponen.',0x14532d,3.6,.12,3.2,.6,-.6,1],
...[[-1,-2],[2.2,-2],[-1,.8],[2.2,.8],[.6,-2],[.6,.8]].map(p=>['sekrup','Sekrup Standoff','Mengunci motherboard ke standoff casing.',0xfbbf24,.2,.1,.2,p[0],p[1],0,.12])]},
{n:'Storage & GPU',ic:'💾',par:100,b:[9,6,0x1f2937],dec:['psu','mo'],it:[
['hdd','SSD/HDD SATA 2.5"','Penyimpanan data utama sistem.',0x475569,1.2,.25,1.8,3.5,-1.8,1],
['sekrup','Sekrup Drive','Mengunci drive ke bay.',0xfbbf24,.2,.1,.2,3,-.5,0],
['sekrup','Sekrup Drive','Mengunci drive ke bay.',0xfbbf24,.2,.1,.2,4,-.5,0],
['gpu','Kartu Grafis (GPU)','Memproses grafis; masuk ke slot PCIe x16 sampai klik.',0xb91c1c,3,.4,1,.6,.5,1,.12],
['sekrup','Baut Bracket GPU','Mengencangkan bracket GPU ke casing agar tidak goyang.',0xfbbf24,.2,.1,.2,-1.05,.1,0,.16],
['sekrup','Baut Bracket GPU','Mengencangkan bracket GPU ke casing agar tidak goyang.',0xfbbf24,.2,.1,.2,-1.05,.9,0,.16]]},
{n:'Kabel & POST Test',ic:'🚀',par:150,b:[9,6,0x1f2937],dec:['psu','mo','hd','gp'],it:[
['c24','Kabel ATX 24-pin','Daya utama motherboard.',0xfacc15,.4,.12,1.2,2.1,-1,1,.12],
['c8','Kabel CPU 8-pin','Daya khusus prosesor.',0xf97316,.8,.12,.4,.6,-2,1,.12],
['pcie','Kabel PCIe 6+2 pin','Daya tambahan untuk GPU.',0xef4444,.8,.12,.4,0,.6,1,.45],
['satap','Kabel Daya SATA','Daya untuk drive penyimpanan.',0x84cc16,.4,.12,1,4.1,-.2,0],
['satad','Kabel Data SATA','Jalur data drive ke motherboard.',0xef4444,.4,.12,1,3.2,-.2,0],
['pw','Power Switch','Header tombol daya depan.',0x3b82f6,.3,.1,.3,1,2.2,0],
['rs','Reset Switch','Header tombol reset.',0xa855f7,.3,.1,.3,1.5,2.2,0],
['pl','Power LED','Header lampu indikator daya.',0x22c55e,.3,.1,.3,2,2.2,0],
['hl','HDD LED','Header lampu aktivitas disk.',0xeab308,.3,.1,.3,2.5,2.2,0],
['usb3','Kabel USB 3.0 Front','Port USB 3.0 casing ke header motherboard.',0x2563eb,.4,.12,.9,3.2,1.4,0],
['usb2','Kabel USB 2.0 Front','Port USB 2.0 casing ke header motherboard.',0x64748b,.3,.12,.8,3.8,1.4,0],
['hda','Kabel HD Audio','Audio depan casing ke header HD Audio.',0x22d3ee,.3,.12,.9,.2,2.2,0],
['zip','Zip Tie','Pengikat kabel agar jalur manajemen kabel rapi.',0xf8fafc,.5,.05,.12,2.8,.3,0],
['zip','Zip Tie','Pengikat kabel agar jalur manajemen kabel rapi.',0xf8fafc,.5,.05,.12,-3.6,-.5,0]]}];

// Urutan perakitan wajib per level (berdasarkan tipe komponen; 'bsek' = baut bracket GPU)
const ORD=[['brkt','tuas','cpu','pasta','cooler','cfan','ram','m2','sekrup'],['psu','sekrup'],['io','mobo','sekrup'],['hdd','sekrup','gpu','bsek'],['c24','c8','pcie','satap','satad','pw','rs','pl','hl','usb3','usb2','hda','zip']];

// Kuis singkat per level (1 soal/level, c = indeks jawaban benar). Hasil kuis dicatat, tidak mengubah skor perakitan.
const QUIZ=[
 {q:'Apa fungsi pasta termal pada CPU?',a:['Mengisi celah mikro agar panas berpindah ke heatsink','Memberi daya listrik ke CPU','Mengunci CPU ke soket'],c:0},
 {q:'PSU terutama berfungsi untuk...',a:['Menyimpan data','Mengubah AC menjadi DC untuk komponen','Memproses grafis'],c:1},
 {q:'Sekrup standoff dipasang sebelum...',a:['Motherboard ke casing','Kabel SATA','GPU'],c:0},
 {q:'GPU dipasang ke slot...',a:['PCIe x16','RAM','M.2'],c:0},
 {q:'Kabel ATX 24-pin memberi daya ke...',a:['GPU saja','Motherboard (daya utama)','Kipas casing'],c:1}];
