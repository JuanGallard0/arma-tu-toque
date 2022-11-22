import React from "react";

const Profile = ({title,url,imageUrl,description,category}) => {
  return (
    <div className="bg-slate-700">
      <div className="container mx-auto p-24">
        <div className="md:flex no-wrap">
          <div className="w-full md:w-3/12 md:mx-4">
            <div className="bg-white p-8 border-t-4 border-green-400 rounded-xl">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto rounded-full"
                  src={imageUrl}
                  alt=""
                />
              </div>

              <h1 className="text-gray-900 font-bold text-xl leading-10 my-4 text-center">
                {title}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-8">
                Músico
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                {description}
              </p>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Estado</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Activo
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Género Musical</span>
                  <span className="ml-auto">{category}</span>
                </li>
                <li className="flex items-center py-3">
                  <a
                    href="/edit_profile"
                    className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
                  >
                    <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                    <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                    <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                    <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                    <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                    <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                      Editar
                    </span>
                  </a>
                  <a
                    href="#_"
                    className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
                  >
                    <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                    <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                    <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                    <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                    <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                    <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                      Contactar
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="my-4"></div>
          </div>

          <div className="my-4"></div>

          <div className="w-full md:w-9/12">
            <div className="bg-white p-3 shadow-lg rounded-xl">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">Acerca de</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-md py-6 px-2">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Nombre</div>
                    <div className="px-4 py-2">Juan</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Apellido</div>
                    <div className="px-4 py-2">Pérez</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Descripcion</div>
                    <div className="px-4 py-2">Lorem ipsum</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Número de teléfono
                    </div>
                    <div className="px-4 py-2">71281281</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Departamento</div>
                    <div className="px-4 py-2">Morazan</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Tiene sus propios instrumentos
                    </div>
                    <div className="px-4 py-2">Si</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Correo Electronico
                    </div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800"
                        href="mailto:jane@example.com"
                      >
                        jane@example.com
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Fecha de nacimiento
                    </div>
                    <div className="px-4 py-2">Feb 06, 1998</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4"></div>

            <div className="bg-white p-9 shadow-sm rounded-xl">
              <div className="grid grid-cols-2">
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">
                      Lugares visitados recientemente
                    </span>
                  </div>
                  <ul className="list-inside space-y-2">
                    <li>
                      <div className="text-teal-600">Lorem Ipsum</div>
                      <div className="text-gray-500 text-xs">Marzo 2020</div>
                    </li>
                    <li>
                      <div className="text-teal-600">Lorem Ipsum</div>
                      <div className="text-gray-500 text-xs">Marzo 2020</div>
                    </li>
                    <li>
                      <div className="text-teal-600">Lorem Ipsum</div>
                      <div className="text-gray-500 text-xs">Marzo 2020</div>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                          fill="#fff"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Redes sociales</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    <li>
                      <div className="text-teal-600">Facebook</div>
                      <div className="text-gray-500 text-xs">
                        www.facebook.com
                      </div>
                    </li>
                    <li>
                      <div className="text-teal-600">Instagram</div>
                      <div className="text-gray-500 text-xs">
                        www.instagram.com
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
