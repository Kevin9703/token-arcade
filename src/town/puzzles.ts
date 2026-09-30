import type { Board, Evaluation, Goal, Puzzle } from './types';
import { key, makeBuilding } from './world';

function streetSolution(): Board {
  return { size: 12, terrain: 'meadow', buildings: [makeBuilding('hall', 'hall', 5, 5, 2), ...[1, 3, 7, 9].map((x, i) => makeBuilding(`h-${i}`, 'house', x, 1)), makeBuilding('bakery', 'bakery', 5, 1), makeBuilding('park-a', 'park', 1, 5, 2), makeBuilding('park-b', 'park', 8, 5, 2)], roads: [...Array.from({ length: 11 }, (_, i) => key(i + 1, 3)), key(6, 4), key(1, 4), key(8, 4)] };
}
function serviceSolution(): Board {
  return { size: 12, terrain: 'meadow', buildings: [makeBuilding('hall', 'hall', 9, 7, 2), ...[0, 2, 4, 6, 8, 10].map((x, i) => makeBuilding(`h-${i}`, 'house', x, 1)), makeBuilding('bakery', 'bakery', 3, 4, 2), makeBuilding('cafe-a', 'cafe', 5, 4, 2), makeBuilding('cafe-b', 'cafe', 9, 4, 2), makeBuilding('park-a', 'park', 1, 4, 2), makeBuilding('park-b', 'park', 7, 4, 2)], roads: [...Array.from({ length: 11 }, (_, i) => key(i + 1, 3)), key(11, 4), key(11, 5), key(11, 6), key(10, 6)] };
}
function riverSolution(): Board {
  return { size: 12, terrain: 'river', buildings: [makeBuilding('hall', 'hall', 4, 9, 2), makeBuilding('h-a', 'house', 0, 1), makeBuilding('h-b', 'house', 9, 1), makeBuilding('h-c', 'house', 0, 8, 2), makeBuilding('h-d', 'house', 9, 8, 2), makeBuilding('bakery-a', 'bakery', 4, 1), makeBuilding('bakery-b', 'bakery', 2, 8, 2), makeBuilding('cafe-a', 'cafe', 7, 1), makeBuilding('cafe-b', 'cafe', 7, 8, 2), makeBuilding('park-a', 'park', 2, 1), makeBuilding('park-b', 'park', 9, 10, 3), makeBuilding('bridge', 'bridge', 6, 5)], roads: [...Array.from({ length: 10 }, (_, i) => key(i + 1, 3)), ...Array.from({ length: 12 }, (_, i) => key(i, 7)), key(6, 4), key(5, 8), key(11, 8), key(11, 9), key(11, 10)] };
}
const street = streetSolution(), service = serviceSolution(), river = riverSolution();
export const PUZZLES: Puzzle[] = [
  { id: 'short-roads', title: '少走弯路', description: '四户邻居，一家面包店。找到一条简单又舒服的街道。', family: '道路规划', roadBudget: 28, efficientBudget: 14, required: 4, greenGoal: 2, leisureGoal: 0, reward: 'flower', solution: street },
  { id: 'quiet-street', title: '弯路的尽头', description: '同样的建筑，更少的道路。把空地留给公园。', family: '道路规划 · 进阶', roadBudget: 20, efficientBudget: 14, required: 4, greenGoal: 3, leisureGoal: 0, reward: 'picnic', solution: street },
  { id: 'one-shop', title: '一店多用', description: '一家面包店只能服务六户。两家咖啡馆的距离也很重要。', family: '服务覆盖', roadBudget: 28, efficientBudget: 16, required: 6, greenGoal: 2, leisureGoal: 6, reward: 'birdhouse', solution: service },
  { id: 'just-enough', title: '恰到好处', description: '让六户邻居都能喝到咖啡，还要给绿荫留个位置。', family: '服务覆盖 · 进阶', roadBudget: 22, efficientBudget: 16, required: 6, greenGoal: 4, leisureGoal: 6, reward: 'windmill', solution: service },
  { id: 'one-bridge', title: '一桥两岸', description: '只有一个桥位。让南北两岸的邻居吃上新鲜面包。', family: '跨河社区', roadBudget: 38, efficientBudget: 28, required: 4, greenGoal: 2, leisureGoal: 0, reward: 'statue', solution: river },
  { id: 'riverside', title: '桥边的生活', description: '桥、面包、咖啡和绿地。用有限道路连起完整的生活。', family: '跨河社区 · 进阶', roadBudget: 32, efficientBudget: 28, required: 4, greenGoal: 2, leisureGoal: 4, reward: 'gardenlamp', solution: river },
];
export function freshPuzzle(p: Puzzle): Board {
  const board = structuredClone(p.solution); board.roads = [];
  for (const b of board.buildings) if (b.kind !== 'hall') b.placed = false;
  return board;
}
export function puzzleGoals(p: Puzzle, e: Evaluation): Goal[] {
  const g = (label: string, current: number, need: number): Goal => ({ label, current, need, met: current >= need });
  return [g(`${p.required} 栋住宅接通道路并获得食物`, e.food, p.required), ...(p.solution.terrain === 'river' ? [g('石桥连通两岸', e.bridge ? 1 : 0, 1), g('两岸都有住宅获得食物', e.northFood > 0 && e.southFood > 0 ? 1 : 0, 1)] : []), ...(p.leisureGoal > 0 ? [g(`${p.leisureGoal} 栋住宅获得休闲服务`, e.leisure, p.leisureGoal)] : []), g(`道路不超过 ${p.roadBudget} 格`, e.roadCount <= p.roadBudget ? 1 : 0, 1)];
}
export function puzzleStars(p: Puzzle, e: Evaluation): number {
  if (!puzzleGoals(p, e).every(g => g.met)) return 0;
  return 1 + puzzleBonusGoals(p, e).filter(g => g.met).length;
}
export function puzzleBonusGoals(p: Puzzle, e: Evaluation): Goal[] {
  return [
    { label: `道路不超过 ${p.efficientBudget} 格`, current: e.roadCount <= p.efficientBudget ? 1 : 0, need: 1, met: e.roadCount <= p.efficientBudget },
    { label: `${p.greenGoal} 栋住宅邻近公园`, current: e.green, need: p.greenGoal, met: e.green >= p.greenGoal },
  ];
}
