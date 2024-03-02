import { faAdd, faEdit, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfile from "./userProfile";

import { useEffect } from "react";

export default function UserList(props) {
  //selectedUser:object setSelectedUser:setState-object
  // setOpenAddUserDialog:setState-boolean setOpenEditUserDialog:setState-boolean
  const {
    selectedUser,
    setSelectedUser,
    setOpenAddUserDialog,
    setOpenEditUserDialog,
    contact,
    setContact,
    selectContactIsChange,
    setSelectContactIsChange,
  } = props;
  // تابع دریافت لیست مخاطبین از سرور
  const getContact = async () => {
    const Contact = await fetch("https://farawin.iran.liara.run/api/contact", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const res = await Contact.json();
    setContact(
      res.contactList.filter(
        (value) => value.ref == localStorage.getItem("phone")
      )
    );
  };
  //صدا زدن تابع دریافت لیست زمان اولین اجرا
  useEffect(() => {
    getContact();
  }, []);
  // انخاب اولین سطر در لیست مخاطبین اگر هیچ مخاطبی انتخاب نشده بود
  useEffect(() => {
    if (contact.length > 0 && selectContactIsChange == false) {
      setSelectedUser({ contactDate: contact[0], state: true });
    }
  }, [contact, selectContactIsChange]);
  return (
    //کانتنیر لیست مخاطبین
    <div className="h-full w-full bg-white rounded-3xl shadow-lg overflow-hidden ">
      {/* هدر لیست مخاطبین */}
      <div className="flex gap-3 h-20 place-items-center px-5 shadow-lg">
        <h1 className="grow">پیامرسان فراوین</h1>
        {/* دکمه افزودن کاربر */}
        <button
          onClick={(e) => {
            setOpenAddUserDialog(true);
          }}
        >
          <FontAwesomeIcon icon={faAdd} />
        </button>
        {/* دکمه رفرش لیست */}
        <button onClick={getContact}>
          <FontAwesomeIcon icon={faRefresh} />
        </button>
        {/* بخش نمایش لیست مخاطبین */}
      </div>
      {
        //اگر مخاطبی وجود داشت اینو نمایش میده
        contact.length > 0 && (
          <div className=" h-full overflow-y-scroll">
            {contact.map((value) => (
              <UserProfile
                data={value}
                index={value.username}
                title={value.name}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setSelectContactIsChange={setSelectContactIsChange}
                editButton={faEdit}
                setOpenEditUserDialog={setOpenEditUserDialog}
              />
            ))}
          </div>
        )
      }
      {
        // اگر لیست مخاطبین خالی بود اینو نمایش میده
        contact.length == 0 && (
          <div className=" flex flex-col gap-2 place-items-center h-full overflow-y-scroll pt-36">
            <h1>مخاطبی وجود ندارد </h1>
            {/* دکمه برای افزودن مخاطب */}
            <button
              onClick={(e) => {
                setOpenAddUserDialog(true);
              }}
            >
              <div className=" flex place-items-center w-20 h-20 rounded-full bg-[#3d4785] m-auto">
                <FontAwesomeIcon
                  icon={faAdd}
                  className="m-auto w-10 h-10 text-white"
                />
              </div>
            </button>
          </div>
        )
      }
    </div>
  );
}
