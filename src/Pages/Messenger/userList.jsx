import { faAdd, faEdit, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfile from "./userProfile";
import { useEffect, useState } from "react";

export default function UserList(props) {
  const { selectedUser, setSelectedUser, setOpenAddUserDialog } = props;
  // دخیره لیست کاربران برای نمایش
  const [contact, setContact] = useState([]);
  //#region گرفتن کاربران از سرور
  const [change, setChange] = useState(false);
  const getContact = async () => {
    const Contact = await fetch("https://farawin.iran.liara.run/api/contact", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const res = await Contact.json();
    // con = res.contactList;
    setContact(
      res.contactList.filter(
        (value) => value.ref == localStorage.getItem("phone")
      )
    );
    //   console.log(con);
  };
  useEffect(() => {
    getContact();
  }, []);
  useEffect(() => {
    if (contact.length > 0 && change == false) {
      setSelectedUser({ contactDate: contact[0], state: true });
    }
  }, [contact, change]);
  //#endregion
  //فیلتر کردن کاربرانی که رف انها برابر با شماره کاربر باشه
  //نمایش مخاطبین همان کاربر نه تمام مخاطبین

  return (
    <div className="h-full w-full bg-white rounded-3xl shadow-lg overflow-hidden ">
      <div className="flex gap-3 h-20 place-items-center px-5 shadow-lg">
        <h1 className="grow">پیامرسان فراوین</h1>
        <button
          onClick={(e) => {
            setOpenAddUserDialog(true);
          }}
        >
          <FontAwesomeIcon icon={faAdd} />
        </button>
        <button onClick={getContact}>
          <FontAwesomeIcon icon={faRefresh} />
        </button>
      </div>
      {
        //مپ کردن لیست مخاطبین
        //در اصل جای متغیر کانتکت باید فیلتر باشه برای تست ظاهر اینو گذاشتم
        // filtered.length > 0 && (
        //   <div className=" h-full overflow-y-scroll">
        //     {filtered.map((value) => (
        //       <UserProfile key={value.username} title={value.name} />
        //     ))}
        contact.length > 0 && (
          <div className=" h-full overflow-y-scroll">
            {contact.map((value) => (
              <UserProfile
                data={value}
                index={value.username}
                title={value.name}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setChange={setChange}
                editButton={faEdit}
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
