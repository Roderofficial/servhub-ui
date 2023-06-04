import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IndexPage from "./pages";
import NavbarMenu from "./components/Navbar";
import AddServer from "./pages/addServer";
import LoginPage from "./pages/login";
import { UserContextProvider } from "./components/providers/userProvider";

function App() {
  return (
    <>
      <UserContextProvider>
        <NavbarMenu />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/add" element={<AddServer />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
