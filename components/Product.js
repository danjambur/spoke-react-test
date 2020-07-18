export default function Product({ product }) {
  return (
    <div className="product">
      <div>
        <img src={props.img || null} />
      </div>
      <div>{isNew && <div>NEW</div>}</div>
      <h4>category Goes here</h4>
      <h2>Title goes here</h2>
      <p>description goes here</p>
      <Button>add to basket</Button>
    </div>
  );
}
