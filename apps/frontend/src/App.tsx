import { BrowserRouter, useRoutes } from "react-router-dom";
import { appRoutes } from "./routes/routes";

function AppRoutes() {
  return useRoutes(appRoutes);
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
