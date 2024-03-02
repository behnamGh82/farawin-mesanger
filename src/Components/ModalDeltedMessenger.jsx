import React from "react";
import "../Assets/style.css";
export default function ModalDeltedMessenger({ Children }) {
  return (
    <div>
      <div className="modal-backdrop">
        <div className="modal">{Children}</div>
      </div>
    </div>
  );
}
