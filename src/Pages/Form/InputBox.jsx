import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

export default function Input(props) {
  const inputRef = useRef(null);
  const { label, icon, type, errorInput, ...other } = props;
  //تابع برای اینکه اگر روی هرکجای کانتینر اینپوت کلیک شد تگ اینپوت فوکوس بشه
  function focusInput() {
    inputRef.current.focus();
  }
  return (
    <div
      className="flex flex-col gap-1 bg-white h-24 w-3/4 rounded-xl px-6 py-3 text-[#8f8f8f] shadow-md"
      onClick={focusInput}
    >
      <label htmlFor="">{label}</label>
      <div className="flex gap-1 flex-grow items-center w-full">
        <FontAwesomeIcon icon={icon} />
        <input
          {...other}
          type={type}
          ref={inputRef}
          className="h-full w-full text-center focus:outline-none border-b-2 focus:text-black"
        />
      </div>
      <p className="text-xs text-red-500">{errorInput}</p>
    </div>
  );
}
