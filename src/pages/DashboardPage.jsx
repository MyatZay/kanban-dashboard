import { AlertTriangle, CheckCircle2, CircleDot, ClipboardList, LoaderCircle } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getCategoryData, getPerformanceData, getStatusData, getSummary } from '../utils/statistics'

const statusColors = ['#98a2b3', '#f59e0b', '#10b981']
const performanceColors = ['#3b82f6', '#10b981', '#ef4444']
function EmptyChart({ children = 'Add tasks to see chart data.' }) { return <div className="empty-chart">{children}</div> }

function DashboardPage({ tasks }) {
  const summary = getSummary(tasks)
  const statusData = getStatusData(tasks)
  const categoryData = getCategoryData(tasks)
  const performanceData = getPerformanceData(tasks)
  const cards = [
    { label: 'Total tasks', value: summary.total, icon: ClipboardList, tone: 'blue' },
    { label: 'To Do', value: summary.todo, icon: CircleDot, tone: 'slate' },
    { label: 'Doing', value: summary.doing, icon: LoaderCircle, tone: 'amber' },
    { label: 'Done', value: summary.done, icon: CheckCircle2, tone: 'green' },
    { label: 'Overdue', value: summary.overdue, icon: AlertTriangle, tone: 'red' },
  ]

  return (
    <div className="page">
      <header className="page-header"><div><span className="eyebrow">Live overview</span><h1>Dashboard</h1><p>Task progress and team performance at a glance.</p></div></header>
      <section className="summary-grid">{cards.map(({ label, value, icon: Icon, tone }) => <article className="summary-card" key={label}><div className={`summary-icon ${tone}`}><Icon size={22} /></div><div><span>{label}</span><strong>{value}</strong></div></article>)}</section>
      <section className="charts-grid">
        <article className="chart-card"><header><h2>Tasks by status</h2><p>Current distribution across the board</p></header>{tasks.length ? <ResponsiveContainer width="100%" height={300}><PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius={68} outerRadius={100} paddingAngle={3}>{statusData.map((entry, index) => <Cell key={entry.name} fill={statusColors[index]} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer> : <EmptyChart />}</article>
        <article className="chart-card"><header><h2>Tasks by category</h2><p>Workload grouped by category</p></header>{categoryData.length ? <ResponsiveContainer width="100%" height={300}><BarChart data={categoryData} margin={{ top: 15, right: 12, left: -25, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip cursor={{ fill: '#f8fafc' }} /><Bar dataKey="value" name="Tasks" fill="#4f46e5" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer> : <EmptyChart />}</article>
        <article className="chart-card chart-wide"><header><h2>Completion performance</h2><p>Completed before, on, or after the due date</p></header>{performanceData.some((item) => item.value) ? <ResponsiveContainer width="100%" height={280}><BarChart data={performanceData} layout="vertical" margin={{ top: 10, right: 30, left: 15, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} /><XAxis type="number" allowDecimals={false} /><YAxis type="category" dataKey="name" width={70} /><Tooltip cursor={{ fill: '#f8fafc' }} /><Bar dataKey="value" name="Completed tasks" radius={[0, 6, 6, 0]}>{performanceData.map((entry, index) => <Cell key={entry.name} fill={performanceColors[index]} />)}</Bar></BarChart></ResponsiveContainer> : <EmptyChart>Complete tasks with due dates to see performance.</EmptyChart>}</article>
      </section>
    </div>
  )
}

export default DashboardPage
