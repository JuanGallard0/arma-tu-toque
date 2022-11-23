import Head from "next/head";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { AwesomeLink } from "../components/AwesomeLink";

const AllLinksQuery = gql`
  query allLinksQuery($first: Int, $after: String) {
    links(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          index
          imageUrl
          url
          title
          category
          description
          id
          instruments
        }
      }
    }
  }
`;

function Explorer() {
  const { user } = useUser();

  const { data, loading, error, fetchMore } = useQuery(AllLinksQuery, {
    variables: { first: 3 },
  });

  if (loading)
    return <p className="flex m-40 justify-center text-white">Cargando...</p>;
  if (error)
    return (
      <p className="flex m-40 justify-center text-white">
        Oh no... {error.message}
      </p>
    );

  const { endCursor, hasNextPage } = data?.links.pageInfo;

  return (
    <div className="flex mt-20 justify-center">
      <Head>
        <title>Arma tu Toque</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto max-w-5xl my-20 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.links.edges.map(({ node }, i) => (
            <Link href={`/link/${node.id}`} key={i}>
              <a>
                <AwesomeLink
                  title={node.title}
                  category={node.category}
                  url={node.url}
                  id={node.id}
                  description={node.description}
                  imageUrl={node.imageUrl}
                  instruments={node.instruments}
                />
              </a>
            </Link>
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="text-white my-10 text-center font-medium">
            ¡Has llegado al final!
          </p>
        )}
      </div>
    </div>
  );
}

export default Explorer;
