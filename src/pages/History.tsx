import { useState } from 'react'

export function History() {
  const [tasks, setTasks] = useState([
    {
      taskId: 1,
      content: 'Tarefa 1',
      duration: 60,
      startedAt: '2023-01-04 17:00',
      status: 1,
    },
    {
      taskId: 2,
      content: 'Tarefa 2',
      duration: 60,
      startedAt: '2023-01-04 17:00',
      status: 2,
    },
    {
      taskId: 3,
      content: 'Tarefa 3',
      duration: 60,
      startedAt: '2023-01-04 17:00',
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
            {tasks.map((task) => (
              <tr key={task.taskId}>
                <td>{task.content}</td>
                <td>{task.duration} minutos</td>
                <td>{task.startedAt}</td>
                <td>
                  {task.status === 0 ? (
                    <span className="flex items-center gap-2 before:w-2 before:h-2 before:rounded-full before:bg-red-500">
                      Interrompido
                    </span>
                  ) : task.status === 1 ? (
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
