import Chat_Messenger from "./Chat_Messenger";
import UserList from "./userList";
export default function Messenger() {
  return (
    <div className="h-full w-full flex ">
      <div className="h-full w-full md:w-[45%] lg:w-[35%] p-10">
        {/* userList Section */}
        <UserList />
      </div>
      <Chat_Messenger></Chat_Messenger>
    </div>
  );
}
