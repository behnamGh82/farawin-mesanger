import { useState } from "react";
import InputBox from "../Form/InputBox.jsx";
import Button from "../Form/Button.jsx";
import { faPhone, faX } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddUserDialog(props) {
  const { setOpenAddUserDialog } = props;
  // ذخیره نام
  const [name, setName] = useState("");
  //ذخیره شماره در استیت
  const [phone, setPhone] = useState("");
  //رجکس برای اعتبار سنجی شماره
  const phoneRegex =
    /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
  const handleName = (event) => {
    setName(event.target.value);
  };
  //فانکشن برای دخیره مقدار ورودی موبایل
  const handlePhone = (event) => {
    setPhone(event.currentTarget.value);
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
  const validateName = (name) => {
    if (name == "") {
      return "Epmty";
    } else if (name.length < 10) {
      return "notValid";
    }
    return "true";
  };
  //ذخیره مقدار برگشتی فانکشن ها اعتبار سنجی جهت مقایسه و نمایش پیام مناسب به کاربر
  const errPhone = validatePhone(phone);
  const errName = validateName(name);
  //استیت برای دخیره پیغام دریافتی از api ونمایش آن به کاربر
  const [err, setErr] = useState("");
  //فانکشن برای دکمه  ورود و فرستادن اطلاعات به سرور
  const handleButton = async () => {
    const token = localStorage.getItem("token");
    const addContact = await fetch(
      "https://farawin.iran.liara.run/api/contact",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          authorization: token,
        },
        body: JSON.stringify({ username: phone, name: name }),
      }
    );
    const res = await addContact.json();
    console.log(res);
  };
  return (
    <div className="flex fixed w-full h-full bg-[#00000088]">
      <div className=" flex flex-col gap-5 place-items-center w-3/4 md:w-2/5 lg:w-2/6  m-auto h-4/5 bg-[#f1f7fe] shadow-lg rounded-3xl px-10 py-5 pt-20 relative">
        <div className="absolute top-2 right-3 text-red-500">
          <button
            onClick={() => {
              setOpenAddUserDialog(false);
            }}
          >
            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
          </button>
        </div>
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
        <Button
          title="افزودن مخاطب"
          onclick={handleButton}
          disabale={
            errPhone == "Epmty"
              ? true
              : errPhone == "notValid"
              ? true
              : errName == "Epmty"
              ? true
              : errName == "notValid"
              ? true
              : false
          }
        />
        {err != "" && <p className="text-xs text-red-500">{err}</p>}
      </div>
    </div>
  );
}
