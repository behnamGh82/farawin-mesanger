import { useState } from "react";
import Chat_Messenger from "./Chat_Messenger";
import UserList from "./userList";
import AddUserDialog from "./AddUserDialog";
export default function Messenger() {
  //وضعیت کلیک روی مخاطب اگر روی مخاطبی کلیک شود مقدار استیت trueمیشود
  //و شماره کاربر در آیدی ذخیره میشود
  const [active, setActive] = useState({ contactData: {}, state: false });
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);

  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="h-full w-full md:w-[45%] lg:w-[35%] p-10">
        {/* userList Section */}
        <UserList
          setActive={setActive}
          setOpenAddUserDialog={setOpenAddUserDialog}
        />
      </div>
      <Chat_Messenger contactinfo={active}></Chat_Messenger>
      {openAddUserDialog && (
        <AddUserDialog setOpenAddUserDialog={setOpenAddUserDialog} />
      )}
    </div>
  );
}
