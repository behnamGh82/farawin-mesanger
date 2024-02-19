import { useState } from "react";
import Input from "./Input.jsx";
import Button from "./button.jsx";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
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
  console.log(validatePhone(phone));
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
      {/* <Link to={"/register"} className="underline text-blue-500 hover:text-2xl">
          ثبت نام
        </Link> */}
    </div>
  );
}
