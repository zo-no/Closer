import { Sparkles } from 'lucide-react'

function PmLoopsPanel({ loops }) {
  return (
    <section className="panel quiet-panel">
      <div className="panel-head">
        <div className="section-kicker">
          <Sparkles size={16} />
          别忘了
        </div>
      </div>
      <div className="quiet-list">
        {loops.map((loop) => (
          <article key={loop.id} className="quiet-item">
            <strong>{loop.title}</strong>
            <p>{loop.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PmLoopsPanel
