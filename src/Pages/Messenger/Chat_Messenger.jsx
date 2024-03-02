import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Children, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
function Chat_Messenger({ contactinfo }) {
  let messageInput = useRef();
  // استیت ست مسیج برای ذخیره پیام های دریافت شده از api
  const [messeges, setMesseges] = useState([]);
  useEffect(() => {
    setMesseges([]);
  }, [contactinfo.contactDate.username]);
  // نوشتن درخواست برای افزودن پیام
  const handelbuttonSenderMessages = async () => {
    const token = localStorage.getItem("token");
    const sendMessages = await fetch(
      "https://farawin.iran.liara.run/api/chat",
      {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: JSON.stringify({
          contactUsername: contactinfo.contactDate.username,
          textHtml: messageInput.current.value,
        }),
      }
    );
    messageInput.current.value = "";
    const res = await sendMessages.json();
    console.log(res);
    const newMsg = messeges;
    newMsg.push(res.chat);
    console.log(newMsg);
    setMesseges(newMsg);
  };
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
                <i className="fa-solid fa-ellipsis text-2xl"></i>
              </button>
              <button>
                <i className="fa-solid fa-magnifying-glass text-2xl"></i>
              </button>
              {/* سمت چپ هدر بخش چت */}
              <button className="mx-10 border border-[#222] rounded-2xl p-2 w-[150px] bg-[#222] text-[#ccc]">
                <i className="fa-regular fa-user m-2"></i>
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
          <div className="mx-[80px] w-[96%] border-2 rounded-2xl  bg-[#ccc] h-[650px] overflow-auto">
            {messeges.length > 0 ? (
              messeges.map((text, index) => (
                <div>
                  <div className="border-2 w-[200px] bg-[#FF4A09] mx-[20px] my-[10px] p-[5px] rounded-2xl text-[#ccc]">
                    <p className="text-[#212121] font-semibold">
                      پیغام : {text.text}
                      {/* {console.log(messeges)} */}
                    </p>
                    ارسال کننده:
                    <p className="text-[#212121] font-semibold">
                      {text.sender}
                    </p>
                    ارسال به:
                    <p className="text-[#212121] font-semibold">
                      {text.receiver}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="text-center bg-[#FF4A09] p-[10px] text-[#212121] my-[200px] mx-[300px] rounded-md">
                  <p>برای شروع چت باید پیغامی ارسال بکنید</p>
                </div>
              </div>
            )}
          </div>
          <div className="lg:w-[60%] bottom-0 fixed shadow-lg border my-8 mx-16  rounded-lg bg-[#ccc] md:w-[45%] m-0 ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handelbuttonSenderMessages();
                // رفع باگ ارسال پیام
                setMesseges("");
              }}
            >
              {/* <button>
                <i className="fa-solid fa-microphone text-3xl relative m-2"></i>
              </button> */}
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
            <i className="fa-solid fa-info"></i>
            <p>مخاطبی انتخاب نکردید</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Chat_Messenger;
