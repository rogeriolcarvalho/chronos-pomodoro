import { createContext } from "react";
import type { TaskStateModel } from "../../models/task-state-model";
import { initialTaskState } from "./initial-task-state";
import type { TaskActionModel } from "./task-actions";

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};

const initialContextValue = {
  state: initialTaskState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
