import React from "react";

export default function Modal({ message = "Loading..." }) {
  return (
    <div className="modal showModal">
      <div className="modalContent">
        <p>{message}</p>
      </div>
    </div>
  );
}
