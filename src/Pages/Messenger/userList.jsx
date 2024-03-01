import { faAdd, faEdit, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfile from "./userProfile";

import { useEffect, useState } from "react";

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
  // const [contact, setContact] = useState([]);

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
    // setContact(res.contactList);
  };
  useEffect(() => {
    getContact();
  }, []);
  //اگر لیست مخاطبین خالی بود و هیچ مخاظبی انتخاب نشده بود افکت زیر اجرا میشود
  useEffect(() => {
    if (contact.length > 0 && selectContactIsChange == false) {
      setSelectedUser({ contactDate: contact[0], state: true });
    }
  }, [contact, selectContactIsChange]);
  return (
    <div className="h-full w-full bg-white rounded-3xl shadow-lg overflow-hidden ">
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
