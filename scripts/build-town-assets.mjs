import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

await mkdir('.test-build', { recursive: true });
await build({ entryPoints: ['src/town/models.ts'], outfile: '.test-build/town-models.mjs', bundle: true, format: 'esm', platform: 'node', packages: 'external', logLevel: 'warning' });
const { buildingModel, packModel } = await import('../.test-build/town-models.mjs');
// GLTFExporter uses this standard browser API for its binary container only.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then(result => { this.result = result; this.onloadend?.(); }); }
  readAsDataURL(blob) { blob.arrayBuffer().then(result => { this.result = `data:${blob.type};base64,${Buffer.from(result).toString('base64')}`; this.onloadend?.(); }); }
};
const kinds = ['herbshelf','readingnook','riverstones','springarch','summerparasol','autumncart','winterlantern','oldwell','woodlookout','oldmill','vegetablefield','cowshed','pigpen','fishinghut','restaurant','apronstand','harvesttable','wheatbanner','wheatfield', 'mill', 'hall', 'house', 'bakery', 'cafe', 'market', 'park', 'bridge', 'clock', 'tree', 'bench', 'lamp', 'flower', 'picnic', 'birdhouse', 'windmill', 'statue', 'gardenlamp','fountain','cart','hedge','barrel','planter','gazebo','grocer','florist','library','greenhouse','granary','boathouse'];
const dir = 'public/assets/town/models'; await mkdir(dir, { recursive: true });
const exporter = new GLTFExporter(); let count = 0;
for (const kind of kinds) for (let variant = 0; variant < 4; variant++) {
  const binary = await exporter.parseAsync(packModel(buildingModel(kind, variant)), { binary: true });
  await writeFile(`${dir}/${kind}-${variant}.glb`, Buffer.from(binary)); count++;
}
for (let stage = 0; stage < 5; stage++) for(let variant=0;variant<4;variant++){
  const binary = await exporter.parseAsync(packModel(buildingModel('workshop', variant, stage)), { binary: true });
  await writeFile(`${dir}/workshop-${stage}-${variant}.glb`, Buffer.from(binary)); count++;
}
console.log(`Exported ${count} original modular town models.`);

await build({entryPoints:['src/town/asset-preview.ts'],outfile:'public/asset-preview.js',bundle:true,format:'iife',minify:true,logLevel:'warning'});
