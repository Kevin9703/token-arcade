import test from 'node:test';
import assert from 'node:assert/strict';
import { promoTown } from '../../src/promo/fixture';
import { parseTown } from '../../src/town/store';
import { canPlace, evaluate } from '../../src/town/world';
import { farmChains } from '../../src/town/farming';

test('fictional promo inventory fits the map, preserves coin rules and supplies a working farm', () => {
  const s = promoTown();
  for (const b of s.town.buildings) b.placed = true;
  assert.ok(parseTown(JSON.stringify(s), 'demo'));
  for (const b of s.town.buildings) assert.equal(canPlace(s, s.town, b), null, b.id);
  const chains = farmChains(s.town, evaluate(s.town), s.farm);
  assert.equal(chains.length, 1); assert.equal(chains[0].problem, '');
  assert.ok(chains[0].toMill.length > 1 && chains[0].toBakery.length > 1);
  assert.ok(s.coins <= s.tokenCoins + s.subsidyPaid);
  assert.ok(s.projects.every(p => p.id.startsWith('demo-project-')));
});
