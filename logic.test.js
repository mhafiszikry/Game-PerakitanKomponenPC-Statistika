// Test logika inti GamAR-PC — jalan tanpa dependensi: node --test tests/
// Memuat config.js + levels.js + game.js di VM dengan stub DOM minimal,
// lalu menguji fungsi murni: esc(), tol(), elapsed(), calc(), dan integritas data LV/ORD/QUIZ.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const dummyEl = () => ({ hidden: true, textContent: '', innerHTML: '', onclick: null, style: {}, classList: { remove() {} }, children: [], dataset: {} });
const sandbox = {
  console,
  Date, JSON, Math, setTimeout, clearTimeout, setInterval,
  innerWidth: 800, innerHeight: 600,
  document: { getElementById: () => dummyEl(), createElement: () => dummyEl() },
  localStorage: { getItem: () => null, setItem: () => {} },
  navigator: {},
};
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const f of ['js/config.js', 'js/levels.js', 'js/game.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', f), 'utf8'), sandbox, { filename: f });
}
// const/let di VM tidak menempel ke sandbox, jadi ekspor eksplisit lewat globalThis
vm.runInContext('globalThis.__g = { S, LV, ORD, QUIZ, esc, tol, elapsed, calc }', sandbox);
const { S, LV, ORD, QUIZ, esc, tol, elapsed, calc } = sandbox.__g;

test('esc() meng-escape HTML dari input siswa', () => {
  assert.equal(esc('<b>&"\''), '&lt;b&gt;&amp;&quot;&#39;');
  assert.equal(esc('Budi'), 'Budi');
  assert.equal(esc(null), '');
});

test('data level konsisten: 5 level, par > 0, semua item punya x/z', () => {
  assert.equal(LV.length, 5);
  assert.equal(ORD.length, 5);
  LV.forEach((L, i) => {
    assert.ok(L.par > 0, `level ${i + 1} par`);
    assert.ok(L.it.length > 0);
    L.it.forEach(it => { assert.equal(it.length >= 10, true); });
  });
});

test('ORD mencakup tipe komponen tiap level (sekrup GPU = bsek)', () => {
  LV.forEach((L, i) => {
    const types = new Set(L.it.map(it => (it[0] === 'sekrup' && /GPU/.test(it[1])) ? 'bsek' : it[0]));
    types.forEach(t => assert.ok(ORD[i].includes(t), `level ${i + 1} tipe ${t} tidak ada di ORD`));
  });
});

test('QUIZ: 1 soal/level, indeks jawaban valid', () => {
  assert.equal(QUIZ.length, 5);
  QUIZ.forEach(q => { assert.ok(q.a.length >= 2); assert.ok(q.c >= 0 && q.c < q.a.length); });
});

test('tol() sesuai kesulitan', () => {
  S.diff = 'sulit'; assert.equal(tol(), 0.75);
  S.diff = 'normal'; assert.equal(tol(), 0.9);
  S.diff = 'mudah'; assert.equal(tol(), 1.2);
});

test('calc(): HP penuh & cepat = skor maksimal 20', () => {
  S.lv = 0; S.hp = 5; S.hint = 0; S.paused = false; S.pausedTotal = 0;
  S.t0 = Date.now() - 10000; S.tEnd = Date.now();
  const r = calc();
  assert.equal(r.score, 20);
  assert.ok(r.time_sec >= 9 && r.time_sec <= 11);
});

test('calc(): hint mengurangi skor 2/hint (sebelum dibagi 5)', () => {
  S.lv = 0; S.hp = 5; S.hint = 5; S.t0 = Date.now() - 10000; S.tEnd = Date.now();
  assert.equal(calc().score, 18);
});

test('elapsed() mengecualikan waktu jeda', () => {
  S.t0 = Date.now() - 10000; S.tEnd = 0; S.paused = false; S.pausedTotal = 4000;
  const e = elapsed();
  assert.ok(e >= 5500 && e <= 6500, `elapsed=${e}`);
});
