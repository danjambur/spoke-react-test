export default function Product({ product }) {
  const hasImage = product.images.edges.length > 0;
  const imageSrc = hasImage ?? product.images.edges[0].transformedSrc;
  const isNew = true;

  return (
    <div className="product">
      {hasImage && <img src={imageSrc} />}
      {<div>{isNew && <div>NEW</div>}</div>}
      <h4>{product.productType}</h4>
      <h2>{product.title}</h2>
      <p>description goes here</p>
      <button>add to basket</button>
    </div>
  );
}
