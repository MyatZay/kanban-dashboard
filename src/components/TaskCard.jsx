import { CalendarDays, ChevronLeft, ChevronRight, Pencil, Trash2, UserRound } from 'lucide-react'
import { isOverdue } from '../utils/statistics'

const order = ['todo', 'doing', 'done']

function TaskCard({ task, people, onEdit, onDelete, onMove }) {
  const position = order.indexOf(task.status)
  const person = people.find((item) => item.id === task.responsiblePersonId)

  return (
    <article className="task-card">
      <div className="task-card-top">
        <span className="category-tag">{task.category}</span>

        <div className="card-actions">
          <button
            className="icon-button"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
          >
            <Pencil size={16} />
          </button>

          <button
            className="icon-button danger"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this task?')) {
                onDelete(task)
              }
            }}
            aria-label={`Delete ${task.title}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <div className="task-meta">
        <UserRound size={15} />
        <span>{person?.name || 'Unassigned'}</span>
      </div>

      <div className={`task-meta ${isOverdue(task) ? 'overdue' : ''}`}>
        <CalendarDays size={15} />
        <span>Due {task.dueDate || 'Not set'}</span>
        {isOverdue(task) && <b>Overdue</b>}
      </div>

      <div className="move-actions">
        <button
          disabled={position === 0}
          onClick={() => onMove(task.id, order[position - 1])}
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <button
          disabled={position === order.length - 1}
          onClick={() => onMove(task.id, order[position + 1])}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </article>
  )
}

export default TaskCard
