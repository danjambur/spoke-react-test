import { useRouter } from "next/router";
import { ApolloConsumer } from "@apollo/client";
import Product, { GET_PRODUCT } from "../../components/Product";
import Nav from "../../components/Nav";
import { initializeApollo } from "../../lib/apolloClient";

export default function ProductPage({ baseURL }) {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <ApolloConsumer>
      {(client) => {
        const data = client.readQuery({
          query: GET_PRODUCT,
          variables: { id: pid },
        });
        const product = data.node;
        return (
          <div className="container">
            <Nav isProductPage />
            <Product
              product={product}
              withOptions
              baseURL={baseURL}
            />
          </div>
        );
      }}
    </ApolloConsumer>
  );
}

export async function getServerSideProps(props) {
  const apolloClient = initializeApollo();
  // We need to initialise this serverside
  // Otherwise it won't resolve to process.env.API
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      baseURL: process.env.BASE_URL,
    },
  };
}
