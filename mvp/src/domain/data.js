export const sceneOptions = ['全部', '初见破冰', '二次升温', '轻活动', '夜晚微醺']
export const budgetOptions = ['全部', '低', '中', '高']

export const stageOptions = [
  '待发邀约',
  '待首见面',
  '待二次见面',
  '长期验证',
  '观察中',
  '已淘汰',
]

export const decisionOptions = [
  { value: 'continue', label: '值得继续约' },
  { value: 'observe', label: '再观察一下' },
  { value: 'stop', label: '先不继续' },
]

export const productSlices = [
  '画像问卷',
  '每周作战任务',
  '机会池管理',
  '地图选点',
  '邀约文案',
  '见后复盘',
]

export const pmLoops = [
  {
    id: 'loop-1',
    title: '先把这周目标定清楚',
    detail: '场景、预算和目标一旦改了，地点推荐和开场方式也会一起变。',
  },
  {
    id: 'loop-2',
    title: '见完后尽快做判断',
    detail: '别把感觉拖成模糊印象。给这次相处一个明确结论，下一步才会顺。',
  },
  {
    id: 'loop-3',
    title: '把时间留给更有感觉的人',
    detail: '如果反馈一般，就及时降级；如果感觉对，就在 72 小时内继续往前推。',
  },
]

export const venues = [
  {
    id: 'west-bund',
    name: '西岸美术馆',
    area: '徐汇滨江',
    scene: '初见破冰',
    budget: '中',
    vibe: '展览 + 咖啡',
    lat: 31.1848,
    lng: 121.4549,
    duration: '90 分钟',
    transit: '11 号线云锦路，步行 8 分钟',
    crowd: '工作日晚间较松',
    angle: '一起看展可以自然切入审美和生活方式，不会只剩下硬聊。',
    script:
      '这周我想去西岸看个展，结束后顺路喝杯咖啡。如果你也想找个轻松点的初次见面方式，我们可以周四晚上去。',
    tags: ['展览', '轻松', '可自然结束'],
  },
  {
    id: 'wukang',
    name: '武康路散步线',
    area: '徐汇',
    scene: '二次升温',
    budget: '低',
    vibe: '街区散步',
    lat: 31.2041,
    lng: 121.4382,
    duration: '75 分钟',
    transit: '10/11 号线交通大学站',
    crowd: '周末下午偏热闹',
    angle: '步行场景更容易拉长聊天深度，适合验证节奏感和相处舒适度。',
    script:
      '上次聊天里你提到喜欢有点生活感的街区，我想到武康路那一带很适合边走边聊。周六上午如果你方便，我们可以轻松逛一圈。',
    tags: ['散步', '低预算', '适合升温'],
  },
  {
    id: 'suzhou-creek',
    name: '苏州河步道',
    area: '静安',
    scene: '轻活动',
    budget: '低',
    vibe: '夜景漫步',
    lat: 31.2414,
    lng: 121.4685,
    duration: '60 分钟',
    transit: '1 号线新闸路站，步行 10 分钟',
    crowd: '工作日 19:30 后安静',
    angle: '更适合已经有一定熟悉度的人，能把话题自然推向长期关系与城市生活。',
    script:
      '如果你这周也想从办公室出来透口气，我们可以去苏州河边走走，不用太久，顺路喝点东西就好。',
    tags: ['夜景', '工作日', '城市漫步'],
  },
  {
    id: 'colca-cafe',
    name: 'Colca Cafe',
    area: '静安',
    scene: '初见破冰',
    budget: '中',
    vibe: '安静聊天',
    lat: 31.2251,
    lng: 121.4513,
    duration: '70 分钟',
    transit: '7 号线常熟路站，步行 6 分钟',
    crowd: '午后偏满，晚上更稳',
    angle: '纯聊天空间适合高效验证三观和表达能力，适合目标明确型用户。',
    script:
      '我最近在找一个适合认真聊天的地方，Colca 晚上还挺安静的。如果你这周也有空，找个 70 分钟窗口碰一下面？',
    tags: ['安静', '认真关系', '高效验证'],
  },
  {
    id: 'the-roof',
    name: 'The Roof',
    area: '静安寺',
    scene: '夜晚微醺',
    budget: '高',
    vibe: '高层酒吧',
    lat: 31.2238,
    lng: 121.4453,
    duration: '100 分钟',
    transit: '2/7 号线静安寺站',
    crowd: '周五晚人流较高',
    angle: '不适合作为首见面主推，但对已经建立信任的人有明显升温效果。',
    script:
      '如果你更喜欢晚上见面，这周我们可以找个视野好一点的地方坐坐。The Roof 比较适合放松聊聊最近状态。',
    tags: ['升温', '高预算', '夜晚场景'],
  },
]

export const defaultAppState = {
  profile: {
    city: '上海',
    objective: '7 天内拿到 2 次高质量首见面',
    preferredScene: '初见破冰',
    preferredBudget: '中',
    weeklyOutreachTarget: 10,
    weeklyOutreachDone: 7,
    weeklyMeetingTarget: 2,
    mustHave: '情绪稳定, 愿意认真投入关系, 生活半径在上海西岸到静安之间',
    avoid: '频繁失联, 长期暧昧不推进, 对长期关系目标含糊',
    boost: '展览, 城市步行, 作息规律',
  },
  tasks: [
    { id: 'profile', title: '把标准和目标想清楚', done: true },
    { id: 'outreach', title: '把这周的开场发出去', done: false },
    { id: 'meeting', title: '锁定这周最想见的人', done: false },
    { id: 'review', title: '见完 24 小时内做判断', done: false },
  ],
  pipeline: [
    {
      id: 'annie',
      name: 'Annie',
      role: '广告策划 / 徐汇',
      stage: '待发邀约',
      heat: 78,
      note: '对展览和城市散步有明确兴趣，适合低压场景启动。',
      nextStep: '今晚 20:30 发“西岸美术馆 + 咖啡”邀约。',
    },
    {
      id: 'mia',
      name: 'Mia',
      role: '产品经理 / 静安',
      stage: '待二次见面',
      heat: 84,
      note: '第一次聊天顺畅，价值观能继续下探。',
      nextStep: '周六上午安排武康路散步，切入长期城市规划话题。',
    },
    {
      id: 'sophie',
      name: 'Sophie',
      role: '建筑师 / 长宁',
      stage: '观察中',
      heat: 61,
      note: '回复质量高但节奏偏慢，不适合本周主推。',
      nextStep: '保持低频联系，等待对方主动窗口。',
    },
  ],
  reviews: [
    {
      id: 'review-1',
      personId: 'mia',
      personName: 'Mia',
      venueId: 'colca-cafe',
      venueName: 'Colca Cafe',
      chemistry: 4,
      comfort: 5,
      decision: 'continue',
      note: '表达很直接，价值观能自然聊深，适合继续推进。',
      createdAt: '2026-04-09 21:10',
    },
  ],
  filters: {
    scene: '全部',
    budget: '全部',
  },
  selectedVenueId: 'west-bund',
  reviewDraft: {
    personId: 'mia',
    chemistry: 4,
    comfort: 4,
    decision: 'continue',
    note: '',
  },
}
