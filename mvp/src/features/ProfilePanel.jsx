import { useState } from 'react'
import { ChevronDown, ShieldCheck } from 'lucide-react'
import Field from '../components/Field'

function ProfilePanel({
  budgetOptions,
  profile,
  sceneOptions,
  onUpdateProfile,
}) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <section className="panel" id="weekly-plan">
      <div className="panel-head">
        <div className="section-kicker">
          <ShieldCheck size={16} />
          1 定这周偏好
        </div>
      </div>

      <p className="panel-note">先填这 4 项，下面的推荐就会立刻变化。</p>

      <div className="form-grid">
        <Field label="想从哪种见面开始">
          <select
            value={profile.preferredScene}
            onChange={(event) => onUpdateProfile('preferredScene', event.target.value)}
          >
            {sceneOptions
              .filter((option) => option !== '全部')
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </Field>
        <Field label="预算">
          <select
            value={profile.preferredBudget}
            onChange={(event) => onUpdateProfile('preferredBudget', event.target.value)}
          >
            {budgetOptions
              .filter((option) => option !== '全部')
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </Field>
        <Field label="想约出几次首见面">
          <input
            type="number"
            min="0"
            value={profile.weeklyMeetingTarget}
            onChange={(event) =>
              onUpdateProfile('weeklyMeetingTarget', Number(event.target.value) || 0)
            }
          />
        </Field>
        <Field label="这周最想推进什么" full>
          <textarea
            rows="2"
            value={profile.objective}
            onChange={(event) => onUpdateProfile('objective', event.target.value)}
          />
        </Field>
      </div>

      <button
        className={`text-action ${showDetails ? 'is-open' : ''}`}
        type="button"
        onClick={() => setShowDetails((value) => !value)}
      >
        <span>{showDetails ? '收起更多细调' : '再细调一些偏好'}</span>
        <ChevronDown size={18} />
      </button>

      {showDetails ? (
        <div className="form-grid profile-advanced">
          <Field label="城市">
            <input
              value={profile.city}
              onChange={(event) => onUpdateProfile('city', event.target.value)}
            />
          </Field>
          <Field label="这周想发多少次开场">
            <input
              type="number"
              min="0"
              value={profile.weeklyOutreachTarget}
              onChange={(event) =>
                onUpdateProfile('weeklyOutreachTarget', Number(event.target.value) || 0)
              }
            />
          </Field>
          <Field label="已经发出">
            <input
              type="number"
              min="0"
              value={profile.weeklyOutreachDone}
              onChange={(event) =>
                onUpdateProfile('weeklyOutreachDone', Number(event.target.value) || 0)
              }
            />
          </Field>
          <div className="field field-summary">
            <span>现在的进度</span>
            <div className="summary-chip-row">
              <span className="summary-chip">{profile.weeklyOutreachDone}/{profile.weeklyOutreachTarget} 次开场</span>
              <span className="summary-chip">{profile.weeklyMeetingTarget} 次首见面目标</span>
            </div>
          </div>
          <Field label="我在意的点" full>
            <textarea
              rows="2"
              value={profile.mustHave}
              onChange={(event) => onUpdateProfile('mustHave', event.target.value)}
            />
          </Field>
          <Field label="不想再碰到" full>
            <textarea
              rows="2"
              value={profile.avoid}
              onChange={(event) => onUpdateProfile('avoid', event.target.value)}
            />
          </Field>
          <Field label="更容易聊开的点" full>
            <textarea
              rows="2"
              value={profile.boost}
              onChange={(event) => onUpdateProfile('boost', event.target.value)}
            />
          </Field>
        </div>
      ) : null}
    </section>
  )
}

export default ProfilePanel
