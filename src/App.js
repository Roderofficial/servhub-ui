import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IndexPage from "./pages";
import NavbarMenu from "./components/Navbar";
import AddServer from "./pages/addServer";
import LoginPage from "./pages/login";
import ServerPage from "./pages/server";
import { UserContextProvider } from "./providers/userProvider";
import GameServers from "./pages/gameServerList";

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
            <Route path="/server/:id" element={<ServerPage />} />
            <Route path="/games/:id" element={<GameServers />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
