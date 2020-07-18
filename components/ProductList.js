import { gql, useQuery, NetworkStatus } from "@apollo/client";

export const TEST_QUERY = gql`
  {
    products(first: 50) {
      edges {
        node {
          title
          images(first: 1) {
            edges {
              node {
                transformedSrc
              }
            }
          }
        }
      }
    }
  }
`;

export default function ProductList() {
  const { loading, error, data, networkStatus } = useQuery(TEST_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return <p>uh oh! we can't get the products.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const products = data;
  console.log({ products });

  return <div>here!</div>;
}
