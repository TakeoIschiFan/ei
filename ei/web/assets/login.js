(() => {
const N = 4;
let s = '', done = false;
const dots = document.getElementById('dots');
const pin = document.getElementById('pin');
const f = document.getElementById('f');
function show() {
  dots.textContent = '●'.repeat(s.length) + '○'.repeat(N - s.length);
  if (s.length === N && !done) { done = true; pin.value = s; f.submit(); }
}
function press(d) { if (s.length < N) { s += d; show(); } }
function back() { if (done) return; s = s.slice(0, -1); show(); }
document.querySelectorAll('button[data-d]').forEach((b) => b.addEventListener('click', () => press(b.dataset.d)));
document.getElementById('back').addEventListener('click', back);
addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9' && e.key.length === 1) press(e.key);
  else if (e.key === 'Backspace') back();
  else if (e.key === 'Escape') { s = ''; show(); }
});
show();
})();
