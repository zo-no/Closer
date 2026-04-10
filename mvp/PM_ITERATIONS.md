# PM Iterations

## Loop 1

Requirement:
- Static mock data could not support real use.
- User profile, weekly goals, budget, and scene preference had to be editable.
- Venue ranking had to respond to those inputs.

Built:
- Editable profile and weekly target form.
- Dynamic task checklist tied to current weekly inputs.
- Map recommendation scoring based on scene, budget, and profile signals.

Verified:
- `npm run build`
- `npm run lint`

## Loop 2

Requirement:
- The product had no post-date closure.
- A review had to produce a concrete next-step decision instead of passive notes.
- Pipeline stage should update when a review is submitted.

Built:
- Review form with chemistry, comfort, and decision.
- Auto recommendation text before submit.
- Pipeline stage and next step update after saving a review.
- Review history panel for recent decisions.

Verified:
- `npm run build`
- `npm run lint`

## Loop 3

Requirement:
- State had to survive refresh.
- Validation could not stop at code-level checks.

Built:
- Local storage persistence for product state.
- Reset action to restore demo seed.

Verified:
- `npm run build`
- `npm run lint`
- Browser flow run with Playwright CLI:
- Changed weekly outreach target from `10` to `12`
- Changed completed outreach from `7` to `9`
- Submitted a new review for `Mia`
- Reloaded the page and confirmed the updated values and pipeline stage persisted in local storage
