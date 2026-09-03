import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initial-task-state";
import { TaskContext } from "./task-context";
import { taskReducer } from "./task-reducer";
import { TimerWorkerManager } from "../../workers/timer-worker-manager";
import { TaskActionTypes } from "./task-actions";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  // ref keeps the worker singleton out of render (avoids React Compiler memoization)
  const workerRef = useRef<TimerWorkerManager>(null);

  useEffect(() => {
    if (!state.activeTask) {
      workerRef.current?.terminate();
      workerRef.current = null;
      return;
    }

    if (!workerRef.current) {
      workerRef.current = TimerWorkerManager.getInstance();
    }

    const worker = workerRef.current;

    worker.onmessage((e) => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        dispatch({ type: TaskActionTypes.COMPLETE });
        worker.terminate();
        workerRef.current = null;
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });

    worker.postMessage(state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
