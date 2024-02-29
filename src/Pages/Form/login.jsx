import { useState } from "react";
import InputBox from "./InputBox.jsx";
import Button from "./button.jsx";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  //ذخیره شماره در استیت
  const [phone, setPhone] = useState("");
  //ذخیره پسورد
  const [password, setPassword] = useState("");
  //رجکس برای اعتبار سنجی شماره
  const phoneRegex =
    /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
  //فانکشن برای دخیره مقدار ورودی موبایل
  const handlePhone = (event) => {
    setPhone(event.currentTarget.value);
  };
  //فانکشن برای ذخیره مقدار ورودی پسورد
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  // فانکشن اعتبار سنجی موبایل مقدار خالی یا نا معتبر یا درست برمیگرداند
  const validatePhone = (phone) => {
    if (phone == "") {
      return "Epmty";
    } else if (!phoneRegex.test(phone)) {
      return "notValid";
    }
    return "true";
  };
  //فانکشن اعتبار سنجی رمز مقدار خالی یا نامعتبر یا درست بر میگرداند
  const validatePpassword = (password) => {
    if (password == "") {
      return "Epmty";
    } else if (password.length < 8) {
      return "notValid";
    }
    return "true";
  };
  //ذخیره مقدار برگشتی فانکشن ها اعتبار سنجی جهت مقایسه و نمایش پیام مناسب به کاربر
  const errPhone = validatePhone(phone);
  const errPassword = validatePpassword(password);
  //استیت برای دخیره پیغام دریافتی از api ونمایش آن به کاربر
  const [err, setErr] = useState("");
  // استیت برای رفتن به صفحه چت بعد از لاگین
  const nav = useNavigate();
  //فانکشن برای دکمه  ورود و فرستادن اطلاعات به سرور
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
      localStorage.setItem("phone", phone);
    } catch (e) {
      console.log(e);
    }
    //ذخیره پیغام دریافتی از سرور برای نمایش زیر دکمه
    setErr(message);
    //بررسی کد دریافتی از سرور و اگر 200 بود انتقال به صفحه پیام رسان
    if (sucsses == "200") {
      nav("/Messenger");
    }
  };
  return (
    <div className=" flex flex-col gap-5 place-items-center w-3/4 md:w-2/5 lg:w-2/6  m-auto h-4/5 bg-[#f1f7fe] shadow-lg rounded-3xl px-10 py-5 pt-20">
      <InputBox
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
      <InputBox
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
