import { TaskContextProvider } from "./contexts/task-context/task-context-provider";
import { MessagesContainer } from "./components/messages-container";
import { MainRouter } from "./routers/MainRouter";

import "./styles/theme.css";
import "./styles/global.css";

export function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <MainRouter />
      </MessagesContainer>
    </TaskContextProvider>
  );
}
