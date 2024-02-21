import UserList from "./userList";
export default function Messenger() {
  return (
    <div className="h-full w-full flex ">
      <div className="h-full w-full md:w-[45%] lg:w-[35%] p-10">
        <UserList />
      </div>
      <div className="h-full w-0 md:w-[55%] lg:w-[65%] bg-blue-500 flex-grow"></div>
    </div>
  );
}
