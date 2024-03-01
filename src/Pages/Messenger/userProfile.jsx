import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
export default function UserProfile(props) {
  //data:object selectedUser:object setSelectedUser:setState-object
  //setSelectContactIsChange:setState-boolean
  //index:string editButton:FontAwesomeIcon title:string setOpenEditUserDialog:setState-boolean
  const {
    data,
    selectedUser,
    setSelectedUser,
    setSelectContactIsChange,
    index,
    editButton,
    title,
    setOpenEditUserDialog,
  } = props;
  const [thisContactChat, setThisContactChat] = useState([]);
  const getThisContactChat = async () => {
    const Contact = await fetch(
      "https://farawin.iran.liara.run/api/chat/{contactUsername}",
      {
        path: { index },
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    const res = await Contact.json();
    setThisContactChat(res.chatList);
  };
  useEffect(() => {
    if (index != "") {
      getThisContactChat();
    }
  }, [index]);
  // تابع برای انخاب هر مخاظب و ذخیره دیتای آن
  const handleSelect = () => {
    setSelectedUser({ contactDate: data, state: true });
    setSelectContactIsChange(true);
  };
  return (
    <div
      key={index}
      className={
        "flex gap-3 place-items-center h-20 border-b-2 border-gray-400 relative"
      }
      onClick={handleSelect}
    >
      <div className="flex place-items-center h-16 w-16 mr-4 rounded-full bg-[#3d4785]">
        {/* نمایش حرف اول اسم کاربر بجای عکس */}
        <h1 className="m-auto text-xl text-white">{title.charAt(0)}</h1>
      </div>
      <div className=" flex flex-col grow">
        <h3>{title}</h3>
        <p>{thisContactChat[thisContactChat.length - 1]}</p>
      </div>
      <button
        className="ml-5  z-10"
        onClick={(e) => {
          setOpenEditUserDialog(true);
        }}
      >
        <FontAwesomeIcon icon={editButton} />
      </button>
      {/* هایلایت کردن مخاطب انتخاب شده */}
      {selectedUser.contactDate.username === index ? (
        <div className="bg-[#00000011] absolute w-full h-full "></div>
      ) : null}
    </div>
  );
}
