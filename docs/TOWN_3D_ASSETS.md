# 河谷小镇 · 3D 资产与制作流程

当前城镇使用完整 3D 网格，模型源是 `src/town/models.ts`、`src/town/village-models.ts` 与 `src/town/community-models.ts`。建筑、居民和环境采用统一的微缩景观比例、木石材质、柔和阴影与暖色灯光。玩法占地和价格以 [游戏规则](TOKEN_TOWN.md) 为准，实际检查见 [验收记录](QA.md)。

## 原创模型与导出

```bash
npm run build:assets
```

`scripts/build-town-assets.mjs` 输出 `public/assets/town/models/` 中的 **216 个 GLB**：49 类建筑 / 装饰各四种外观，项目工坊五个阶段各四款外观。`scene.ts` 通过 GLTFLoader 按需加载，同源 TypeScript 模型作为加载失败时的完整备用。

模型使用倒角木石构件、砖基、实心山墙、瓦缝、排水边、窗框、百叶、花箱、门廊、老虎窗和烟囱。网格按材质合批并索引化，活动部件保持独立节点。

商店必须有不同的轮廓和结构：

| 建筑 | 结构特征 |
|---|---|
| 面包店 | 低矮砖炉侧翼、拱窗和面包陈列 |
| 咖啡馆 | 两层露台、阳台和转角小桌 |
| 果蔬铺 | 开放四坡顶棚、双排果蔬台 |
| 花艺店 | 铜色砖墙翼与玻璃花房 |
| 河谷书屋 | 宽檐阅读店面与书脊陈列 |
| 小饭馆 | 宽瓦顶、前庭双餐桌、厨房侧翼与独立烟囱 |
| 牛棚 / 猪圈 | 开放坡顶牧棚、围栏、水槽、干草与可活动牛猪 |
| 菜地 / 钓鱼小屋 | 中央工作道的蔬菜畦；木屋、渔网与伸向河水的独立码头 |
| 温室 / 粮仓 / 船屋 | 分别使用玻璃结构、圆筒仓体和开放船棚 |

这些模型和材质采用项目 MIT 许可。树木、路灯等可购买实例仍使用原创模型；导入景观素材的来源另行记录。

## 动画节点与景观

- `door-hinge`：住宅、镇公所、工坊、面包店、咖啡馆、花店、图书馆、温室、粮仓、磨坊、饭馆、钓鱼小屋及菜地 / 牛棚 / 猪圈的门轴或栅栏门。门板、玻璃和把手随轴运动，合批与 GLB 导出保持独立。`doorways.ts` 统一门洞、门轴、等候点与室内工位；实体墙、玻璃和围栏均留真实门洞。开放市场与装饰船屋保持开放用途，钓鱼路线从渔屋外侧绕行。
- `smoke-emitter`：面包店与饭馆的烟囱口锚点，空节点随 GLB 保留；烟雾从其世界坐标生成，随建筑旋转和搬迁。
- `clock-hour-0..3` / `clock-minute-0..3`：钟楼四面的独立指针轴；运行时按游戏时间更新，合批不焊死指针。
- `crop-patch`：3 × 2 麦田的作物块，生长改变高度，保留中央工作通道、田埂、木桩、箱子和工具。
- `mill-fan`：3 × 3 磨坊的四片格栅叶片。磨坊还有锥形石塔、石砌层、圆锥屋顶、拱窗、木侧仓和面粉袋；它与园林装饰小风车是不同资产。
- `vegetable-crops` / `cow-*` / `pig-*`：菜地、温室作物与独立动物组；导出仍可生长、轻摇。村民钓竿和鱼货在场景中生成。
- 座位锚点：长椅、公园和凉亭共享座面高度约定，按建筑位置和旋转变换。居民坐姿使用水平大腿、弯膝小腿和前伸鞋面。
- 季节材质：屋面、树冠、草地标记 `seasonRole`，运行时渐变秋叶与积雪；窗户和门灯保持暖色。

`terrain.ts` 定义 40×40 主城的地形：原街区保持原高度，南侧草甸台地与东侧高地通过缓坡连接，外围为丘陵与自然边缘。完整建筑占地必须平整；缓坡可修路。这个纯规则模块同时供道路法线、建筑基础、落点拾取、村民接地、门口、选中范围和街道视角使用。

`landscape.ts` 沿河岸曲线裁切草地，生成浅滩、岩石、芦苇、睡莲、水鸭与不透明流水；两端在地图外接入弯曲的林间水域。树木、野花、蘑菇、倒木、坡带石块、小码头、泊船与观景台形成景观层次。重复资产实例合批，种子稳定；在道路 / 建筑周围隐藏相应实例，释放土地后恢复，不重建居民或整幅地形。景观不提供服务、资源或收益，固定规划关仍为平地。

浏览器模型陈列入口：`/asset-preview.html`。新增饭馆、牛棚、猪圈、菜地、钓鱼小屋与温室用 `?village=1`，反面加 `&view=back`；构建时同步生成模型陈列入口。麦田和磨坊前方见 `/asset-preview.html?farm=1`，后方见 `/asset-preview.html?farm=1&view=back`。必须同时查看实际游戏，陈列图不能替代建筑与道路的现场检查。

## Blender 工作流

Blender 是可选的模型编辑与渲染工具，普通 npm 构建不需要安装它。已有 `art/token-town-library.blend` 是可编辑资产库，可能早于当前完整 GLB 集合。新增模型应单独导入并另存，保留艺术家修改；不要覆盖用户打开的未保存场景。

首次创建资产库：

```bash
blender --background --python scripts/blender-town-library.py
```

脚本从当前 GLB 建立 `asset:<filename>` 集合，记录陈列偏移和输出文件名，保存 `art/token-town-library.blend`。已有文件时默认拒绝覆盖；`--rebuild` 会替换资产库，只有明确要从 GLB 重建、且已保留手工修改时才使用。

编辑后可导出单个资产到独立目录：

```bash
blender --background --python scripts/blender-town-library.py -- --export art/token-town-library.blend --asset house-0 --output-dir art/qa/blender-roundtrip
```

导出会移除陈列偏移，恢复局部原点。确认尺寸、活动节点和材质正确后，再决定是否替换游戏模型。

直接渲染当前 GLB，不修改资产库或游戏文件：

```bash
blender --background --python scripts/blender-town-preview.py -- --asset house-0 --source public/assets/town/models/house-0.glb
```

预览输出到 `art/qa/curated-house-0.png`；这里的 `curated-` 是脚本对直接 GLB 预览的文件名前缀，不表示模型来源改变。macOS 若没有 `blender` 命令，可使用 `/Applications/Blender.app/Contents/MacOS/Blender`。

**`npm run build:assets` 会从 TypeScript 重新生成并覆盖游戏 GLB。** 正式改用手工 Blender 模型前，应保存 `.blend` 源文件并调整生成步骤，避免把手工导出与自动生成混用。代码建模仍是当前可复现的正式来源。

## 模型约定与验收

- Y-up，局部地面 y = 0，原点在占地中心，单位为一格；默认门口面向 +Z，运行时绕 Y 轴旋转。
- 占地由 `catalog.ts` 定义，底座位于占地内。门廊和屋檐可以少量伸向入口格，道路中心须可通行，不侵入侧邻建筑。
- 工坊保持 2 × 2 占地，随阶段增高；石桥沿两格河道方向跨越。
- 每个侧面都要有完整墙体和合理细节；检查地面接触、门口、四向旋转、阴影和相邻建筑。
- 活动节点必须在合批和 GLB 导出后仍可识别和旋转，不把门轴、作物和叶片焊死。
- 使用 PBR roughness / metalness 材质。Blender 专有材质节点需要烘焙或转为 glTF 支持的材质，最终以游戏实际显示为准。
- UI 名称、价格和数字由 DOM / 状态生成，不写入模型或贴图。

当前前后方证据：[商店前方](../art/qa/distinct-shops-front.png)、[商店后方](../art/qa/distinct-shops-back.png)、[农事前方](../art/qa/farm-assets-front.png)、[农事后方](../art/qa/farm-assets-back.png)。

## 外部素材与授权

[Kenney Fantasy Town Kit 2.0](https://kenney.nl/assets/fantasy-town-kit)，作者 Kenney，CC0。来源通过 [作者在 OpenGameArt 的发布页](https://opengameart.org/content/fantasy-town-kit)记录；原始 GLB、图集、许可、来源 URL 和 ZIP SHA256 保存在 `art/vendor/kenney-fantasy-town`。

`scripts/build-curated-town.py` 将图集颜色转为顶点色并统一比例、配色，生成 17 个景观派生 GLB 到 `public/assets/town/curated/`。其中包含树木、岩石、手推车、绿篱、喷泉、摊位等；主建筑使用原创模型。原许可 `Kenney-LICENSE.txt` 随资源发布，不能用项目 MIT 许可替代。

```bash
blender --background --python scripts/build-curated-town.py
```

该脚本使用本地源文件，保存独立 `art/kenney-modules.blend`；它会重建自己的输出，因此艺术家编辑应另存。正常 npm 构建使用已保存的派生 GLB，无需联网。

四季录音是独立的 CC BY 4.0 作品，曲目、署名、来源、改动和哈希见 [音乐授权](../public/assets/town/audio/CREDITS.md) 与同目录 `sources.json`。旧像素字体与街机素材已移除；当前发布资源全部位于 `public/assets/town/`，各自授权随资源保留。

参考：[Blender 格式支持](https://www.blender.org/features/pipeline/)、[glTF 导出文档](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html)。

## 街坊纪念与修复模型

新增香草架、读书角、听溪石景、春日花拱、夏日野餐伞、秋收南瓜车、冬日暖灯架，以及旧水井、林间观景台、旧风车。各有四款外观，从 TypeScript 生成四十个 GLB，不修改玩家的 Blender 场景。纪念物为纯装饰；开放地标的工作 / 访问点在道路侧，没有虚构房门。

三处地标保留 `landmark-ruin` / `landmark-restored` 两组活动部件，旧风车单独保留 `landmark-fan`。导出时两组均保留，实际实例根据修复账本选择显示，缩略图显示修好状态；叶片不能与塔身合并。现有居民加独立修复工具，动画只在实际到岗修复时显示。

模型陈列页 `asset-preview.html?community=1` 可检查前面，追加 `&view=back` 检查后面，`&ruins=1` 检查未修好状态。陈列页用于开发验证，不在主城添加测试按钮。
