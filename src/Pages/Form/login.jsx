import { useState } from "react";
import InputBox from "./InputBox.jsx";
import Button from "./button.jsx";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  //ذخیره مقدار فیلد شماره و رمز در استیت ها
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  //رجکس برای اعتبار سنجی شماره
  const phoneRegex =
    /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
  //فانکشن برای دخیره مقدار فیلد شماره و رمز در استیت ها
  const handlePhone = (event) => {
    setPhone(event.currentTarget.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  // فانکشن اعتبار سنجی موبایل و رمز عبور مقدار خالی یا نا معتبر یا درست برمیگرداند
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
  //ذخیره مقدار برگشتی فانکشن ها اعتبار سنجی جهت مقایسه و نمایش پیام مناسب به کاربر
  const errorPhone = validationPhone(phone);
  const errorPassword = validationPassword(password);
  //استیت برای دخیره پیغام دریافتی از سرور
  const [errorApi, setErrorApi] = useState("");
  // استیت برای رفتن به صفحه چت بعد از لاگین
  const navigateChatPage = useNavigate();
  //فانکشن برای دکمه  ورود و فرستادن اطلاعات به سرور
  const handleLoginButton = async () => {
    let message = "";
    let sucssesCode = "";
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
      sucssesCode = res.code;
      localStorage.setItem("token", res.token);
      localStorage.setItem("phone", phone);
    } catch (e) {
      message = "اتصال به سرور برقرار نشد";
    }
    //ذخیره پیغام دریافتی از سرور برای نمایش زیر دکمه
    setErrorApi(message);
    //بررسی کد دریافتی از سرور و اگر 200 بود انتقال به صفحه پیام رسان
    if (sucssesCode == "200") {
      navigateChatPage("/Messenger");
    }
  };
  return (
    <div className=" flex flex-col gap-5 place-items-center w-3/4 md:w-2/5 lg:w-2/6  m-auto h-4/5 bg-[#f1f7fe] shadow-lg rounded-3xl px-10 py-5 pt-20">
      <InputBox
        value={phone}
        onChange={handlePhone}
        label="موبایل"
        icon={faPhone}
        errorInput={
          errorPhone == "Epmty"
            ? "موبایل الزامیست"
            : errorPhone == "notValid"
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
        errorInput={
          errorPassword == "Epmty"
            ? "رمز را وارد کنید"
            : errorPassword == "notValid"
            ? "طول رمز حداقل 8 کارکتر"
            : ""
        }
        type="password"
      />
      <Button
        title="ورود"
        onclick={handleLoginButton}
        disable={
          errorPhone == "Epmty"
            ? true
            : errorPhone == "notValid"
            ? true
            : errorPassword == "Epmty"
            ? true
            : errorPassword == "notValid"
            ? true
            : false
        }
      />
      {errorApi != "" && <p className="text-xs text-red-500">{errorApi}</p>}
      <Link to={"/register"} className="underline text-blue-500 hover:text-2xl">
        ثبت نام
      </Link>
    </div>
  );
}
