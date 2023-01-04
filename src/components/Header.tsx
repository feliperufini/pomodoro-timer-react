import logoPomodoro from '../assets/pomodoro-logo.png'
import { NavLink } from 'react-router-dom'
import { Timer, Scroll } from 'phosphor-react'

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <NavLink to="/">
        <img src={logoPomodoro} alt="" width={48} />
      </NavLink>
      <nav className="flex gap-2">
        <NavLink
          className="w-12 h-12 flex justify-center items-center border-y-4 border-solid border-transparent hover:border-b-red-400 transition"
          to="/"
          title="Timer"
        >
          <Timer size={24} />
        </NavLink>
        <NavLink
          className="w-12 h-12 flex justify-center items-center border-y-4 border-solid border-transparent hover:border-b-red-400 transition"
          to="/history"
          title="Histórico"
        >
          <Scroll size={24} />
        </NavLink>
      </nav>
    </div>
  )
}
