// Balance simulator for FATHOM. Run: node sim.js [runs]
// Reads the game rules straight out of index.html (or engine.js while developing),
// plays them with a simple robot, and prints how long each act took.
const fs = require('fs'), path = require('path');
let src;
const html = path.join(__dirname, 'index.html');
if (fs.existsSync(html) && !process.env.DEV) {
  const t = fs.readFileSync(html, 'utf8');
  src = t.slice(t.indexOf('/*ENGINE-START*/'), t.indexOf('/*ENGINE-END*/'));
} else src = fs.readFileSync(path.join(__dirname, 'engine.js'), 'utf8');
const F = new Function(src + ';return FATHOM;')();
if (process.env.KG) F.K.hullGrow = JSON.parse(process.env.KG);
if (process.env.TS) JSON.parse(process.env.TS).forEach((v, i) => { F.SUBS[i + 1].samples = v; });

const PRIORITY = ['ping', 'pep', 'build', 'tier', 'intern', 'decode', 'open', 'perm:glass', 'perm:winch', 'perm:nerve', 'perm:spare', 'perm:blackbox', 'perm:paper'];
function botBuy(s) {
  for (let n = 0; n < 500; n++) {
    let did = false;
    for (const a of PRIORITY) if (F.can(s, a)) { F.act(s, a); did = true; break; }
    if (did) continue;
    const pl = F.plan(s, s.risk), full = Math.min(F.FLOOR, F.rating(s) * F.RISKS[s.risk].f);
    const need = Math.max(0, (full - 1000) / 50);
    const opts = ['hull', 'cargo', ...F.GENS.map(g => 'gen:' + g.id), ...F.RESEARCH.map(r => 'res:' + r.id)];
    if (s.flags.mid && F.powerRate(s) * pl.time < need) opts.push('glow');
    if (s.flags.mid && F.powerCap(s) < need * 1.1) opts.push('batt');
    let best = null, bc = Infinity;
    for (const a of opts) if (F.can(s, a)) { const c = F.info(s, a).cs; if (c < bc) { bc = c; best = a; } }
    if (!best) break;
    F.act(s, best);
  }
  if (F.can(s, 'dive')) F.act(s, 'dive');
}
function run(tanks) {
  let s = F.newState(1), t = 0;
  const marks = {}, out = [];
  const names = { sun: 'Act 1 done (sub unlocked)', twi: 'Act 2 done (200 m)', mid: 'Act 3 done (1,000 m)', aby: 'Act 4 done (4,000 m)', tre: '6,000 m', floor: 'Floor reached', hatch: 'Hatch open (ending)' };
  const mark = () => { for (const k in names) if (s.flags[k] && marks[k] === undefined) marks[k] = t; };
  s.risk = 1;
  for (let tank = 1; tank <= tanks; tank++) {
    const t0 = t; for (const k in marks) delete marks[k];
    // first hour: sitting at the screen
    while (t - t0 < 3600 && !s.flags.hatch) {
      const clicks = t - t0 < 300 ? 10 : 2;
      for (let i = 0; i < clicks; i++) F.act(s, 'scoop');
      botBuy(s); F.advance(s, 5); t += 5; mark();
    }
    // after that: a look every 20 minutes through a working day (10 hours), then nothing until the next morning
    let n = 0;
    while (!s.flags.hatch && t - t0 < 20 * 86400) {
      for (let i = 0; i < 2; i++) { botBuy(s); F.advance(s, 30); t += 30; mark(); }
      n++;
      const gap = (n % 30 === 0 ? 14 * 3600 : 1200) - 60;
      const live = Math.min(gap, F.K.offlineCap);
      for (let d = 0; d < live; d += 300) { F.advance(s, Math.min(300, live - d)); mark(); }
      t += gap;
    }
    botBuy(s);
    const r = { tank, marks: Object.assign({}, marks), t0, dives: s.dives, lost: s.subsLost, spec: s.spec.length, hull: s.hull, lessons: s.lessons, papers: s.perm.paper || 0 };
    out.push(r);
    for (const k in names) if (marks[k] !== undefined) r[k] = marks[k] - t0;
    if (s.flags.hatch) { F.act(s, 'open'); s = F.drain(s); s.risk = 1; }
  }
  return { out, names };
}
const h = x => x === undefined ? '   never' : x < 3600 ? (x / 60).toFixed(0).padStart(5) + ' m' : x < 86400 ? (x / 3600).toFixed(1).padStart(5) + ' h' : (x / 86400).toFixed(1).padStart(5) + ' d';
if (require.main !== module) { module.exports = { run, F }; return; }
const runs = +process.argv[2] || 3;
for (let i = 0; i < runs; i++) {
  const { out, names } = run(+process.env.TANKS || 2);
  for (const r of out) {
    console.log(`\nRun ${i + 1}, Tank ${r.tank}: ${r.dives} dives, ${r.lost} subs lost, ${r.spec}/30 specimens, hull ${r.hull}, papers ${r.papers}`);
    for (const k in names) console.log('  ' + names[k].padEnd(28) + h(r[k]));
  }
}
