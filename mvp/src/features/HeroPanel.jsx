import { ArrowRight, HeartHandshake, Sparkles } from 'lucide-react'

function HeroPanel({ metrics, strategy }) {
  return (
    <>
      <div className="hero-copy">
        <div className="eyebrow">
          <HeartHandshake size={16} />
          按这三个动作开始
        </div>
        <h1>先定偏好，再挑地点，见完只做一个判断。</h1>
        <p className="hero-text">
          先填必要信息就能开始。更细的偏好，你可以等看到推荐以后再慢慢补。
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#weekly-plan">
            先填必要信息
            <ArrowRight size={18} />
          </a>
          <a className="ghost-action" href="#map-lab">
            直接看推荐
          </a>
        </div>
        <div className="hero-steps" aria-label="使用顺序">
          <a className="step-chip" href="#weekly-plan">1 定这周偏好</a>
          <a className="step-chip" href="#map-lab">2 挑地点和开场方式</a>
          <a className="step-chip" href="#review-lab">3 见后只做一个判断</a>
        </div>
      </div>

      <div className="hero-side">
        <div className="coach-note">
          <div className="section-kicker">
            <Sparkles size={16} />
            下一步最值得做的事
          </div>
          <p>{strategy.summary}</p>
          <small>{strategy.detail}</small>
        </div>

        <div className="metric-grid">
          {metrics.map((item) => (
            <article key={item.label} className="metric-tile">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.detail}</small>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

export default HeroPanel
