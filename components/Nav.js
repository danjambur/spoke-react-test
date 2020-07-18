import Link from "next/link";
export default function Nav() {
  return (
    <nav>
      <Link to="/">
        <a>ALL</a>
      </Link>
      <Link to="/cart">
        <a>CART </a>
      </Link>
    </nav>
  );
}
