import { faAdd, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useState } from "react";
import MassageSnder from "../../Components/MassageSnder";
function Chat_Messenger({ contactinfo }) {
  let messageInput = useRef();
  const [messages, Setmassage] = useState([]);
  // console.log(data);
  return (
    <div className="h-full w-0 md:w-[55%] p-3 lg:w-[65%] bg-blue-500 flex-grow">
      <nav className="w-full bg-[#3F51B5] h-32 shadow-lg shadow-slate-900 my-3 rounded-md">
        {contactinfo.state ? (
          <div>
            <div className="text-center">
              <h1 className="font-bold text-center p-2">مخاطب انتخاب شده</h1>
              <div className="flex justify-between mx-64">
                {/* <i class="fa-solid fa-id-card "></i> */}
                <div className="border border-[#212121] bg-[#212121] p-3 rounded-md">
                  <p className="font-extrabold inline p-3 text-xl text-[#ccc]">
                    <i className="fa-solid fa-circle-user text-2xl p-2"></i>
                    نام کاربری : {contactinfo.contactDate.name}
                  </p>
                </div>
                {/* <br></br> */}
                <div className="border border-[#212121] bg-[#212121] p-3 rounded-md">
                  <p className="font-extrabold inline p-4 text-[#ccc]">
                    <i className="fa-solid fa-phone inline p-1 text-2xl"></i>
                    شماره تلفن : {contactinfo.contactDate.username}
                  </p>
                </div>
                <br></br>
                <br></br>
              </div>
            </div>
            {messages.map((msg, i) => (
              <MassageSnder key={i} data={msg}></MassageSnder>
            ))}
            <div className="lg:w-[60%] bottom-0 fixed shadow-lg border my-2 mx-10 border-[#212121] rounded-lg bg-red-500 md:w-[40%]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  let messageValue = messageInput.current.value;
                  if (messageValue) {
                    let copyMessages = [...messages];
                    copyMessages.push({
                      text: messageValue,
                      date: Date(),
                    });
                    Setmassage(copyMessages);
                  } else {
                    //Place enter value
                  }
                }}
              >
                <button>
                  <i className="fa-solid fa-paper-plane text-3xl relative m-2"></i>
                </button>
                <input
                  className="lg:w-[94%] rounded p-1 m-2 absolute border-none bg-[#ccc] font-semibold md:w-[80%]"
                  ref={messageInput}
                ></input>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center p-4 font-bold">
            <p>برای شروع چت لطفا یک مخاطب انتخاب کنید</p>
          </div>
        )}
      </nav>
    </div>
  );
}
export default Chat_Messenger;
