import { gql, useQuery } from "@apollo/client";
import Product from "./Product";

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

  const productNodes = data.products.edges;
  console.log({ productNodes });
  return (
    <div>
      {productNodes.map((item) => {
        const product = item.node;
        console.log(product);
        return (
          <div key={product.id}>
            <p>{product.title}</p>
          </div>
        );
      })}
    </div>
  );
}
