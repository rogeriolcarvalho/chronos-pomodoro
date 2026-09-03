import { Home } from "./pages/home";
import { TaskContextProvider } from "./contexts/task-context/task-context-provider";

import "./styles/theme.css";
import "./styles/global.css";

export function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
