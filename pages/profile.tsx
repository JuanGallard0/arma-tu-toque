import React from "react";
import Profile from "../components/Layout/Profile";
import { gql } from "apollo-server-micro";
import { useQuery } from "@apollo/client";

const ProfileQuery = gql`
  query {
    profile {
      title
      id
      url
      imageUrl
      description
      category
      firstName
      lastName
      email
      birthDate
      state
      hasInstruments
      instruments
    }
  }
`;

const profile = () => {
  const { data, loading, error } = useQuery(ProfileQuery);

  if (loading) return <div className="m-40 text-white">cargando...</div>;

  return (
    <div>
      <Profile
        title={data.profile.title}
        url={data.profile.url}
        imageUrl={data.profile.imageUrl}
        description={data.profile.description}
        category={data.profile.category}
        firstName={data.profile.firstName}
        lastName={data.profile.lastName}
        email={data.profile.email}
        birthDate={data.profile.birthDate}
        state={data.profile.state}
        hasInstruments={data.profile.hasInstruments}
        instruments={data.profile.instruments}
      />
    </div>
  );
};
export default profile;
