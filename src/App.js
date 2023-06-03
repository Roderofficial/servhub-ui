import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IndexPage from "./pages";
import NavbarMenu from "./components/Navbar";
import AddServer from "./pages/addServer";
import LoginPage from "./pages/login";

function App() {
  return (
    <>
      <NavbarMenu />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/add" element={<AddServer />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
