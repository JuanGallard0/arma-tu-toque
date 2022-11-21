import React from "react";

export const RFQ = ({ title, description, time, date, type, id }) => {
  return (
    <div
      key={id}
      className="shadow-inner-xl  max-w-md  rounded bg-gray-100 m-gray-300 p-2"
    >
      <div className="p-5 flex flex-col space-y-2">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-gray-600">{description}</p>
        <p className="text-sm text-blue-500">{type}</p>
      </div>
    </div>
  );
};
