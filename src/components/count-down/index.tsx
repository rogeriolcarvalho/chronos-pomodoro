import { useTaskContext } from "../../contexts/task-context/use-task-context";
import styles from "./styles.module.css";

export function CountDown() {
  const { state } = useTaskContext();
  return (
    <div className={styles.countdown}>{state.formattedSecondsRemaining}</div>
  );
}
