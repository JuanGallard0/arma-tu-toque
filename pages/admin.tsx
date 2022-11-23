import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const CreateLinkMutation = gql`
  mutation (
    $title: String!
    $url: String!
    $imageUrl: String!
    $category: String!
    $description: String!
  ) {
    createLink(
      title: $title
      url: $url
      imageUrl: $imageUrl
      category: $category
      description: $description
    ) {
      title
      url
      imageUrl
      category
      description
    }
  }
`;

const Admin = () => {
  //const router = useRouter();

  const [createLink, { data, loading, error }] =
    useMutation(CreateLinkMutation);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Upload photo function
  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/upload-image?file=${filename}`);
    const data = await res.json();
    const formData = new FormData();

    Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    toast.promise(
      fetch(data.url, {
        method: "POST",
        body: formData,
      }),
      {
        loading: "Guardando...",
        success: "Imagen guardada exitosamente!🎉",
        error: `Error en guardado 😥 Por favor intenta más tarde${error}`,
      }
    );
  };

  const onSubmit = async (data) => {
    const { title, url, category, description, image } = data;
    const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${image[0].name}`;
    const variables = { title, url, category, description, imageUrl };
    try {
      toast.promise(createLink({ variables }), {
        loading: "Creating new link..",
        success: "Link successfully created!🎉",
        error: `Something went wrong 😥 Please try again -  ${error}`,
      });
      // .then(router.push("/explorer"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
    className="min-h-screen flex justify-center bg-center py-24 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
    style={{
      backgroundImage:
        "url(https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
    }}
  >
    <div className="absolute bg-black opacity-70 inset-0 z-0"></div>
    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-0 border-t-4 border-green-400">
      <div className="grid gap-8 grid-cols-1">
        <Toaster />
        <h2 className="text-3xl font-medium my-5 font-sans">Crear un nuevo perfil</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex flex-row md:space-x-4 w-full text-xs">
            <div className="mb-3 space-y-2 w-full text-xs">
              <label className="font-semibold text-gray-600 py-2">Nombre:</label>
              <input
                placeholder="Nombre"
                name="title"
                type="text"
                {...register("title", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-3 space-y-2 w-full text-xs">
              <label className="font-semibold text-gray-600 py-2">
                Apellido:
              </label>
              <input
                placeholder="Apellido"
                name="title"
                type="text"
                {...register("title", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="md:flex flex-row md:space-x-4 w-full text-xs">
            <div className="mb-3 space-y-2 w-full text-xs">
              <label className="font-semibold text-gray-600 py-2">Correo:</label>
              <input
                placeholder="Correo"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="text"
                name="integration[shop_name]"
                id="integration_shop_name"
              />
            </div>
            <div className="mb-3 space-y-2 w-full text-xs">
              <label className="font-semibold text-gray-600 py-2">
                Fecha de nacimiento
              </label>
              <input
                placeholder="Address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="date"
                name="integration[street_address]"
                id="integration_street_address"
              />
            </div>
          </div>
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
            <div className="w-full flex flex-col mb-3">
              <label className="font-semibold text-gray-600 py-2">
                <span className="text-gray-700">Categoría</span>
                <input
                  placeholder="Categoría"
                  {...register("category", { required: true })}
                  name="category"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
            </div>
            <div className="w-full flex flex-col mb-3">
              <label className="font-semibold text-gray-600 py-2">
                Departamento
              </label>
              <select
                className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                name="integration[city_id]"
                id="integration_city_id"
              >
                <option value="">Seleccionar</option>
                <option value="">Ahuachapan</option>
                <option value="">Santa Ana</option>
                <option value="">Sonsonate</option>
                <option value="">Chalatenango</option>
                <option value="">San Salvador</option>
              </select>
            </div>
          </div>
          <div className="md:flex flex-row md:space-x-4 w-full text-xs">
            <div className="mb-3 space-y-2 w-full text-xs">
              <label className="font-semibold text-gray-600 py-2">
                Posee instrumentos propios:
              </label>
              <select
                className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                name="integration[city_id]"
                id="integration_city_id"
              >
                <option value="">Si</option>
                <option value="">No</option>
              </select>
            </div>
            <div className="mb-3 space-y-2 w-full text-xs">
              <label className="block">
                <span className="text-gray-700">Instrumentos</span>
                <input
                  placeholder="Guitarra, Piano,..."
                  {...register("url", { required: true })}
                  name="url"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
            </div>
          </div>
          <div className="mb-3 space-y-2 w-full text-xs">
            <label className=" font-semibold text-gray-600 py-2">
              Redes sociales
            </label>
            <div className="flex flex-wrap items-stretch w-full mb-4 relative">
              <div className="flex">
                <span className="flex leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-300 justify-center items-center rounded-lg text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </span>
              </div>
              <input
                type="text"
                className="flex-shrink flex-grow flex-auto leading-normal w-px border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                placeholder="https://"
              />
            </div>
          </div>
          <div className="mb-3 space-y-2 w-full text-xs">
            <label className=" font-semibold text-gray-600 py-2">
              Lugares visitados recientemente
            </label>
            <input
              placeholder="Lugares visitados recientemente"
              {...register("description", { required: true })}
              name="description"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <label className="block">
              <span className="text-gray-700">Nombre Artistico:</span>
              <input
                placeholder="Nombre Artistico"
                {...register("description", { required: true })}
                name="description"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="block">
              <span className="text-gray-700">Descripción</span>
              <input
                placeholder="Descripción"
                {...register("description", { required: true })}
                name="description"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Seleccionar Imagen
          </label>
          <input
            {...register("image", { required: true })}
            onChange={uploadPhoto}
            type="file"
            accept="image/png, image/jpeg"
            name="image"
            className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none"
          />
          <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
            PNG o JPG (MAX. 1MB).
          </p>
          <button
            disabled={loading}
            type="submit"
            className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-6 h-6 animate-spin mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                Creando...
              </span>
            ) : (
              <span>Crear perfil</span>
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Admin;
