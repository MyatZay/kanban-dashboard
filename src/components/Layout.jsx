import { BarChart3, Columns3 } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">K</span><span>TaskFlow</span></div>
        <nav>
          <NavLink to="/board"><Columns3 size={20} /> Kanban Board</NavLink>
          <NavLink to="/dashboard"><BarChart3 size={20} /> Dashboard</NavLink>
        </nav>
        <div className="sidebar-note"><strong>Project 01</strong><span>Kanban Board</span></div>
      </aside>
      <main className="main-content"><Outlet /></main>
    </div>
  )
}

export default Layout
