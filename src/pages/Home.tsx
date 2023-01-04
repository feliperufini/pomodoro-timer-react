import { Play } from 'phosphor-react'

export function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <form action="" className="flex flex-col items-center gap-14">
        <div className="w-full flex items-center justify-center gap-2 text-lg font-bold flex-wrap">
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            className="flex-1 bg-transparent h-10 border-b-2 border-solid border-zinc-600 font-bold text-lg px-2 focus:border-red-300"
            id="task"
            list="task-suggestion"
            type="text"
            placeholder="Dê um nome ao seu projeto..."
          />
          <datalist id="task-suggestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <input
            className="w-16 bg-transparent h-10 border-b-2 border-solid border-zinc-600 font-bold text-lg px-2 focus:border-red-300"
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            max={60}
            min={5}
          />
          <span>minutos.</span>
        </div>
        <div className="countdown">
          <span className="bg-zinc-700 px-4 py-8 rounded-lg">0</span>
          <span className="bg-zinc-700 px-4 py-8 rounded-lg">0</span>
          <span className="text-red-400 py-8 w-12 overflow-hidden flex justify-center">
            :
          </span>
          <span className="bg-zinc-700 px-4 py-8 rounded-lg">0</span>
          <span className="bg-zinc-700 px-4 py-8 rounded-lg">0</span>
        </div>
        <button
          className="w-full border-none p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-red-400 hover:bg-red-500 transition"
          type="submit"
        >
          <Play size={24} />
          Começar
        </button>
      </form>
    </div>
  )
}
