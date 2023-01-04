import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <div className="max-w-[74rem] h-[80vh] my-[10vh] mx-auto p-10 bg-zinc-800 rounded-lg flex flex-col">
      <Header />
      <Outlet />
    </div>
  )
}
