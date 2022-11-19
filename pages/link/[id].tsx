import React from "react";
import prisma from "../../lib/prisma";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
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
    $time: Int!
    $date: Int!
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
        success: "RFQ successfully created!🎉",
        error: `Something went wrong 😥 Please try again -  ${error}`,
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
    <div className="prose container m-40 px-8 bg-gray-100">
      <Toaster />
      {!isCreatingRFQ ? (
        <div>
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
          <p>{link.description}</p>
          <a className="text-blue-500" href={`${link.url}`}>
            {link.url}
          </a>
        </div>
      ) : (
        <div>
          <section>
            <button
              onClick={() => toggleCreateRFQ()}
              className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 mr-5"
            >
              <span>Cancelar</span>
            </button>
            <h1>{link.title}</h1>
            <img src={link.imageUrl} className="shadow-lg rounded-lg" />
            <p>{link.description}</p>
            <a className="text-blue-500" href={`${link.url}`}>
              {link.url}
            </a>
          </section>
          <section>
            <form
              className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="block">
                <span className="text-gray-700">Título</span>
                <input
                  placeholder="Título"
                  name="title"
                  type="text"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Línea 2</span>
                <input
                  placeholder="address2"
                  {...register("address2", { required: true })}
                  name="address2"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Duración del evento</span>
                <input
                  placeholder="time"
                  {...register("time", { required: true })}
                  name="time"
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Fecha del evento</span>
                <input
                  placeholder="date"
                  {...register("date", { required: true })}
                  name="date"
                  type="datetime-local"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>

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
                  <span>Enviar solicitud</span>
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
