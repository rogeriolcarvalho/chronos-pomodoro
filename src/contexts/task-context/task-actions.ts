import type { TaskModel } from "../../models/task-model";

export enum TaskActionTypes {
  START = "START",
  INTERRUPT = "INTERRUPT",
  RESET = "RESET",
  COUNT_DOWN = "COUNT_DOWN",
  COMPLETE = "COMPLETE",
}

export type TaskActionModel =
  | {
      type: TaskActionTypes.START;
      payload: TaskModel;
    }
  | {
      type: TaskActionTypes.COUNT_DOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type:
        | TaskActionTypes.INTERRUPT
        | TaskActionTypes.RESET
        | TaskActionTypes.COMPLETE;
    };
