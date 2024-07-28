import Link from "next/link";

const Partnership = () => {
  return (
    <div className="py-10 pt-2 px-10 phone2:px-11 tablet:px-8 laptop:px-32 laptop-lg:px-16 desktop-md:px-44 desktop:px-28 flex flex-col h-auto laptop:h-60 laptop-lg:h-96 w-full">
      <p className="text-[#FFB62B] font-bold text-[23px] laptop:text-4xl laptop-lg:text-5xl desktop-md:text-6xl">
        Our Partnership Program
      </p>
      <p className="text-[#4EAEFD] pt-2 tablet:px-1 font-semibold text-[13px] tablet:text-[22px]">
        Learn more about our partnership program below
      </p>
      <div className="py-2.5 laptop-lg:py-5 laptop-lg:px-1">
        <Link href="/partnership">
          <button
            type="button"
            className="text-white bg-blue-500 hover:bg-[#FFB62B] focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm laptop:text-base laptop-lg:text-lg px-6 laptop-lg:px-14 py-2 laptop-lg:py-3 me-2 mb-2 focus:outline-none"
          >
            Learn more
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Partnership;
