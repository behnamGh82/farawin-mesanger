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
  //
  return (
    <div>
      <p>test</p>
    </div>
  );
}
