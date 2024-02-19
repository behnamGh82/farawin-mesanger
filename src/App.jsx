import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Pages/Form/login";
import RegisterForm from "./Pages/Form/register";
import HomePage from "./Pages/Home";
import Messenger from "./Pages/Messenger/messenger";
export default function App() {
  return (
    <div className="bg-[#dde5f4] h-screen flex place-items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="Register" element={<RegisterForm />} />
          <Route path="Messenger" element={<Messenger />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
