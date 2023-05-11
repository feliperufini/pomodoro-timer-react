import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Cycle } from './Home'

export function History() {
  const [cycles, setCycles] = useState<Cycle[]>([
    {
      cycleId: '3',
      task: 'Tarefa 3',
      minutesAmount: 30,
      startedAt: new Date('2023-05-11T11:00:00.000Z'),
      status: 1,
    },
    {
      cycleId: '2',
      task: 'Tarefa 2',
      minutesAmount: 60,
      startedAt: new Date('2023-03-04T17:00:00.000Z'),
      status: 2,
    },
    {
      cycleId: '1',
      task: 'Tarefa 1',
      minutesAmount: 20,
      startedAt: new Date('2023-01-04T17:00:00.000Z'),
      status: 0,
    },
  ])

  return (
    <div className="flex flex-1 p-14 flex-col">
      <h1 className="text-2xl">Meu Histórico</h1>
      <div className="flex-1 overflow-auto mt-8">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="rounded-tl-lg pl-6">Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th className="rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.cycleId}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startedAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.status === 0 ? (
                    <span className="flex items-center gap-2 before:w-2 before:h-2 before:rounded-full before:bg-red-500">
                      Interrompido
                    </span>
                  ) : cycle.status === 1 ? (
                    <span className="flex items-center gap-2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-500">
                      Em andamento
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 before:w-2 before:h-2 before:rounded-full before:bg-green-500">
                      Concluído
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
