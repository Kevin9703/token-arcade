import { TownStore } from './store';
import { TownUI } from './ui';

const canvas = document.getElementById('town-scene'), root = document.getElementById('town-ui');
if (!(canvas instanceof HTMLCanvasElement) || !root) throw new Error('Token Town: missing town surface');
const demo = new URLSearchParams(location.search).get('demo') === '1' || location.hostname.endsWith('github.io');
try {
  const store = new TownStore(demo ? 'demo' : undefined); new TownUI(root, store, canvas);
  document.getElementById('town-loading')?.remove();
} catch (error) {
  const loading = document.getElementById('town-loading'); if (loading) loading.innerHTML = '<h1>河谷还没准备好</h1><p>请使用支持 WebGL 2 的浏览器，并开启硬件加速。</p><button onclick="location.reload()">重新打开</button>';
  console.error(error);
}
