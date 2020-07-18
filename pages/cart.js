import Router from "next/router";
import Link from "next/link";

function goBack() {
  return Router.back();
}

export default function Cart() {
  return (
    <section className="container">
      <a onClick={goBack}>BACK</a>
    </section>
  );
}
