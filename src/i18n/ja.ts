import type { ExplorerMessages } from "./types";

export const ja = {
  html: {
    lang: "ja",
    title: "AI Cockpit Explorer — リポジトリガバナンスを理解するインタラクティブ3Dアーキテクチャ",
    description:
      "AI Cockpitのアーキテクチャ、ガバナンスのライフサイクル、証拠モデル、そしてHuman Authorityの境界をインタラクティブに探索できます。",
  },
  app: {
    title: "AI Cockpit Explorer",
    subtitle: "証拠に基づくリポジトリガバナンス",
    openingExplanation: "AI Cockpit は、AIによるリポジトリ変更を証拠に基づいて統制します。",
    coreDistinction:
      "AIエージェントはタスクを実行できます。何が検証されるかは証拠が決め、何を許可するかは人間が決めます。",
    interactionHint: "ドラッグで回転 · スクロールでズーム · クリックで詳細表示",
    canvasAriaLabel: "AI Cockpitのガバナンスループを表すインタラクティブな3Dシーン",
  },
  navigation: {
    ariaLabel: "エクスプローラーモード",
    overview: "概要",
    workItem: "Work Item",
    verification: "検証",
  },
  languageSelector: {
    ariaLabel: "言語",
  },
  elementPicker: {
    ariaLabel: "Governance Loop の要素",
  },
  architecture: {
    agents: {
      label: "エージェント",
      what: "Codex や Claude など、AIによる実行を担う外部のアクター。",
      inputs: ["有効なWork Item Contract"],
      outputs: ["エントリーゲートへの実行リクエスト"],
      boundary: "境界づけられたWork Itemの外では実行できず、リポジトリへの権限も持ちません。",
    },
    entrySurface: {
      label: "エントリーゲート",
      what: "実行リクエストが統制されたライフサイクルに入る場所。",
      inputs: ["エージェントからの実行リクエスト"],
      outputs: ["境界づけられた start / checkpoint / finish 呼び出し"],
      boundary: "迂回してリポジトリを直接・不可視に変更することはできません。",
    },
    contract: {
      label: "Contract",
      what: "Work Item（作業単位）の境界を人間が定義したもの：intent・scope・受け入れ基準。",
      inputs: ["Intent", "Scope", "受け入れ基準", "Authority"],
      outputs: ["RuntimeがすべてのActionを評価する際の基準"],
      boundary: "推測では満たされません——自身のテキストと照合された証拠によってのみ満たされます。",
    },
    runtime: {
      label: "AI Cockpit Runtime",
      what: "ContractをRepositoryのファクトと証拠に照らして評価するエンジン。",
      inputs: ["Contract", "リポジトリのファクト", "証拠"],
      outputs: ["検証結果", "Outcome"],
      boundary: "人間の承認を与えることはできません——行うのは検証であり、認可ではありません。",
    },
    repository: {
      label: "ソフトウェアリポジトリ",
      what: "統治される対象そのもの——コードと履歴の信頼できる情報源。",
      inputs: ["コミット", "作業ツリーの状態"],
      outputs: ["Git HEAD", "変更されたパス", "スナップショットダイジェスト"],
      boundary: "AI Cockpitによって置き換えられたり所有されたりしません——RuntimeはRepositoryを観測するだけです。",
    },
    repositoryProtocol: {
      label: "Repository Protocol",
      what: "Contract・証拠・決定を保存する、リポジトリが所有する永続的なレイヤー（.ai/）。",
      inputs: ["ライフサイクルのイベント"],
      outputs: ["コードと共にバージョン管理される、恒久的なガバナンス履歴"],
      boundary: "それ自体は証拠として評価されません——状態を保存するだけで、評価するのはRuntimeです。",
    },
    evidence: {
      label: "証拠",
      what: "実行によって生成される観測可能で構造化されたファクト：テスト・Gitの状態・ダイジェスト・成果物。",
      inputs: ["テスト結果", "Gitの状態", "ダイジェスト", "成果物"],
      outputs: ["検証可能な証拠パケット"],
      boundary: "どれほど揃っていても、人間の決定の代わりにはなりません。",
    },
    outcome: {
      label: "結果 / Outcome",
      what: "検証後にRuntimeが生成するもの：結果と、未解決のまま残る事項。",
      inputs: ["検証結果", "未解決の不明点"],
      outputs: ["Human Authorityが判断できる記録"],
      boundary: "自ら認可することはできません——GREENのOutcomeはAPPROVEDという決定ではありません。",
    },
    humanAuthority: {
      label: "Human Authority",
      what: "人間による明示的な権限。Outcomeを承認または却下する、独立した明確な境界です。",
      inputs: ["Outcome", "検証結果"],
      outputs: ["Contract（許可される内容を定義）", "決定：APPROVE / REJECT"],
      boundary: "検証結果から推測されることは決してありません——承認は常に明示的で独立した行為です。",
    },
  },
  lifecycle: {
    heading: "Work Item（作業単位）のライフサイクル",
    ariaLabel: "Work Itemのライフサイクル",
    current: "現在",
    steps: {
      inspect: {
        label: "Inspect",
        summary: "ガバナンスの証拠を書き込まずにリポジトリの状態を読み取る。",
      },
      attach: {
        label: "Attach",
        summary: "Repository Protocolをこのリポジトリに紐づける。",
      },
      start: {
        label: "Start",
        summary: "intent・goal・scope・Contractを添えてWork Itemを開始する。",
      },
      preflight: {
        label: "Preflight",
        summary: "実行前に、Contractを現在のリポジトリのファクトと照合して評価する。",
      },
      checkpoint: {
        label: "Checkpoint",
        summary: "実行中の、証拠に裏づけられた段階的な進捗を記録する。",
      },
      verify: {
        label: "Verify",
        summary: "証拠をContractと照合して評価し、検証結果を生成する。",
      },
      finish: {
        label: "Finish",
        summary: "Work Itemをcloseする前に、ライフサイクルの各ゲートが満たされていることを確認する。",
      },
      archive: {
        label: "Archive",
        summary: "完了したWork Itemの証拠を恒久的な履歴へ移す。",
      },
      close: {
        label: "Close",
        summary: "Work Itemを確定する。以降、ガバナンス記録は不変となる。",
      },
    },
  },
  tour: {
    start: "AI Cockpitを30秒で理解する",
    next: "次へ",
    previous: "戻る",
    exit: "ツアーを終了",
    done: "完了",
    ariaLabel: "ガイド付きアーキテクチャツアー",
    sceneOfTotal: "シーン {current} / {total}",
    steps: [
      {
        title: "自律的な実行",
        narration:
          "AIエージェントは作業を実行できます。しかしリポジトリへの権限を自動的に持つわけではありません——実行はAI Cockpitのゲートで一旦止まります。",
      },
      {
        title: "Contract",
        narration: "何かが動き出す前に、人間が許可される内容を定義します：intent・scope・受け入れ基準。",
      },
      {
        title: "リポジトリのファクト",
        narration:
          "リポジトリはGit HEAD・変更されたパス・スナップショット・ダイジェストをRuntimeに供給します——推測ではなく観測された事実です。",
      },
      {
        title: "実行",
        narration: "実行は有効なWork Itemによって境界づけられます——静かな書き込みではなく、checkpointを伴います。",
      },
      {
        title: "証拠",
        narration: "テスト・Gitの状態・ダイジェスト・成果物が集約され、Runtimeへ戻る証拠パケットになります。",
      },
      {
        title: "検証",
        narration: "検証はGREENです。人間の決定：PENDING（保留）。検証済み ≠ 承認済み。",
      },
      {
        title: "Human Authority",
        narration:
          "OutcomeはHuman Authorityへ上がり、そこで承認か却下かが決定されます。自律的な実行は、証拠によって境界づけられ、明示的な権限によって統治されます。",
      },
    ],
  },
  verification: {
    title: "検証",
    verificationLabel: "検証",
    humanDecisionLabel: "人間の決定",
    verifiedNotApproved: "検証済み ≠ 承認済み。",
    scenarioGreenLabel: "GREEN",
    scenarioRedLabel: "RED",
    evidenceLabels: {
      build: "ビルドの証拠",
      tests: "テストの証拠",
      scope: "スコープ適合性",
    },
    scenarios: {
      "green-pending": {
        label: "検証は成功、決定は保留中",
        narrative:
          "必要な証拠がすべて揃い、Contractと整合しています。検証はGREENです。ただしこれは承認ではありません——決定はまだ人間に委ねられています。",
      },
      "red-fail-closed": {
        label: "検証は失敗、フェイルクローズ",
        narrative:
          "必要な証拠が欠けているか、Contractと矛盾しています。検証はREDとなり、ライフサイクルゲートは既定で進行をブロックします——想定に基づいて進めるのではなく、安全側に停止（フェイルクローズ）します。",
      },
    },
  },
  detailPanel: {
    whatLabel: "概要",
    inputsLabel: "入力",
    outputsLabel: "出力",
    boundaryLabel: "境界",
    closeLabel: "詳細を閉じる",
    aboutSource: "詳細情報 / 出典",
    hideSource: "出典を隠す",
    upstreamLabel: "Upstream",
  },
  statusLegend: {
    explanations: {
      GREEN: "検証成功",
      YELLOW: "証拠が一部のみ",
      RED: "検証失敗（フェイルクローズ）",
      UNKNOWN: "未評価（承認では決してない）",
    },
    humanDecisionExplanation: "人間の決定であり、検証とは別のもの",
  },
} satisfies ExplorerMessages;
