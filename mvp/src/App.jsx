import { motion } from 'framer-motion'
import './App.css'
import {
  budgetOptions,
  decisionOptions,
  pmLoops,
  sceneOptions,
  stageOptions,
} from './domain/data'
import {
  buildHeroMetrics,
  buildReviewRecommendation,
  buildScoredVenues,
  buildStrategy,
  buildTaskDetails,
  getReviewPeople,
  selectSelectedVenue,
  sortReviewsByNewest,
} from './domain/logic'
import HeroPanel from './features/HeroPanel'
import MapWorkspace from './features/MapWorkspace'
import PipelinePanel from './features/PipelinePanel'
import PmLoopsPanel from './features/PmLoopsPanel'
import ProfilePanel from './features/ProfilePanel'
import ReviewSection from './features/ReviewSection'
import TasksPanel from './features/TasksPanel'
import { useDatingCopilotState } from './state/useDatingCopilotState'

const MotionHeader = motion.header
const MotionAside = motion.aside
const MotionSection = motion.section

function App() {
  const { state, actions } = useDatingCopilotState()
  const { filters, pipeline, profile, reviewDraft, reviews, selectedVenueId, tasks } = state

  const heroMetrics = buildHeroMetrics({ pipeline, profile, reviews })
  const strategy = buildStrategy({ pipeline, profile, reviews })
  const taskDetails = buildTaskDetails({ pipeline, profile, reviews })
  const liveRecommendation = buildReviewRecommendation(reviewDraft)
  const latestReviews = sortReviewsByNewest(reviews)
  const reviewPeople = getReviewPeople(pipeline)
  const scoredVenues = buildScoredVenues({ filters, profile })
  const selectedVenue = selectSelectedVenue(scoredVenues, selectedVenueId)

  function handleSubmitReview(event) {
    event.preventDefault()
    actions.submitReview(selectedVenue, liveRecommendation.summary)
  }

  return (
    <div className="app-shell">
      <MotionHeader
        className="hero-panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <HeroPanel
          metrics={heroMetrics}
          strategy={strategy}
        />
      </MotionHeader>

      <main className="workspace-grid">
        <MotionAside
          className="sidebar left-rail"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <ProfilePanel
            budgetOptions={budgetOptions}
            profile={profile}
            sceneOptions={sceneOptions}
            onUpdateProfile={actions.updateProfile}
          />
          <TasksPanel
            taskDetails={taskDetails}
            tasks={tasks}
            onToggleTask={actions.toggleTask}
          />
        </MotionAside>

        <MotionSection
          className="stage"
          id="map-lab"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <MapWorkspace
            budgetOptions={budgetOptions}
            filters={filters}
            sceneOptions={sceneOptions}
            scoredVenues={scoredVenues}
            selectedVenue={selectedVenue}
            onSelectVenue={actions.selectVenue}
            onUpdateFilter={actions.updateFilter}
          />
          <ReviewSection
            decisionOptions={decisionOptions}
            latestReviews={latestReviews}
            liveRecommendation={liveRecommendation}
            reviewDraft={reviewDraft}
            reviewPeople={reviewPeople}
            onSubmitReview={handleSubmitReview}
            onUpdateReviewDraft={actions.updateReviewDraft}
          />
        </MotionSection>

        <MotionAside
          className="sidebar right-rail"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <PipelinePanel
            pipeline={pipeline}
            stageOptions={stageOptions}
            onUpdatePipeline={actions.updatePipeline}
          />
          <PmLoopsPanel loops={pmLoops} />
        </MotionAside>
      </main>
    </div>
  )
}

export default App
