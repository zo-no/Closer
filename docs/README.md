# Closer 文档索引（AI友好结构）

本目录统一维护项目文档，按阶段与用途分类：

- `CURRENT.txt`：当前需求推进状态的人类可读入口
- `CURRENT.json`：当前需求推进状态的机器可读入口
- `requirements/`：需求文档
- `designs/`：功能设计文档
- `specs/`：技术实现 spec

- `project/`：项目立项与愿景
  - `00-项目立项.md`
- `sop/`：操作流程与规范
  - `01-Personal-Chat-SOP-v1.md`
- `script/`：对话脚本与模板
  - `01-Personal-Chat-脚本-v1.md`
- `data/`：数据记录与模板
  - `01-Personal-Chat-数据记录模板.md`
- `interview/`：访谈相关文档
  - `01-User-Interview-脚本-v1.md`
- `review/`：复盘与总结
  - `01-首轮样本复盘模板.md`
- `product/`：MVP/工程侧说明文档
  - `README.md`
  - `ARCHITECTURE.md`
  - `PM_ITERATIONS.md`

## 开发流程
1. 先讨论真实需求，再写 `requirements/` 文档。
2. 需求明确后，再写 `designs/` 文档定义功能形态。
3. 功能形态确认后，再写 `specs/` 文档定义技术实现。
4. 非琐碎功能没有确认过的 spec，不开始实现。
5. 每次工作开始时先读取 `CURRENT.txt`，恢复当前上下文。

## 使用约定
1. 所有新增文档统一放入 `docs/`。
2. 文件名采用 `模块/序号-主题.md`，便于检索与脚本处理。
3. 文档正文尽量使用清晰标题（H1）与小节化结构（## / ###），提高 AI 摘要与引用质量。
4. 新需求建议通过 `scripts/spec-new.sh` 创建初始模板。
