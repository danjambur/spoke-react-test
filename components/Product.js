import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    node(id: $id) {
      ... on Product {
        title
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
      }
    }
  }
`;

export default function Product({
  product,
  id,
  withButton,
  baseURL,
  hidePrice,
}) {
  const router = useRouter();

  // if a product object has not been passed, it means we are on the product page
  // i need to get the product data from the graphql endpoint by its ID
  if (!product) {
    const { loading, error, data } = useQuery(GET_PRODUCT, {
      variables: { id },
    });

    product = data.node;
    if (loading) {
      return <p>Loading product...</p>;
    }

    if (error) {
      return <p>Error! {error}</p>;
    }
  }

  const price = parseInt(product.priceRange.maxVariantPrice.amount).toFixed(2);
  const hasImage = product.images.edges.length > 0;
  const lastUpdated = new Date(product.updatedAt);
  let threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  // set the URL for the image
  const imageSrc = hasImage
    ? product.images.edges[0].node.transformedSrc
    : null;

  // if its been updated in the last 3 days, i guess its new!
  let isNew = false;
  if (threeDaysAgo > lastUpdated) {
    isNew = true;
  }

  function goToProduct() {
    router.push(`/products/${id}`);
  }

  async function addToCart(e, product) {
    e.stopPropagation();

    let response = await fetch(`${baseURL}/api/cart`, {
      method: "POST",
      body: JSON.stringify(product),
    });
    let result = await response.json();
  }

  return (
    <div className="product" onClick={goToProduct}>
      {hasImage ? (
        <img className="product-image" src={imageSrc} />
      ) : (
        <img className="product-image" src="/no-img.svg" />
      )}
      <div className="product-desc">
        {<div>{isNew && <div className="highlight">NEW</div>}</div>}
        <h4>{product.productType}</h4>
        <h2>{product.title}</h2>
        {!hidePrice && <h3>£{price}</h3>}
        {withButton && (
          <button
            className="highlight hightlight-btn"
            onClick={(e) => {
              addToCart(e, product);
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
