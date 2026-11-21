// Kullanım: node render.js preview t1 t2 ...   |   node render.js video
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
(async () => {
  const tl = JSON.parse(fs.readFileSync(path.join(__dirname, 'timeline.json'), 'utf8'));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', m => console.log('page:', m.text())); page.on('pageerror', e => console.log('ERR', e.message));
  await page.goto('file://' + path.join(__dirname, 'render.html'));
  console.log('font ok:', await page.evaluate(tl => window.setup(tl), tl));
  const canvas = await page.$('canvas');
  const mode = process.argv[2];
  if (mode === 'thumb') {
    await page.evaluate(() => window.renderThumb());
    await canvas.screenshot({ path: path.join(__dirname, 'out', 'kapak_thumbnail.jpg'), type: 'jpeg', quality: 92 });
  } else if (mode === 'preview') {
    fs.mkdirSync(path.join(__dirname, 'preview'), { recursive: true });
    for (const ts of process.argv.slice(3)) {
      await page.evaluate(t => window.renderFrame(t), +ts);
      await canvas.screenshot({ path: path.join(__dirname, 'preview', `t${ts}.jpg`), type: 'jpeg', quality: 80 });
    }
  } else {
    const n = Math.ceil(tl.total * tl.fps);
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(tl.fps), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', path.join(__dirname, 'out', 'video_noaudio.mp4')], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.renderFrame(t), i / tl.fps);
      const buf = await canvas.screenshot({ type: 'jpeg', quality: 93 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 150 === 0) console.log(`kare ${i}/${n}`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})();
