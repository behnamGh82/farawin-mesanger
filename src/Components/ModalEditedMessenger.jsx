import React from "react";
export default function ModalEditedMessenger({ Children }) {
  return (
    <div>
      <div className="fixed top-0 left-0 w-[100%] h-[100%] bg-[#212121]">
        <div className="p-[30px] max-w-[480px] my-[200px] mx-auto bg-[#fcfcfc] rounded-[10px] text-center">
          {Children}
        </div>
      </div>
    </div>
  );
}
