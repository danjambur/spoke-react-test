import Head from "next/head";
import { initializeApollo } from "../lib/apolloClient";
import ProductList, { TEST_QUERY } from "../components/ProductList";

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
    query: TEST_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
