import { useState } from 'react'
import { X } from 'lucide-react'

const emptyTask = { title: '', description: '', category: '', startDate: '', dueDate: '', completeDate: '', responsiblePersonId: '', status: 'todo' }

function TaskForm({ task, categories, people, onClose, onSave }) {
  const [form, setForm] = useState(() => task || { ...emptyTask, category: categories[0] || '', responsiblePersonId: people[0]?.id || '' })
  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = (event) => { event.preventDefault(); onSave(form); onClose() }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
        <div className="modal-header"><div><span className="eyebrow">Task details</span><h2 id="task-form-title">{task ? 'Edit task' : 'Create a new task'}</h2></div><button className="icon-button" onClick={onClose}><X /></button></div>
        <form onSubmit={submit}>
          <label>Title<input required maxLength="80" name="title" value={form.title} onChange={updateField} placeholder="What needs to be done?" /></label>
          <label>Description<textarea required maxLength="300" name="description" value={form.description} onChange={updateField} rows="3" placeholder="Add a short description" /></label>
          <div className="form-grid">
            <label>Category<select required name="category" value={form.category} onChange={updateField}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label>Responsible person<select required name="responsiblePersonId" value={form.responsiblePersonId} onChange={updateField}>{people.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}</select></label>
            <label>Start date<input required type="date" name="startDate" value={form.startDate} onChange={updateField} /></label>
            <label>Due date<input required type="date" min={form.startDate} name="dueDate" value={form.dueDate} onChange={updateField} /></label>
            <label>Status<select name="status" value={form.status} onChange={updateField}><option value="todo">To Do</option><option value="doing">Doing</option><option value="done">Done</option></select></label>
            {form.status === 'done' && <label>Complete date<input required type="date" name="completeDate" value={form.completeDate} onChange={updateField} /></label>}
          </div>
          <div className="form-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button">{task ? 'Save changes' : 'Create task'}</button></div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
