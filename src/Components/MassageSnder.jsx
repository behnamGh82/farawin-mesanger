// import { useState } from "react";
function MassageSnder({ data }) {
  return (
    <div>
      <p className="m-6 border w-[200px] p-4 text-xl rounded-xl border-[#ccc] text-[#ccc] bg-[#212121]">
        {data.text}
      </p>
    </div>
  );
}
export default MassageSnder;
