import React, { useState } from "react";
import Input from "./Input";
import Button from "./button";
// import Link from "./Link";
import { faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function RegisterForm() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReapet, setPasswordReapet] = useState("");
  const phoneRegex =
    /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordReapet = (event) => {
    setPasswordReapet(event.target.value);
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
  const validatePpasswordReapet = (password, passwordReapet) => {
    if (passwordReapet == "") {
      return "Epmty";
    } else if (passwordReapet != password) {
      return "notValid";
    }
    return "true";
  };
  const errPhone = validatePhone(phone);
  const errPassword = validatePpassword(password);
  const errPasswordReapet = validatePpasswordReapet(password, passwordReapet);

  return (
    <div className=" flex flex-col gap-5 place-items-center w-3/4 md:w-2/5 lg:w-2/6  m-auto h-4/5 bg-[#f1f7fe] shadow-lg rounded-3xl px-10 py-5 pt-20">
      <Input
        label="موبایل"
        icon={faPhone}
        type="tel"
        err={
          errPhone == "Epmty"
            ? "موبایل الزامیست"
            : errPhone == "notValid"
            ? "موبایل معتبر نیست"
            : ""
        }
        value={phone}
        onChange={handlePhone}
      />
      <Input
        label="رمز"
        icon={faLock}
        type="password"
        err={
          errPassword == "Epmty"
            ? "رمز را وارد کنید"
            : errPassword == "notValid"
            ? "طول رمز حداقل 8 کارکتر"
            : ""
        }
        value={password}
        onChange={handlePassword}
      />
      <Input
        label="تکرار رمز"
        icon={faLock}
        type="password"
        err={
          errPasswordReapet == "Epmty"
            ? "رمز را وارد کنید"
            : errPasswordReapet == "notValid"
            ? "رمز یکسان نیست"
            : ""
        }
        value={passwordReapet}
        onChange={handlePasswordReapet}
      />
      <Button
        title="ثبت نام"
        disabale={
          errPhone == "Epmty"
            ? true
            : errPhone == "notValid"
            ? true
            : errPassword == "Epmty"
            ? true
            : errPassword == "notValid"
            ? true
            : errPasswordReapet == "Epmty"
            ? true
            : errPasswordReapet == "notValid"
            ? true
            : false
        }
      />
      <Link to={"/login"} className="underline text-blue-500 hover:text-2xl">
        ورود
      </Link>
    </div>
  );
}
