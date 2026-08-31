export function isOverdue(task, today = new Date().toISOString().slice(0, 10)) {
  return task.status !== 'done' && task.dueDate && task.dueDate < today
}

export function getSummary(tasks) {
  return {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === 'todo').length,
    doing: tasks.filter((task) => task.status === 'doing').length,
    done: tasks.filter((task) => task.status === 'done').length,
    overdue: tasks.filter((task) => isOverdue(task)).length,
  }
}

export function getStatusData(tasks) {
  const summary = getSummary(tasks)
  return [{ name: 'To Do', value: summary.todo }, { name: 'Doing', value: summary.doing }, { name: 'Done', value: summary.done }]
}

export function getCategoryData(tasks) {
  return Object.entries(tasks.reduce((counts, task) => {
    counts[task.category] = (counts[task.category] || 0) + 1
    return counts
  }, {})).map(([name, value]) => ({ name, value }))
}

export function getPerformanceData(tasks) {
  const result = { Early: 0, 'On Time': 0, Late: 0 }
  tasks.filter((task) => task.status === 'done' && task.completeDate && task.dueDate).forEach((task) => {
    if (task.completeDate < task.dueDate) result.Early += 1
    else if (task.completeDate === task.dueDate) result['On Time'] += 1
    else result.Late += 1
  })
  return Object.entries(result).map(([name, value]) => ({ name, value }))
}
