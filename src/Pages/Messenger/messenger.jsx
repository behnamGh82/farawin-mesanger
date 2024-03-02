import { useState } from "react";
import Chat_Messenger from "./Chat_Messenger";
import UserList from "./userList";

import AddUserDialog from "./AddUserDialog";
import EditUserDialog from "./EditUserDialog";
export default function Messenger() {
  //استیت برای ذخیره لیست مخاطبین
  const [contact, setContact] = useState([]);
  //استیت برای اینکه ایا کاربر مخاطبی را سلکت کرده یا خیر
  const [selectContactIsChange, setSelectContactIsChange] = useState(false);
  //استیت دخیره کاربر انتخاب شده در یوزرلیست
  const [selectedUser, setSelectedUser] = useState({
    contactDate: {},
    state: false,
  });
  //استیت برای باز کردن دیالوگ افزودن کاربر و ویرایش کاربر
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);

  return (
    //کانتینر کل صفحه چت
    <div className="h-full w-full flex  overflow-hidden">
      {/* کانتینر ساید بار لیست کاربران */}
      <div className="h-full w-full md:w-[45%] lg:w-[35%] p-10">
        {/* userList Section */}
        <UserList
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setOpenAddUserDialog={setOpenAddUserDialog}
          setOpenEditUserDialog={setOpenEditUserDialog}
          contact={contact}
          setContact={setContact}
          selectContactIsChange={selectContactIsChange}
          setSelectContactIsChange={setSelectContactIsChange}
        />
      </div>
      {/* chat Section */}
      <Chat_Messenger contactinfo={selectedUser}></Chat_Messenger>

      {/* فرم افزودن کاربر */}
      {openAddUserDialog && (
        <AddUserDialog
          setOpenAddUserDialog={setOpenAddUserDialog}
          contact={contact}
          setContact={setContact}
          setSelectedUser={setSelectedUser}
          selectContactIsChange={selectContactIsChange}
          setSelectContactIsChange={setSelectContactIsChange}
        />
      )}
      {/* فرم ویرایش کاربر */}
      {openEditUserDialog && (
        <EditUserDialog
          openEditUserDialog={openEditUserDialog}
          setOpenEditUserDialog={setOpenEditUserDialog}
        ></EditUserDialog>
      )}
    </div>
  );
}
