import { faAdd, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useState } from "react";
import MassageSnder from "../../Components/MassageSnder";
function Chat_Messenger({ contactinfo }) {
  let messageInput = useRef();
  const [messages, Setmassage] = useState([]);
  // console.log(data);
  return (
    <div className="h-full w-0 md:w-[55%] lg:w-[65%] bg-blue-500 flex-grow">
      <nav className="w-full bg-[#3F51B5] h-32 shadow-lg shadow-slate-900 my-3 rounded-md">
        {contactinfo.state ? (
          <div>
            <div className="text-center">
              <h1 className="font-bold text-center p-2">مخاطب انتخاب شده</h1>
              {/* <i class="fa-solid fa-id-card "></i> */}
              <i className="fa-solid fa-circle-user text-2xl p-2 text-[#ccc]"></i>
              <p className="font-extrabold inline p-3 text-xl">
                نام کاربری : {contactinfo.contactDate.name}
              </p>
              <br></br>
              <i className="fa-solid fa-phone inline p-1 text-2xl text-[#ccc] "></i>
              <p className="font-extrabold inline p-4">
                شماره تلفن : {contactinfo.contactDate.username}
              </p>
              <br></br>
              <br></br>
            </div>

            {/* {messages.map((msg, i) => {
              <MassageSnder key={i} data={msg} />;
            })} */}
            {messages.map((msg, i) => (
              <MassageSnder key={i} data={msg}></MassageSnder>
            ))}
            <div className="w-full bottom-0 fixed shadow-lg border my-2 border-[#212121] rounded-lg bg-red-500">
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
                  className="w-full rounded p-1 m-2 absolute border-none bg-[#ccc] font-semibold"
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
