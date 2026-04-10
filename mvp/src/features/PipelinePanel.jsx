import { HeartHandshake } from 'lucide-react'

function PipelinePanel({ pipeline, stageOptions, onUpdatePipeline }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <div className="section-kicker">
          <HeartHandshake size={16} />
          正在推进的人
        </div>
        <span className="subtle-tag">随手更新进展</span>
      </div>
      <p className="panel-note">先盯住最想推进的几个人，其他人不要分走你的注意力。</p>
      <div className="pipeline-list compact-list">
        {pipeline.map((person) => (
          <article key={person.id} className="pipeline-row">
            <div className="pipeline-top">
              <div>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
              <span className="heat">{person.heat}</span>
            </div>

            <div className="pipeline-controls">
              <div className="inline-field compact-field">
                <span>阶段</span>
                <select
                  value={person.stage}
                  onChange={(event) =>
                    onUpdatePipeline(person.id, { stage: event.target.value })
                  }
                >
                  {stageOptions.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </div>

              <div className="inline-field compact-field">
                <span>优先级</span>
                <input
                  type="range"
                  min="40"
                  max="99"
                  value={person.heat}
                  onChange={(event) =>
                    onUpdatePipeline(person.id, { heat: Number(event.target.value) })
                  }
                />
              </div>
            </div>
            <strong className="pipeline-step">{person.nextStep}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PipelinePanel
