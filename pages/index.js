import Head from "next/head";
import { initializeApollo } from "../lib/apolloClient";
import ProductList, { GET_PRODUCTS } from "../components/ProductList";

export default function Home() {
  return (
    <div className="container">
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
