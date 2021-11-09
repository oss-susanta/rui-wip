import React from "react";

export default function Box({ color }) {
  return (
    <div
      className="w-full h-full text-white shadow"
      style={{ background: color }}
    >
      Box
    </div>
  );
}
