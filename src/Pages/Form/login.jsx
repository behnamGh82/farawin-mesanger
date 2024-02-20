import { useState } from "react";
import Input from "./Input.jsx";
import Button from "./button.jsx";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { data } from "autoprefixer";
export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const phoneRegex =
    /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
  const handlePhone = (event) => {
    setPhone(event.currentTarget.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const validatePhone = (phone) => {
    if (phone == "") {
      return "Epmty";
    } else if (!phoneRegex.test(phone)) {
      return "notValid";
    }
    return "true";
  };
  const validatePpassword = (password) => {
    if (password == "") {
      return "Epmty";
    } else if (password.length < 8) {
      return "notValid";
    }
    return "true";
  };
  const errPhone = validatePhone(phone);
  const errPassword = validatePpassword(password);
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const handleButton = async () => {
    let message = "";
    let sucsses = "";
    try {
      const userLogin = await fetch(
        "https://farawin.iran.liara.run/api/user/login",
        {
          method: "POST",
          body: JSON.stringify({
            username: phone,
            password: password,
          }),
        }
      );
      const res = await userLogin.json();
      message = res.message;
      sucsses = res.code;
      alert(res.message);
      alert(res.code);
      alert(res.token);
      console.log(res);
      localStorage.setItem("token", res.token);
    } catch (e) {
      console.log(e);
    }
    setErr(message);
    if (sucsses == "200") {
      nav("/Messenger");
    }
  };
  return (
    <div className=" flex flex-col gap-5 place-items-center w-3/4 md:w-2/5 lg:w-2/6  m-auto h-4/5 bg-[#f1f7fe] shadow-lg rounded-3xl px-10 py-5 pt-20">
      <Input
        value={phone}
        onChange={handlePhone}
        label="موبایل"
        icon={faPhone}
        err={
          errPhone == "Epmty"
            ? "موبایل الزامیست"
            : errPhone == "notValid"
            ? "موبایل معتبر نیست"
            : ""
        }
        type="tel"
      />
      <Input
        value={password}
        onChange={handlePassword}
        label="رمز"
        icon={faLock}
        err={
          errPassword == "Epmty"
            ? "رمز را وارد کنید"
            : errPassword == "notValid"
            ? "طول رمز حداقل 8 کارکتر"
            : ""
        }
        type="password"
      />
      <Button
        title="ورود"
        onclick={handleButton}
        disabale={
          errPhone == "Epmty"
            ? true
            : errPhone == "notValid"
            ? true
            : errPassword == "Epmty"
            ? true
            : errPassword == "notValid"
            ? true
            : false
        }
      />
      {err != "" && <p className="text-xs text-red-500">{err}</p>}
      <Link to={"/register"} className="underline text-blue-500 hover:text-2xl">
        ثبت نام
      </Link>
    </div>
  );
}
