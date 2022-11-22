import React from "react";
import { RFQ } from "../components/RFQ";
import { gql, useQuery } from "@apollo/client";

const ReceivedRFQsQuery = gql`
  query {
    receivedRFQs {
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

const requests = () => {
  const { data, loading, error } = useQuery(ReceivedRFQsQuery);
  if (error) return <p>Oops! Algo salió mal{error}</p>;
  return (
    <div className="mx-auto my-20 max-w-5xl px-10">
      <h1 className="text-3xl font-medium my-5 text-white">Solicitudes recibidas</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="gap-10">
          {data.receivedRFQs.length === 0 ? (
            <p className="text-2xl font-medium text-white">
              No has recibido ninguna solicitud aún
            </p>
          ) : (
            data.receivedRFQs.map((receivedRFQs) => (
              <div key={receivedRFQs.id}>
                <RFQ
                  title={receivedRFQs.title}
                  description={receivedRFQs.description}
                  time={receivedRFQs.time}
                  date={receivedRFQs.date}
                  type={receivedRFQs.type}
                  id={receivedRFQs.id}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default requests;
