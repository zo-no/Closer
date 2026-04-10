import { useEffect, useReducer } from 'react'
import { defaultAppState } from '../domain/data'
import {
  buildNextStep,
  formatReviewTime,
  mapDecisionToStage,
} from '../domain/logic'

const STORAGE_KEY = 'closer-mvp-state-v2'

export function useDatingCopilotState() {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state])

  const actions = {
    updateProfile(field, value) {
      dispatch({ type: 'profile/update', payload: { field, value } })
    },
    toggleTask(taskId) {
      dispatch({ type: 'task/toggle', payload: { taskId } })
    },
    updateFilter(field, value) {
      dispatch({ type: 'filter/update', payload: { field, value } })
    },
    selectVenue(venueId) {
      dispatch({ type: 'venue/select', payload: { venueId } })
    },
    updatePipeline(personId, patch) {
      dispatch({ type: 'pipeline/update', payload: { personId, patch } })
    },
    updateReviewDraft(field, value) {
      dispatch({ type: 'reviewDraft/update', payload: { field, value } })
    },
    submitReview(selectedVenue, fallbackNote) {
      dispatch({ type: 'review/submit', payload: { selectedVenue, fallbackNote } })
    },
    resetState() {
      dispatch({ type: 'state/reset' })
    },
  }

  return { state, actions }
}

function reducer(state, action) {
  switch (action.type) {
    case 'profile/update':
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.payload.field]: action.payload.value,
        },
      }
    case 'task/toggle':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId ? { ...task, done: !task.done } : task,
        ),
      }
    case 'filter/update':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.field]: action.payload.value,
        },
      }
    case 'venue/select':
      return {
        ...state,
        selectedVenueId: action.payload.venueId,
      }
    case 'pipeline/update':
      return {
        ...state,
        pipeline: state.pipeline.map((person) =>
          person.id === action.payload.personId
            ? { ...person, ...action.payload.patch }
            : person,
        ),
      }
    case 'reviewDraft/update':
      return {
        ...state,
        reviewDraft: {
          ...state.reviewDraft,
          [action.payload.field]: action.payload.value,
        },
      }
    case 'review/submit':
      return submitReview(state, action.payload)
    case 'state/reset':
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY)
      }
      return cloneDefaultState()
    default:
      return state
  }
}

function submitReview(state, { selectedVenue, fallbackNote }) {
  const person = state.pipeline.find((candidate) => candidate.id === state.reviewDraft.personId)
  if (!person || !selectedVenue) {
    return state
  }

  const nextStage = mapDecisionToStage({
    currentStage: person.stage,
    decision: state.reviewDraft.decision,
  })
  const timestamp = formatReviewTime(new Date())

  return {
    ...state,
    pipeline: state.pipeline.map((candidate) =>
      candidate.id === state.reviewDraft.personId
        ? {
            ...candidate,
            stage: nextStage,
            nextStep: buildNextStep({
              decision: state.reviewDraft.decision,
              venueName: selectedVenue.name,
            }),
          }
        : candidate,
    ),
    tasks: state.tasks.map((task) =>
      task.id === 'review' ? { ...task, done: true } : task,
    ),
    reviews: [
      {
        id: `review-${timestamp}`,
        personId: person.id,
        personName: person.name,
        venueId: selectedVenue.id,
        venueName: selectedVenue.name,
        chemistry: Number(state.reviewDraft.chemistry),
        comfort: Number(state.reviewDraft.comfort),
        decision: state.reviewDraft.decision,
        note: state.reviewDraft.note.trim() || fallbackNote,
        createdAt: timestamp,
      },
      ...state.reviews,
    ],
    reviewDraft: {
      ...state.reviewDraft,
      note: '',
    },
  }
}

function loadInitialState() {
  const seed = cloneDefaultState()

  if (typeof window === 'undefined') {
    return seed
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return seed
  }

  try {
    return mergeState(seed, JSON.parse(stored))
  } catch {
    return seed
  }
}

function mergeState(seed, saved) {
  if (!saved || typeof saved !== 'object') {
    return seed
  }

  const savedTasksById = new Map(
    Array.isArray(saved.tasks)
      ? saved.tasks.map((task) => [task.id, task])
      : [],
  )

  return {
    ...seed,
    ...saved,
    profile: { ...seed.profile, ...saved.profile },
    filters: { ...seed.filters, ...saved.filters },
    reviewDraft: { ...seed.reviewDraft, ...saved.reviewDraft },
    tasks: seed.tasks.map((task) => ({
      ...task,
      done: savedTasksById.get(task.id)?.done ?? task.done,
    })),
    pipeline: Array.isArray(saved.pipeline) ? saved.pipeline : seed.pipeline,
    reviews: Array.isArray(saved.reviews) ? saved.reviews : seed.reviews,
  }
}

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(defaultAppState))
}
