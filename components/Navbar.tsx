import Link from "next/link";


const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/champions">Champions</Link>
        <Link href="/items">Items</Link>
        <Link href="/build-creator">Build Creator</Link>
      </nav>
    </header>
  );
};

export default Navbar;
