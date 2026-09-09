import { useRef } from "react";
import { showMessage } from "../../adapters/show-message";
import { useTaskContext } from "../../contexts/task-context/use-task-context";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { DefaultInput } from "../default-input";
import { Cycles } from "../cycles";
import { DefaultButton } from "../default-button";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { getNextCycle } from "../../utils/getNextCycle";
import { TaskActionTypes } from "../../contexts/task-context/task-actions";
import type { TaskModel } from "../../models/task-model";
import { Tips } from "../tips";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateTask(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn("Digite o nome da tarefa");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({
      type: TaskActionTypes.START,
      payload: newTask,
    });

    showMessage.success("Tarefa iniciada com sucesso");
  }

  function handleInterruptTask() {
    dispatch({
      type: TaskActionTypes.INTERRUPT,
    });

    showMessage.dismiss();
    showMessage.error('Tarefa interrompida!');
  }

  return (
    <form onSubmit={handleCreateTask} className="form">
      <div className="formRow">
        <DefaultInput
          id="taskName"
          type="text"
          labelText="Nome da Tarefa"
          placeholder="Digite o nome da tarefa"
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className="formRow">
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}

      <div className="formRow">
        {!state.activeTask && (
          <DefaultButton
            color="green"
            type="submit"
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            key="start-task-button"
          >
            <PlayCircleIcon />
          </DefaultButton>
        )}

        {!!state.activeTask && (
          <DefaultButton
            color="red"
            type="button"
            aria-label="Interromper tarefa"
            title="Interromper tarefa"
            onClick={handleInterruptTask}
            key="interrupt-task-button"
          >
            <StopCircleIcon />
          </DefaultButton>
        )}
      </div>
    </form>
  );
}
