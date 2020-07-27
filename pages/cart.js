import Router from "next/router";
import fetch from "node-fetch";
import Product from "../components/Product";
import Head from "next/head";
import { useEffect, useState } from "react";

function goBack() {
  return Router.back();
}

export default function Cart({ baseURL }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      const result = await fetch(`${baseURL}/api/cart`);
      result.json().then((cart) => {
        setCart(cart);
      });
    };
    getCart();
  }, []);

  async function remove(id) {
    await fetch(`${baseURL}/api/cart`, {
      method: "DELETE",
      body: id,
    }).then((response) => {
      return response.json().then((cart) => {
        setCart(cart);
      });
    });
  }

  function cartTotal() {
    cart.reduce((sum, obj) => {
      obj.qty + obj.subTotal;
    }, 0);
    return cart.reduce((sum, obj) => sum + obj.subTotal, 0);
  }

  return (
    <section className="container">
      <Head>
        <title>Your Cart</title>
      </Head>
      <nav className="nav">
        <a
          className="nav-link nav-link__pdb"
          onClick={goBack}
          href="#"
        >
          BACK
        </a>
        <h1>MY CART</h1>
      </nav>
      {!cart.length && <p>your cart is empty.</p>}
      {cart.length > 0 && (
        <table className="cart">
          <tbody>
            <tr className="cart-row">
              <th className="cart-text__left">
                <h3>Cart items</h3>
              </th>
              <th>
                <h3>Price</h3>
              </th>
              <th>
                <h3>Quantity</h3>
              </th>
              <th>
                <h3>Remove</h3>
              </th>
            </tr>
            {cart.map((cartItem, index) => {
              let product = cartItem;
              return (
                <tr
                  key={`${product.id}${index}`}
                  className="cart-item"
                >
                  <td>
                    <Product
                      product={product}
                      id={product.id}
                      hidePrice
                    />
                  </td>
                  <td>
                    £
                    {parseInt(
                      product.priceRange.maxVariantPrice.amount,
                    ).toFixed(2)}
                  </td>
                  <td>{product.qty}</td>
                  <td>
                    <p
                      className="cart-remove"
                      onClick={() => remove(product.id)}
                    >
                      Delete
                    </p>
                  </td>
                </tr>
              );
            })}
            <tr className="cart-text__right">
              <td colspan="4">
                <h2>TOTAL: £{parseInt(cartTotal()).toFixed(2)}</h2>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </section>
  );
}

export async function getServerSideProps() {
  const baseURL = process.env.BASE_URL;
  return {
    props: {
      baseURL,
    },
  };
}
