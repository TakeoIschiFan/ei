(() => {
const grid = document.getElementById('grid');
const q = document.getElementById('q');
const sort = document.getElementById('sort');
const count = document.getElementById('count');
const sentry = document.getElementById('sentry');
const BATCH = 200;
const FALLBACK = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="#222"/></svg>');
let all = [], v = [], shown = 0, t = 0;
const cmp = {
  size: (a, b) => b.size - a.size,
  name: (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }),
  'date-asc': (a, b) => a.mtime - b.mtime,
  'dur-desc': (a, b) => (b.duration || 0) - (a.duration || 0),
  'dur-asc': (a, b) => (a.duration || 0) - (b.duration || 0),
};
function fmt(d) {
  d = +d || 0;
  const h = Math.floor(d / 3600), m = Math.floor(d % 3600 / 60), s = Math.floor(d % 60);
  return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(s).padStart(2, '0');
}
function render() {
  const needle = q.value.trim().toLowerCase();
  v = all.filter((x) => x.name.toLowerCase().includes(needle));
  v.sort(cmp[sort.value] || ((a, b) => b.mtime - a.mtime));
  count.textContent = v.length ? v.length + ' video' + (v.length > 1 ? 's' : '') : 'no videos';
  grid.replaceChildren();
  shown = 0;
  more();
}
function card(x) {
  const a = document.createElement('a');
  a.className = 'card';
  a.href = '/watch/' + encodeURIComponent(x.id);
  const img = document.createElement('img');
  img.className = 'thumb';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.alt = '';
  img.src = '/thumb/' + encodeURIComponent(x.id) + '.jpg';
  img.onerror = () => { img.onerror = null; img.src = FALLBACK; };
  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.textContent = x.name;
  meta.title = x.name;
  if (x.duration != null) {
    const b = document.createElement('span');
    b.className = 'badge';
    b.textContent = fmt(x.duration);
    meta.prepend(b);
  }
  a.append(img, meta);
  return a;
}
function more() {
  for (let n = 0; n < BATCH && shown < v.length; n++, shown++) grid.appendChild(card(v[shown]));
}
new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) more(); }, { rootMargin: '800px' }).observe(sentry);
q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(render, 150); });
sort.addEventListener('change', render);
fetch('/api/videos').then((r) => { if (!r.ok) throw 0; return r.json(); }).then((j) => { all = j; render(); }).catch(() => { count.textContent = 'failed to load'; });
})();
