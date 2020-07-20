import Router from "next/router";
import fetch from "node-fetch";
import Product from "../components/Product";

function goBack() {
  return Router.back();
}

export default function Cart(props) {
  const { cart } = props;
  return (
    <section className="container">
      <a className="nav-link nav-link__pdb" onClick={goBack} href="#">
        BACK
      </a>
      <h1>MY CART</h1>
      {!cart.length && <p>your cart is empty.</p>}
      <table className="cart">
        <tr className="cart-row">
          <h3>Cart items</h3>
          <h3>Quantity</h3>
          <h3>Price</h3>
          <h3>Remove</h3>
        </tr>
        {cart.map((cartItem, index) => {
          let product = JSON.parse(cartItem);
          console.log(product);
          return (
            <tr key={`${product.id}${index}`} className="cart-item">
              <Product product={product} id={product.id} hidePrice />

              <p>quantity</p>

              {parseInt(product.priceRange.maxVariantPrice.amount).toFixed(2)}

              <p>Delete</p>
            </tr>
          );
        })}
      </table>
    </section>
  );
}

export async function getStaticProps() {
  const baseURL = process.env.BASE_URL;
  const res = await fetch(`${baseURL}/api/cart`);
  const cart = await res.json();
  return {
    props: {
      cart,
    },
  };
}
