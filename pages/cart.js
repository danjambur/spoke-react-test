import Router from "next/router";
import fetch from "node-fetch";

function goBack() {
  return Router.back();
}

export default function Cart(props) {

  const { cart } = props;
  console.log(cart);
  return (
    <section className="container">
      <a className="nav-link nav-link__pdb" onClick={goBack} href="#">
        BACK
      </a>
      <h1>MY CART</h1>
      {!cart.length && (
        <p>your cart is empty.</p>
      )}
      {cart.length > 0 && (
        cart.map((cartItem) => {
          return (
            <p>{cartItem.name}</p>
          )
        })
      )}
      
    </section>
  );
}


export async function getStaticProps() {
  const baseURL = process.env.BASE_URL;
  const res = await fetch(`${baseURL}/api/cart`)
  const cart = await res.json()
  return {
    props: {
      cart
    },
  }
}