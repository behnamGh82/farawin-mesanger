import { useState } from "react";
import Chat_Messenger from "./Chat_Messenger";
import UserList from "./userList";
export default function Messenger() {
  //وضعیت کلیک روی مخاطب اگر روی مخاطبی کلیک شود مقدار استیت trueمیشود
  //و شماره کاربر در آیدی ذخیره میشود
  const [active, setActive] = useState({ id: "", state: false });

  console.log(active);

  return (
    <div className="h-full w-full flex ">
      <div className="h-full w-full md:w-[45%] lg:w-[35%] p-10">
        {/* userList Section */}
        <UserList setActive={setActive} />
      </div>
      <Chat_Messenger></Chat_Messenger>
    </div>
  );
}
