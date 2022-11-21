import React from "react";
import { FaGuitar } from "react-icons/fa";

export const AwesomeLink = ({
  imageUrl,
  url,
  title,
  category,
  description,
  id,
}) => {
  return (
    <div
      key={id}
      className="shadow-inner-xl  max-w-md  rounded bg-gray-100 m-gray-300 p-2"
    >
      <img src={imageUrl} className="rounded" />
      <div className="p-5 flex flex-col space-y-2">
        <p className="text-sm text-blue-500">{category}</p>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-gray-600">{description}</p>
        <div className="flex">
          <FaGuitar /> <p className="text-gray-600">{url}</p>
        </div>
      </div>
    </div>
  );
};
