import { Play, HandPalm } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1),
  minutesAmount: zod.number().min(5).max(90),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  cycleId: string
  task: string
  minutesAmount: number
  startedAt: Date
  status: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.cycleId === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startedAt,
        )
        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.cycleId === activeCycleId) {
                return { ...cycle, status: 1 }
              } else {
                return cycle
              }
            }),
          )

          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, totalSeconds])

  function handleCreateNewCycle(data: newCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      cycleId: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
      status: 2,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.cycleId === activeCycleId) {
          return { ...cycle, status: 0 }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
    document.title = 'Cronômetro de Pomodoro'
  }

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(handleCreateNewCycle)}
        action=""
        className="flex flex-col items-center gap-14"
      >
        <div className="w-full flex items-center justify-center gap-2 text-lg font-bold flex-wrap">
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            className="flex-1 bg-transparent h-10 border-b-2 border-solid border-zinc-600 font-bold text-lg px-2 focus:border-red-300"
            id="task"
            list="task-suggestion"
            type="text"
            placeholder="Dê um nome ao seu projeto..."
            disabled={!!activeCycle}
            {...register('task')}
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
            disabled={!!activeCycle}
            step={5}
            max={60}
            min={5}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </div>
        <div className="countdown">
          <span className="bg-zinc-700 px-4 py-8 rounded-lg">{minutes[0]}</span>
          <span className="bg-zinc-700 px-4 py-8 rounded-lg">{minutes[1]}</span>
          <span className="text-red-400 py-8 w-12 overflow-hidden flex justify-center">
            :
          </span>
          <span className="bg-zinc-700 px-4 py-8 rounded-lg">{seconds[0]}</span>
          <span className="bg-zinc-700 px-4 py-8 rounded-lg">{seconds[1]}</span>
        </div>
        {activeCycle ? (
          <button
            className="w-full border-none p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-yellow-500 hover:bg-yellow-600 disabled:bg-zinc-500 disabled:cursor-not-allowed transition"
            onClick={handleInterruptCycle}
          >
            <HandPalm size={24} />
            Interromper
          </button>
        ) : (
          <button
            className="w-full border-none p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-red-400 hover:bg-red-500 disabled:bg-zinc-500 disabled:cursor-not-allowed transition"
            type="submit"
            disabled={isSubmitDisabled}
          >
            <Play size={24} />
            Começar
          </button>
        )}
      </form>
    </div>
  )
}
