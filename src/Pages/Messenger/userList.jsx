import { faAdd, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfile from "./userProfile";
import { useEffect, useState } from "react";

export default function UserList(props) {
  const { setActive } = props;
  // دخیره لیست کاربران برای نمایش
  const [contact, setContact] = useState([]);
  //#region گرفتن کاربران از سرور
  useEffect(() => {
    const getContact = async () => {
      let con = [];
      const Contact = await fetch(
        "https://farawin.iran.liara.run/api/contact",
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      const res = await Contact.json();
      con = res.contactList;
      setContact(con);
      //   console.log(con);
    };
    getContact();
  }, []);
  //#endregion

  //فیلتر کردن کاربرانی که رف انها برابر با شماره کاربر باشه
  //نمایش مخاطبین همان کاربر نه تمام مخاطبین
  const filtered = contact.filter(
    (value) => value.ref == localStorage.getItem("phone")
  );
  return (
    <div className="h-full w-full bg-white rounded-3xl shadow-lg overflow-hidden ">
      <div className="flex gap-3 h-20 place-items-center px-5">
        <h1 className="grow">پیامرسان فراوین</h1>
        <FontAwesomeIcon icon={faAdd} />
        <FontAwesomeIcon icon={faRefresh} />
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
                date={value}
                // username={value.username}
                title={value.name}
                setActive={setActive}
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
            <div>
              <div className=" flex place-items-center w-20 h-20 rounded-full bg-[#3d4785] m-auto">
                <FontAwesomeIcon
                  icon={faAdd}
                  className="m-auto w-10 h-10 text-white"
                />
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
