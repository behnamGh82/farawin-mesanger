import { useState } from "react";

export default function UserProfile(props) {
  // گرفتن دو مقدار کلید:شماره کاربر و عنوان: نام کاربر
  const { username, title, setActive } = props;
  // انتخاب کابر   هنوز تکمیلش نکردم
  const handleSelect = () => {
    setActive({ id: username, state: true });
  };
  return (
    <div
      key={username}
      className="flex gap-3 place-items-center px-4 h-20 border-b-2 border-gray-400 active:bg-slate-400"
      onClick={handleSelect}
    >
      <div className="flex place-items-center h-16 w-16 rounded-full bg-[#3d4785]">
        {/* نمایش حرف اول اسم کاربر بجای عکس */}
        <h1 className="m-auto text-xl text-white">{title.charAt(0)}</h1>
      </div>
      <h3 className="">{title}</h3>
    </div>
  );
}
