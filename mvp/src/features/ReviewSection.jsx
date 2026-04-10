import { HeartHandshake, Sparkles } from 'lucide-react'
import Field from '../components/Field'
import { decisionLabel } from '../domain/logic'

function ReviewSection({
  decisionOptions,
  latestReviews,
  liveRecommendation,
  reviewDraft,
  reviewPeople,
  onSubmitReview,
  onUpdateReviewDraft,
}) {
  return (
    <div className="detail-grid review-grid">
      <section className="panel detail-panel" id="review-lab">
        <div className="panel-head">
          <div className="section-kicker">
            <HeartHandshake size={16} />
            3 见后马上做判断
          </div>
        </div>

        <form className="form-grid review-form" onSubmit={onSubmitReview}>
          <Field label="这次见的是谁">
            <select
              value={reviewDraft.personId}
              onChange={(event) => onUpdateReviewDraft('personId', event.target.value)}
            >
              {reviewPeople.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="化学反应">
            <input
              type="range"
              min="1"
              max="5"
              value={reviewDraft.chemistry}
              onChange={(event) => onUpdateReviewDraft('chemistry', Number(event.target.value))}
            />
            <div className="range-value">{reviewDraft.chemistry} / 5</div>
          </Field>
          <Field label="相处舒适度">
            <input
              type="range"
              min="1"
              max="5"
              value={reviewDraft.comfort}
              onChange={(event) => onUpdateReviewDraft('comfort', Number(event.target.value))}
            />
            <div className="range-value">{reviewDraft.comfort} / 5</div>
          </Field>
          <Field label="这次之后">
            <select
              value={reviewDraft.decision}
              onChange={(event) => onUpdateReviewDraft('decision', event.target.value)}
            >
              {decisionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="这次最重要的感受" full>
            <textarea
              rows="3"
              value={reviewDraft.note}
              onChange={(event) => onUpdateReviewDraft('note', event.target.value)}
              placeholder="记下高光、犹豫点，和下次还想确认什么"
            />
          </Field>

          <div className="review-recommendation">
            <strong>{liveRecommendation.title}</strong>
            <p>{liveRecommendation.summary}</p>
          </div>

          <button className="primary-action form-submit" type="submit">
            保存这次判断
          </button>
        </form>
      </section>

      <section className="panel detail-panel">
        <div className="panel-head">
          <div className="section-kicker">
            <Sparkles size={16} />
            最近判断
          </div>
        </div>
        <div className="review-list">
          {latestReviews.map((review) => (
            <article key={review.id} className="review-card">
              <div className="detail-topline">
                <h3>{review.personName}</h3>
                <span className="pill">{decisionLabel(review.decision)}</span>
              </div>
              <p>
                {review.venueName} · 化学反应 {review.chemistry}/5 · 舒适度 {review.comfort}/5
              </p>
              <strong>{review.note}</strong>
              <small>{review.createdAt}</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ReviewSection
