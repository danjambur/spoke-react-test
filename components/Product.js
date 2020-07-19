import { gql, useQuery } from "@apollo/client";

export const GET_PRODUCT = gql`
  {
    product(id: $id) {
      title
      description
      onlineStoreUrl
    }
  }
`;

export default function Product({ product, id }) {
  console.log(id);
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: "" },
  });

  console.log({ data });

  if (!product) return null;

  const price = product.priceRange.maxVariantPrice.amount;
  const hasImage = product.images.edges.length > 0;
  const lastUpdated = new Date(product.updatedAt);
  let threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 14);

  // set the URL for the image
  const imageSrc = hasImage
    ? product.images.edges[0].node.transformedSrc
    : null;

  // if its been updated in the last 3 days, i guess its new!
  let isNew = false;
  if (lastUpdated < threeDaysAgo) {
    isNew = true;
  }

  function goToProduct() {
    console.log("hello");
  }

  return (
    <div className="product" onClick={goToProduct}>
      {hasImage && <img className="product__image" src={imageSrc} />}
      <div className="product__desc">
        {<div>{isNew && <div>NEW</div>}</div>}
        <h4>{product.productType}</h4>
        <h2>
          {product.title} - £{price}
        </h2>
        <p>description goes here</p>
      </div>
    </div>
  );
}
