# GamAR-PC: Simulasi Perakitan PC 3D

Buka `index.html` di browser (butuh internet untuk memuat Three.js dari CDN).

## Struktur
- `index.html` : kerangka halaman
- `style.css`  : tampilan
- `js/` : modul JavaScript (dimuat berurutan oleh index.html)

| File | Isi | Edit di sini untuk... |
|---|---|---|
| config.js | state global `S`, helper `$` | jumlah nyawa awal, dll |
| levels.js | data 5 level + urutan perakitan `ORD` | komponen, deskripsi, posisi, target waktu |
| models.js | model 3D tiap komponen (`mk`) | bentuk/warna komponen |
| audio.js | beep, musik latar, tombol mute | suara |
| scene.js | renderer, kamera, cahaya, lantai, tekstur | tampilan dunia 3D |
| decor.js | rangka casing & dekorasi menu | dekorasi |
| camera.js | gerak kamera | sudut/zoom kamera |
| game.js | logika game: HP, timer, validasi, skor, hasil akhir | aturan & penilaian |
| map.js | peta level 3D | tampilan peta |
| finale.js | adegan final PC menyala | animasi akhir |
| input.js | mouse/touch, drag, rotasi (R) | kontrol & toleransi presisi |
| main.js | layar awal, timer HUD, loop render | alur awal |

Catatan: urutan `<script>` di index.html jangan diubah. File memakai script biasa (bukan ES module), jadi bisa dibuka langsung dengan klik dua kali tanpa server.

## Fitur
- 3 mode kesulitan (Sulit/Normal/Mudah) + Mode Latihan Bebas (tanpa nyawa, semua level terbuka)
- Pause/Restart/Keluar, Hint (-2 skor), panel info komponen, tutorial Cara Bermain
- Kuis 1 soal per level setelah selesai, leaderboard lokal (Top 5) di peta level
- Ekspor hasil: Salin JSON + Unduh CSV untuk guru

## Test otomatis
Jalankan tanpa dependensi (Node.js):
```
node --test tests/
```
Menguji `esc()`, `tol()`, `elapsed()`, `calc()`/skor, dan konsistensi data `LV`/`ORD`/`QUIZ`.

## PWA (opsional)
`manifest.json` + `sw.js` + `icon.svg` sudah tersedia. Service worker hanya aktif saat dibuka lewat `http://`/`https://` (mis. `npx serve .`), tidak aktif di `file://` — game tetap jalan normal tanpa PWA.

## Keputusan refactor
Refactor penuh ke ES Module **tidak** dilakukan, karena ES Module diblokir CORS di `file://` dan akan merusak syarat “klik dua kali tanpa server”. Sebagai gantinya: helper murni (`esc`, `tol`, `elapsed`, `disposeGroup`) dipusatkan di `config.js`/`game.js` dan teruji otomatis.
