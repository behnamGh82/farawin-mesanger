import React, { useState } from "react";
import InputBox from "./InputBox.jsx";
import Button from "./button";
import { faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
export default function RegisterForm() {
  // ذخیره نام
  const [name, setName] = useState("");
  //ذخیره شماره در استیت
  const [phone, setPhone] = useState("");
  //ذخیره پسورد
  const [password, setPassword] = useState("");
  //ذخیره تکرار پسورد
  const [passwordReapet, setPasswordReapet] = useState("");
  //رجکس برای اعتبار سنجی شماره
  const phoneRegex =
    /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
  //#region ذخیره مقدار فیلد ها در استیت ها
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordReapet = (event) => {
    setPasswordReapet(event.target.value);
  };
  //#endregion
  //#region اعتبار سنجی ورودی ها
  const validateName = (name) => {
    if (name == "") {
      return "Epmty";
    } else if (name.length < 10) {
      return "notValid";
    }
    return "true";
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
  //#endregion
  //#region ذخیره مقدار برگشتی توابع اعتبار سنجی
  const errName = validateName(name);
  const errPhone = validatePhone(phone);
  const errPassword = validatePpassword(password);
  const errPasswordReapet = validatePpasswordReapet(password, passwordReapet);
  //#endregion
  const [err, setErr] = useState("");
  const nav = useNavigate();
  // فانکشن برای دکمه ثبت نام و فرستادن اطلاعات به سرور
  const handleButton = async () => {
    let message = "";
    let sucsses = "";
    try {
      const userRegister = await fetch(
        "https://farawin.iran.liara.run/api/user",
        {
          method: "POST",
          body: JSON.stringify({
            username: phone,
            password: password,
            name: name,
          }),
        }
      );
      const res = await userRegister.json();
      message = res.message;
      sucsses = res.code;
      console.log(res);
      localStorage.setItem("phone", phone);
    } catch (e) {
      console.log(e);
    }
    setErr(message);
    if (sucsses == "200") {
      nav("/Messenger");
    }
  };

  return (
    <div className=" flex flex-col gap-5 place-items-center w-3/4 md:w-2/5 lg:w-2/6  m-auto h-4/5 bg-[#f1f7fe] shadow-lg rounded-3xl px-10 py-2">
      <InputBox
        label="نام و نام خانوادگی"
        icon={faUser}
        type="Tex"
        err={
          errName == "Epmty"
            ? "نام و نام خانوادگی را وارد کنید"
            : errName == "notValid"
            ? "نام و نام خانوادگی را صحیح وارد کنید"
            : ""
        }
        value={name}
        onChange={handleName}
      />
      <InputBox
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
      <InputBox
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
      <InputBox
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
        onclick={handleButton}
        disabale={
          errName == "Epmty"
            ? true
            : errName == "notValid"
            ? true
            : errPhone == "Epmty"
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
      {err != "" && <p className="text-xs text-red-500">{err}</p>}
      <Link to={"/login"} className="underline text-blue-500 hover:text-2xl">
        ورود
      </Link>
    </div>
  );
}
