const { join } = require('path');

const { ensureDir, saveFile } = require('./common');

const outDir = join(process.cwd(), 'public');
const outPath = join(outDir, 'manifest.json');

const appName = process.env.PODCST_APP || 'Podcst';
const baseUrl = process.env.PODCST_URL || 'play.podcst.app';
const cdnUrl = baseUrl.replace('play', 'static');

const templateManifest = {
  short_name: appName,
  name: appName,
  icons: [
    {
      src: `https://${cdnUrl}/icons/launcher-72.png`,
      type: 'image/png',
      sizes: '72x72'
    },
    {
      src: `https://${cdnUrl}/icons/launcher-96.png`,
      type: 'image/png',
      sizes: '96x96'
    },
    {
      src: `https://${cdnUrl}/icons/launcher-144.png`,
      type: 'image/png',
      sizes: '144x144'
    },
    {
      src: `https://${cdnUrl}/icons/launcher-192.png`,
      type: 'image/png',
      sizes: '192x192'
    },
    {
      src: `https://${cdnUrl}/icons/launcher-512.png`,
      type: 'image/png',
      sizes: '512x512'
    }
  ],
  background_color: '#212121',
  theme_color: '#212121',
  display: 'standalone',
  start_url: '/'
};

module.exports = function generateManifest() {
  ensureDir(outDir);
  saveFile(outPath, templateManifest);
}
