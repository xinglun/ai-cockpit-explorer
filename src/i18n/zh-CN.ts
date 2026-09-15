import type { ExplorerMessages } from "./types";

export const zhCN = {
  html: {
    lang: "zh-CN",
    title: "AI Cockpit Explorer — 交互式仓库治理架构",
    description: "以交互方式探索 AI Cockpit 的架构、治理生命周期、证据模型与人的授权边界。",
  },
  app: {
    title: "AI Cockpit Explorer",
    subtitle: "基于证据的仓库治理",
    openingExplanation: "AI Cockpit 对 AI 执行的代码仓库变更进行基于证据的治理。",
    coreDistinction: "AI 智能体可以执行任务。证据决定了什么被验证。最终授权由人决定。",
    interactionHint: "拖动旋转 · 滚动缩放 · 点击查看详情",
    canvasAriaLabel: "展示 AI Cockpit 治理循环的交互式 3D 场景",
    touchHint: "点击任意图形即可查看含义",
  },
  navigation: {
    ariaLabel: "浏览模式",
    overview: "总览",
    workItem: "工作项",
    verification: "验证",
  },
  languageSelector: {
    ariaLabel: "语言",
  },
  elementPicker: {
    ariaLabel: "治理循环元素",
  },
  architecture: {
    agents: {
      label: "智能体",
      what: "执行 AI 辅助任务的外部主体（例如 Codex、Claude、Gemini、Grok）。",
      inputs: ["有效的工作项契约"],
      outputs: ["在入口网关发起的执行请求"],
      boundary: "不能在受限工作项之外执行，也不拥有任何仓库权限。",
    },
    entrySurface: {
      label: "入口网关",
      what: "执行请求进入受治理生命周期的位置。",
      inputs: ["智能体的执行请求"],
      outputs: ["受限的 start / checkpoint / finish 调用"],
      boundary: "不能被绕过以直接、不可见地修改仓库。",
    },
    contract: {
      label: "契约",
      what: "人为定义的工作项边界：意图（intent）、范围（scope）与验收标准。",
      inputs: ["Intent", "Scope", "验收标准", "Authority"],
      outputs: ["Runtime 用于评估每个操作的依据"],
      boundary: "不能通过推断满足——只能通过对照其文本核实的证据来满足。",
    },
    workItem: {
      label: "工作项",
      what: "一个受边界约束、会随生命周期演变的容器（envelope），上面的一切都发生在其中：一份契约、其执行过程、产生的证据，以及最终的 Outcome，从 start 到 close 作为同一个受治理单元被追踪。",
      inputs: ["契约（意图、范围、验收标准）", "仓库事实", "执行过程中收集的证据"],
      outputs: ["供 Human Authority 决策的 Outcome", "归档后仍保留的追溯记录（Trace）"],
      boundary: "在 start 之前并不存在，其存续范围也不会超出自身契约的 scope。",
    },
    runtime: {
      label: "AI Cockpit Runtime",
      what: "依据仓库事实与证据评估契约的引擎。",
      inputs: ["契约", "仓库事实", "证据"],
      outputs: ["验证结果", "Outcome"],
      boundary: "不能授予人的批准——它计算的是验证，而非授权。",
    },
    repository: {
      label: "软件仓库",
      what: "被治理的对象本身——代码与历史的真实来源。",
      inputs: ["提交记录", "工作区状态"],
      outputs: ["Git HEAD", "变更路径", "快照摘要"],
      boundary: "不会被 AI Cockpit 取代或拥有——Runtime 只是观察它。",
    },
    repositoryProtocol: {
      label: "仓库协议",
      what: "持久化、由仓库自身拥有的层（.ai/），保存契约、证据、决策，以及派生的 Knowledge。",
      inputs: ["生命周期事件"],
      outputs: ["与代码一同版本化的持久治理历史"],
      boundary: "本身不能作为证据被评估——它只是存储状态，由 Runtime 评估。",
    },
    knowledge: {
      label: "Knowledge",
      what: "工作项完成之后，已完成的仓库事实被投影出来、供后续查询使用的结果。",
      inputs: ["已完成并归档的工作项事实"],
      outputs: ["未来工作项的 Runtime 可查询的检索结果"],
      boundary: "派生自已完成的仓库事实，本身并不是权限的来源。",
    },
    evidence: {
      label: "证据",
      what: "执行过程中产生的可观察、结构化事实：测试、Git 状态、摘要、构建产物。",
      inputs: ["测试结果", "Git 状态", "摘要", "构建产物"],
      outputs: ["可供验证的证据包"],
      boundary: "无论多么完整，都不能替代人的决定。",
    },
    outcome: {
      label: "结果 / Outcome",
      what: "Runtime 在验证之后产生的内容：一个结论，加上仍然未知的部分。",
      inputs: ["验证结果", "尚未解决的未知项"],
      outputs: ["供 Human Authority 决策的记录"],
      boundary: "不能自我授权——GREEN 的结论并不是一个已批准（APPROVED）的决定。",
    },
    humanControlInterface: {
      label: "人工控制",
      what: "Explorer 对人机交互（Human-Computer Interaction）的呈现——人如何操作并接收 AI Cockpit 状态，包含三条通道：Define（意图、范围、验收标准、Authority）、Understand（Outcome、证据摘要、未知项、风险/状态、下一步行动）、Decide（批准、拒绝、恢复、继续）。",
      inputs: ["意图、范围、验收标准、Authority（Define）", "Outcome、证据摘要、未知项、风险/状态、下一步行动（Understand）"],
      outputs: ["批准 / 拒绝 / 恢复 / 继续（Decide）"],
      boundary: "这是 Explorer 用来呈现人与 Runtime 交互方式的概念，并不是 Runtime 本身具备的服务。",
    },
    humanAuthority: {
      label: "人的授权",
      what: "人的明确授权：一个独立、显式的边界，由人来批准或拒绝结论。",
      inputs: ["Outcome", "验证结果"],
      outputs: ["契约（定义允许的内容）", "决定：APPROVE / REJECT"],
      boundary: "永远不会从验证结果中推断得出——批准始终是一次明确、独立的行为。",
    },
  },
  lifecycle: {
    heading: "工作项生命周期",
    ariaLabel: "工作项生命周期",
    current: "当前",
    steps: {
      inspect: {
        label: "Inspect",
        summary: "在不写入治理证据的情况下读取仓库状态。",
      },
      attach: {
        label: "Attach",
        summary: "将仓库协议绑定到这个仓库。",
      },
      start: {
        label: "Start",
        summary: "以意图、目标、范围与契约开启一个工作项。",
      },
      preflight: {
        label: "Preflight",
        summary: "在执行前，依据当前仓库事实评估契约。",
      },
      checkpoint: {
        label: "Checkpoint",
        summary: "在执行过程中记录有证据支持的阶段性进展。",
      },
      verify: {
        label: "Verify",
        summary: "依据契约评估证据，得出验证结论。",
      },
      finish: {
        label: "Finish",
        summary: "在工作项可以关闭之前，确认各生命周期关卡均已满足。",
      },
      archive: {
        label: "Archive",
        summary: "将已完成工作项的证据归档为持久历史记录。",
      },
      close: {
        label: "Close",
        summary: "最终确定工作项；此后治理记录不可更改。",
      },
    },
  },
  tour: {
    start: "30秒读懂 AI Cockpit",
    next: "下一步",
    previous: "上一步",
    exit: "退出导览",
    done: "完成",
    ariaLabel: "引导式架构导览",
    sceneOfTotal: "第 {current} / {total} 幕",
    steps: [
      {
        title: "请求",
        narration: "AI 智能体可以执行工作，但并不自动拥有仓库权限——执行会在 AI Cockpit 的网关处停下。",
      },
      {
        title: "工作项",
        narration: "这个请求会成为一个工作项——一个受边界约束的容器，保存接下来的契约、执行、证据与 Outcome，直到它被关闭。",
      },
      {
        title: "契约",
        narration: "在任何操作开始之前，人先在这个容器内定义允许做什么：意图、范围与验收标准。",
      },
      {
        title: "受治理的执行",
        narration:
          "仓库向 Runtime 提供 Git HEAD、变更路径、快照与摘要——这些是被观察到的事实，而非假设；执行受该工作项约束，依靠 checkpoint 推进，而不是静默写入。",
      },
      {
        title: "证据",
        narration: "测试、Git 状态、摘要与构建产物汇聚成一个证据包，在同一个工作项中回传给 Runtime。",
      },
      {
        title: "验证",
        narration: "验证结果为 GREEN。人的决定：PENDING（待定）。已验证 ≠ 已批准。",
      },
      {
        title: "HCI / 人的决定",
        narration: "Outcome 通过人工控制层上升至人的授权环节，由人决定：批准或拒绝。在人做出决定之前，任何事都不会被授权。",
      },
      {
        title: "Archive → Trace → Knowledge",
        narration: "决定之后，工作项会归档进仓库协议，其完整的追溯记录（Trace）仍可查阅，已完成的事实会成为下一个工作项可以查询的 Knowledge。",
      },
    ],
  },
  verification: {
    title: "验证",
    verificationLabel: "验证",
    humanDecisionLabel: "人的决定",
    verifiedNotApproved: "已验证 ≠ 已批准。",
    scenarioGreenLabel: "GREEN",
    scenarioRedLabel: "RED",
    evidenceLabels: {
      build: "构建证据",
      tests: "测试证据",
      scope: "范围符合性",
    },
    scenarios: {
      "green-pending": {
        label: "验证通过，决定待定",
        narrative:
          "所需证据齐全且与契约一致，验证结果为 GREEN。但这并不是批准——决定权仍在人手中。",
      },
      "red-fail-closed": {
        label: "验证失败，安全阻断",
        narrative:
          "所需证据缺失或与契约冲突，验证结果为 RED，生命周期关卡默认阻断后续推进——遇到不确定情况时选择安全阻断，而不是假设继续。",
      },
    },
  },
  detailPanel: {
    whatLabel: "作用",
    inputsLabel: "输入",
    outputsLabel: "输出",
    boundaryLabel: "边界",
    closeLabel: "关闭详情",
    aboutSource: "详情 / 来源",
    hideSource: "隐藏来源",
    upstreamLabel: "Upstream",
  },
  statusLegend: {
    explanations: {
      GREEN: "验证通过",
      YELLOW: "证据不完整",
      RED: "验证失败（安全阻断）",
      UNKNOWN: "尚未评估（绝不等于批准）",
    },
    humanDecisionExplanation: "人的决定，独立于验证结果",
  },
  workItemEnvelope: {
    label: "工作项",
    closedLabel: "CLOSED",
  },
  trace: {
    heading: "Trace / Audit（追溯）",
    ariaLabel: "工作项追溯时间线",
    advancedToggleShow: "显示高级项（finalize / close 清理）",
    advancedToggleHide: "隐藏高级项",
    show3dTrail: "以 3D 显示",
    hide3dTrail: "隐藏 3D 轨迹",
    events: {
      intent: "记录 Intent",
      contract: "绑定契约",
      snapshot: "记录仓库快照摘要",
      checkpoint: "记录 Checkpoint 收据",
      verificationReceipt: "记录验证收据",
      outcome: "记录 Outcome",
      humanDecision: "记录人的决定",
      archive: "归档进仓库协议",
      finalizePlan: "绑定 finalize plan（分支 / worktree / provider）",
      finalize: "记录 provider 的 finalization 收据",
      finalizeVerify: "重新验证 finalization 收据",
      close: "关闭工作项，记录不可再更改",
    },
  },
} satisfies ExplorerMessages;
