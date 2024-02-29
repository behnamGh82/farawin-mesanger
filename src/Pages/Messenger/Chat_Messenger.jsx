import { faAdd, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useState } from "react";
import MassageSnder from "../../Components/MessegeSnder";
function Chat_Messenger({ contactinfo }) {
  let messageInput = useRef();
  const [messages, Setmassage] = useState([]);
  // console.log(data);
  return (
    <div>
      {/* قسمت بالایی چت */}
      {contactinfo.state ? (
        // در صورتی که شرط اجرا بشه یا به اصطلاح وقتی که  کاربر انتخاب شده و صفحه چت درست میشه
        <div>
          <div className="lg:flex w-full h-24 border bg-[#ccc] p-6 rounded-3xl my-[10px] mx-[50px] md:flex sm:flex">
            {/* سمت راست هدر چت */}
            <div className="flex">
              <button className="mx-8">
                <i class="fa-solid fa-ellipsis text-2xl"></i>
              </button>
              <button>
                <i class="fa-solid fa-magnifying-glass text-2xl"></i>
              </button>
              {/* سمت چپ هدر بخش چت */}
              <button className="mx-10 border border-[#222] rounded-2xl p-2 w-[150px] bg-[#222] text-[#ccc]">
                <i class="fa-regular fa-user m-2"></i>
                پروفایل
              </button>
              <h3 className="mx-[100px] w-[300px]">
                نام کاربری:{contactinfo.contactDate.name}
              </h3>
              <br></br>
              <h3>شماره تلفن : {contactinfo.contactDate.username}</h3>
              {/* اطلاعات مخاطب */}
            </div>
          </div>
          <div className="mx-[80px] w-[96%] border-2 rounded-2xl  bg-[#ccc] h-[650px] overflow-scroll">
            {messages.map((msg, i) => (
              <MassageSnder key={i} data={msg}></MassageSnder>
            ))}
          </div>
          <div className="lg:w-[60%] bottom-0 fixed shadow-lg border my-8 mx-16  rounded-lg bg-[#ccc] md:w-[45%] m-0 ">
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
                <i class="fa-solid fa-microphone text-3xl relative m-2"></i>
              </button>
              <button>
                <i className="fa-solid fa-paper-plane text-3xl relative m-2"></i>
              </button>
              <input
                className="lg:w-[84%] rounded p-1 m-2 absolute border-none bg-[#ccc] font-semibold md:w-[80%]"
                ref={messageInput}
                placeholder="پیام خود را ارسال کنید"
              ></input>
            </form>
          </div>
        </div>
      ) : (
        // در صورتی که شرط به صورت فالز باشه و هنوز اجرا نشده یا به اصطلاح مخاطب هنوز کلیک نشده
        <div className="flex w-full h-24 border border-[#212121] justify-center bg-[#ccc] p-6 rounded text-center m-14">
          <div className="w-[900px]">
            <i class="fa-solid fa-info"></i>
            <p>مخاطبی انتخاب نکردید</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Chat_Messenger;
