import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import KanbanPage from './pages/KanbanPage'
import { defaultCategories, defaultPeople, defaultTasks } from './data/defaultData'
import { loadData, saveData } from './utils/storage'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => loadData('kanban-tasks', defaultTasks))
  const [categories, setCategories] = useState(() => loadData('kanban-categories', defaultCategories))

  useEffect(() => saveData('kanban-tasks', tasks), [tasks])
  useEffect(() => saveData('kanban-categories', categories), [categories])

  const createTask = (task) => setTasks((current) => [...current, { ...task, id: crypto.randomUUID() }])
  const updateTask = (id, changes) => setTasks((current) => current.map((task) => (task.id === id ? { ...task, ...changes } : task)))
  const deleteTask = (id) => setTasks((current) => current.filter((task) => task.id !== id))
  const moveTask = (id, status) => setTasks((current) => current.map((task) => {
    if (task.id !== id) return task
    const completeDate = status === 'done' ? task.completeDate || new Date().toISOString().slice(0, 10) : ''
    return { ...task, status, completeDate }
  }))
  const addCategory = (name) => {
    const cleanName = name.trim()
    if (!cleanName || categories.some((category) => category.toLowerCase() === cleanName.toLowerCase())) return false
    setCategories((current) => [...current, cleanName])
    return true
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/board" replace />} />
        <Route path="/board" element={<KanbanPage tasks={tasks} categories={categories} people={defaultPeople} onCreate={createTask} onUpdate={updateTask} onDelete={deleteTask} onMove={moveTask} onAddCategory={addCategory} />} />
        <Route path="/dashboard" element={<DashboardPage tasks={tasks} />} />
      </Route>
      <Route path="*" element={<Navigate to="/board" replace />} />
    </Routes>
  )
}

export default App
