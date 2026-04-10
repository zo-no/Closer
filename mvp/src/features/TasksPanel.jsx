import { Target } from 'lucide-react'

function TasksPanel({ taskDetails, tasks, onToggleTask }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <div className="section-kicker">
          <Target size={16} />
          这周进度
        </div>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            className={`task-item ${task.done ? 'done' : 'active'}`}
            onClick={() => onToggleTask(task.id)}
          >
            <div className="task-state" />
            <div>
              <strong>{task.title}</strong>
              <p>{taskDetails[task.id]}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default TasksPanel
