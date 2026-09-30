import test from 'node:test';
import assert from 'node:assert/strict';
import { pavementPatrol, samplePatrol, PedestrianTraffic, walkingPose, PERSONAL_SPACE } from '../../src/town/pedestrians';
import { residentModel } from '../../src/town/models';
import { stoneRoads } from '../../src/town/roads';
import { starterBoard, evaluate } from '../../src/town/world';

function starterRoads(){const board=starterBoard();board.roads.push('6,17');return evaluate(board).connectedRoads;}
const fixtures = [starterRoads(),new Set(['0,0','1,0','2,0','2,1','2,2','3,2','4,2']),new Set(['0,0','1,0','2,0','0,1','2,1','0,2','1,2','2,2','3,1']),new Set(['1,0','1,1','0,1','2,1','1,2'])];
test('rounded patrol paths remain on their pavement through bends, branches and loops',()=>{
  for(const roads of fixtures){const track=pavementPatrol(roads);assert.ok(track.length>2);
    for(let distance=0;distance<track.length;distance+=.025){const p=samplePatrol(track,distance);assert.ok(roads.has(`${Math.floor(p.x)},${Math.floor(p.z)}`),JSON.stringify(p));assert.ok(Number.isFinite(p.angle));}
    assert.deepEqual(samplePatrol(track,0),samplePatrol(track,track.length));
  }
  assert.equal(pavementPatrol(new Set()).length,0);
});
test('twelve simulated minutes do not create a crowd, backwards jitter or permanent traffic stalls',()=>{
  for(const roads of fixtures){const traffic=new PedestrianTraffic(roads,12);let min=Infinity;
    for(let frame=0;frame<60*60*12;frame++){
      const angles=traffic.people.map(p=>p.angle);traffic.update(1/60);
      traffic.people.forEach((p,i)=>{assert.ok(p.travelled>=0&&p.travelled<=.01);assert.ok(Math.abs(p.angle-angles[i])<=4/60+.00001);});
      for(let i=0;i<traffic.people.length;i++)for(let j=i+1;j<traffic.people.length;j++)min=Math.min(min,Math.hypot(traffic.people[i].x-traffic.people[j].x,traffic.people[i].z-traffic.people[j].z));
    }
    assert.ok(min>=PERSONAL_SPACE,`nearest pair ${min}`);assert.ok(traffic.people.every(p=>p.totalTravelled>200),'every resident keeps walking instead of becoming stuck');
  }
});
test('walking limbs retain pivots after mesh packing and gait follows travelled distance',()=>{
  const model=residentModel('#829a87');for(const name of ['leg-left','leg-right','arm-left','arm-right'])assert.equal(model.getObjectByName(name)?.type,'Group');
  const pose=walkingPose(.08,0,true);assert.ok(pose.leg>.5);assert.ok(pose.arm<0);
  const waiting=walkingPose(0,pose.phase,false);assert.equal(waiting.leg,0);assert.equal(waiting.arm,0);assert.equal(waiting.phase,pose.phase);
});
test('stone street batching retains the road layout and only borders exposed edges',()=>{
  const board=starterBoard(),before=structuredClone(board);const roads=stoneRoads(board,evaluate(board));
  assert.deepEqual(board,before);assert.equal((roads.children[1] as any).count,board.roads.length*16);
  assert.equal(roads.children.length,3);assert.ok((roads.children[2] as any).count>0);
});
