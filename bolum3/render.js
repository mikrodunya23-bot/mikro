// node render.js preview t1 t2 ... | node render.js thumb | node render.js segment <from> <to> <out.mp4> | node render.js video [workers]
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
const tl = JSON.parse(fs.readFileSync(path.join(__dirname, 'timeline.json'), 'utf8'));
async function open() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', e => console.log('ERR', e.message));
  await page.goto('file://' + path.join(__dirname, 'film.html'));
  const ok = await page.evaluate(tl => window.setup(tl), tl); if (!ok) console.log('UYARI: font yüklenemedi');
  return { browser, page, canvas: await page.$('canvas') };
}
const run = (args) => new Promise((res, rej) => { const p = spawn(process.execPath, [__filename, ...args], { stdio: 'inherit' }); p.on('close', c => c ? rej(c) : res()); });
(async () => {
  const mode = process.argv[2];
  if (mode === 'video') {
    const nw = +(process.argv[3] || 4), n = Math.ceil(tl.total * tl.fps), per = Math.ceil(n / nw);
    fs.mkdirSync(path.join(__dirname, 'out', 'seg'), { recursive: true });
    const jobs = []; for (let k = 0; k < nw; k++) jobs.push(run(['segment', k * per, Math.min(n, (k + 1) * per), path.join(__dirname, 'out', 'seg', `s${k}.mp4`)]));
    await Promise.all(jobs);
    fs.writeFileSync(path.join(__dirname, 'out', 'seg', 'list.txt'), Array.from({ length: nw }, (_, k) => `file 's${k}.mp4'`).join('\n'));
    await new Promise(r => spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(__dirname, 'out', 'seg', 'list.txt'), '-c', 'copy', path.join(__dirname, 'out', 'video_noaudio.mp4')], { stdio: 'inherit' }).on('close', r));
    return;
  }
  const { browser, page, canvas } = await open();
  if (mode === 'preview') {
    fs.mkdirSync(path.join(__dirname, 'preview'), { recursive: true });
    for (const ts of process.argv.slice(3)) { await page.evaluate(t => window.renderFrame(t), +ts); await canvas.screenshot({ path: path.join(__dirname, 'preview', `t${ts}.jpg`), type: 'jpeg', quality: 75 }); }
  } else if (mode === 'thumb') {
    await page.evaluate(() => window.renderThumb()); await canvas.screenshot({ path: path.join(__dirname, 'out', 'kapak_thumbnail.jpg'), type: 'jpeg', quality: 92 });
  } else if (mode === 'segment') {
    const [from, to, out] = [+process.argv[3], +process.argv[4], process.argv[5]];
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(tl.fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-tune', 'animation', '-crf', '23', '-pix_fmt', 'yuv420p', '-g', '60', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = from; i < to; i++) {
      await page.evaluate(t => window.renderFrame(t), i / tl.fps);
      const buf = await canvas.screenshot({ type: 'jpeg', quality: 92 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if ((i - from) % 600 === 0) console.log(`[${path.basename(out)}] ${i - from}/${to - from}`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})();
