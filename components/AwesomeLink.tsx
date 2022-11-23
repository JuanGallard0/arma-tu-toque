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
      <div className="h-full border-4 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white">
        <img
          className="lg:h-72 md:h-48 w-full object-cover object-center"
          src={imageUrl}
          alt=""
        />

        <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
          <h2 className="text-base font-medium text-indigo-300 mb-1">{category}</h2>
          <h1 className="text-2xl font-semibold mb-3">{title}</h1>
          <p className="leading-relaxed mb-3">{description}</p>
            <div className="flex">
              <FaGuitar /> <p className="leading-relaxed mb-3">{url}</p>
            </div>
        </div>
      </div>
    </div>
  );
};
