import type { TaskStateModel } from "../../models/task-state-model";
import { formatSecondsToStringTime } from "../../utils/formatSecondsToStringTime";
import { getNextCycle } from "../../utils/getNextCycle";
import { TaskActionTypes, type TaskActionModel } from "./task-actions";

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START: {
      const secondsRemaining = action.payload.duration * 60;
      return {
        ...state,
        activeTask: action.payload,
        currentCycle: getNextCycle(state.currentCycle),
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToStringTime(secondsRemaining),
        tasks: [...state.tasks, action.payload],
      };
    }
    case TaskActionTypes.INTERRUPT:
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: formatSecondsToStringTime(0),
        tasks: state.tasks.map((task) => {
          if (task.id === state.activeTask?.id) {
            return { ...task, interruptDate: Date.now() };
          }

          return task;
        }),
      };
    case TaskActionTypes.COMPLETE: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (task.id === state.activeTask?.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToStringTime(
          action.payload.secondsRemaining,
        ),
      };
    }
    case TaskActionTypes.RESET:
    default:
      return state;
  }
}
