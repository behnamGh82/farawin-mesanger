import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Pages/Form/login";
import RegisterForm from "./Pages/Form/register";
import HomePage from "./Pages/Home";
import Messenger from "./Pages/Messenger/messenger";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
export default function App() {
  // const [vakue, setValue] = useState({});
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch
  // };
  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await fetch("https://farawin.iran.liara.run/api/user");
  //     console.log(res.json());
  //   };
  //   fetch();
  // }, []);
  // const getContact = async () => {
  //   const token = localStorage.getItem("token");
  //   const addapi = await fetch("https://farawin.iran.liara.run/api/contact", {
  //     method: "Get",
  //     headers: {
  //       accept: "application/json",
  //       authorization: token,
  //     },
  //   });
  //   const res = await addapi.json();
  //   console.log(res);
  // };
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
      {/* <Messenger /> */}
    </div>
  );
}
