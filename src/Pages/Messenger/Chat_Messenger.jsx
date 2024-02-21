import { faAdd, faRefresh } from "@fortawesome/free-solid-svg-icons";
function Chat_Messenger() {
  return (
    <div className="h-full w-0 md:w-[55%] lg:w-[65%] bg-blue-500 flex-grow">
      <nav className="w-full bg-[#1565C0] h-24">
        <h1 className="text-center p-5 font-bold">عدم انتخاب مخاطب</h1>
        <p className="text-center">هنوز مخاطبی انتخاب نکردید!</p>
      </nav>
    </div>
  );
}
export default Chat_Messenger;
