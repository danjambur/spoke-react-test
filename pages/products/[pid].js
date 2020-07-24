import { useRouter } from "next/router";
import Product, { GET_PRODUCT } from "../../components/Product";
import Nav from "../../components/Nav";
import { initializeApollo } from "../../lib/apolloClient";

export default function ProductPage(props) {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div className="container">
      <Nav isProductPage />
      <Product id={pid} withOptions {...props} />
    </div>
  );
}

export async function getServerSideProps(props) {
  const pid = props.query.pid;
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_PRODUCT,
    variables: { id: pid },
  });

  // We need to initialise this serverside
  // Otherwise it won't resolve to process.env.API
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      baseURL: process.env.BASE_URL,
    },
  };
}
