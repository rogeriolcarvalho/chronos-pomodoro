import type { TaskStateModel } from "../models/task-state-model";

let isRunning = false;

self.onmessage = (event: MessageEvent<TaskStateModel>) => {
  console.log("Worker received message:", event.data);

  if (isRunning) return;

  isRunning = true;

  const { activeTask, secondsRemaining } = event.data;

  if (!activeTask) {
    isRunning = false;
    return;
  }

  const endDate = activeTask.startDate + secondsRemaining * 1000;

  const now = Date.now();
  let countDownSeconds = Math.ceil((endDate - now) / 1000);

  function ticTacTimer() {
    self.postMessage(countDownSeconds);

    const now = Date.now();
    countDownSeconds = Math.floor((endDate - now) / 1000);

    console.log("tic tac timer", countDownSeconds);

    setTimeout(ticTacTimer, 1000);
  }

  ticTacTimer();
};
