import React from "react";

export const RFQ = ({ title, description, time, date, type, id }) => {
  return (
    <div
      key={id}
      className="shadow-inner-xl rounded bg-gray-100 m-gray-300 m-4"
    >
      <div className="p-5 flex space-y-2 justify-between">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-gray-600">{description}</p>
        <p className="text-sm text-blue-500">{type}</p>
      </div>
    </div>
  );
};
