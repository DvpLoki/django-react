import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { Home, Register, Login, NotFound, PostDetail } from "./pages";
import { Protect } from "./components";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}
function RegisterandLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protect>
              <Home />
            </Protect>
          }
        />
        <Route
          path="/post/:id"
          element={
            <Protect>
              <PostDetail />
            </Protect>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterandLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
