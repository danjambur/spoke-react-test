import Link from "next/link";
export default function Nav({ isProductPage }) {
  return (
    <nav className="nav">
      <Link href="/">
        {isProductPage ? (
          <a className="nav-link">BACK TO LIST</a>
        ) : (
          <a href="#" className="nav-link">
            ALL
          </a>
        )}
      </Link>
      <Link href="/cart">
        <a className="nav-link">CART</a>
      </Link>
    </nav>
  );
}
