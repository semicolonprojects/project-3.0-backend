import Link from "next/link";

const Partnership = () => {
  return (
    <div className="py-5 px-7 tablet:px-8 laptop:px-16 desktop:px-32 flex flex-col h-auto md:h-96 w-full">
      <p className="text-[#FFB62B] font-bold text-3xl tablet:text-5xl">
        Our Partnership Program
      </p>
      <p className="text-[#4EAEFD] pt-2 tablet:px-1 font-semibold text-[18px] tablet:text-[22px]">
        Learn more about our partnership program below
      </p>
      <div className="py-2.5 tablet:py-5 tablet:px-2">
        <Link href="/partnership">
          <button
            type="button"
            className="text-white bg-blue-500 hover:bg-yellow-500 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm md:text-base lg:text-lg px-6 md:px-14 py-2 md:py-3 me-2 mb-2 focus:outline-none"
          >
            Learn more
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Partnership;
