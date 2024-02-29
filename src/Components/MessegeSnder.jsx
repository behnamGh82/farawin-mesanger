// import { useState } from "react";
function MassageSnder({ data }) {
  return (
    <div>
      <div className="m-8">
        <p className="m-2 border w-[200px] p-4 text-xl rounded-xl border-[#ccc] text-[#ccc] bg-[#FF4A09]">
          {data.text}
        </p>
        <i class="fa-solid fa-check mx-4 text-[#212121]"></i>
      </div>
    </div>
  );
}
export default MassageSnder;
