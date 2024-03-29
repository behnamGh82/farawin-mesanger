import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

export default function InputBox(props) {
  const inputRef = useRef(null);
  //label:string icon:FontAwesomeIcon type:string errorInput:string
  const { label, icon, type, errorInput, ...other } = props;
  function handleClickBoxFocusInput() {
    inputRef.current.focus();
  }
  return (
    //کانتینر کامپوننت اینپوت
    <div
      className="flex flex-col gap-1 bg-white h-24 w-3/4 rounded-xl px-6 py-3 text-[#8f8f8f] shadow-lg"
      onClick={handleClickBoxFocusInput}
    >
      {/* عنوان اینپوت */}
      <label htmlFor="">{label}</label>
      {/* کانتینر تگ اینپوت و ایکون */}
      <div className="flex gap-1 flex-grow items-center w-full">
        <FontAwesomeIcon icon={icon} />
        <input
          {...other}
          type={type}
          ref={inputRef}
          className="h-full w-full text-center focus:outline-none border-b-2 focus:text-black"
        />
      </div>
      {/* پیغام ارور اینپوت */}
      <p className="text-xs text-red-500">{errorInput}</p>
    </div>
  );
}
