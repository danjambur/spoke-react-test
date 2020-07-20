import Router from "next/router";

function goBack() {
  return Router.back();
}

export default function Cart() {
  return (
    <section className="container">
      <a className="nav-link nav-link__pdb" onClick={goBack} href="#">
        BACK
      </a>
      <h1>MY CART</h1>
    </section>
  );
}
