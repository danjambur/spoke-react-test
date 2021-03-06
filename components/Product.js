import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    node(id: $id) {
      ... on Product {
        title
        id
        images(first: 2) {
          edges {
            node {
              transformedSrc
            }
          }
        }
        productType
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
  withOptions,
  baseURL,
  hidePrice,
  isProductPage,
}) {
  const router = useRouter();

  // if a product object has not been passed, it means we are on the product page
  // so we set isProductPage and we need to get the product data from the graphql endpoint by its ID
  if (isProductPage) {
    const { loading, error, data } = useQuery(GET_PRODUCT, {
      variables: { id },
    });

    if (loading) {
      return <p>Loading product...</p>;
    }

    if (error) {
      return <p>Error! {error}</p>;
    }
    product = data.node;
  }

  const price = parseInt(
    product.priceRange.maxVariantPrice.amount,
  ).toFixed(2);

  const hasImages = product.images.edges.length > 0;
  const lastUpdated = new Date(product.updatedAt);
  let threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  // set the URL for the image
  let imageSrc;
  if (hasImages) {
  }
  if (!isProductPage) {
    imageSrc = hasImages
      ? product.images.edges[0].node.transformedSrc
      : null;
  } else {
    imageSrc = hasImages
      ? product.images.edges[1].node.transformedSrc // get the second image as per the requirements on the product page
      : null;
  }

  // if its been updated in the last 3 days, i guess its new!
  let isNew = false;
  if (lastUpdated < threeDaysAgo) {
    isNew = true;
  }

  function goToProduct() {
    router.push(`/products/${id}`);
  }

  async function addToCart(e, product) {
    // because the button has a click event,
    // and its nested inside of another,
    // we don't want the event to bubble!
    e.stopPropagation();
    await fetch(`${baseURL}/api/cart`, {
      method: "POST",
      body: JSON.stringify(product),
    });
  }

  return (
    <div className="product" onClick={goToProduct}>
      {hasImages ? (
        <img className="product-image" src={imageSrc} />
      ) : (
        <img className="product-image" src="/no-img.svg" />
      )}
      <div className="product-desc">
        {<div>{isNew && <div className="highlight">NEW</div>}</div>}
        <h4>{product.productType}</h4>
        <h2>{product.title}</h2>

        {!hidePrice && <h3>£{price}</h3>}
        {withOptions && (
          <button
            className="highlight highlight-btn"
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
