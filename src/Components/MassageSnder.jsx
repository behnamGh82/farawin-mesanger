// import { useState } from "react";
function MassageSnder({ data }) {
  return (
    <div>
      <h1 className="m-3 border w-[200px] p-2 text-2xl rounded-xl border-[#ccc] text-[#ccc] bg-[#212121]">
        {data.text}
      </h1>
    </div>
  );
}
export default MassageSnder;
