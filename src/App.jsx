import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Form/login.jsx";
import Register from "./Pages/Form/register.jsx";
import HomePage from "./Pages/Home";
import Messenger from "./Pages/Messenger/messenger";
export default function App() {
  return (
    <div className="bg-[#ccc] h-screen flex place-items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Messenger" element={<Messenger />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
