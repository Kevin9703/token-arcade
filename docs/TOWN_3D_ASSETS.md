# 3D assets, licensing and Blender workflow

新版主体验全部使用实际 3D 网格，旧像素素材只供原街机入口使用。

## 原创资产

`src/town/models.ts` 是可复现的原生模型源：有倒角的木石构件、砖基、实心山墙、屋面瓦缝、排水边、窗框 / 百叶、花箱、门廊、老虎窗和烟囱。这部分模型 / 材质使用项目 MIT 许可。房屋、面包店 / 咖啡馆主体和镇公所目前恢复为这些完整模型；本轮 Kenney 模块拼房被用户拒绝，运行时已撤回，失败的拼房导出文件已移除。用户随后决定继续原创建模，不再寻找外部成品房屋。商店按独立建筑结构设计，禁止仅替换住宅门前道具。

`npm run build:assets` 输出 `public/assets/town/models/` 的 121 个 GLB：29 类建筑 / 装饰的 4 种外观、项目工坊 5 阶段。网格合批与索引化减少加载和绘制开销；运行时按需要加载。`scene.ts` 用 GLTFLoader 加载它们；同源 TypeScript 模型作为完整备用。

`landscape.ts` 生成独立景观网格：连续草地颜色、分层土壤、弧形浅滩 / 散布岩石 / 芦苇 / 睡莲 / 水鸭、低幅流动水面、混合林地和连续背景丘陵和农村围栏。地形装饰不参与建设收益或占地规则；可建造区域保持平面，格子只在规划时显示。

## 已使用的外部资产

[Kenney Fantasy Town Kit 2.0](https://kenney.nl/assets/fantasy-town-kit)，作者 Kenney，CC0。通过[作者在 OpenGameArt 的发布页](https://opengameart.org/content/fantasy-town-kit)下载，来源 URL、ZIP SHA256、原始 GLB / 图集 / 许可保存在 `art/vendor/kenney-fantasy-town`；原许可随 `public/assets/town/curated/Kenney-LICENSE.txt` 发布。

当前只使用成品树木、岩石、手推车、绿篱、喷泉、摊位和公园道具。`scripts/build-curated-town.py` 用本机 Blender 导入源文件，将图集颜色转成顶点色、统一比例与配色，输出 17 个派生 GLB。正常 npm 构建使用已保存的 GLB，无需联网或安装 Blender。原资产不属于本项目 MIT 模型。

```bash
blender --background --python scripts/build-curated-town.py
blender --background --python scripts/blender-town-preview.py -- --asset fountain --source public/assets/town/curated/fountain.glb
```

`art/kenney-modules.blend` 是独立源模块文件，不会覆盖原资产库或用户当前 Blender 的未保存编辑。该脚本会重建自己的文件；艺术家编辑应另存。

历史完整成品房屋候选（未采用；用户现已选择原创建模）：[Quaternius Medieval Village Pack](https://quaternius.com/packs/medievalvillage.html)、[KayKit Medieval Hexagon Pack](https://kaylousberg.itch.io/kaykit-medieval-hexagon)。这些与之前的模块拼房方案不同。选定后应先检查前后左右、尺寸、地面原点、门口与道路，再替换正式房屋。

## Blender 接入

已使用本机 **Blender 5.2.2 LTS** 实际执行 Python API：导入 73 个游戏 GLB，保存可编辑的 `art/token-town-library.blend`，重新导出住宅 GLB，并用 Cycles 渲染模型预览。当前模型的原创源仍是 TypeScript 模块化构件；Blender 工程是这些真实网格的可编辑资产库。

```bash
# 首次创建资产库（已有工程时不会自动覆盖）
blender --background --python scripts/blender-town-library.py
```

脚本导入实际 GLB，按网格陈列到独立 `asset:<filename>` 集合，生成 `art/token-town-library.blend`。可编辑网格、材质、细节与比例。完成后：

```bash
blender --background --python scripts/blender-town-library.py -- --export art/token-town-library.blend
npm run build:client
```

每个集合记录陈列偏移和输出文件名；导出时消除陈列偏移，恢复建筑局部原点，并导出 GLB。

常规 `npm run build:assets` 会从 TypeScript 重新生成资产，**覆盖手工导出的 GLB**；正式转向手工 Blender 资产后，应保留 .blend 源并调整发布构建步骤，不要混用两条生成流程。资产库生成、保存、单资产导出与 Cycles 预览均已在本机执行成功。`--rebuild` 才会从游戏 GLB 重建已有库，使用前应保留艺术家改动。

单资产验证和预览不覆盖游戏 GLB：

```bash
blender --background --python scripts/blender-town-library.py -- --export art/token-town-library.blend --asset house-0 --output-dir art/qa/blender-roundtrip
blender --background --python scripts/blender-town-preview.py -- --asset house-0
```

macOS 本机 executable 为 `/Applications/Blender.app/Contents/MacOS/Blender`。预览输出到 `art/qa/blender-house-0.png`，不改动资产库和游戏模型。资产库默认聚焦一栋住宅，按 Home 可查看整个模型陈列。

## 模型约定

- Y-up，局部地面 y=0，原点在占地中心；单位为一格。
- 门口默认面向 +Z，由运行时绕 Y 轴旋转。
- 不含 UI 字体、名称或数字；这些始终由 DOM / 状态生成。
- 足迹由 `catalog.ts` 决定，底座限制在占地内；门廊和屋檐允许少量伸向入口格，保持道路中心可通行，不侵入侧邻建筑。石桥沿 2 格河道方向。
- 工坊保持 2×2 足迹，视觉随阶段变高。所有 mesh 应能投射 / 接收阴影。
- 使用 PBR roughness / metalness 材质；Blender 专用材质节点需要烘焙后才能带到网页，导出后仍需检查游戏里的实际外观。

官方参考：[Blender 格式支持](https://www.blender.org/features/pipeline/)、[glTF 导出文档](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html)。

交互参考：[Foundation 官方建筑说明](https://wiki.polymorph.games/foundation/Buildings) 的预览放置 / 旋转 / 右键或 Esc 取消。具体拖放方式已在本项目实际浏览器中验证。

## 当前原创扩充

面包店有砖炉侧翼 / 拱窗 / 面包陈列，咖啡馆有两层露台 / 阳台 / 转角小桌，果蔬铺是开放四坡顶棚与双排果蔬台，花店为铜色砖墙翼与玻璃花房，书屋为宽檐阅读店面和书脊；温室、圆筒粮仓和存放船只的开放船屋有独立结构。前后方实测见 `art/qa/distinct-shops-front.png` / `distinct-shops-back.png`。

住宅和镇公所的 `door-hinge` 是独立 movingPart 节点；合批按局部矩阵处理，导出 GLB 保留门轴、门板与把手。窗户和门灯使用暖色材质，夜晚增加三盏局部门廊灯。屋面 / 树冠 / 草地材质标记 seasonRole，运行时着色渐变积雪和秋叶。

坐姿有水平大腿、弯膝小腿和前伸鞋面；bench / park / gazebo 使用同一个座面高度约定及各自变换后的座位锚点。

已有 Blender GUI 中的未保存编辑完全保留；本轮仅从 TypeScript 导出 GLB，不重建旧 `.blend` 文件。新建筑导入 Blender 时应另存独立工程，以保留艺术家改动。

## Farm prefabs (2026-09-30)

`wheatfield-0..3.glb` are 3 × 2 plots with tilled soil, wheat rows, a clear central working lane, boundary posts, harvest crates and tools. The named `crop-patch` articulation changes growth height without rebuilding the field.

`mill-0..3.glb` are 3 × 3 stone windmills with a tapered tower, stone courses, conical roof, arched window, wooden store wing, flour sacks and four lattice sail blades. `mill-fan` survives mesh packing and GLB export as a rotating node. This production mill is distinct from the existing small ornamental `windmill`.

Use `/asset-preview.html?farm=1` and `?farm=1&view=back` for front/back asset review. Music credits and source hashes are shipped in `public/assets/town/audio/`; they are separate licensed works, not original models.
