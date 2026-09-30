# Token Town · 当前架构

TypeScript + Three.js 构建原生 3D 城镇，DOM 提供 HUD 和建设面板，esbuild 负责构建，Node 本地服务扫描使用记录。玩法规则见 [游戏规则](docs/TOKEN_TOWN.md)，制作流程见 [3D 资产](docs/TOWN_3D_ASSETS.md)，验证证据见 [验收记录](docs/QA.md)。

## 模块与数据流

除另行注明外，下表文件均位于 `src/town/`。

| 模块 | 职责 |
|---|---|
| `main.ts` | 启动、明确选择演示模式、图形错误处理 |
| `types.ts` / `catalog.ts` | 状态与规则契约、建筑价格、占地、距离、容量和解锁 |
| `world.ts` | 旋转占地、入口、桥位、区域开放、BFS 连通、最短路、稳定服务分配和章节目标 |
| `service-feedback.ts` | 从同一规则结果生成范围、受益住宅和缺服务原因 |
| `puzzles.ts` | 六张固定库存规划关、星级条件和测试用参考解法 |
| `store.ts` | 交易、同步账本、补贴、永久库存、存档验证、导入导出和跨窗口保护 |
| `farming.ts` | 农事设施连接、运输路线、生产阶段、库存记账和缺原料提示 |
| `world-time.ts` / `seasons.ts` | 活动游戏时钟、昼夜参数、四季着色与季节设置 |
| `pedestrians.ts` | 内缩圆角步行车道、前后间距、入流预留、道路变化后的平滑重定向 |
| `resident-life.ts` | 错峰逛店 / 聚会、独立停留、双侧避让、回家、开门、睡眠、归座与工作状态 |
| `village.ts` / `work-scheduler.ts` | 原料库存、实际运输、三款菜谱、三种订单、四季种植与共享工人轮换 |
| `walk-surface.ts` / `home-needs.ts` | 桥面拱度与安全横向位置、当前章节缺需求气泡 |
| `models.ts` / `village-models.ts` | 原创建筑和居民、共享材质、倒角构件、网格合批及活动节点 |
| `roads.ts` / `landscape.ts` | 石板道路、路缘、草地、土壤、河岸、流水、林地和背景丘陵 |
| `camera-input.ts` / `keyboard-input.ts` | 手势映射、平滑参数、俯仰和缩放限制、快捷键和 WASD 平移 |
| `scene.ts` | GLB 加载、原生模型备用、正交镜头、射线拾取、预览、居民和农事动画、画质 |
| `music.ts` | 两个本地音频通道、首次操作激活、季节与循环交叉淡化、音量和暂停 |
| `ui.ts` | HUD、建设、搬迁、委托、规划关、图鉴、设置和目录拖放 |
| `asset-preview.ts` | 独立模型陈列与前后方检查 |
| `server/index.ts` | 静态资源与 `GET /api/usage`，只监听 `127.0.0.1` |
| `server/usage.ts` / `server/agent-usage.ts` | 四个 agent 的文件发现、增量缓存、调用去重、继承切点和分帧 Zstandard 解码 |

使用记录 → `syncTown` → 金币和工坊状态 → 布局交易 → `evaluate` → 住宅需求与委托 → DOM 和场景反馈。`world`、`catalog`、`puzzles` 和服务反馈不依赖 WebGL，居民动画不决定住宅服务或金币。

农事规则生成任务，居民状态机执行移动，场景把实际到达情况交回农事推进。生产记账独立于金币账本，不能由叶片旋转或动画帧数直接产生奖励。

## 经济与库存

每个项目保存单调增加的 `credited` 高水位；新增量为 `max(0, reported - credited)`。项目累计展示量同样只增加。项目 ID 迁移更新已有工坊引用，不重新发币。

新增 token 与 `residue` 汇总，每 10,000 token 兑换一枚金币。`tokenCoins` 记录累计 token 金币，`subsidyPaid` 记录累计实际补贴；支付上限为 `floor(tokenCoins / 5)`。补贴权益由永久章节星级推导，提高星级或重复领取不会新增权益。

`town` 保存永久建筑实例，包括收纳状态和布局。购买通过占地校验后才扣费；搬迁修改原 ID，收纳只切换 `placed`。`puzzleBoards` 使用独立的规定实例，不参与主城交易。

项目等级复用 `src/domain/levels.ts` 的 50 级曲线；城镇不使用其中兼容代码的金币倍率。五阶段门槛和工坊规则统一见 [项目工坊](docs/TOKEN_TOWN.md#项目工坊)。

## 存档与跨窗口保护

真实和演示使用独立的 `tokenTown.slot.live.v1` / `tokenTown.slot.demo.v1`。保存金币、项目高水位、永久建筑、布局、解锁、星级、规划关、时钟、农事 / 厨房原料、配送、订单和设置。新增可选字段补默认值，不重置用户资产。

导入校验版本、模式、数字、重复 ID、占地、桥位、合法钓鱼河岸与朝向、原料数量、道路、项目工坊对应和关卡库存。校验失败保留原进度；保存失败提示导出备份。已有历史存档保留，不迁入新城镇。

跨窗口以 `revision` 检查更新，再用进度指纹区分建设或经济事务与仅时间、农事 / 配送、偏好变化。真正的玩法冲突需要采用最新进度并重新操作；仅检查点更新可合并，不取消待放建筑。农事和新原料账本分别用单调的 `activeSeconds` 选择较新的进度，避免重复累计收获。

订单选择、完成次数和作物 / 菜谱偏好包含在进度指纹中，防止把真正的玩家选择当成时钟更新覆盖。订单完成先合并较新的生产检查点，再校验并消费材料；检测玩法冲突时停止并要求重新操作。

时钟和生产约每 20 秒及离开页面时保存；隐藏或关闭页面不计算离线进度。规划关期间暂停主城农事。

## 本地扫描口径

Claude Code 统计 input + output + cache creation，排除 cache read。Codex 统计 input − cached input + output + reasoning；会话累计计数取高水位，不把重复记录再次相加。文件按 mtime / size 增量缓存，项目由完整 cwd 路径区分。

接口只返回聚合项目与 token 数据；不把完整对话交给前端，也不读取提交、测试或工作质量作为奖励信号。

Kimi Code 默认从 `~/.kimi-code/session-index.json` / `sessions` 发现项目与主 / 子 agent 调用，兼容旧 `~/.kimi/kimi.json`、MD5 工作目录分桶和 wire 日志。支持 `KIMI_CODE_HOME` / `KIMI_SHARE_DIR`。优先逐调用 `usage.record`，统计非缓存输入 + 输出 + cache creation；旧 StatusUpdate 按 message ID 去重，只有缺少调用记录时才采用累计状态。fork 标记之前的继承记录不计新用量，context 测量不作为产出。

DeepSeek Harness 默认扫描 `~/.dsh/sessions`，支持 `DSH_HOME` 和 `TOKEN_TOWN_DSH_SESSIONS`。识别版本 0–4，选择同会话最高可读迁移版本，兼容 `.jsonl` 和 `.jsonl.zstd`；后者逐完整 Zstandard 帧解码，忽略仍在写入的末尾。Node 原生解码不可用时使用 MIT `fzstd`。统计 inputTokens + outputTokens + cacheWriteTokens，cache hit 不计；reasoning 已包含在 output，不再重复相加。stream 与最终 assistant usage 归为同一次调用，明确 retry 单独计入，seed 继承前缀不再次兑换。未知版本或读失败提供通用警告，保留上次可读结果。

四来源同 cwd 合并，保留既有 Claude / Codex 项目 ID。读取完整会话而不是只读最后 8 MB，避免新 agent 长日志丢历史；文件大小或修改时间变化时重扫，重复副本按调用标识去重。接口仍只提供汇总，读取真实日志不会自动同步金币，必须由用户在真实城镇同步。

格式依据：[Kimi Code 数据目录](https://github.com/MoonshotAI/kimi-code/blob/main/docs/en/configuration/data-locations.md)、[原生 usage](https://github.com/MoonshotAI/kimi-code/blob/main/packages/agent-core-v2/src/agent/usage/usageOps.ts)、[旧 Kimi CLI 目录](https://moonshotai.github.io/kimi-cli/zh/configuration/data-locations.html)、[DeepSeek 会话格式](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session.md)、[DeepSeek usage 类型](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/llm/llm/src/types.ts)。

## 渲染、居民与农事

构建生成 176 个原创 GLB：39 类建筑 / 装饰各四种外观，工坊五阶段各四款稳定外观；旧五个工坊文件保留作历史兼容，不由新体验加载。运行时按需加载，加载失败使用同源完整模型。原创房屋和商店采用独立结构；Kenney CC0 派生素材用于景观，保留来源与许可。

几何按材质合批并索引化，森林和道路实例化。门轴 `door-hinge`、作物 `crop-patch` / `vegetable-crops`、动物 `cow-*` / `pig-*`、风车叶片 `mill-fan` 保持独立节点。预览、覆盖层和临时粒子使用后释放。

居民根据实际位移迈步，在稳定车道保持间距，门口与道路重入使用预约。20:00–06:00 回家睡觉，清晨预约安全车道后出门。道路编辑保留居民实例、位置、累计步行、坐姿和作息状态，只重新计算路线；不能每铺一格就重建整个居民系统。

最多三位现有居民承担务农、养殖、钓鱼、加工和配送，设施通过实际道路连接。村民到达工作位置后才推进生产；夜间、断路和无工人时暂停，恢复后接续同一批次。每批 2 小麦 → 3 面粉，2 份烘成 4 面包、剩余 1 份可送往饭馆，农事库存不兑换金币。

厨房使用实际配送库存，菜谱开工只扣一次原料，未完批次保留 cargo；订单完成消费可达库存并解锁蓝图。作物选择和当前批次分开保存，夜晚暂停与多窗口更新不会凭空增加材料。河面采用不透明深度渲染，烟雾保持透明但不写深度，避免透明物排序把烟截断。

中等画质支持像素密度上限 2，精细上限 2.5；轻量关闭阴影并采用 30 帧目标。中等与精细目标 60 帧。实际性能应记录测试硬件和布局，单台机器结果不代表所有笔记本。

## 构建与检查

- `npm run build:assets`：从 TypeScript 导出原创 GLB。
- `npm run build:client` / `npm run watch`：构建或监听城镇前端。
- `npm run build:server` / `npm run start`：构建或启动本地服务。
- `npm run build`：完整资源和客户端、服务构建。仓库中的兼容入口仍随构建生成，不参与城镇规则。
- `npm run typecheck` / `npm test`：TypeScript 与 Node 测试；测试经 esbuild 编译，不依赖 WebGL。

浏览器用于验证模型、放置、镜头、音频和居民动作，必须使用独立地址或测试存档，保留用户进度。具体结果与尚未覆盖的范围统一记录在 [QA](docs/QA.md)。

宣传片工具位于 `src/promo/` 与 `scripts/promo-server.mjs`，在独立本机端口使用虚构、仅驻留内存的城镇。通过可选的 `SceneEvents.rendered` 回调在实际 WebGL 帧完成后合成字幕并录制画布；主游戏不绑定该回调。录制、加速时钟与剪辑不会进入玩家存档或奖励计算。详见 [录制流程](docs/PROMO.md)。
