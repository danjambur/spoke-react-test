import Head from "next/head";
import { initializeApollo } from "../lib/apolloClient";
import ProductList, { GET_PRODUCTS } from "../components/ProductList";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <div className="container">
      <Nav />
      <ProductList />
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GET_PRODUCTS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
