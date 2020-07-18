import { gql, useQuery } from "@apollo/client";

export const TEST_QUERY = gql`
  {
    products(
      first: 50
      query: "product_type:HEROES OR product_type:SHARPS OR product_type:POLO"
    ) {
      edges {
        node {
          id
          images(first: 1) {
            edges {
              node {
                transformedSrc
              }
            }
          }
          productType
          title
          tags
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          updatedAt
        }
      }
    }
  }
`;

export default function ProductList() {
  const { loading, error, data } = useQuery(TEST_QUERY);

  if (error) {
    return <p>uh oh! we can't get the products.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const products = data;

  return <div>here!</div>;
}
