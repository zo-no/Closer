import { Radar } from 'lucide-react'

function BoundaryPanel({ productSlices }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <div className="section-kicker">
          <Radar size={16} />
          MVP 边界
        </div>
      </div>
      <div className="chip-cloud">
        {productSlices.map((slice) => (
          <span key={slice} className="chip">
            {slice}
          </span>
        ))}
      </div>
    </section>
  )
}

export default BoundaryPanel
