import { useContext } from "react";
import { TaskContext } from "./task-context";

export function useTaskContext() {
  return useContext(TaskContext);
}
