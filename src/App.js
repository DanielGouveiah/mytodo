import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserStorage } from "./UserContext";
import Create from "./Pages/Create";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ToDo from "./Pages/ToDo/ToDo";
import ProtectedRoute from "./user/ProtectedRoute";

function App() {
  return (
    <div className="flex justify-center flex-col items-center max-w-xs m-auto md:max-w-2xl">
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/create"
              element={<Create />}
            />
            <Route
              path="/todo/:id"
              element={
                <ProtectedRoute>
                  <ToDo />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
