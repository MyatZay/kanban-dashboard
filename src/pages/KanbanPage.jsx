import { useState } from 'react'
import { Plus, Tag } from 'lucide-react'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'

const columns = [
  { id: 'todo', title: 'To Do', note: 'Tasks waiting to start' },
  { id: 'doing', title: 'Doing', note: 'Tasks currently in progress' },
  { id: 'done', title: 'Done', note: 'Completed tasks' },
]

function KanbanPage({ tasks, categories, people, onCreate, onUpdate, onDelete, onMove, onAddCategory }) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [categoryName, setCategoryName] = useState('')
  const editTask = (task) => { setEditingTask(task); setFormOpen(true) }
  const closeForm = () => { setFormOpen(false); setEditingTask(null) }
  const saveTask = (task) => {
    const normalized = task.status === 'done' && !task.completeDate ? { ...task, completeDate: new Date().toISOString().slice(0, 10) } : task.status !== 'done' ? { ...task, completeDate: '' } : task
    if (editingTask) onUpdate(editingTask.id, normalized)
    else onCreate(normalized)
  }
  const removeTask = (task) => window.confirm(`Delete “${task.title}”? This action cannot be undone.`) && onDelete(task.id)
  const submitCategory = (event) => { event.preventDefault(); if (onAddCategory(categoryName)) setCategoryName('') }

  return (
    <div className="page">
      <header className="page-header"><div><span className="eyebrow">Project workspace</span><h1>Kanban Board</h1><p>Plan work, track progress, and keep your team moving.</p></div><button className="primary-button" onClick={() => setFormOpen(true)}><Plus size={19} /> New task</button></header>
      <section className="category-panel"><div><Tag size={20} /><div><strong>Task categories</strong><span>{categories.join(' · ')}</span></div></div><form onSubmit={submitCategory}><input aria-label="New category name" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="Add category" /><button className="secondary-button">Add</button></form></section>
      <div className="board">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id)
          return <section className={`kanban-column column-${column.id}`} key={column.id}><header><div><span className="status-dot" /><div><h2>{column.title}</h2><p>{column.note}</p></div></div><span className="task-count">{columnTasks.length}</span></header><div className="task-list">{columnTasks.map((task) => <TaskCard key={task.id} task={task} people={people} onEdit={editTask} onDelete={removeTask} onMove={onMove} />)}{columnTasks.length === 0 && <div className="empty-state">No tasks here yet.</div>}</div></section>
        })}
      </div>
      {formOpen && <TaskForm task={editingTask} categories={categories} people={people} onClose={closeForm} onSave={saveTask} />}
    </div>
  )
}

export default KanbanPage
