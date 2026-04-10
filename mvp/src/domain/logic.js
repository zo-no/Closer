import { decisionOptions, venues } from './data'

export function buildScoredVenues({ filters, profile }) {
  return venues
    .filter((venue) => {
      const byScene = filters.scene === '全部' || venue.scene === filters.scene
      const byBudget = filters.budget === '全部' || venue.budget === filters.budget
      return byScene && byBudget
    })
    .map((venue) => {
      const reasons = []
      let score = 60

      if (venue.scene === profile.preferredScene) {
        score += 18
        reasons.push('和你这周想开始的见面方式一致。')
      }

      if (venue.budget === profile.preferredBudget) {
        score += 10
        reasons.push('预算和你现在的预期差不多，不容易让人有压力。')
      }

      const boostTerms = profile.boost.toLowerCase()
      const mustTerms = profile.mustHave.toLowerCase()
      const combined = `${venue.vibe} ${venue.tags.join(' ')}`.toLowerCase()

      if (boostTerms.includes('展览') && combined.includes('展览')) {
        score += 8
        reasons.push('你本来就更容易在展览这种场景里聊开。')
      }

      if (boostTerms.includes('步行') && (combined.includes('散步') || combined.includes('步道'))) {
        score += 8
        reasons.push('如果你喜欢边走边聊，这类场景通常会更自然。')
      }

      if (mustTerms.includes('认真') && combined.includes('安静聊天')) {
        score += 6
        reasons.push('安静坐下来聊，更容易看出是不是聊得来。')
      }

      if (reasons.length === 0) {
        reasons.push('它不是最稳的选择，但和你现在的筛选条件并不冲突。')
      }

      return {
        ...venue,
        reasons,
        score,
      }
    })
    .sort((left, right) => right.score - left.score)
}

export function selectSelectedVenue(scoredVenues, selectedVenueId) {
  return (
    scoredVenues.find((venue) => venue.id === selectedVenueId) ??
    scoredVenues[0] ??
    null
  )
}

export function buildHeroMetrics({ pipeline, profile, reviews }) {
  const activeConnections = pipeline.filter((person) => person.stage !== '已淘汰').length
  const followUps = pipeline.filter((person) =>
    ['待二次见面', '长期验证'].includes(person.stage),
  ).length
  const continueRate = reviews.length
    ? Math.round(
        (reviews.filter((review) => review.decision === 'continue').length / reviews.length) * 100,
      )
    : 0

  return [
    {
      label: '开场进度',
      value: `${profile.weeklyOutreachDone}/${profile.weeklyOutreachTarget}`,
      detail: '本周目标',
    },
    {
      label: '正在推进',
      value: `${activeConnections}`,
      detail: '还值得继续花时间',
    },
    {
      label: '已有见面进展',
      value: `${followUps}`,
      detail: '准备继续往前走',
    },
    {
      label: '继续推进率',
      value: `${continueRate}%`,
      detail: '按见后判断计算',
    },
  ]
}

export function buildStrategy({ pipeline, profile, reviews }) {
  const continueRate = reviews.length
    ? Math.round(
        (reviews.filter((review) => review.decision === 'continue').length / reviews.length) * 100,
      )
    : 0
  const meetingCount = pipeline.filter((person) =>
    ['待首见面', '待二次见面', '长期验证'].includes(person.stage),
  ).length

  if (meetingCount < profile.weeklyMeetingTarget) {
    return {
      summary: `这周还差 ${profile.weeklyMeetingTarget - meetingCount} 个首见面，先把见面安排出来。`,
      detail: '优先选轻松、低压力、好收尾的场景，别一上来就安排太重。',
    }
  }

  if (reviews.length > 0 && continueRate < 50) {
    return {
      summary: '最近见面的感觉不够稳，问题更可能出在场景和节奏。',
      detail: '先把第一次见面控制在 60 到 90 分钟，别急着安排太满或太重。',
    }
  }

  return {
    summary: '可以把精力集中到最有感觉的 2 个人身上。',
    detail: '下一次见面优先选更好聊天、也更容易看出长期匹配度的地方。',
  }
}

export function buildTaskDetails({ pipeline, profile, reviews }) {
  const meetingCount = pipeline.filter((person) =>
    ['待首见面', '待二次见面', '长期验证'].includes(person.stage),
  ).length

  return {
    profile: `${splitRules(profile.mustHave).length} 个在意的点 / ${splitRules(profile.avoid).length} 个避开项`,
    outreach: `已发出 ${profile.weeklyOutreachDone}/${profile.weeklyOutreachTarget} 次开场`,
    meeting: `已锁定 ${meetingCount}/${profile.weeklyMeetingTarget} 个见面机会`,
    review: `${reviews.length} 次判断记录，做完会自动更新下一步`,
  }
}

export function buildReviewRecommendation(reviewDraft) {
  const chemistry = Number(reviewDraft.chemistry)
  const comfort = Number(reviewDraft.comfort)

  if (reviewDraft.decision === 'stop' || chemistry <= 2 || comfort <= 2) {
    return {
      title: '建议先停在这里',
      summary: '如果化学反应或舒适度很低，继续投入通常只会拖长犹豫。',
    }
  }

  if (reviewDraft.decision === 'observe' || chemistry === 3 || comfort === 3) {
    return {
      title: '建议再观察一下',
      summary: '可以保留联系，但下一次互动要带着明确问题去确认，不要无限拖着。',
    }
  }

  return {
    title: '建议继续往前走',
    summary: '感觉和相处都在线时，最好在 72 小时内把下一次见面定下来。',
  }
}

export function sortReviewsByNewest(reviews) {
  return [...reviews].sort((left, right) => right.createdAt.localeCompare(left.createdAt))
}

export function getReviewPeople(pipeline) {
  return pipeline.filter((person) => person.stage !== '已淘汰')
}

export function mapDecisionToStage({ currentStage, decision }) {
  if (decision === 'stop') {
    return '已淘汰'
  }

  if (decision === 'observe') {
    return '观察中'
  }

  if (currentStage === '待二次见面') {
    return '长期验证'
  }

  return '待二次见面'
}

export function buildNextStep({ decision, venueName }) {
  if (decision === 'stop') {
    return '结束推进，把时间让给更高潜对象。'
  }

  if (decision === 'observe') {
    return '保留联系，但下次互动前先观察对方是否主动。'
  }

  return `在 72 小时内基于 ${venueName} 的体验安排下一次见面。`
}

export function decisionLabel(value) {
  return decisionOptions.find((option) => option.value === value)?.label ?? value
}

export function formatReviewTime(date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  const hour = `${date.getHours()}`.padStart(2, '0')
  const minute = `${date.getMinutes()}`.padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}`
}

function splitRules(value) {
  return value
    .split(/[,\n，]/)
    .map((item) => item.trim())
    .filter(Boolean)
}
