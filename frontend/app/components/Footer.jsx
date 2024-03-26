import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="p-3 self-end inset-x-0 bottom-0 h-16 text-center font-medium text-sm">
        <div className="grid grid-rows-2 justify-items-center gap-2.5">
          <div className="grid grid-cols-4 gap-8">
            <Link href="/">
              <button className="hover:text-[#FFB62B]">About Us</button>
            </Link>
            <Link href="/services">
              <button className="hover:text-[#FFB62B]">Our Services</button>
            </Link>
            <Link href="/products">
              <button className="hover:text-[#FFB62B]">Our Products</button>
            </Link>
            <Link href="https://maps.app.goo.gl/fm4tTUEu3fP76pgz7">
              <button className="hover:text-[#FFB62B]">Our Stores</button>
            </Link>
          </div>
          <p className="pointer-events-none">©2024 semicolon projects; </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
