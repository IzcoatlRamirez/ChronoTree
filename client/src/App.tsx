import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import PageRegister from "./pages/PageRegister";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<PageRegister />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute/>}>
            <Route path="/main" element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
