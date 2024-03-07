import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Children, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
function Chat_Messenger({ contactinfo }) {
  let messageInput = useRef();

  // استیت ست مسیج برای ذخیره پیام های دریافت شده از api
  const [messeges, setMesseges] = useState([]);

  // درخواست دریافت تمام پیام ها برای نمایش اون  در چت
  useEffect(() => {
    const fetchGetMessages = async () => {
      const token = localStorage.getItem("token");
      const getmessege = await fetch(
        "https://farawin.iran.liara.run/api/chat",
        {
          method: "GET",
          headers: {
            authorization: token,
          },
        }
      );
      const res = await getmessege.json();
      console.log(res);
      let copyMegs = res.chatList.filter((msg) => {
        return (
          (msg.sender == localStorage.getItem("phone") &&
            msg.receiver == contactinfo.contactDate.username) ||
          (msg.receiver == localStorage.getItem("phone") &&
            msg.sender == contactinfo.contactDate.username)
        );
      });
      setMesseges(copyMegs);
    };
    fetchGetMessages();
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
          <div className="lg:w-[1160px] flex  h-24 border bg-[#ffffff] text-[#212121] p-6 rounded-3xl my-[10px] mx-[60px] md:w-[578px]  sm:">
            <div className="flex">
              {/* <button className="mx-8">
                <i className="fa-solid fa-ellipsis text-2xl"></i>
              </button> */}
              <h3 className="lg:mx-[200px] md:mx-[20px]">
                نام کاربری : {contactinfo.contactDate.name}
              </h3>
              <br></br>
              <h3 className="lg:mx-20 md:mx-[10px]">
                شماره تلفن : {contactinfo.contactDate.username}
              </h3>
              {/* اطلاعات مخاطب */}
            </div>
          </div>
          <div className="lg:w-[1130px] mx-[80px] border-2 rounded-2xl  bg-[#E0E0E0] h-[650px] overflow-auto md:w-[520px] sm:w-[280px]">
            {messeges.length > 0 ? (
              messeges.map((text, index) =>
                parseInt(localStorage.getItem("phone")) ===
                parseInt(text.sender) ? (
                  <div className="flex justify-end" style={{ width: "100%" }}>
                    <div
                      className="border-2 bg-[#FF4A09] mx-[20px] my-[10px] p-[5px] rounded-2xl text-[#ccc] lg:w-[40%] md:w-[100%] h-[40%] sm:w-[800px] overflow-hidden"
                      // style={{ width: "40%" }}
                    >
                      <p className="text-[#212121] w-40 font-semibold">
                        {text.text}
                        {/* {console.log(messeges)} */}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start" style={{ width: "100%" }}>
                    <div
                      className="border-2 bg-[#001318] mx-[20px] my-[10px] p-[5px] rounded-2xl text-[#ccc] lg:w-[40%] md:w-[50%] sm:w-[80%] overflow-hidden"
                      // style={{ width: "40%" }}
                    >
                      <p className="text-[#ccc] w-40 font-semibold">
                        {text.text}
                        {/* {console.log(messeges)} */}
                      </p>
                    </div>
                  </div>
                )
              )
            ) : (
              <div>
                <div className="text-center bg-[#FF4A09] p-[10px] text-[#212121] my-[200px] mx-[300px] rounded-md">
                  <p>برای شروع چت باید پیغامی ارسال بکنید</p>
                </div>
              </div>
            )}
          </div>
          <div className="lg:w-[1150px] bottom-0 fixed shadow-lg border my-8 mx-16  rounded-lg bg-[#ffffff] md:w-[550px] m-0 sm:w-[290px] ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handelbuttonSenderMessages();
              }}
            >
              {/* <button>
                <i className="fa-solid fa-microphone text-3xl relative m-2"></i>
              </button> */}
              <button>
                <i className="fa-solid fa-paper-plane text-3xl relative m-2 text-[#212121]"></i>
              </button>
              <input
                className="lg:w-[84%] rounded p-1 m-2 absolute border-none bg-[#ffffff] font-semibold md:w-[80%]"
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
