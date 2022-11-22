import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useUser } from "@auth0/nextjs-auth0";
import { gql, useQuery } from "@apollo/client";

const ProfileQuery = gql`
  query {
    profile {
      title
    }
  }
`;

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");
  const { user } = useUser();

  const { data, loading, error } = useQuery(ProfileQuery);
  let hasProfile;
  try {
    data.profile.title;
    hasProfile = true;
  } catch (error) {
    hasProfile = false;
  }

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#ffffff");
        setTextColor("#000000");
      } else {
        setColor("transparent");
        setTextColor("#ffffff");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300"
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-white">
        <Link href="/">
          <h1
            style={{ color: `${textColor}` }}
            className="font-bold text-4xl cursor-pointer"
          >
            Arma tu toque
          </h1>
        </Link>
        {user ? (
          <div>
            <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
              <li className="p-4">
                <Link href="/explorer">Explorar</Link>
              </li>
              <li className="p-4">
                <Link href="/favorites">Mis favoritos</Link>
              </li>
              <li className="p-4">
                <Link href="/requests">Solicitudes recibidas</Link>
              </li>
              {hasProfile ? (
                <li className="p-4">
                  <Link href="/profile">Mi perfil</Link>
                </li>
              ) : (
                <li className="p-4">
                  <Link href="/admin">Inscripción músico</Link>
                </li>
              )}
              <li className="p-4">
                <Link href="/api/auth/logout">Salir</Link>
              </li>
            </ul>

            {/* Mobile Button */}
            <div onClick={handleNav} className="block sm:hidden z-10">
              {nav ? (
                <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
              ) : (
                <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
              )}
            </div>
            {/* Mobile Menu */}
            <div
              className={
                nav
                  ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
                  : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
              }
            >
              <ul>
                <li
                  onClick={handleNav}
                  className="p-4 text-4xl hover:text-gray-500"
                >
                  <Link href="/api/auth/logout">Salir</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-5">
            <Link href="/api/auth/login">
              <a className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:text-gray-500 rounded text-base mt-4 md:mt-0">
                Ingresar
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
