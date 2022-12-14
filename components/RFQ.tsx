import React from "react";

export const RFQ = ({ title, description, time, date, type, id }) => {
  return (
    <div key={id} className="p-2">
      <div className=" w-full lg:max-w-full lg:flex">
        <div
          className="h-48 lg:h-auto lg:w-64 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{
            backgroundImage:
            'url("https://img.freepik.com/free-vector/flat-design-musical-instruments_23-2149533579.jpg")',
          }}
          ></div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div className="mb-8">
        <div className="text-gray-900 font-bold text-2xl mb-2">{description}</div>
        <p className="text-gray-900 text-xl mb-2">
          Duración del evento: <b> {time} horas </b>
        </p>
        <p className="text-gray-900 text-xl mb-2">
          Fecha y hora del evento: <b>{date}</b>
        </p>
        <p className="text-gray-900 text-xl mb-2">Tipo de evento: <b>{type}</b></p>
      </div>
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Avatar of Writer"
        />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">{title}</p>
        </div>
      </div>
    </div>
    <div className="flex gap-2">
      <a href="#_" className="relative inline-block px-4 py-2 font-medium group">
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-green-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-green-500"></span>
        <span className="relative text-black group-hover:text-white">Aceptar</span>
      </a>
      <a href="#_" className="relative inline-block px-4 py-2 font-medium group">
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-red-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-red-500"></span>
        <span className="relative text-black group-hover:text-white">Rechazar</span>
      </a>
    </div>
  </div>
</div>
  );
};
