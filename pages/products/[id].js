import { useRouter } from "next/router";
import Product from "../../components/Product";

export default function Product() {
  const router = useRouter();
  const { pid } = router.query;
  return <Product id={pid} />;
}
