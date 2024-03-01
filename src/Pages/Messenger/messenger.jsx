import { useState } from "react";
import Chat_Messenger from "./Chat_Messenger";
import UserList from "./userList";
import AddUserDialog from "./AddUserDialog";
import EditUserDialog from "./EditUserDialog";
export default function Messenger() {
  //وضعیت کلیک روی مخاطب اگر روی مخاطبی کلیک شود مقدار استیت trueمیشود
  //و شماره کاربر در آیدی ذخیره میشود
  // const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    contactDate: {},
    state: false,
  });
  // const [active, setActive] = useState({ contactData: {}, state: false });
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="h-full w-full md:w-[45%] lg:w-[35%] p-10">
        {/* userList Section */}
        <UserList
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setOpenAddUserDialog={setOpenAddUserDialog}
          setOpenEditUserDialog={setOpenEditUserDialog}
        />
      </div>
      <Chat_Messenger contactinfo={selectedUser}></Chat_Messenger>
      {openAddUserDialog && (
        <AddUserDialog setOpenAddUserDialog={setOpenAddUserDialog} />
      )}
      {openEditUserDialog && (
        <EditUserDialog
          openEditUserDialog={openEditUserDialog}
          setOpenEditUserDialog={setOpenEditUserDialog}
        ></EditUserDialog>
      )}
    </div>
  );
}
