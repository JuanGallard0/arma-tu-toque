import React from "react";
import prisma from "../../lib/prisma";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";

const BookmarkLinkMutation = gql`
  mutation ($id: String!) {
    bookmarkLink(id: $id) {
      title
      url
      imageUrl
      category
      description
    }
  }
`;
const CreateRFQMutation = gql`
  mutation (
    $title: String!
    $description: String!
    $address1: String!
    $address2: String!
    $time: String!
    $date: String!
    $type: String!
    $receiverId: String!
  ) {
    createRFQ(
      title: $title
      description: $description
      address1: $address1
      address2: $address2
      time: $time
      date: $date
      type: $type
      receiverId: $receiverId
    ) {
      title
      description
      address1
      address2
      time
      date
      type
      receiverId
    }
  }
`;

const Link = ({ link }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingRFQ, setIsCreatingRFQ] = useState(false);
  const [createBookmark] = useMutation(BookmarkLinkMutation);

  const [createRFQ, { data, loading, error }] = useMutation(CreateRFQMutation);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, description, address1, address2, time, date, type } = data;
    const receiverId = link.ownerId;
    const variables = {
      title,
      description,
      address1,
      address2,
      time,
      date,
      type,
      receiverId,
    };
    try {
      toast.promise(createRFQ({ variables }), {
        loading: "Creating new RFQ..",
        success: "Solicitud enviada con éxito!🎉",
        error: `Something went wrong 😥 Please try again -  ${error.graphQLErrors}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const bookmark = async () => {
    setIsLoading(true);
    toast.promise(createBookmark({ variables: { id: link.id } }), {
      loading: "working on it",
      success: "Saved successfully! 🎉",
      error: `Something went wrong 😥 Please try again`,
    });
    setIsLoading(false);
  };

  const toggleCreateRFQ = async () => {
    if (isCreatingRFQ) setIsCreatingRFQ(false);
    else setIsCreatingRFQ(true);
  };

  return (
    <div className="inline-flex">
      <Toaster />
      {!isCreatingRFQ ? (
        <div className="prose container m-40 px-8 bg-gray-100 border-4 border-opacity-60 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleCreateRFQ()}
            className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 mr-5"
          >
            <span>Crear una solicitud</span>
          </button>
          <button
            onClick={() => bookmark()}
            className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-6 h-6 animate-spin mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                Guardando...
              </span>
            ) : (
              <span>Marcar como favorito</span>
            )}
          </button>
          <h1>{link.title}</h1>
          <img src={link.imageUrl} className="shadow-lg rounded-lg" />
          <p className="text-gray-900 text-xl mb-2">Descripción: </p>
          <p className="text-gray-900 text-xl font-bold mb-2">{link.description}</p>

          <h2>Instrumentos</h2>

          <p className="text-gray-900 text-xl mb-8">{link.url}</p>
        </div>
      ) : (
        <div className="container m-40 px-8 bg-gray-100 flex flex-wrap border-4 border-opacity-60 rounded-lg overflow-hidden">
          <section className=" w-2/5">
            <button
              onClick={() => toggleCreateRFQ()}
              className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 mr-5"
            >
              <span>Cancelar</span>
            </button>
            <h1>{link.title}</h1>
            <img src={link.imageUrl} className="shadow-lg rounded-lg" />
            <p>{link.description}</p>

            <h4>Instrumentos</h4>
            <p className="text-gray-600">{link.url}</p>
          </section>
          <section className="w-3/5">
            <form
              className="grid grid-cols-1 gap-y-6  p-8 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="block">
                <span className="text-gray-700">Título</span>
                <input
                  placeholder="Título"
                  name="title"
                  type="text"
                  //value={"test"}
                  {...register("title", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Nombre persona/empresa que contrata</span>
                <input
                  placeholder="Persona/Empresa"
                  name="title"
                  type="text"
                  //value={"test"}
                  {...register("title", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Descripción</span>
                <input
                  placeholder="Descripción"
                  {...register("description", { required: true })}
                  name="description"
                  type="text"
                  //value={"test"}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <h3>Dirección</h3>
              <label className="block">
                <span className="text-gray-700">Línea 1</span>
                <input
                  placeholder="Dirección"
                  {...register("address1", { required: true })}
                  name="address1"
                  type="text"
                  //value={"test"}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Línea 2</span>
                <input
                  placeholder="address2"
                  {...register("address2", { required: false })}
                  name="address2"
                  type="text"
                  //value={"test"}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Duración del evento</span>
                <input
                  placeholder="Duración del evento"
                  {...register("time", { required: true })}
                  name="time"
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Fecha del evento</span>
                <input
                  placeholder="Fecha del evento"
                  {...register("date", { required: true })}
                  name="date"
                  type="datetime-local"
                  //value={"2022-11-29T15:45"}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Tipo de evento</span>
                <input
                  placeholder="Tipo de evento"
                  {...register("type", { required: true })}
                  name="type"
                  type="text"
                  //value={"test"}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>

              <button
                disabled={loading}
                type="submit"
                className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
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
                  <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Enviar solicitud</span>
                )}
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default Link;

export const getServerSideProps = async ({ params }) => {
  const id = params.id;
  const link = await prisma.link.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      category: true,
      url: true,
      imageUrl: true,
      description: true,
      ownerId: true,
    },
  });
  return {
    props: {
      link,
    },
  };
};
