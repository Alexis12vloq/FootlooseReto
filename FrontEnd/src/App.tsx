import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/login/login";
import GuardiaTable from "./components/guardias/guardiasTab";

function App() {
  return (
    <div className="App">
      <div className="Login">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/productos" element={<GuardiaTable />} />
          <Route path="*" element={<p>ERROR 404</p>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
