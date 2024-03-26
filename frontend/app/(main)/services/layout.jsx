import NavbarServices from "./NavbarServices";

export default function Layout({ children }) {
  return (
    <div className="relative overflow-hidden px-5 laptop:px-44 py-16">
      <h1 className="pt-16 tablet:pt-9 font-bold tracking-tight leading-none text-[70px] text-[#FFB62B]">
        Services For You
      </h1>
      <NavbarServices />
      {children}
    </div>
  );
}
