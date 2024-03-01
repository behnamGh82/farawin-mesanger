import React, { useState } from "react";
import InputBox from "./InputBox.jsx";
import Button from "./button.jsx";
import { faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  // ذخیره نام و شماره و رمز و تکرار رمز در استیت های زیر
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  //رجکس برای اعتبار سنجی شماره
  const phoneRegex =
    /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
  //توابع ذخیره مقدار فیلد های ورودی در استیت های مربوطه
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleRepeatPassword = (event) => {
    setRepeatPassword(event.target.value);
  };
  //#region اعتبار سنجی ورودی ها
  const validationName = (name) => {
    if (name == "") {
      return "Epmty";
    } else if (name.length < 5) {
      return "notValid";
    }
    return "true";
  };
  const validationPhone = (phone) => {
    if (phone == "") {
      return "Epmty";
    } else if (!phoneRegex.test(phone)) {
      return "notValid";
    }
    return "true";
  };
  const validationPassword = (password) => {
    if (password == "") {
      return "Epmty";
    } else if (password.length < 8) {
      return "notValid";
    }
    return "true";
  };
  const validationRepeatPassword = (password, repeatPassword) => {
    if (repeatPassword == "") {
      return "Epmty";
    } else if (repeatPassword != password) {
      return "notValid";
    }
    return "true";
  };
  //#endregion
  //#region ذخیره مقدار برگشتی توابع اعتبار سنجی
  const errorName = validationName(name);
  const errorPhone = validationPhone(phone);
  const errorPassword = validationPassword(password);
  const errorRepeatPassword = validationRepeatPassword(
    password,
    repeatPassword
  );
  //#endregion
  //استیت برای دخیره پیغام دریافتی از سرور
  const [errorApi, setErrorApi] = useState("");
  // استیت برای رفتن به صفحه چت بعد از لاگین
  const navigateChatPage = useNavigate();
  // فانکشن برای دکمه ثبت نام و فرستادن اطلاعات به سرور
  const handleButton = async () => {
    let message = "";
    let sucssesCode = "";
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
      sucssesCode = res.code;
      localStorage.setItem("phone", phone);
    } catch (e) {
      message = "اتصال به سرور برقرار نشد";
    }
    setErrorApi(message);
    if (sucssesCode == "200") {
      navigateChatPage("/Messenger");
    }
  };

  return (
    <div className=" flex flex-col gap-5 place-items-center w-3/4 md:w-2/5 lg:w-2/6  m-auto h-4/5 bg-[#f1f7fe] shadow-lg rounded-3xl px-10 py-2">
      <InputBox
        label="نام و نام خانوادگی"
        icon={faUser}
        type="Text"
        errorInput={
          errorName == "Epmty"
            ? "نام و نام خانوادگی را وارد کنید"
            : errorName == "notValid"
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
        errorInput={
          errorPhone == "Epmty"
            ? "موبایل الزامیست"
            : errorPhone == "notValid"
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
        errorInput={
          errorPassword == "Epmty"
            ? "رمز را وارد کنید"
            : errorPassword == "notValid"
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
        errorInput={
          errorRepeatPassword == "Epmty"
            ? "رمز را وارد کنید"
            : errorRepeatPassword == "notValid"
            ? "رمز یکسان نیست"
            : ""
        }
        value={repeatPassword}
        onChange={handleRepeatPassword}
      />
      <Button
        title="ثبت نام"
        onclick={handleButton}
        disable={
          errorName == "Epmty"
            ? true
            : errorName == "notValid"
            ? true
            : errorPhone == "Epmty"
            ? true
            : errorPhone == "notValid"
            ? true
            : errorPassword == "Epmty"
            ? true
            : errorPassword == "notValid"
            ? true
            : errorRepeatPassword == "Epmty"
            ? true
            : errorRepeatPassword == "notValid"
            ? true
            : false
        }
      />
      {errorApi != "" && <p className="text-xs text-red-500">{errorApi}</p>}
      <Link to={"/login"} className="underline text-blue-500 hover:text-2xl">
        ورود
      </Link>
    </div>
  );
}
