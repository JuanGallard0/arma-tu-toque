import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const Hero = ({ heading, message }) => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-center mb-12 bg-fixed bg-center bg-cover custom-img Hero">
      {/* overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="p-5 text-white z-[2] mt-[-10rem] ">
        <h2 className="text-5xl font-bold">{heading}</h2>
        <p className="py-5 text-xl">{message}</p>
        {!user ? (
          <Link href="/api/auth/login">
            <button className="px-8 py-2 border">
              ¡Regístrate para explorar músicos!
            </button>
          </Link>
        ) : (
          <Link href="/explorer">
            <button className="px-8 py-2 border">Explorar músicos</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
