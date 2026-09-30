# Token Town — Architecture

TypeScript + Three.js 原生 3D 场景，DOM 交互，现有 esbuild 和 Node 本地扫描服务。

## 模块

| 模块 | 职责 |
|---|---|
| `src/town/types.ts` | 存档、格子、建筑、规则求值契约 |
| `catalog.ts` | 价格、服务距离 / 容量、章节和星级配色 |
| `world.ts` | 旋转占地、入口、桥位、区域开放、BFS 连通 / 最短道路距离、稳定服务分配、章节目标 |
| `puzzles.ts` | 六张固定库存规划关、基础 / 星级目标、测试用参考解法 |
| `store.ts` | 所有交易、本地存档验证、真实 / 演示高水位、补贴结算、永久库存、导入导出和跨窗口版本保护 |
| `models.ts` | 原创细节建筑、居民；共享材质与倒角几何；按材质合批 / 索引顶点 |
| `pedestrians.ts` | 道路并集边界内缩 / 圆角闭环、稳定车道、前后间距、入流预留与距离步态 |
| `resident-life.ts` | 可测试的回家 / 开门 / 睡眠 / 出门 / 归座状态机、逐户门口预约与车道重入 |
| `world-time.ts` / `seasons.ts` | 本地游戏时钟、昼夜渐变、四季着色共用 uniform；不改变经营规则 |
| `roads.ts` | 石板、接缝底层、暴露边缘路缘，三组实例化网格 |
| `landscape.ts` | 连续草地、分层土壤、河岸、流水着色、背景丘陵与林地实例化 |
| `scene.ts` | GLB 加载 / 原生备用模型、正交镜头、跟随鼠标预览、射线拾取、连续旋转、居民 / 粒子动画、画质 |
| `ui.ts` | 安静的城镇 HUD、建设 / 搬迁 / 委托 / 关卡 / 图鉴 / 设置、目录拖放、辅助定位 |
| `main.ts` | 启动、显式演示模式及图形错误处理 |
| `server/index.ts` | 保留 Claude Code / Codex 扫描与 `GET /api/usage`，仅监听 localhost |

`world`、`catalog`、`puzzles` 不依赖渲染或动画；经营成果由格子与服务计算决定。居民不产生任何收入。

## 经济与持久化

每个项目保存 `credited` 已兑换高水位；新增量是 `max(0, reported - credited)`，高水位只增加。项目显示累计量及等级同样只增加。老 ID 迁移更新工坊引用，不再次发币。

所有新增 token 与 `residue` 汇总后兑换金币。`tokenCoins` 是累计 token 铸币，`subsidyPaid` 是累计已付补贴；补贴上限为 `floor(tokenCoins / 5)`。已完成章节的补贴权益从永久星级推导，重领或提高星级不会新增权益。

`town` 保存所有永久建筑实例（包括收纳状态）和布局。购买只在通过占地校验后扣款；搬迁修改原 ID，收纳只切换 `placed`。关卡有独立 `puzzleBoards`，只能使用规定实例，奖励永久星级和蓝图。

新存档独立于旧街机版本。导入校验版本、模式、数字、重复 ID、占地、陆地 / 桥位、道路、项目工坊对应和关卡库存，失败保留原进度。保存失败提示导出备份。多窗口保存前检查 `revision`，发现更新时采用最新进度并通知重新操作。

## 扫描口径

沿用现有扫描器：Claude 统计 input + output + cache creation；Codex 统计 input − cached input + output + reasoning。排除重读缓存 token。扫描按文件 mtime / size 增量缓存，项目通过完整 cwd 路径稳定区分，不读取质量信号，也不把完整对话交给前端。

## 渲染与资产

构建生成 121 个原创 GLB：常规建筑四款外观，工坊五阶段。运行时加载实际 GLB；相同原创几何的本地 prefab 是完整加载备用。可放置资产全部使用原创 GLB，背景树木 / 岩石等加载 Kenney CC0 派生 GLB；来源 / 许可保存在 `art/vendor/kenney-fantasy-town`，许可随发布保留。住宅保持完整原创模型；面包店、咖啡馆、果蔬铺、花店使用各自结构，书屋 / 温室 / 粮仓 / 船屋有独立形体；失败的模块拼房输出已移除。正常构建不下载网络素材，也不依赖 Blender。几何按材质合并并建立索引，森林和道路使用实例化，居民的肢体分组各自合批而保留旋转枢轴；movingPart 节点以局部变换独立合批，门轴保留到 GLB，临时覆盖层 / 预览 / 烟尘及时释放。

没有景深模糊或屏幕像素滤镜。中等画质支持原生 Retina 像素密度（上限 2），低密度屏有 1.25 倍采样；精细上限 2.5。低画质关闭阴影、降至 30 帧目标；中等和精细目标 60 帧。实际硬件指标记录于设计验收，不能以单台机器成绩承诺所有笔记本。

## 构建

`npm run build`：生成模型 → 新版 `public/app.js` → 原版 `public/arcade.js` → 历史 preview → `dist/server.mjs`。原版 `src/main.ts` 与街机模块保留，不参与新版经济或主体验。

测试用 Node 内建 runner，经 esbuild 编译 TS；测试不依赖 WebGL。GLB 美术、鼠标拖放、触控布局与镜头通过实际浏览器验收。

## 时光与居民

360 秒为一天，从 09:00 开始，每三天换一季。日光和天色连续变化，季节由共享 shader uniform 渐变草地、树冠、屋面；冬季增加低密度雪粒。世界时间按活动帧推进，隐藏或关闭页面不产生离线进度。每 20 秒及离开页面保存时钟；旧 v1 存档自动补齐时钟设置。时钟检查点与经济事务分开处理，跨窗口仅时间 / 偏好更新不会撤回正在放置的建筑。

居民只在接通的道路上巡游。20:00–06:00 返家，沿当前车道到本户出口；一户同时只开放给一个居民，其余继续散步。开门后走过门槛并隐藏到室内，门随后关闭。清晨先预约车道空位再开门、走出、并入人流；公园居民站起返家、次日回座。住宅 / 道路搬迁会重建视觉居民系统；夜间刷新直接恢复室内休息状态。没有连通住宅时镇公所提供视觉落脚处。

The farm extension is isolated in `src/town/farming.ts`: road-based chains, production stages, stock accounting and destination-specific material messages. `ResidentLife` gives existing walkers work orders and reserves a safe pavement slot when work ends; `PedestrianTraffic.retarget` keeps their identities and world positions through road edits. `TownScene` drives visual crop/cargo/mill animation, pauses the main farm in puzzles or at night, and waits for the worker's arrival before advancing a phase. Production and token rewards remain separate.

Farm runs, stock and a monotonic active-work clock live in the independent town slots. Older saves gain empty farm state and music defaults. Farm/time-only checkpoints are excluded from the gameplay conflict fingerprint; pending construction can merge the latest farm checkpoint without accumulating duplicate harvests. `music.ts` manages two local HTML audio channels with user-gesture activation, three-second season/loop crossfades and persisted controls. Source licensing and attribution ship with the audio assets.
