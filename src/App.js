import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserStorage } from "./UserContext";
import Create from "./Pages/Create";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ToDo from "./Pages/ToDo/ToDo";
import ProtectedRoute from "./user/ProtectedRoute";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="bg-amber-50  dark:bg-zinc-900 app box-border ">
      <div className=" max-w-xs m-auto md:max-w-2xl flex flex-col items-center justify-between relative h-screen">
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
        <Footer />
      </div>
    </div>
  );
}

export default App;
