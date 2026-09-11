(() => {
const el = document.getElementById('dv');
const aid = (el.dataset && el.dataset.aid) || '';
const err = document.getElementById('err');
const RESUME_MIN = 1, RESUME_END = 0.95, SAVE_EVERY = 5;
let errLines = 0;
function showErr(m) {
  if (!err || errLines > 10) return;
  errLines++;
  err.textContent += m + '\n';
}
// ---- no-playable-format pre-flight --------------------------------------
// The server stamps the direct track's codec name and whether the transcode ladder
// transcode stack is on; we ask MSE the same question dash.js does
// (MediaSource.isTypeSupported) so a browser that cannot decode the only
// available rendition gets a message instead of a black screen.
const NICE_CODEC = { h264: 'H.264 (AVC)', hevc: 'H.265 (HEVC)', av1: 'AV1', vp9: 'VP9' };
const CODEC_STRINGS = { h264: 'avc1.640028', hevc: 'hvc1.1.6.L120.90', av1: 'av01.0.08M.08', vp9: 'vp09.00.10.08' };
// Audio codec strings, same mapping as probe.AUDIO_CODEC_STRINGS.
// Codecs not listed there are used unchanged.
const NICE_ACODEC = { aac: 'AAC', eac3: 'Dolby Digital Plus (E-AC-3)', ac3: 'Dolby Digital (AC-3)', mp3: 'MP3', opus: 'Opus', flac: 'FLAC', vorbis: 'Vorbis', dts: 'DTS', truehd: 'Dolby TrueHD' };
const ACODEC_STRINGS = { aac: 'mp4a.40.2', eac3: 'ec-3', ac3: 'ac-3', mp3: 'mp4a.6B' };
const acodecStr = (c) => ACODEC_STRINGS[c] || c;
function mseSupportsAudio(cs) {
  try {
    return !!cs && hasMSE && MediaSource.isTypeSupported('audio/mp4; codecs="' + cs + '"');
  } catch {
    return false;
  }
}
const transcode = el.dataset.transcode === '1';
const vcodec = el.dataset.vcodec || '';
const vcodecStr = CODEC_STRINGS[vcodec] || vcodec;
const hasMSE = typeof window.MediaSource !== 'undefined';
function mseSupports(cs) {
  try {
    return !!cs && hasMSE && MediaSource.isTypeSupported('video/mp4; codecs="' + cs + '"');
  } catch {
    return false;
  }
}
const pErr = document.getElementById('playerErr');
const ovMsg = document.getElementById('ovMsg');
const ovHint = document.getElementById('ovHint');
function showPlayerErr(msg, hint) {
  if (!pErr) return;
  ovMsg.textContent = msg;
  ovHint.textContent = hint || '';
  ovHint.hidden = !hint;
  pErr.hidden = false;
  el.autoplay = false;
}
if (!hasMSE) {
  showPlayerErr(
    'This browser has no Media Source Extensions support, so DASH playback is impossible.',
    'Try a browser with MSE support (e.g. desktop Chrome or Firefox).'
  );
} else {
  // Warn about codecs this browser cannot decode. Playback continues with
  // the other track unaffected. Tracks covered by a transcode fallback
  // (H.264 video, AAC audio) are not listed. Representation choice stays
  // with dash.js.
  const warnBox = document.getElementById('trackWarn');
  const warnMsg = document.getElementById('trackWarnMsg');
  const warnX = document.getElementById('trackWarnX');
  if (warnX && warnBox) warnX.addEventListener('click', () => { warnBox.hidden = true; });
  const vBad = !!vcodecStr && !mseSupports(vcodecStr);
  const aBad = [...new Set(
    (el.dataset.acodec || '').split(',').map((s) => s.trim()).filter(Boolean)
      .filter((c) => !mseSupportsAudio(acodecStr(c)))
  )];
  const vCovered = transcode && mseSupports(CODEC_STRINGS.h264);
  const aCovered = transcode && mseSupportsAudio(ACODEC_STRINGS.aac);
  const vShow = vBad && !vCovered;
  const aShow = aBad.length > 0 && !aCovered;
  if ((vShow || aShow) && warnBox && warnMsg) {
    const vName = NICE_CODEC[vcodec] || vcodec;
    const aNames = aBad.map((c) => NICE_ACODEC[c] || c).join(', ');
    let msg;
    if (vShow && aShow) {
      msg = 'This browser can\u2019t decode ' + vName + ' video or ' + aNames + ' audio. ';
    } else if (vShow) {
      msg = 'This browser can\u2019t decode ' + vName + ' video; audio will still play. ';
    } else {
      msg = 'This browser can\u2019t decode ' + aNames + ' audio; video will play silent. ';
    }
    msg += transcode
      ? 'The fallback also looks unsupported here.'
      : 'Restart ei with --transcode for compatible H.264 video / AAC audio.';
    warnMsg.textContent = msg;
    warnBox.hidden = false;
  }
}
// Key namespace for this asset's localStorage entries ('pos', 'q', 'a').
const key = (k) => 'ei-' + k + ':' + aid;
const LS = {
  get(k, d) {
    try {
      const x = localStorage.getItem(key(k));
      return x === null ? d : x;
    } catch {
      return d;
    }
  },
  set(k, x) {
    try {
      localStorage.setItem(key(k), x);
    } catch {}
  },
  del(k) {
    try {
      localStorage.removeItem(key(k));
    } catch {}
  },
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// No ready event (api appears after a dynamic dashjs import): backoff-poll.
async function until(fn, ms = 20000) {
  const t0 = Date.now();
  let d = 50;
  for (;;) {
    const x = fn();
    if (x) return x;
    if (Date.now() - t0 > ms) return null;
    await sleep(d);
    d = Math.min(d * 1.5, 1000);
  }
}
// Resume: restore once, throttle saves, forget finished videos.
el.addEventListener('loadedmetadata', () => {
  const t = +LS.get('pos', 0), d = el.duration || 0;
  if (t > RESUME_MIN && d && t < d * RESUME_END) el.currentTime = t;
}, { once: true });
let lastSave = 0;
function savePos() {
  if (!el.duration || el.currentTime >= el.duration * RESUME_END) return;
  const now = Date.now();
  if (now - lastSave < SAVE_EVERY * 1000) return;
  lastSave = now;
  LS.set('pos', el.currentTime);
}
function saveNow() { lastSave = 0; savePos(); }
el.addEventListener('timeupdate', savePos);
el.addEventListener('pause', saveNow);
addEventListener('pagehide', saveNow);
el.addEventListener('ended', () => LS.del('pos'));
function readahead(rep) {
  fetch('/api/quality?asset=' + encodeURIComponent(aid) + '&rep=' + encodeURIComponent(rep)).catch(() => {});
}
readahead(LS.get('q', 'direct'));
function renditions() {
  return el.videoRenditions && el.videoRenditions.length ? el.videoRenditions : null;
}
function applyQuality() {
  const r = renditions();
  if (!r) return;
  // Default to the stream-copy variant: ABR compares bitrates, and a transcode
  // rung can have a higher bitrate than a lean direct encode at the same height.
  // Fall back to automatic selection only when this browser cannot decode
  // direct but can play the H.264 ladder.
  let want = LS.get('q', 'direct');
  if (want === 'direct' && transcode && vcodecStr && !mseSupports(vcodecStr) && mseSupports(CODEC_STRINGS.h264)) {
    want = 'auto';
  }
  let idx = -1;
  if (want !== 'auto') for (let i = 0; i < r.length; i++) if (String(r[i].id) === want) { idx = i; break; }
  if (r.selectedIndex !== idx) r.selectedIndex = idx;
}
async function watchRenditions() {
  const r = await until(renditions);
  if (!r) return;
  applyQuality();
  r.addEventListener('change', () => {
    const s = r[r.selectedIndex];
    const id = s && s.id ? String(s.id) : 'auto';
    LS.set('q', id);
    readahead(id === 'auto' ? 'direct' : id);
  });
}
watchRenditions();
// Audio tracks: dash.js keeps them in its own API, so mirror them into the
// element's AudioTrackList (hls-video pattern) to feed the native
// media-audio-track-menu. Labels come from /api/video; dash.js lang/codec
// strings are technical and it normalizes undetermined to "en".
const detailPromise = fetch('/api/video/' + encodeURIComponent(aid))
  .then((r) => (r.ok ? r.json() : null))
  .catch(() => null);
let audioLabels = null, syncing = false;
function dashAudio(a) {
  try {
    return a.getTracksFor('audio') || [];
  } catch {
    return [];
  }
}
function feedAudio(a) {
  if (!el.audioTracks) return;
  for (const t of [...el.audioTracks]) el.removeAudioTrack(t);
  const ts = dashAudio(a);
  const want = LS.get('a', '0');
  syncing = true;
  ts.forEach((t, i) => {
    const at = el.addAudioTrack(
      i === 0 ? 'main' : 'alternative',
      (audioLabels && audioLabels[i]) || (t.lang && t.lang !== 'und' ? t.lang + (t.codec ? ' \u00b7 ' + t.codec : '') : 'Track ' + (i + 1)),
      t.lang || 'und',
    );
    at.id = String(i);
    if (String(i) === want) at.enabled = true;
  });
  if (ts.length && ![...el.audioTracks].some((t) => t.enabled)) [...el.audioTracks][0].enabled = true;
  syncing = false;
}
until(() => el.api).then(async (a) => {
  if (!a || !el.audioTracks) return;
  el.audioTracks.addEventListener('change', () => {
    if (syncing) return;
    const sel = [...el.audioTracks].find((t) => t.enabled);
    if (!sel) return;
    LS.set('a', sel.id);
    const t = dashAudio(a)[+sel.id];
    if (!t) return;
    try {
      a.setCurrentTrack(t);
    } catch (e) {
      showErr('audio: ' + e);
    }
  });
  a.on('error', (e) => {
    showErr('player: ' + JSON.stringify((e && e.error) || e));
    // MSE said yes but the decode still failed (e.g. profile too high):
    // surface it in the player overlay. Message matching is deliberately
    // loose; dash.js error codes drift between versions.
    const er = (e && e.error) || {};
    const m = String(er.message || '').toLowerCase();
    if (pErr && pErr.hidden && /decode|codec|mediasource|not supported|unsupported|capability/.test(m)) {
      showPlayerErr('Playback failed: your browser can\u2019t decode this stream.', '');
    }
  });
  a.on('streamInitialized', () => {
    feedAudio(a);
    applyQuality();
  });
  feedAudio(a);
  // Detail fetch can be slow on first watch (full probe); upgrade to
  // friendly labels when it lands.
  const d = await detailPromise;
  if (d && Array.isArray(d.audios)) {
    audioLabels = d.audios.map((t) => t.label);
    feedAudio(a);
  }
});
// media-chrome renders "{height}p ({bitrate})" per rep, hiding the
// stream-copy variant among transcodes: label it Direct, pin it first.
// Static hooks on the menu class, patched once defined (module scripts
// execute after this classic script); guarded for version drift.
function whenDefined(n, fn) {
  if (typeof customElements !== 'undefined' && customElements.whenDefined) customElements.whenDefined(n).then(fn).catch(() => {});
}
whenDefined('media-rendition-menu', () => {
  const Menu = customElements.get('media-rendition-menu');
  if (!Menu || typeof Menu.formatRendition !== 'function' || typeof Menu.compareRendition !== 'function') return;
  const fmt = Menu.formatRendition.bind(Menu);
  Menu.formatRendition = (r, opts) => {
    if (r && r.id === 'direct') {
      const n = 'Direct ' + (r.height || r.width) + 'p';
      if (opts && opts.showBitrate && r.bitrate) {
        const mbps = r.bitrate / 1e6;
        return n + ' (' + mbps.toFixed(mbps < 1 ? 1 : 0) + ' Mbps)';
      }
      return n;
    }
    return fmt(r, opts);
  };
  const cmp = Menu.compareRendition.bind(Menu);
  Menu.compareRendition = (a, b) => {
    if (a.id === 'direct' && b.id !== 'direct') return -1;
    if (b.id === 'direct' && a.id !== 'direct') return 1;
    return cmp(a, b);
  };
});
// Captions: dash.js labels sidecars by AdaptationSet id (bare numbers),
// ignoring the MPD label attr; map ids to /api/video friendly labels.
// Sidecar id for text j is len(audios) + j + 1, matching the MPD layout.
whenDefined('media-captions-menu', async () => {
  const Menu = customElements.get('media-captions-menu');
  const d = await detailPromise;
  if (!Menu || typeof Menu.formatMenuItemText !== 'function' || !d || !Array.isArray(d.texts) || !d.texts.length) return;
  const byId = {};
  d.texts.forEach((t, j) => {
    byId[String((d.audios || []).length + j + 1)] = t.label;
  });
  const fmt = Menu.formatMenuItemText.bind(Menu);
  Menu.formatMenuItemText = (text, track) => {
    if (track && track.label != null && byId[String(track.label)] !== undefined) return byId[String(track.label)];
    return fmt(text, track);
  };
});
})();
