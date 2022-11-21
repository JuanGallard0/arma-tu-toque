import React from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";

function Adelanto() {
  const { user } = useUser();
  return (
    <div className="bg-purple-700">
      <div className="max-w-[1240px] mx-auto py-16">
        <h1 className="text-2xl font-bold text-center text-white py-10">
          ¡Registrate para buscar a tu músico/banda para tu evento!
        </h1>
        <div className="flex flex-wrap">
          <div className="p-4 sm:w-1/2 lg:w-1/3">
            <div className="h-full border-4 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white">
              <img
                className="lg:h-72 md:h-48 w-full object-cover object-center"
                src="https://images.unsplash.com/photo-1462965326201-d02e4f455804?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />

              <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
                <h2 className="text-base font-medium text-indigo-300 mb-1">
                  Banda
                </h2>
                <h1 className="text-2xl font-semibold mb-3">Iron Weasel</h1>
                <p className="leading-relaxed mb-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam modi, expedita quos doloremque autem ipsum itaque
                  incidunt ipsam reprehenderit fuga! Dolores quisquam eius cum
                  accusamus?
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/3">
            <div className="h-full border-4 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white">
              <img
                className="lg:h-72 md:h-48 w-full object-cover object-center"
                src=" https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />

              <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
                <h2 className="text-base font-medium text-indigo-300 mb-1">
                  Músico
                </h2>
                <h1 className="text-2xl font-semibold mb-3">Juan Pérez</h1>
                <p className="leading-relaxed mb-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam modi, expedita quos doloremque autem ipsum itaque
                  incidunt ipsam reprehenderit fuga! Dolores quisquam eius cum
                  accusamus?
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/3">
            <div className="h-full border-4 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white">
              <img
                className="lg:h-72 md:h-48 w-full object-cover object-center"
                src="https://images.unsplash.com/photo-1462965326201-d02e4f455804?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />

              <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
                <h2 className="text-base font-medium text-indigo-300 mb-1">
                  Banda
                </h2>
                <h1 className="text-2xl font-semibold mb-3">Iron Weasel</h1>
                <p className="leading-relaxed mb-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam modi, expedita quos doloremque autem ipsum itaque
                  incidunt ipsam reprehenderit fuga! Dolores quisquam eius cum
                  accusamus?
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-white py-10">
          {!user ? (
            <a
              href="/api/auth/login"
              className="relative px-6 py-3 font-bold text-black group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
              <span className="relative">¡Regístrate!</span>
            </a>
          ) : (
            <a
              href="/explorer"
              className="relative px-6 py-3 font-bold text-black group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
              <span className="relative">Explorar músicos</span>
            </a>
          )}
        </h1>
      </div>
    </div>
  );
}

export default Adelanto;
