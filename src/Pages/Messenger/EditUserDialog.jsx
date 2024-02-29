// ایمپورت موارد مورد نیاز
import { useState } from "react";
import Input from "../Form/Input.jsx";
import Button from "../Form/button.jsx";
import { faPhone, faX } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function EditUserDialog(props) {
  const { setOpenEditUserDialog } = props;
  //   برای ویرایش کردن نام و نام خانوادگی کاربر
  const [EditName, SetEditName] = useState("");
  //   برای ویرایش کردن شماره موبایل کاربر
  const [EditPhone, SetEditPhone] = useState("");
  //   رجکس موبایل برای اعتبار سنجی شماره تماس
  const phoneRegex =
    /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
  // تابع اعتبار سنجی برای نام و نام خانوادگی مخاطب
  const validateName = (Editname) => {
    if (Editname == "") {
      return "Epmty";
    } else if (Editname.length < 10) {
      return "notValid";
    }
    return "true";
  };
  // تابع اعتبار سنجی برای شماره تماس مخاطب
  const validatePhone = (Editphone) => {
    if (Editphone == "") {
      return "Epmty";
    } else if (!phoneRegex.test(Editphone)) {
      return "notValid";
    }
    return "true";
  };
  // ذخیره مقدار ویرایش شده جهت مقایسه و نمایش دادن پیام درست به کاربر
  const EditNameErorr = EditName;
  const EditPhoneErorr = EditPhone;
  //ذخیره پیغام برای نمایش  به کاربر
  const [Erorr, SetErorr] = useState("");
  // درخواست زدن به apiبرای ویراریش مخاطب
  // این درخواست فانکشن داخل باتن قرار میگیرد برای ارسال درخواست و ویرایش
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
        body: JSON.stringify({ username: EditPhone, name: EditName }),
      }
    );
    const res = await addContact.json();
    console.log(res);
  };
  return (
    <div>
      <p>test</p>
    </div>
  );
}
