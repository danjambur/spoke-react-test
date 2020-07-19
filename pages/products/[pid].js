import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Product, { GET_PRODUCT } from "../../components/Product";

export default function ProductPage(props) {
  const router = useRouter();
  const { pid } = router.query;
  return <Product id={pid} />;
}
