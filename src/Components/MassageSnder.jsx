// import { useState } from "react";
function MassageSnder({ data }) {
  return (
    <div>
      <div>
        <p className="m-2 border w-[200px] p-4 text-xl rounded-xl border-[#ccc] text-[#ccc] bg-[#212121]">
          {data.text}
        </p>
        <i class="fa-solid fa-check mx-4"></i>
      </div>
    </div>
  );
}
export default MassageSnder;
