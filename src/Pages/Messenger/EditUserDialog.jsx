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
  const phoneEditRegex =
    /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
  // فانکشن برای ذخیره مقدار ویرایش شده نام و نام خانوادگی
  const handleEditName = (event) => {
    SetEditName(event.target.value);
  };
  //فانکشن برای دخیره مقدار ورودی موبایل
  const handleEditPhone = (event) => {
    SetEditPhone(event.currentTarget.value);
  };
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
  const EditNameErorr = validateName(EditName);
  const EditPhoneErorr = validatePhone(EditPhone);
  //ذخیره پیغام برای نمایش  به کاربر
  const [Erorr, SetErorr] = useState("");
  // درخواست زدن به apiبرای ویراریش مخاطب
  // این درخواست فانکشن داخل باتن قرار میگیرد برای ارسال درخواست و ویرایش
  const handleEditContactButton = async () => {
    const token = localStorage.getItem("token");
    const EditContact = await fetch(
      "https://farawin.iran.liara.run/api/contact",
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          authorization: token,
        },
        body: JSON.stringify({ username: EditPhone, name: EditName }),
      }
    );
    const res = await EditContact.json();
    console.log(res);
  };
  return (
    <div className="flex fixed w-full h-full bg-[#00000088]">
      <div className=" flex flex-col gap-5 place-items-center w-3/4 md:w-2/5 lg:w-2/6  m-auto h-4/5 bg-[#f1f7fe] shadow-lg rounded-3xl px-10 py-5 pt-20 relative">
        <div className="absolute top-2 right-3 text-red-500">
          <button
            onClick={() => {
              setOpenEditUserDialog(false);
            }}
          >
            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
          </button>
        </div>
        <InputBox
          value={EditPhone}
          onChange={handleEditPhone}
          label="موبایل"
          icon={faPhone}
          Erorr={
            EditPhoneErorr == "Epmty"
              ? "موبایل برای ویرایش الزامی است"
              : EditPhoneErorr == "notValid"
              ? "موبایل معتبر نیست"
              : ""
          }
          type="tel"
        />
        <InputBox
          label="نام و نام خانوادگی"
          icon={faUser}
          type="Tex"
          Erorr={
            EditNameErorr == "Epmty"
              ? "نام و نام خانوادگی مخاطب را جهت ویرایش وارد کنید"
              : EditNameErorr == "notValid"
              ? "نام و نام خانوادگی را صحیح وارد کنید"
              : ""
          }
          value={EditName}
          onChange={handleEditName}
        />
        <Button
          title="ویرایش مخاطب"
          onclick={handleEditContactButton}
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
        {Erorr != "" && <p className="text-xs text-red-500">{Erorr}</p>}
      </div>
    </div>
  );
}
