import Link from "next/link";
export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/">
        <a href="#">ALL</a>
      </Link>
      <Link href="/cart">
        <a>CART </a>
      </Link>
    </nav>
  );
}
